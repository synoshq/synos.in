#!/usr/bin/env node
/**
 * Fidelity gate.
 *
 * For every specimen: render the built component, open the real slide it was extracted from, take
 * both screenshots, put them side by side, and diff the computed styles of the properties that
 * carry the brand.
 *
 * A component that does not match its source is not done.
 *
 *   node fidelity/scripts/run-fidelity.mjs
 *   node fidelity/scripts/run-fidelity.mjs --only=phase,wall
 *
 * ~/ws/synos-gtm is opened read-only. Nothing is written outside packages/brand-kit/fidelity/.
 */
import { mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'
import { renderToStaticMarkup } from 'react-dom/server'
import { SPECIMENS, REASONS } from './specimens.mjs'
import { byKey, SOURCE_ROOT, STAGE } from './sources.mjs'

const require = createRequire(import.meta.url)
const { chromium } = require(`${process.env.HOME}/ws/cursor_experiment/frontend/node_modules/playwright`)

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HERE, '../..')
const SHOTS = resolve(ROOT, 'fidelity/shots')
const SIDE = resolve(ROOT, 'fidelity/side-by-side')
const REPORT = resolve(ROOT, 'fidelity/report')

const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7)?.split(',')
const specimens = only ? SPECIMENS.filter((s) => only.includes(s.id)) : SPECIMENS

for (const d of [SHOTS, SIDE, REPORT]) {
  rmSync(d, { recursive: true, force: true })
  mkdirSync(d, { recursive: true })
}

const CSS = readFileSync(resolve(ROOT, 'dist/brand-kit.css'), 'utf8')

/** Wrap SSR'd component markup in a page carrying the built stylesheet. */
const builtPage = (markup) => `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<style>${CSS}</style>
<style>html,body{margin:0;padding:0;background:#f1f5f9;}</style>
</head><body>${markup}</body></html>`

/**
 * Read computed styles for a selector. Returns null if the selector does not resolve, so a missing
 * source element is reported as a failure rather than silently passing.
 */
const readStyles = (sel, props, scope) => {
  const root = scope ? document.querySelector(scope) : document
  const el = root && root.querySelector(sel)
  if (!el) return null
  const cs = getComputedStyle(el)
  const out = {}
  for (const p of props) out[p] = cs.getPropertyValue(p).trim()
  return out
}

/** Font stacks are written differently in the sources; compare the first family only. */
const normalise = (prop, v) => {
  if (!v) return v
  if (prop === 'font-family') return v.split(',')[0].replace(/["']/g, '').trim().toLowerCase()
  /*
   * getComputedStyle resolves grid tracks to used pixel widths, which depend on the container. A
   * specimen is not the width of a slide, so compare the track *count* — that is the structural
   * claim ("three equal columns"), and the equality of the tracks is asserted alongside it.
   */
  if (prop === 'grid-template-columns') {
    const tracks = v.split(/\s+/).filter(Boolean)
    const widths = tracks.map((t) => parseFloat(t))
    const even = widths.every((w) => Math.abs(w - widths[0]) < 1)
    return `${tracks.length} tracks${even ? ', equal' : ', uneven'}`
  }
  if (prop === 'background-image' || prop === 'box-shadow') return v.replace(/\s+/g, ' ')
  // 15.008px vs 15px — the sources and the kit both round to 0.1px in practice.
  if (/^-?\d+(\.\d+)?px$/.test(v)) return `${Math.round(parseFloat(v) * 10) / 10}px`
  return v.replace(/\s+/g, ' ')
}

const browser = await chromium.launch()
const results = []

for (const spec of specimens) {
  const src = byKey(spec.file)
  const stage = STAGE[spec.file] ?? { width: 1280, height: 900 }
  const isDeck = src.kind === 'deck'

  /* ── Source side ────────────────────────────────────────────────────────── */
  const sPage = await browser.newPage({
    viewport: { width: stage.width, height: isDeck ? stage.height : 1200 },
    deviceScaleFactor: 2,
  })
  await sPage.goto(pathToFileURL(`${SOURCE_ROOT}/${src.path}`).href, { waitUntil: 'load' })
  await sPage.evaluate(() => document.fonts.ready)

  let sourceScope = null
  if (isDeck) {
    // Pin reveal's scale to 1 so the capture is 1:1, then navigate to the slide.
    await sPage.evaluate((i) => {
      // eslint-disable-next-line no-undef
      Reveal.configure({ minScale: 1, maxScale: 1, transition: 'none' })
      // eslint-disable-next-line no-undef
      Reveal.slide(i, 0)
    }, spec.slide ?? 0)
    await sPage.waitForTimeout(350)
    sourceScope = '.reveal .slides section.present'
  }

  const sourceStyles = await sPage.evaluate(
    ({ checks, scope, fn }) => {
      // eslint-disable-next-line no-new-func
      const read = new Function(`return ${fn}`)()
      return checks.map((c) => read(c.source, c.props, scope))
    },
    { checks: spec.checks, scope: sourceScope, fn: readStyles.toString() },
  )

  const sourceTarget = isDeck ? `${sourceScope} .card-frame` : '.page'
  const sourceEl = await sPage.$(sourceTarget)
  const sourceShot = `${SHOTS}/${spec.id}.source.png`
  if (sourceEl) await sourceEl.screenshot({ path: sourceShot })
  else await sPage.screenshot({ path: sourceShot })
  await sPage.close()

  /* ── Built side ─────────────────────────────────────────────────────────── */
  const bPage = await browser.newPage({
    viewport: { width: stage.width, height: isDeck ? stage.height : 1200 },
    deviceScaleFactor: 2,
  })
  await bPage.setContent(builtPage(renderToStaticMarkup(spec.node)), { waitUntil: 'load' })
  await bPage.evaluate(() => document.fonts.ready)
  await bPage.waitForTimeout(150)

  const builtStyles = await bPage.evaluate(
    ({ checks, fn }) => {
      // eslint-disable-next-line no-new-func
      const read = new Function(`return ${fn}`)()
      return checks.map((c) => read(c.built, c.props, null))
    },
    { checks: spec.checks, fn: readStyles.toString() },
  )

  const builtShot = `${SHOTS}/${spec.id}.built.png`
  const builtEl = await bPage.$('body > *')
  if (builtEl) await builtEl.screenshot({ path: builtShot })
  else await bPage.screenshot({ path: builtShot })
  await bPage.close()

  /* ── Diff ───────────────────────────────────────────────────────────────── */
  const checks = spec.checks.map((c, i) => {
    const s = sourceStyles[i]
    const b = builtStyles[i]
    if (!s || !b) {
      return {
        ...c,
        status: 'MISSING',
        detail: !s ? `source selector "${c.source}" not found in ${spec.file} slide ${spec.slide ?? '-'}` : `built selector "${c.built}" not found`,
        diffs: [],
      }
    }
    /*
     * A property listed in `intentional` is one the kit deliberately no longer takes from the
     * source. The assertion is not deleted and it is not weakened to "anything goes" — it is
     * REPLACED by a stronger one that pins BOTH sides:
     *
     *   the source must still read `was`, and the built component must read `now`.
     *
     * So the check still fails if the kit drifts off its new value, AND it now also fails if the
     * source artifact changes underneath us — which the plain equality check could never catch.
     * Every entry names the decision that moved it; `REASONS` holds the text.
     */
    const diffs = []
    const intentional = []
    for (const p of c.props) {
      const sv = normalise(p, s[p])
      const bv = normalise(p, b[p])
      if (sv === bv) continue
      const decl = c.intentional?.[p]
      if (!decl) {
        diffs.push({ prop: p, source: s[p], built: b[p] })
        continue
      }
      const [was, now, key] = decl
      const sOk = sv === normalise(p, was)
      const bOk = bv === normalise(p, now)
      if (sOk && bOk) {
        intentional.push({ prop: p, was: s[p], now: b[p], key, reason: REASONS[key] })
      } else {
        diffs.push({
          prop: p,
          source: s[p],
          built: b[p],
          detail: !sOk
            ? `source moved: the recorded source value was "${was}", it now reads "${s[p]}"`
            : `built drifted off its recorded value "${now}"`,
        })
      }
    }
    const status = diffs.length ? 'DIFF' : intentional.length ? 'INTENTIONAL' : 'MATCH'
    return { ...c, status, diffs, intentional, source_values: s, built_values: b }
  })

  // A specimen carrying `expectFail` documents a recorded conflict: the built component follows
  // the newest artifact, so it must NOT match this older one. It fails the gate only if it matches.
  /*
   * `expectFail` documents a recorded CONFLICT between two source artifacts — the kit follows the
   * newer one, so it must not match this older one. Such a specimen is meant to carry a real DIFF,
   * so it is graded only on "something differs", exactly as before. A specimen without
   * `expectFail` passes when every check is either MATCH or a recorded INTENTIONAL divergence.
   */
  const identical = checks.every((c) => c.status === 'MATCH')
  const pass = spec.expectFail ? !identical : checks.every((c) => c.status === 'MATCH' || c.status === 'INTENTIONAL')
  results.push({ ...spec, node: undefined, checks, pass, sourceShot, builtShot })
  const nInt = checks.reduce((n, c) => n + c.intentional.length, 0)
  const verdict = spec.expectFail ? (pass ? 'CONFLICT' : 'FAIL') : pass ? (nInt ? 'MOVED' : 'PASS') : 'FAIL'
  console.log(`${verdict.padEnd(5)} ${spec.id.padEnd(26)} ${spec.component}${nInt ? `  (${nInt} recorded)` : ''}`)
  if (spec.expectFail) console.log(`      expected: ${spec.expectFail}`)
  for (const c of checks.filter((c) => c.status === 'DIFF' || c.status === 'MISSING')) {
    console.log(`      ${c.status} ${c.source} -> ${c.built}`)
    if (c.detail) console.log(`        ${c.detail}`)
    for (const d of c.diffs) {
      console.log(`        ${d.prop}: source=${d.source}  built=${d.built}`)
      if (d.detail) console.log(`          ${d.detail}`)
    }
  }
}

/* ── Side-by-side composites ──────────────────────────────────────────────── */
const compose = await browser.newPage({ viewport: { width: 2000, height: 240 }, deviceScaleFactor: 1 })
// A page loaded via setContent has an opaque origin and cannot load file:// images, so the two
// screenshots are inlined as data URLs.
const dataUrl = (p) => `data:image/png;base64,${readFileSync(p).toString('base64')}`
for (const r of results) {
  await compose.setContent(
    `<!doctype html><meta charset="utf-8">
<style>
  body{margin:0;font:13px/1.4 -apple-system,system-ui,sans-serif;background:#0f172a;color:#e2e8f0;padding:16px}
  h1{font-size:15px;margin:0 0 4px} .meta{font-size:11px;color:#94a3b8;margin-bottom:12px}
  .pair{display:grid;grid-template-columns:1fr 1fr;gap:14px;align-items:start}
  .col h2{font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:#94a3b8;margin:0 0 6px}
  img{width:100%;display:block;border:1px solid #334155;border-radius:6px;background:#f1f5f9}
  .verdict{margin-top:12px;font-size:12px;padding:6px 10px;border-radius:6px;display:inline-block}
  .ok{background:#052e16;color:#6ee7b7} .bad{background:#450a0a;color:#fecaca}
</style>
<h1>${r.id} — ${r.component}</h1>
<div class="meta">source: ${byKey(r.file).path}${r.slide != null ? ` · slide ${r.slide + 1}` : ''} (${byKey(r.file).date})</div>
<div class="pair">
  <div class="col"><h2>Source — the shipped artifact</h2><img src="${dataUrl(r.sourceShot)}"></div>
  <div class="col"><h2>Built — @synos/brand-kit</h2><img src="${dataUrl(r.builtShot)}"></div>
</div>
<div class="verdict ${r.pass ? 'ok' : 'bad'}">${r.pass ? 'computed styles match' : `${r.checks.filter((c) => c.status !== 'MATCH').length} check(s) differ`}</div>`,
    { waitUntil: 'load' },
  )
  await compose.evaluate(() => Promise.all([...document.images].map((i) => (i.complete ? null : i.decode()))))
  await compose.waitForTimeout(120)
  await compose.screenshot({ path: `${SIDE}/${r.id}.png`, fullPage: true })
}
await compose.close()
await browser.close()

/* ── Report ───────────────────────────────────────────────────────────────── */
const totalChecks = results.reduce((n, r) => n + r.checks.length, 0)
const failed = results.filter((r) => !r.pass)
writeFileSync(`${REPORT}/fidelity.json`, JSON.stringify({ generated: 'see git commit date', results }, null, 2))

const moved = results.flatMap((r) =>
  r.checks.flatMap((c) => c.intentional.map((i) => ({ ...i, id: r.id, source: c.source, built: c.built }))),
)
const byDecision = {}
for (const m of moved) (byDecision[m.key] ??= []).push(m)

const md = [
  '# Fidelity report',
  '',
  `${results.length} specimens · ${totalChecks} computed-style checks · ${results.length - failed.length} passing, ${failed.length} failing.`,
  `${moved.length} of those checks record a **deliberate** divergence from the source artifact.`,
  '',
  'Each specimen renders a built component and the real slide it was extracted from at the same',
  "viewport, screenshots both, and compares the computed values of the properties that carry the",
  'brand. Side-by-side images are in `fidelity/side-by-side/`.',
  '',
  'The harness was a *spec* while the kit was being extracted. Since the 2026-08-13 improvement',
  'pass it is a **regression net**: the kit is deliberately no longer byte-faithful to the decks it',
  'came from. A property the kit has moved off is not deleted from the harness and not loosened —',
  'it is pinned on both sides, so the check still fails if the kit drifts off its new value *and*',
  'now also fails if the source artifact moves underneath it. Every one is listed below with the',
  'decision that moved it.',
  '',
  '| Specimen | Component | Source | Checks | Recorded moves | Result |',
  '|---|---|---|---:|---:|---|',
  ...results.map(
    (r) =>
      `| \`${r.id}\` | ${r.component} | ${byKey(r.file).key}${r.slide != null ? ` s${r.slide + 1}` : ''} | ${r.checks.length} | ${r.checks.reduce((n, c) => n + c.intentional.length, 0)} | ${
        r.expectFail
          ? r.pass
            ? 'CONFLICT (expected difference)'
            : '**FAIL** — matched an artifact it should not'
          : r.pass
            ? 'PASS'
            : `**FAIL** (${r.checks.filter((c) => c.status === 'DIFF' || c.status === 'MISSING').length})`
      } |`,
  ),
  '',
]
if (moved.length) {
  md.push('## Deliberate divergences, by decision', '')
  for (const key of Object.keys(byDecision).sort()) {
    md.push(`### ${key}`, '', REASONS[key] ?? '**No reason recorded — this is a bug.**', '')
    md.push('| Specimen | Selector | Property | Source | Built |', '|---|---|---|---|---|')
    for (const m of byDecision[key])
      md.push(`| \`${m.id}\` | \`${m.built}\` | \`${m.prop}\` | \`${m.was}\` | \`${m.now}\` |`)
    md.push('')
  }
}
const conflicts = results.filter((r) => r.expectFail && r.pass)
if (conflicts.length) {
  md.push('## Recorded conflicts — differences that are correct', '')
  for (const r of conflicts) {
    md.push(`### \`${r.id}\``, '', r.expectFail, '')
    for (const c of r.checks.flatMap((c) => c.diffs)) {
      md.push(`- \`${c.prop}\`: source \`${c.source}\` · built \`${c.built}\``)
    }
    for (const c of r.checks.flatMap((c) => c.intentional)) {
      md.push(`- \`${c.prop}\`: source \`${c.was}\` · built \`${c.now}\` — also moved by ${c.key}`)
    }
    md.push('')
  }
}
if (failed.length) {
  md.push('## Failures', '')
  for (const r of failed) {
    md.push(`### \`${r.id}\``, '')
    if (r.expectFail) md.push(`Expected difference: ${r.expectFail}`, '')
    for (const c of r.checks.filter((c) => c.status === 'DIFF' || c.status === 'MISSING')) {
      md.push(`- \`${c.source}\` → \`${c.built}\` — ${c.status}`)
      if (c.detail) md.push(`  - ${c.detail}`)
      for (const d of c.diffs) {
        md.push(`  - \`${d.prop}\`: source \`${d.source}\` · built \`${d.built}\``)
        if (d.detail) md.push(`    - ${d.detail}`)
      }
    }
    md.push('')
  }
}
writeFileSync(`${REPORT}/fidelity.md`, md.join('\n'))

console.log(
  `\n${results.length - failed.length}/${results.length} specimens pass · ${totalChecks} checks · ${moved.length} deliberate divergences recorded`,
)
console.log(`report: fidelity/report/fidelity.md · images: fidelity/side-by-side/`)
process.exit(failed.length ? 1 : 0)
