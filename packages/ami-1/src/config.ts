// Site-wide settings. Edit these before deploying.
// Path prefix the site is served under, without a trailing slash ('/agent-maturity-index-1').
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export const SITE = {
  name: 'Agent Maturity Index',
  publisher: 'SynOS',
  publisherUrl: 'https://synos.ai',
  contactEmail: 'index@synos.ai',
  // All forms post to the site's own API (api/ami.js in the synos.in repo), which
  // emails every submission to NOTIFY_EMAIL (anuraag@synos.in by default).
  api: `${BASE}/api`,
  // Set by `PUBLIC_PREVIEW=1 npm run build` for a shareable review copy:
  // the form shows its success state without sending anything.
  preview: import.meta.env.PUBLIC_PREVIEW === '1',
  // Founding Cohort invitation page (/invite). Leave seatsRemaining or
  // inviteDeadline empty to hide that line; only show numbers that are true.
  seatsTotal: 30,
  seatsRemaining: null as number | null,
  inviteDeadline: '', // e.g. 'October 30, 2026'
  // Optional analytics script, loaded only after a visitor accepts cookies.
  // Example: 'https://plausible.io/js/script.js' (Plausible needs no consent,
  // so you could also load it unconditionally).
  analyticsSrc: '',
  analyticsDomain: 'synos.in',
};
