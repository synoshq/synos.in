// Site-wide settings. Edit these before deploying.
// Path prefix the site is served under, without a trailing slash ('/agent-maturity-index').
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export const SITE = {
  name: 'Agent Maturity Index',
  publisher: 'SynOS',
  publisherUrl: 'https://www.getsynos.ai',
  // Legal owner named in copyright notices. Matches public/terms.html; change here if counsel
  // decides the IP sits with a different entity.
  legalEntity: 'SynOS Labs LLP',
  // The framework text (levels, dimensions, questions) is shared under this licence so it can be
  // quoted and cited with credit. Benchmark data and reports stay all rights reserved.
  license: { name: 'CC BY-NC-ND 4.0', url: 'https://creativecommons.org/licenses/by-nc-nd/4.0/' },
  termsUrl: 'https://www.getsynos.ai/terms',
  contactEmail: 'index@getsynos.ai',
  // All forms post to the site's own API (api/ami/[route].mjs in the synos.in repo), which
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
  analyticsDomain: 'getsynos.ai',
  // Google Analytics 4 (gtag.js), loaded only after a visitor allows analytics in the cookie notice.
  // Empty to switch it off. The CSP for /agent-maturity-index in vercel.json allows Google's hosts.
  gaId: 'G-MXVRX5VMJR',
};
