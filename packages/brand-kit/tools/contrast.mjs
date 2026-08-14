#!/usr/bin/env node
/**
 * Contrast audit for the brand kit.
 *
 * Reads tokens.css, resolves every --sk-* colour token, and computes WCAG 2.x contrast for every
 * text/surface pair a component actually forms. Gradients are sampled along their own axis, because
 * a 135deg ramp under a text block is not one colour.
 *
 *   node tools/contrast.mjs            # full table
 *   node tools/contrast.mjs --fail     # only pairs below their threshold; exit 1 if any
 */
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const TOKENS = readFileSync(resolve(HERE, '../src/styles/tokens.css'), 'utf8')

/** Every `--sk-x: #hex` in tokens.css. */
const T = {}
for (const m of TOKENS.matchAll(/(--sk-[a-z0-9-]+):\s*(#[0-9a-fA-F]{3,8})\s*;/g)) T[m[1]] = m[2]

const hex = (h) => {
  h = h.replace('#', '')
  if (h.length === 3) h = [...h].map((c) => c + c).join('')
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))
}
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4 }
const lum = (rgb) => 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2])
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05) }
/** Composite fg over bg at alpha — what an rgba() text colour actually paints. */
const over = (fg, bg, a) => fg.map((c, i) => Math.round(c * a + bg[i] * (1 - a)))
/** sRGB interpolation, which is what a CSS linear-gradient does by default. */
const mix = (a, b, t) => a.map((c, i) => Math.round(c + (b[i] - c) * t))

const tok = (name) => hex(T[name] ?? name)
const r2 = (n) => Math.round(n * 100) / 100

const rows = []

/**
 * Three kinds of row, and only one of them is a gate:
 *
 * - `pair`  — a text/surface combination some component actually paints. Must clear `need`.
 * - `guard` — a combination that must NOT be used. Passes when it is BELOW `need`, so the number
 *             that proves the rule is on the record instead of living in a comment.
 * - `info`  — context. Before-numbers, and geometry no glyph reaches. Never gates.
 *
 * `need` is 4.5 for normal text and 3.0 for large text (>=24px, or >=18.66px bold).
 */
const row = (kind, label, fgSpec, bgSpec, need, size) => {
  const bg = typeof bgSpec === 'string' ? tok(bgSpec) : bgSpec
  let fg = typeof fgSpec === 'string' ? tok(fgSpec) : fgSpec.rgb
  if (typeof fgSpec === 'object' && fgSpec.alpha != null) fg = over(tok(fgSpec.token), bg, fgSpec.alpha)
  const cr = ratio(fg, bg)
  rows.push({ kind, label, size, cr: r2(cr), need, pass: kind === 'info' ? true : kind === 'guard' ? cr < need : cr >= need })
}
const pair = (...a) => row('pair', ...a)
const guard = (...a) => row('guard', ...a)
const info = (...a) => row('info', ...a)

/* ── Gradient sampling ──────────────────────────────────────────────────────
 * A 135deg ramp under a text block is not one colour, so sampling only the endpoints answers the
 * wrong question. `--sk-grad` is parsed out of tokens.css and sampled along its own axis.
 *
 * The Company Brain pillar spans two of three columns: on the 1380px slide with 56px side padding
 * and an 18px grid gap that is 833 x 62 px. Its text starts 68px in from the left edge (16px pad +
 * 38px icon + 14px gap), so the leftmost, lightest text pixel sits at the t computed below — not
 * at t=0, which is a corner no glyph ever touches.
 */
const S = Math.SQRT1_2
const gradT = (x, y, w, h) => 0.5 + ((x - w / 2) * S + (y - h / 2) * S) / (w * S + h * S)
const gradAt = (from, to, t) => mix(tok(from), tok(to), Math.max(0, Math.min(1, t)))

/** `--sk-grad: linear-gradient(135deg, var(--sk-indigo-2), var(--sk-violet-ink))` -> the two ends. */
const gm = TOKENS.match(/--sk-grad:\s*linear-gradient\(([^;]+)\);/)[1]
const ends = gm
  .split(',')
  .map((s) => s.trim())
  .filter((s) => !/deg$/.test(s))
  .map((s) => s.replace(/^var\((--sk-[a-z0-9-]+)\)$/, '$1'))
const [gFrom, gTo] = ends

console.log(`gradient: ${gFrom} (${T[gFrom] ?? gFrom}) -> ${gTo} (${T[gTo] ?? gTo})\n`)

/* Body / heading text on the two surfaces components actually paint on. --sk-bg is the stage
   behind the slide card; no component sets text on it, so it forms no pair. */
for (const [sn, s] of [['surface', '--sk-surface'], ['surface-2', '--sk-surface-2']]) {
  for (const f of ['--sk-ink', '--sk-ink-2', '--sk-ink-3', '--sk-muted']) pair(`${f} on ${sn}`, f, s, 4.5)
}
/* Hue text on its own tint, and on white. */
for (const [h, tint] of [['--sk-indigo', '--sk-indigo-bg'], ['--sk-violet', '--sk-violet-bg'],
  ['--sk-emerald', '--sk-emerald-bg'], ['--sk-amber', '--sk-amber-bg'], ['--sk-red', '--sk-red-bg'],
  ['--sk-emerald-ink', '--sk-emerald-bg'], ['--sk-red-ink', '--sk-red-bg'], ['--sk-teal', '--sk-teal-bg']]) {
  pair(`${h} on ${tint}`, h, tint, 4.5)
  pair(`${h} on surface`, h, '--sk-surface', 4.5)
}
/*
 * Stat values at 72px — large text, 3:1.
 *
 * Decision G de-boxed StatCard, so the surface behind the number moved from --sk-surface-2 to the
 * slide's own --sk-surface. Both are checked: `surface` is where it renders today, `surface-2` is
 * kept because it is still the fill of every other card the number could be dropped onto and a stat
 * value must not become illegible by being moved. The white row is the tighter of the two only for
 * light hues; the pair that mattered (decision E's amber) clears both by a wide margin.
 */
for (const v of ['--sk-indigo-2', '--sk-violet', '--sk-amber', '--sk-emerald', '--sk-red-2']) {
  pair(`stat value ${v} on surface (de-boxed, decision G)`, v, '--sk-surface', 3.0, 'large')
  pair(`stat value ${v} on surface-2 (if re-placed on a card)`, v, '--sk-surface-2', 3.0, 'large')
}
/* White on the gradient, sampled where text actually sits on the Company Brain block. */
const BRAIN = { w: 833, h: 62 }
const samples = [
  ['t=0 corner (no glyph reaches it)', 0],
  ['t at text left edge', gradT(68, BRAIN.h / 2, BRAIN.w, BRAIN.h)],
  ['t at mid', 0.5],
  ['t=1 far end', 1],
]
for (const [nm, t] of samples) {
  const bg = gradAt(gFrom, gTo, t)
  // t=0 is the card's top-left corner, behind the icon tile. No glyph is painted there, so it is
  // context, not a pair. The binding number is the text left edge.
  const as = t === 0 ? info : pair
  as(`--sk-on-brand on gradient, ${nm}`, { rgb: tok('--sk-on-brand') }, bg, 4.5)
}
/* The opacities decision B removed, kept in the table as the before-number they are measured against. */
for (const [nm, t] of samples) {
  const bg = gradAt(gFrom, gTo, t)
  info(`[before] white@0.80 on gradient, ${nm}`, { token: '--sk-on-brand', alpha: 0.8 }, bg, 4.5)
}
/* Dark text must never sit on the violet end — prove it, so nobody tries. */
for (const f of ['--sk-ink', '--sk-violet-ink', '--sk-indigo-ink'])
  guard(`${f} on gradient t=1 (must not be used)`, f, gradAt(gFrom, gTo, 1), 4.5)
/* Badges: white on a solid hue. */
for (const b of ['--sk-indigo-2', '--sk-violet', '--sk-indigo'])
  pair(`--sk-on-brand on ${b} (badge)`, { rgb: tok('--sk-on-brand') }, b, 4.5)

/*
 * Known failures, measured by this script and NOT fixed by the 2026-08-13 improvement pass.
 * Both are pre-existing and both are colour changes outside the approved set A-E, so they are
 * recorded here rather than silently fixed. See
 * docs/plans/2026-08-13-brand-kit-improvement-report.md, "Found but not fixed".
 */
const KNOWN = {
  '--sk-teal on --sk-teal-bg': 'pre-existing · .sk-eyebrow-badge, 7.5px teal on teal tint. Needs a darker teal token (#115e59 = 6.9:1); not in the approved set.',
  '--sk-teal on surface': 'pre-existing · .sk-ph-tag, 9px teal on white. Same fix.',
  '--sk-on-brand on --sk-indigo-2 (badge)': 'pre-existing · .sk-phase-badge default fill, short 0.03 of AA. Fix is --sk-indigo (7.9:1); a visible change, not in the approved set.',
}

const gates = rows.filter((r) => r.kind !== 'info')
const failing = gates.filter((r) => !r.pass)
const unexpected = failing.filter((r) => !KNOWN[r.label])
const onlyFail = process.argv.includes('--fail')
const w = Math.max(...rows.map((r) => r.label.length))
const tag = (r) => (r.kind === 'info' ? 'info' : r.pass ? (r.kind === 'guard' ? 'GUARD' : 'PASS') : KNOWN[r.label] ? 'KNOWN' : 'FAIL')
for (const r of onlyFail ? failing : rows) {
  console.log(`${tag(r).padEnd(5)} ${r.label.padEnd(w)}  ${String(r.cr).padStart(6)}:1  (${r.kind === 'guard' ? 'must be under' : 'needs'} ${r.need}${r.size ? ', ' + r.size : ''})`)
  if (KNOWN[r.label] && !r.pass) console.log(`      ${KNOWN[r.label]}`)
}
console.log(`\n${gates.length - failing.length}/${gates.length} gated rows pass · ${failing.length} known, ${unexpected.length} unexpected`)
if (unexpected.length) console.log('UNEXPECTED AA FAILURE — the pass introduced a regression.')
process.exit(unexpected.length ? 1 : 0)
