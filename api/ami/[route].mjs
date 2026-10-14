// Agent Maturity Index API: POST /<slug>/api/{register,score,invite}
// vercel.json rewrites each microsite's /<slug>/api/:route here with ?site=<slug>.
// GET /api/ami/flush (Vercel Cron, every 15 minutes) retries queued email.
// Sites: agent-maturity-index (packages/ami). Each site keeps its own teams
// and invitation links, under its own key prefix.
// Storage: Upstash Redis over its REST API. Email: Resend (https://resend.com).
// Environment variables (Vercel > Project > Settings > Environment Variables):
//   KV_REST_API_URL, KV_REST_API_TOKEN  set by the Upstash Redis integration
//                                       (UPSTASH_REDIS_REST_URL/_TOKEN also work)
//   RESEND_API_KEY  required to send email
//   MAIL_FROM       e.g. "Agent Maturity Index <index@getsynos.ai>" (domain verified in Resend)
//   NOTIFY_EMAIL    where every form submission goes (default anuraag@getsynos.ai)
//   SITE_ORIGIN     origin used in invitation links (default https://www.getsynos.ai)
//   CRON_SECRET     Vercel sends it to /api/ami/flush; requests without it are refused
//
// Redis keys, under each site's prefix:
//   <prefix>:submission/<id>  every register-form submission (cohort, report,
//                             invite_accept), with whether its email went out
//   <prefix>:submissions      sorted set of submission ids by time
//   <prefix>:mail/<id>        an email that could not be sent yet
//   <prefix>:outbox           set of queued mail ids, retried by /api/ami/flush
import { makeCore, Fail } from '../../packages/ami/src/lib/ami-core.js';

const env = (k, d = '') => process.env[k] || d;
const ROUTES = ['register', 'score', 'invite'];
// Slug -> Redis key prefix. The site launched at /agent-maturity-index-1, so it
// keeps that prefix and the teams and invitations stored under it.
const SITES = { 'agent-maturity-index': 'ami-1' };

async function redis(...commands) {
  const url = env('KV_REST_API_URL', env('UPSTASH_REDIS_REST_URL'));
  const token = env('KV_REST_API_TOKEN', env('UPSTASH_REDIS_REST_TOKEN'));
  if (!url || !token) throw new Error('Redis is not configured');
  const res = await fetch(`${url}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
  });
  if (!res.ok) throw new Error(`Redis ${res.status}: ${await res.text()}`);
  return (await res.json()).map((r) => { if (r.error) throw new Error(`Redis: ${r.error}`); return r.result; });
}

const storeFor = (prefix) => ({
  get: async (k) => { const [v] = await redis(['GET', `${prefix}:${k}`]); return v == null ? null : JSON.parse(v); },
  set: async (k, v) => { await redis(['SET', `${prefix}:${k}`, JSON.stringify(v)]); },
});

async function sendMail({ to, subject, text, html, replyTo }) {
  const key = env('RESEND_API_KEY');
  if (!key) throw new Error('RESEND_API_KEY is not set');
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: env('MAIL_FROM', 'Agent Maturity Index <index@getsynos.ai>'), to: [to], subject, text, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

const newId = () => crypto.randomUUID();
// Preview deployments share production's Redis; each queued email remembers
// which environment queued it, and only that environment sends it.
const deployEnv = () => env('VERCEL_ENV', 'development');

/** Send now, or queue in Redis for /api/ami/flush. Resolves true if sent. */
async function deliver(prefix, m, submission) {
  try { await sendMail(m); return true; } catch (e) {
    console.error('[mail queued]', m.to, m.subject, e.message);
    const id = newId();
    await redis(
      ['SET', `${prefix}:mail/${id}`, JSON.stringify({ ...m, id, submission, env: deployEnv(), queuedAt: new Date().toISOString(), attempts: 1, lastError: e.message })],
      ['SADD', `${prefix}:outbox`, id],
    );
    return false;
  }
}

async function getJSON(key) { const [v] = await redis(['GET', key]); return v == null ? null : JSON.parse(v); }

const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

export async function POST(req) {
  const url = new URL(req.url);
  const route = url.pathname.split('/').pop();
  const site = url.searchParams.get('site');
  const prefix = SITES[site];
  if (!ROUTES.includes(route) || !prefix) return json(404, { error: 'Not found' });

  const raw = await req.text();
  if (raw.length > 20000) return json(413, { error: 'Too large' });
  let body;
  try { body = JSON.parse(raw); } catch { return json(400, { error: 'Invalid request' }); }
  if (body.website) return json(200, { ok: true }); // honeypot

  try {
    // Simple rate limit: 40 requests per IP per hour.
    const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';
    const rlKey = `${prefix}:rl:${ip}:${new Date().toISOString().slice(0, 13)}`;
    const [hits] = await redis(['INCR', rlKey], ['EXPIRE', rlKey, 3600]);
    if (hits > 40) return json(429, { error: 'Too many requests. Try again later.' });

    // A register submission is saved before anything else, so it survives a
    // failed email. Its notification links back to it by id.
    const submission = route === 'register' ? newId() : undefined;
    const notifyTo = env('NOTIFY_EMAIL', 'anuraag@getsynos.ai');
    let mailed = null;
    const core = makeCore({
      store: storeFor(prefix),
      // Email never fails a submission: what can't be sent now is queued.
      mail: async (m) => {
        const sent = await deliver(prefix, m, m.to === notifyTo ? submission : undefined);
        if (m.to === notifyTo) mailed = sent;
      },
      notifyTo,
      siteUrl: `${env('SITE_ORIGIN', 'https://www.getsynos.ai')}/${site}`,
    });
    const result = await core[route](body);
    if (submission) {
      const at = new Date();
      const { website, ...fields } = body;
      await redis(
        ['SET', `${prefix}:submission/${submission}`, JSON.stringify({ id: submission, at: at.toISOString(), type: body.type || body.intent, fields, env: deployEnv(), mailed: Boolean(mailed), ...(mailed ? { mailedAt: at.toISOString() } : {}) })],
        ['ZADD', `${prefix}:submissions`, at.getTime(), submission],
      );
    }
    return json(200, result);
  } catch (e) {
    if (e instanceof Fail) return json(e.status, { error: e.message });
    console.error(e);
    return json(500, { error: 'Something went wrong on our side. Try again.' });
  }
}

/** Vercel Cron: retry every queued email for this environment. */
export async function GET(req) {
  const route = new URL(req.url).pathname.split('/').pop();
  if (route !== 'flush') return json(404, { error: 'Not found' });
  const secret = env('CRON_SECRET');
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) return json(401, { error: 'Unauthorized' });

  const report = {};
  for (const prefix of new Set(Object.values(SITES))) {
    const r = report[prefix] = { sent: 0, failed: 0, skipped: 0 };
    const [ids] = await redis(['SMEMBERS', `${prefix}:outbox`]);
    for (const id of ids.slice(0, 50)) {
      const m = await getJSON(`${prefix}:mail/${id}`);
      if (!m) { await redis(['SREM', `${prefix}:outbox`, id]); continue; }
      if (m.env !== deployEnv()) { r.skipped++; continue; }
      try {
        await sendMail(m);
        await redis(['SREM', `${prefix}:outbox`, id], ['DEL', `${prefix}:mail/${id}`]);
        if (m.submission) {
          const sub = await getJSON(`${prefix}:submission/${m.submission}`);
          if (sub) await redis(['SET', `${prefix}:submission/${m.submission}`, JSON.stringify({ ...sub, mailed: true, mailedAt: new Date().toISOString() })]);
        }
        r.sent++;
      } catch (e) {
        await redis(['SET', `${prefix}:mail/${id}`, JSON.stringify({ ...m, attempts: (m.attempts || 1) + 1, lastError: e.message })]);
        r.failed++;
      }
    }
  }
  console.log('[mail flush]', JSON.stringify(report));
  return json(200, report);
}
