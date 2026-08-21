// Every text-on-background pair the site actually uses, measured against WCAG AA.
//
// This exists because the brand kit's palette was ported on 2026-08-21 and two pairs failed
// immediately: --sk-muted and --sk-dim on --sk-bg. The kit never hit them because a deck paints
// text on white cards, and a web page paints it straight onto the page background. Nothing caught
// that except running the arithmetic, which is the whole reason this file is a gate.
//
// Pairs are listed by hand rather than derived from the CSS. A derived check would need a real
// cascade, and the failure mode of getting that subtly wrong is worse than the failure mode of
// forgetting to add a pair here.

const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255)
const lin = c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
const L = h => { const [r, g, b] = hex(h).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b }
const ratio = (a, b) => { const x = L(a), y = L(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05) }

const T = {
  bg: '#f1f5f9', surface: '#ffffff', surface2: '#f8fafc',
  ink: '#0f172a', ink2: '#334155', ink3: '#475569', muted: '#64748b', dim: '#94a3b8',
  indigo: '#4338ca', indigo2: '#6366f1', indigoInk: '#312e81', violetInk: '#4c1d95',
  indigoBg: '#eef2ff',
  emeraldInk: '#065f46', emeraldBg: '#ecfdf5',
  amberInk: '#78350f', amberBg: '#fffbeb',
  redInk: '#991b1b',
  border2: '#cbd5e1',
  white: '#ffffff',
}

// [label, fg, bg, minimum]
// 4.5 = AA body text. 3.0 = AA large text (>=24px, or >=19px bold) and UI boundaries.
const PAIRS = [
  ['body ink on page',            T.ink,        T.bg,        4.5],
  ['lead ink-2 on page',          T.ink2,       T.bg,        4.5],
  ['sub ink-3 on page',           T.ink3,       T.bg,        4.5],
  ['card body muted on surface',  T.muted,      T.surface,   4.5],
  ['card body muted on surface2', T.muted,      T.surface2,  4.5],
  ['eyebrow brand-text on page',  T.indigo,     T.bg,        4.5],
  ['link brand-text on surface',  T.indigo,     T.surface,   4.5],
  ['link brand-text on page',     T.indigo,     T.bg,        4.5],
  ['primary button label',        T.white,      T.indigo,    4.5],
  ['primary button hover label',  T.white,      T.indigoInk, 4.5],
  ['white on gradient end',       T.white,      T.violetInk, 4.5],
  ['white on gradient start',     T.white,      T.indigo2,   3.0],
  ['live chip',                   T.emeraldInk, T.emeraldBg, 4.5],
  ['in-build chip',               T.amberInk,   T.amberBg,   4.5],
  ['footer copy ink-3 on page',   T.ink3,       T.bg,        4.5],
  ['hairline border-2 on page',   T.border2,    T.bg,        1.2],

  // Added in phase 4, when the platform pages introduced these. The small mono labels are the
  // reason --sk-dim is no longer used for text anywhere: at 9.5px it is body text by every
  // measure that matters, and it fails on both backgrounds.
  ['small mono ink-3 on page',    T.ink3,       T.bg,        4.5],
  ['small mono ink-3 on alt',     T.ink3,       T.surface2,  4.5],
  ['mono cell ink-2 on alt',      T.ink2,       T.surface2,  4.5],
  ['core band ink on indigo-bg',  T.indigoInk,  T.indigoBg,  4.5],
  ['core cell ink-2 on surface',  T.ink2,       T.surface,   4.5],
  ['rung label indigo on alt',    T.indigo,     T.surface2,  4.5],
  ['hard-part note amber on alt', T.amberInk,   T.bg,        4.5],
  ['queue conflict red on surf',  T.redInk,     T.surface,   4.5],
]

let failed = 0
for (const [label, fg, bg, min] of PAIRS) {
  const r = ratio(fg, bg)
  const ok = r >= min
  if (!ok) failed++
  console.log(`${ok ? '  ok  ' : '  FAIL'} ${label.padEnd(30)} ${r.toFixed(2).padStart(6)}  (min ${min})`)
}

if (failed) {
  console.error(`\ncontrast gate: ${failed} pair(s) below threshold`)
  process.exit(1)
}
console.log('\ncontrast gate: clean')
