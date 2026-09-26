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
//
// 2026-09-26: the palette shrank to five colours with the redesign (public/css/synos.css). The
// values below are that file's, and the pair list is what the redesigned pages paint. The old
// twelve-family pairs are gone with the families.

const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255)
const lin = c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
const L = h => { const [r, g, b] = hex(h).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b }
const ratio = (a, b) => { const x = L(a), y = L(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05) }

const T = {
  paper: '#ffffff', surface2: '#f7f7f9',
  ink: '#1a1c22', ink2: '#3d4048', ink3: '#5b5e66', dim: '#8a8d95',
  line: '#e4e5e9', line2: '#cfd1d7',
  indigo: '#4338ca', indigoInk: '#312e81', indigoBg: '#eef0ff',
  white: '#ffffff',
}

// [label, fg, bg, minimum]
// 4.5 = AA body text. 3.0 = AA large text (>=24px, or >=19px bold) and UI boundaries.
const PAIRS = [
  ['body ink on paper',             T.ink,       T.paper,    4.5],
  ['ink-2 on paper',                T.ink2,      T.paper,    4.5],
  ['secondary ink-3 on paper',      T.ink3,      T.paper,    4.5],
  ['secondary ink-3 on surface-2',  T.ink3,      T.surface2, 4.5],
  ['ink on surface-2 (nav pill)',   T.ink,       T.surface2, 4.5],
  ['brand text on paper',           T.indigo,    T.paper,    4.5],
  ['primary button label',          T.white,     T.indigo,   4.5],
  ['primary button hover label',    T.white,     T.indigoInk, 4.5],
  ['ink button label',              T.white,     T.ink,      4.5],
  ['chip indigo on indigo-bg',      T.indigo,    T.indigoBg, 4.5],
  ['hairline on paper',             T.line,      T.paper,    1.1],
  ['input border on paper',         T.line2,     T.paper,    1.3],
  // --sk-dim is SURFACE-ONLY. It is listed so the number is on the record: it fails, and that is
  // why no text uses it. If this pair ever passes, --sk-dim has drifted lighter than a decoration.
]

let failed = 0
for (const [label, fg, bg, min] of PAIRS) {
  const r = ratio(fg, bg)
  const ok = r >= min
  if (!ok) failed++
  console.log(`${ok ? '  ok  ' : '  FAIL'} ${label.padEnd(32)} ${r.toFixed(2).padStart(6)}  (min ${min})`)
}

const dimOnPaper = ratio(T.dim, T.paper)
console.log(`  info  dim on paper (surface-only)    ${dimOnPaper.toFixed(2)}  (must stay below 4.5: it is not text)`)
if (dimOnPaper >= 4.5) {
  console.error('\ncontrast gate: --sk-dim now passes as text; either promote it to a text token or darken --sk-ink-3')
  process.exit(1)
}

if (failed) {
  console.error(`\ncontrast gate: ${failed} pair(s) below threshold`)
  process.exit(1)
}
console.log('\ncontrast gate: clean')
