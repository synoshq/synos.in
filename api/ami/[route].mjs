// Agent Maturity Index API: POST /<slug>/api/{register,score,invite}
// vercel.json rewrites each microsite's /<slug>/api/:route here with ?site=<slug>.
// Sites: agent-maturity-index-1 (packages/ami-1). Each site keeps its own teams
// and invitation links, under its own key prefix.
// Storage: Upstash Redis over its REST API. Email: Resend (https://resend.com).
// Environment variables (Vercel > Project > Settings > Environment Variables):
//   KV_REST_API_URL, KV_REST_API_TOKEN  set by the Upstash Redis integration
//                                       (UPSTASH_REDIS_REST_URL/_TOKEN also work)
//   RESEND_API_KEY  required to send email
//   MAIL_FROM       e.g. "Agent Maturity Index <index@synos.in>" (domain verified in Resend)
//   NOTIFY_EMAIL    where every form submission goes (default anuraag@synos.in)
//   SITE_ORIGIN     origin used in invitation links (default https://synos.in)
import { makeCore, Fail } from '../../packages/ami-1/src/lib/ami-core.js';

const env = (k, d = '') => process.env[k] || d;
const ROUTES = ['register', 'score', 'invite'];
// Slug -> Redis key prefix.
const SITES = { 'agent-maturity-index-1': 'ami-1' };

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
  if (!key) { console.log('[mail skipped: no RESEND_API_KEY]', to, subject); return; }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: env('MAIL_FROM', 'Agent Maturity Index <onboarding@resend.dev>'), to: [to], subject, text, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

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

    const core = makeCore({
      store: storeFor(prefix),
      // Email is best-effort: a Resend failure (unverified sender, outage) is
      // logged and the submission is still saved and acknowledged.
      mail: (m) => sendMail(m).catch((e) => console.error('[mail failed]', m.to, m.subject, e.message)),
      notifyTo: env('NOTIFY_EMAIL', 'anuraag@synos.in'),
      siteUrl: `${env('SITE_ORIGIN', 'https://synos.in')}/${site}`,
    });
    return json(200, await core[route](body));
  } catch (e) {
    if (e instanceof Fail) return json(e.status, { error: e.message });
    console.error(e);
    return json(500, { error: 'Something went wrong on our side. Try again.' });
  }
}
