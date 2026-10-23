// Agent Maturity Index: shared business logic.
// Runs on the server (netlify/functions/ami.mjs) and, in preview builds,
// in the browser with a local store, so both behave the same way.
// No Node- or browser-only APIs here.

export const DIMS = [
  ['knowledge', 'Knowledge & Context'],
  ['evaluation', 'Quality & Evaluation'],
  ['governance', 'Governance & Control'],
  ['improvement', 'Continuous Improvement'],
  ['sovereignty', 'Sovereignty & Residency'],
  ['value', 'Value & Portfolio'],
  ['people', 'People & Operating Model'],
];
export const LEVELS = ['Experimenting', 'Piloting', 'Operationalizing', 'Scaling', 'Agent-Native'];
export const TEAM_SIZE_FOR_ALIGNMENT = 3;
const MAX_MEMBERS = 25;
const MAX_INVITES = 15;
const EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

// ---------- Colleague invitations: shared rules (the page and the API use the same ones) ----------
/** Colleagues per send, and the message limit (about 50 words). */
export const INVITE_MAX_PER_SEND = 5;
export const INVITE_MESSAGE_MAX = 300;
/** A strict email shape for invitation recipients: one @, a dotted domain, no spaces or brackets. */
export const INVITE_EMAIL = /^[a-z0-9._%+'-]{1,64}@[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,24}$/i;
/** Anything that reads as a link or an address: a scheme, www., or a dotted domain such as acme.com. */
export const LINKISH = /(?:[a-z][a-z0-9+.-]*:\/\/|www\.|@|\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,24}\b)/i;
/** Names and company names: no scheme, no www., no slashes, no @. A company called Booking.com still passes. */
export const NAME_UNSAFE = /(?:[a-z][a-z0-9+.-]*:\/\/|www\.|[\/\\@<>])/i;
export const emailDomain = (e) => String(e).split('@')[1]?.toLowerCase() || '';
/** Same organisation: identical domains, or one is a subdomain of the other (uk.acme.com and acme.com). */
export const sameOrg = (a, b) => !!a && !!b && (a === b || a.endsWith('.' + b) || b.endsWith('.' + a));

/** Agent Maturity Score: the average of all seven dimensions, one decimal. */
export function maturity(scores) {
  const v = DIMS.map(([k]) => scores[k]);
  const avg = v.reduce((a, b) => a + b, 0) / v.length;
  const score = Math.round(avg * 10) / 10;
  return { score, level: LEVELS[Math.min(4, Math.max(0, Math.floor(score) - 1))] };
}

/**
 * Team alignment: 100 when everyone gives every dimension the same level,
 * 0 when every dimension spans the full 1-to-5 range.
 * Per dimension spread = highest minus lowest level (0 to 4).
 */
export function alignment(members) {
  const dims = DIMS.map(([k, name]) => {
    const vals = members.map((m) => m.scores[k]);
    const spread = Math.max(...vals) - Math.min(...vals);
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    return { key: k, name, spread, avg: Math.round(avg * 10) / 10 };
  });
  const meanSpread = dims.reduce((a, d) => a + d.spread, 0) / dims.length;
  const score = Math.round(100 * (1 - meanSpread / 4));
  const teamAvg = Math.round((members.reduce((a, m) => a + maturity(m.scores).score, 0) / members.length) * 10) / 10;
  const biggestGap = dims.slice().sort((a, b) => b.spread - a.spread)[0];
  return { score, teamAvg, teamLevel: maturity(Object.fromEntries(dims.map((d) => [d.key, d.avg]))).level, dims, biggestGap: biggestGap.spread > 0 ? biggestGap : null };
}

export function encodeLink(obj) {
  const bytes = new TextEncoder().encode(JSON.stringify(obj));
  let s = '';
  bytes.forEach((b) => (s += String.fromCharCode(b)));
  return 'score.' + btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
export function decodeLink(hash) {
  const m = /^#?score\.([A-Za-z0-9_-]+)$/.exec(hash || '');
  if (!m) return null;
  try {
    const b = atob(m[1].replace(/-/g, '+').replace(/_/g, '/'));
    const o = JSON.parse(new TextDecoder().decode(Uint8Array.from(b, (c) => c.charCodeAt(0))));
    return o && typeof o.t === 'string' ? o : null;
  } catch { return null; }
}

export class Fail extends Error { constructor(status, msg) { super(msg); this.status = status; } }

// Personal email domains the cohort application refuses. Kept identical to the list in
// components/RegisterForm.astro, so a direct API request meets the same rule as the page.
export const FREE_EMAIL = /@(?:gmail|googlemail|yahoo|ymail|hotmail|outlook|live|msn|icloud|me|mac|aol|proton(?:mail)?|pm|gmx|yandex|mail|zoho|hey|qq|163|126|web|fastmail|tutanota|tuta|zohomail|comcast|att|verizon)\.[a-z]{2,3}(?:\.[a-z]{2})?$/i;
// Fields the cohort application requires, with the message the page shows for each.
const COHORT_REQUIRED = [
  ['company', 'Enter your company.'],
  ['title', 'Enter your job title.'],
  ['company_size', 'Choose your company size.'],
  ['industry', 'Choose your industry.'],
  ['agents_in_production', 'Choose how many agents you run.'],
];

const clean = (v, max = 120) => (typeof v === 'string' ? v.replace(/[\u0000-\u001f<>]/g, ' ').trim().slice(0, max) : '');
const id = (n = 10) => {
  const a = new Uint8Array(n); crypto.getRandomValues(a);
  return Array.from(a, (b) => 'abcdefghijkmnpqrstuvwxyz23456789'[b % 32]).join('');
};
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const first = (name) => clean(name).split(/\s+/)[0] || '';

function validScores(s) {
  if (!s || typeof s !== 'object') throw new Fail(400, 'Score all seven dimensions.');
  const out = {};
  for (const [k] of DIMS) {
    const v = Number(s[k]);
    if (!Number.isInteger(v) || v < 1 || v > 5) throw new Fail(400, 'Score all seven dimensions.');
    out[k] = v;
  }
  return out;
}

const SIGN_OFF = 'Regards,\nAMI Team';

function emailHtml(lines, cta, footer) {
  return `<div style="font:16px/1.6 -apple-system,Segoe UI,Arial,sans-serif;color:#0f1b2d;max-width:520px">${lines.map((l) => `<p style="margin:0 0 14px">${l}</p>`).join('')}${cta ? `<p style="margin:24px 0"><a href="${esc(cta.url)}" style="display:inline-block;background:#2747e8;color:#fff;text-decoration:none;font-weight:600;padding:12px 22px;border-radius:999px">${esc(cta.label)}</a></p>` : ''}<p style="margin:24px 0 0">${SIGN_OFF.replace('\n', '<br>')}</p><p style="margin:28px 0 0;font-size:13px;color:#525e70">${footer ? `${esc(footer)}<br><br>` : ''}Agent Maturity Index, a SynOS research program. Answers are reported only in aggregate.</p></div>`;
}

// Field keys as Title Case labels: "agents_in_production" -> "Agents in Production".
const SMALL = new Set(['a', 'an', 'and', 'as', 'at', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to']);
const titleCase = (k) => k.replace(/[_-]+/g, ' ').trim().split(/\s+/).map((w, i) => (i && SMALL.has(w.toLowerCase()) ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1))).join(' ');

/**
 * store: { get(key) -> object|null, set(key, object) }
 * mail:  ({ to, subject, text, html, replyTo }) -> Promise
 */
export function makeCore({ store, mail, notifyTo, siteUrl, guard, log }) {
  const now = () => new Date().toISOString();
  const teamKey = (t) => `team/${t}`;
  const invitedKey = (addr) => `invited/${addr}`;

  // One line saying what happened, by notification label. `who` already includes "from <company>".
  const SUMMARY = {
    'Founding Cohort application': (who) => `${who} applied to the Founding Cohort.`,
    'Report waitlist': (who) => `${who} joined the waitlist for the Agent Maturity Index report.`,
    'Invitation accepted': (who) => `${who} accepted an invitation to score their business.`,
    'Self-score': (who) => `${who} completed the Agent Maturity Index self-score.`,
    'Colleague invitations': (who) => `${who} invited colleagues to score their business.`,
  };

  async function notify(label, fields) {
    if (!notifyTo) return;
    const rows = Object.entries(fields).filter(([, v]) => v !== '' && v != null).map(([k, v]) => [`${titleCase(k)}:`, typeof v === 'object' ? JSON.stringify(v) : String(v)]);
    const name = fields.name || 'An anonymous visitor';
    const company = fields.company || fields.business;
    const summary = (SUMMARY[label] || ((who) => `New ${label.toLowerCase()} from ${who}.`))(`${name}${company ? ` from ${company}` : ''}`);
    const text = `Hello,\n\n${summary}\n\n${rows.map(([k, v]) => `${k} ${v}`).join('\n')}\n\n${SIGN_OFF}`;
    const cell = 'padding:6px 12px;border:1px solid #c9ced8;vertical-align:top';
    const html = `<div style="font:14px/1.5 -apple-system,Segoe UI,Arial,sans-serif;color:#0f1b2d"><p style="margin:0 0 12px">Hello,</p><p style="margin:0 0 16px">${esc(summary)}</p><table style="border-collapse:collapse;border:1px solid #c9ced8">${rows.map(([k, v]) => `<tr><td style="${cell};color:#525e70;font-weight:600;white-space:nowrap">${esc(k)}</td><td style="${cell}">${esc(v)}</td></tr>`).join('')}</table><p style="margin:20px 0 0">Regards,<br>AMI Team</p></div>`;
    await mail({ to: notifyTo, subject: `[AMI] ${label}: ${fields.name || 'anonymous visitor'}${company ? ` (${company})` : ''}`, text, html, replyTo: EMAIL.test(fields.email || '') ? fields.email : undefined });
  }

  /** Registration, report waitlist and invitation acceptance forms. */
  async function register(body) {
    const type = { cohort: 'Founding Cohort application', report: 'Report waitlist', invite_accept: 'Invitation accepted' }[body.type || body.intent];
    if (!type) throw new Fail(400, 'Unknown form.');
    if (!clean(body.name) || !EMAIL.test(clean(body.email, 200))) throw new Fail(400, 'Name and a valid email are required.');
    if ((body.type || body.intent) === 'cohort') {
      if (FREE_EMAIL.test(clean(body.email, 200))) throw new Fail(400, 'Use your work email so we can confirm your company.');
      for (const [k, msg] of COHORT_REQUIRED) if (!clean(body[k])) throw new Fail(400, msg);
    }
    const fields = {};
    for (const [k, v] of Object.entries(body)) {
      if (k === 'website' || k === 'type' || k === 'intent') continue; // honeypot; the form type is already in the subject
      fields[k] = Array.isArray(v) ? v.map((x) => (typeof x === 'object' ? Object.values(x).map((y) => clean(String(y), 200)).join(' / ') : clean(String(x), 200))).join('; ') : clean(String(v ?? ''), 500);
    }
    await notify(type, fields);
    return { ok: true };
  }

  /** Save one person's seven scores. Creates a team for a first-time scorer. */
  async function score(body) {
    const scores = validScores(body.scores);
    let team = body.team ? await store.get(teamKey(clean(body.team, 20))) : null;
    if (!team) team = { id: id(), business: '', created: now(), members: [], invites: [], alignedNotified: false };
    let member = team.members.find((m) => m.id === body.member);
    const invite = team.invites.find((i) => i.id === body.invite);
    if (!member) {
      if (team.members.length >= MAX_MEMBERS) throw new Fail(429, 'This team is full.');
      member = { id: id(), name: invite?.name || clean(body.name, 80), email: invite?.email || '', invitedBy: invite?.by || '', at: now(), scores };
      team.members.push(member);
      if (invite) invite.accepted = now();
    } else {
      member.scores = scores; member.at = now();
    }
    await store.set(teamKey(team.id), team);

    const you = maturity(scores);
    const count = team.members.length;
    const result = { team: team.id, member: member.id, business: team.business, you, count, needed: Math.max(0, TEAM_SIZE_FOR_ALIGNMENT - count) };
    if (count >= TEAM_SIZE_FOR_ALIGNMENT) result.alignment = alignment(team.members);

    await notify('Self-score', { name: member.name, email: member.email, business: team.business, score: `${you.score} (${you.level})`, ...Object.fromEntries(DIMS.map(([k, n]) => [n, scores[k]])),'team members scored': count, 'alignment score': result.alignment?.score ?? '' });

    if (result.alignment && !team.alignedNotified) {
      team.alignedNotified = true;
      await store.set(teamKey(team.id), team);
      const a = result.alignment;
      const url = siteUrl ? `${siteUrl}#${encodeLink({ t: team.id, b: team.business })}` : '';
      for (const m of team.members.filter((x) => EMAIL.test(x.email))) {
        await mail({
          to: m.email,
          subject: `Your team alignment score for ${team.business || 'your business'} is ready`,
          text: `Hi${first(m.name) ? ` ${first(m.name)}` : ''},\n\n${count} people from ${team.business || 'your business'} have scored your AI agent program.\n\nTeam alignment score: ${a.score}/100\nTeam Agent Maturity Score: ${a.teamAvg} (${a.teamLevel})${a.biggestGap ? `\nBiggest disagreement: ${a.biggestGap.name}` : ''}\n\n${SIGN_OFF}`,
          html: emailHtml([`Hi${first(m.name) ? ` ${esc(first(m.name))}` : ''},`, `${count} people from ${esc(team.business || 'your business')} have scored your AI agent program.`, `<strong style="font-size:22px">Team alignment score: ${a.score}/100</strong><br>Team Agent Maturity Score: ${a.teamAvg} (${esc(a.teamLevel)})${a.biggestGap ? `<br>Biggest disagreement: ${esc(a.biggestGap.name)}` : ''}`]),
        }).catch(() => {});
      }
    }
    return result;
  }

  /**
   * Invite colleagues to score the same business.
   * Abuse rules, all checked here so a direct API request meets them too:
   * the sender must have scored this team, use a work email, and invite only
   * addresses at their own company's domain; at most five per send and fifteen
   * per team; no links or addresses in any text the recipient reads; the
   * message is plain text and capped. `guard(n, sender)` adds the per-IP,
   * per-domain and daily caps where a store for them exists (the live API).
   */
  async function invite(body) {
    const team = await store.get(teamKey(clean(body.team, 20)));
    if (!team) throw new Fail(404, 'Score your business first.');
    const me = team.members.find((m) => m.id === body.member);
    if (!me) throw new Fail(403, 'Score your business first.');
    const name = clean(body.name, 80);
    const business = team.business || clean(body.business, 80);
    const email = clean(body.email, 200).toLowerCase();
    const message = clean(body.message, INVITE_MESSAGE_MAX + 1).replace(/\s+/g, ' ');
    if (!business) throw new Fail(400, 'Enter your company name.');
    if (NAME_UNSAFE.test(business)) throw new Fail(400, 'Enter your company name without links or symbols.');
    if (!name) throw new Fail(400, 'Enter your name.');
    if (NAME_UNSAFE.test(name)) throw new Fail(400, 'Enter your name without links or symbols.');
    if (!INVITE_EMAIL.test(email)) throw new Fail(400, 'Enter your work email.');
    if (FREE_EMAIL.test(email)) throw new Fail(400, 'Use your work email. Invitations go to colleagues at the same company.');
    if (message.length > INVITE_MESSAGE_MAX) throw new Fail(400, `Keep the message under ${INVITE_MESSAGE_MAX} characters.`);
    if (LINKISH.test(message)) throw new Fail(400, 'Remove links and email addresses from the message.');

    // Older pages sent { name, email } objects; this page sends plain addresses.
    const raw = Array.isArray(body.colleagues) ? body.colleagues : [];
    const seen = new Set([email]);
    const list = [];
    for (const c of raw.slice(0, 50)) {
      const addr = clean(typeof c === 'string' ? c : c?.email, 200).toLowerCase();
      if (!addr || seen.has(addr)) continue;
      seen.add(addr);
      list.push(addr);
    }
    if (!list.length) throw new Fail(400, 'Add at least one colleague’s email.');
    if (list.length > INVITE_MAX_PER_SEND) throw new Fail(400, `Invite up to ${INVITE_MAX_PER_SEND} colleagues at a time.`);
    const domain = emailDomain(email);
    for (const addr of list) {
      if (!INVITE_EMAIL.test(addr)) throw new Fail(400, `${addr} is not a valid email.`);
      if (!sameOrg(emailDomain(addr), domain)) throw new Fail(400, `Invite colleagues with an @${domain} email.`);
    }

    // One invitation per person, ever. An address already invited (by anyone, to any
    // team) or already scoring this team is skipped without telling the sender, so the
    // form cannot be used to re-send or to probe who was invited. Each skip is logged.
    const fresh = [];
    const repeats = [];
    for (const addr of list) {
      const prior = await store.get(invitedKey(addr));
      const inTeam = team.invites.some((x) => x.email === addr) || team.members.some((m) => m.email === addr);
      if (prior || inTeam) repeats.push({ addr, prior: prior || { team: team.id } });
      else fresh.push(addr);
    }
    if (repeats.length && log) {
      for (const r of repeats) await log({ type: 'repeat_invite', at: now(), to: r.addr, team: team.id, business: team.business || business, by: name, byEmail: email, firstInvite: r.prior }).catch(() => {});
    }
    if (team.invites.length + fresh.length > MAX_INVITES) throw new Fail(429, 'This team has reached its invitation limit.');
    if (guard && fresh.length) await guard(fresh.length, email);

    me.name = name; me.email = email;
    if (!team.business) team.business = business;
    const sent = [];
    const inviter = first(name);
    const said = message ? `\n\n${inviter}’s message: “${message}”` : '';
    for (const addr of fresh) {
      const inv = { id: id(), name: '', email: addr, by: name, at: now() };
      team.invites.push(inv);
      await store.set(invitedKey(addr), { team: team.id, business: team.business, by: name, byEmail: email, at: inv.at });
      const hash = encodeLink({ t: team.id, k: inv.id, i: inviter, b: team.business });
      const url = `${siteUrl || ''}#${hash}`;
      sent.push({ name: addr, hash, url });
      const why = `You received this because ${name} (${email}) entered your address on the Agent Maturity Index. Please ignore this email if you received it in error.`;
      await mail({
        to: addr,
        replyTo: email,
        subject: `${inviter} invited you to score ${team.business}’s AI agent maturity`,
        text: `Hi,\n\n${name} has scored ${team.business} on the Agent Maturity Index and wants your view.${said}\n\nIt takes two minutes: seven questions, one choice each. When three of you have scored, everyone gets your team alignment score.\n\nScore ${team.business}: ${url}\n\n${SIGN_OFF}\n\n${why}`,
        html: emailHtml([
          'Hi,',
          `<strong>${esc(name)}</strong> has scored <strong>${esc(team.business)}</strong> on the Agent Maturity Index and wants your view.`,
          ...(message ? [`<span style="display:block;padding:10px 14px;border-left:3px solid #c9ced8;color:#525e70">${esc(inviter)}’s message: “${esc(message)}”</span>`] : []),
          'It takes two minutes: seven questions, one choice each. When three of you have scored, everyone gets your team alignment score.',
        ], { url, label: `Score ${team.business}` }, why),
      });
    }
    await store.set(teamKey(team.id), team);
    await notify('Colleague invitations', { name, email, business: team.business, invited: fresh.join(', '), 'skipped, already invited': repeats.map((r) => r.addr).join(', '), message });
    // Reports every requested address as sent, so a repeat looks the same as a first invitation.
    return { sent: list.length, business: team.business, links: sent };
  }

  return { register, score, invite };
}
