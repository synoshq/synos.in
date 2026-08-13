#!/usr/bin/env node
/**
 * Box-count and nesting probe — the proof for decision C's de-box half.
 *
 * deck-research §D.4 measured the shipped VC deck at a mean of 11.0 elements per slide carrying a
 * visible border or fill, a maximum of 46, and four levels of nesting. The target set for this pass
 * is **mean <= 6, max <= 15, nesting depth <= 2**.
 *
 * The kit has no decks built on it yet (nothing consumes it — see the state doc), so there are no
 * real slides to measure. Two corpora are counted instead, and only one of them is the gate:
 *
 * - **Composed slides** — five whole slides assembled here from kit components at the density the
 *   real deck actually runs: six walls, the six-pillar architecture slide, the three-horizon play,
 *   the demo storyboard, the moat split. These are the gate. §D.4's numbers are per *slide*, so a
 *   per-slide proxy is the only comparable measurement.
 * - **Fidelity specimens** — the 27 component groups the fidelity harness renders. Reported for
 *   completeness, but they are NOT a useful gate and should not be read as one: each is a small
 *   isolated group, and the corpus measured mean 4.2 / max 11 *before* this pass. It cannot show a
 *   de-box delta because it never had the density that made de-boxing necessary.
 *
 * An element is a "box" if it paints a visible border or a fill differing from what is behind it —
 * the same definition §D.4 used. That definition is coarse in one direction that matters here: it
 * scores a 3px accent rule on one edge exactly the same as a nested, filled, rounded rectangle,
 * and de-boxing deliberately converts the second into the first. So boxes are also split:
 *
 * - **panel** — a fill, or borders on 3+ edges. A rectangle. This is the thing §D.4 was actually
 *   complaining about when it called slide 9 a dashboard screenshot.
 * - **rule**  — borders on 1-2 edges only. A mark, not a container.
 *
 * The `boxes` total stays comparable to §D.4's numbers; `panels` is the number that shows what
 * de-boxing did.
 *
 *   node tools/boxes.mjs
 *   SK_CSS=/path/to/old/brand-kit.css node tools/boxes.mjs   # count an earlier build, for the delta
 */
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { createElement as h } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { SPECIMENS } from '../fidelity/scripts/specimens.mjs'
import * as K from '../dist/brand-kit.js'

const require = createRequire(import.meta.url)
const { chromium } = require(`${process.env.HOME}/ws/cursor_experiment/frontend/node_modules/playwright`)

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const CSS = readFileSync(process.env.SK_CSS || resolve(ROOT, 'dist/brand-kit.css'), 'utf8')

/** The slide the components are designed to sit in, so counts are per-slide comparable. */
const SLIDE_W = 1380

const body = 'One environment under the chaos, built once for every team that has to work with agents.'
const icon = h(
  'svg',
  { width: 16, height: 16, viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6 },
  h('rect', { x: 2.5, y: 2.5, width: 11, height: 11, rx: 3 }),
)

/**
 * Whole slides at the density the shipped deck actually runs, assembled from kit components.
 * These are the per-slide proxy §D.4's mean-11 / max-46 numbers are comparable against.
 */
const COMPOSED = [
  {
    id: 'slide/six-walls',
    node: h(
      K.SlideFrame, { stage: false },
      h(K.SlideHeader, { eyebrow: 'Where they are today', title: 'Six walls between a clever demo and real company value.' }),
      h(K.WallGrid, null, ...[
        ['“Nobody knows what anyone else automated.”', 'No shared context.'],
        ['“It works on my laptop and nowhere else.”', 'No way to deploy.'],
        ['“I am not letting an agent touch that system.”', 'No access control.'],
        ['“We rebuilt the same skill in three teams.”', 'Nothing is reusable.'],
        ['“We cannot tell if any of it worked.”', 'Nothing is measured.'],
        ['“Every vendor wants our data.”', 'Nothing stays ours.'],
      ].map(([quote, tag], i) => h(K.WallCard, { key: i, quote, tag }))),
      h(K.Callout, { tone: 'indigo', fill: 'neutral', accent: 'left', style: { marginTop: 18 } },
        'Six walls. ', h('strong', null, 'One layer that answers all six.')),
    ),
  },
  {
    id: 'slide/architecture',
    node: h(
      K.SlideFrame, { stage: false, variant: 'arch' },
      h(K.SlideHeader, { eyebrow: 'What we built · job one, today', title: 'One environment under the chaos.', subtitle: 'Installed once. Every team builds on it.' }),
      h(K.PillarGrid, null,
        h(K.PillarCard, { brain: true, icon, kicker: 'The anchor', name: 'Company Brain', desc: body }),
        h(K.PillarCard, { icon, name: 'Skills', tone: 'amber', desc: 'Reusable, versioned, measured.' }),
        h(K.PillarCard, { icon, name: 'Storage', tone: 'indigo', desc: 'Agent-native, governed, yours.' }),
        h(K.PillarCard, { icon, name: 'Deploy', tone: 'emerald', desc: 'From a laptop to production.' }),
        h(K.PillarCard, { icon, name: 'Access', tone: 'red', desc: 'Every action gated and audited.' }),
        h(K.PillarCard, { icon, name: 'Analytics', tone: 'violet', desc: 'Every run traced and scored.' }),
      ),
      h(K.ChipRow, { tight: true, style: { marginTop: 16 } },
        ...['Salesforce', 'NetSuite', 'Jira', 'Snowflake', 'Slack', 'GitHub'].map((n, i) => h(K.Chip, { key: i }, n))),
      h(K.Callout, { tone: 'violet', accent: 'left', style: { marginTop: 14 } }, 'The same environment, drawn as the training layer.'),
    ),
  },
  {
    id: 'slide/the-play',
    node: h(
      K.SlideFrame, { stage: false },
      h(K.SlideHeader, { layout: 'row', eyebrow: 'The play', title: 'Unblock now. Compound later. Own the loop.' }),
      h(K.PhaseRow, null,
        h(K.PhaseCard, { badge: 'S1', when: 'Today', title: 'Unblock', body, foot: 'LIVE · 3 engagements' }),
        h(K.PhaseCard, { badge: 'S2', when: 'Next', title: 'Compound', body, position: 'bridge', foot: 'BUILDING' }),
        h(K.PhaseCard, { badge: 'S3', when: 'Then', title: 'Own the loop', body, position: 'far', foot: 'THE MOAT' }),
      ),
      h(K.StatRow, { style: { marginTop: 18 } },
        h(K.StatCard, { value: '78%', label: 'of enterprise AI pilots never reach production', source: 'Industry survey, 2025' }),
        h(K.StatCard, { tone: 'violet', value: '3', label: 'engagements live', source: 'As of Aug 2026' }),
        h(K.StatCard, { tone: 'amber', value: '6', label: 'walls between a demo and company value', source: 'Field interviews' }),
      ),
      h(K.Caption, null, 'Both doors have converted. ', h('strong', null, 'The next quarter picks the wedge.')),
    ),
  },
  {
    id: 'slide/demo',
    node: h(
      K.SlideFrame, { stage: false },
      h(K.SlideHeader, { eyebrow: "The hard part we're taking on", title: 'Ask. Retrieve. Act — with the working shown.' }),
      h(K.StepGrid, null,
        h(K.StepCard, { num: '01', title: 'Ask', body: 'Someone asks the brain a question.', quote: '“Which stores missed target last quarter, and why?”' }),
        h(K.StepCard, { num: '02', title: 'Retrieve', body: 'The right slice of context, deterministically.', quote: '“Pull Q3 by store, joined to staffing.”' }),
        h(K.StepCard, { num: '03', title: 'Act', body: 'Every action gated. Every action audited.', quote: '“Draft the regional plan for review.”' }),
      ),
      h(K.Callout, { tone: 'emerald', accent: 'left', label: 'What it costs', style: { marginTop: 18 } }, 'Priced like infrastructure.'),
      h(K.ChipRow, { tight: true, style: { marginTop: 14 } },
        ...['RBAC', 'Audit', 'SSO', 'Self-hosted'].map((n, i) => h(K.Chip, { key: i, size: 'sm' }, n))),
    ),
  },
  {
    id: 'slide/moat',
    node: h(
      K.SlideFrame, { stage: false },
      h(K.SlideHeader, { eyebrow: 'The shift', title: 'Buy a vendor’s AI, or own your layer.' }),
      h(K.SplitColumns, null,
        h(K.SplitColumn, { eyebrow: 'Buy it', title: "A vendor's AI" },
          h(K.SplitItem, { marker: '✕' }, 'Locked to their platform.'),
          h(K.SplitItem, { marker: '✕' }, 'Their model, their roadmap.')),
        h(K.SplitColumn, { tone: 'violet', eyebrow: 'Own it', title: 'Your layer' },
          h(K.SplitItem, { marker: '✓' }, 'Everything it learns stays yours.'),
          h(K.SplitItem, { marker: '✓' }, 'Any model, any harness.')),
      ),
      h(K.UseCaseGrid, { style: { marginTop: 18 } },
        h(K.UseCaseCard, { flagship: true, kicker: 'Flagship', title: 'Company Brain', body }),
        h(K.UseCaseCard, { tone: 'emerald', kicker: 'Function', title: 'Sales Brain', body }),
        h(K.UseCaseCard, { tone: 'violet', kicker: 'Product', title: 'Custom agents', body }),
      ),
      h(K.QuoteBar, { style: { marginTop: 14 } }, h('strong', null, 'The edge moves. '), 'New value is created at the edge of what models cannot do for you.'),
    ),
  },
]

/**
 * Count boxes and nesting depth the way deck-research §D.4 did.
 *
 * A box is an element that paints a visible border (non-zero width, non-transparent, and not the
 * same colour as its own background) or a fill distinct from its parent's.
 *
 * Two depths are reported, because they answer different questions:
 *
 * - `depth` — the raw longest chain of boxes inside boxes, counting the slide card itself.
 * - `contentDepth` — the same chain with the outermost box on each path discounted. That outermost
 *   box is the `.sk-slide` card or the `.sk-page` sheet: the artifact's own edge, not a composition
 *   choice, and present on every slide in every deck ever made. Decision C's "cap nesting at 2" is
 *   about what is drawn *on* the slide, so `contentDepth` is the one it gates on. `depth` is kept
 *   in the output so the discount is visible rather than assumed.
 *
 * For scale: §D.4's slide 9 was card frame -> bordered band -> bordered inner panel -> cards ->
 * chips. That is contentDepth 4.
 */
const probe = () => {
  const vis = (el) => {
    const cs = getComputedStyle(el)
    const bg = cs.backgroundColor
    const img = cs.backgroundImage
    const filled = (bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') || img !== 'none'
    const bordered = ['Top', 'Right', 'Bottom', 'Left'].some((s) => {
      const w = parseFloat(cs[`border${s}Width`])
      const c = cs[`border${s}Color`]
      return w > 0 && cs[`border${s}Style`] !== 'none' && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent'
    })
    if (!filled && !bordered) return null
    const edges = ['Top', 'Right', 'Bottom', 'Left'].filter((side) => {
      const w = parseFloat(cs[`border${side}Width`])
      const c = cs[`border${side}Color`]
      return w > 0 && cs[`border${side}Style`] !== 'none' && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent'
    }).length
    return filled || edges >= 3 ? 'panel' : 'rule'
  }
  let boxes = 0
  let panels = 0
  const byClass = {}
  let maxDepth = 0
  let maxContent = 0
  const walk = (el, depth, sawFrame) => {
    const kind = vis(el)
    const isBox = kind !== null
    let d = depth
    let frame = sawFrame
    if (isBox) {
      boxes++
      if (kind === 'panel') {
        panels++
        // Attribute the panel to the kit class that drew it, so the residual budget is actionable.
        const own = [...el.classList].find((c) => c.startsWith('sk-')) || el.tagName.toLowerCase()
        byClass[own] = (byClass[own] ?? 0) + 1
      }
      d = depth + 1
      if (d > maxDepth) maxDepth = d
      // The first box on a path is the slide card / page sheet. Discount it once, then count.
      if (!frame) frame = true
      else if (d - 1 > maxContent) maxContent = d - 1
    }
    for (const c of el.children) walk(c, d, frame)
  }
  for (const c of document.body.children) walk(c, 0, false)
  return { boxes, panels, maxDepth, maxContent, byClass }
}

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: SLIDE_W, height: 720 } })
const count = async (node) => {
  await page.setContent(
    `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style>
<style>html,body{margin:0;padding:0;background:#f1f5f9;width:${SLIDE_W}px}</style></head>
<body>${renderToStaticMarkup(node)}</body></html>`,
    { waitUntil: 'load' },
  )
  await page.evaluate(() => document.fonts.ready)
  return page.evaluate(`(${probe.toString()})()`)
}

const rows = []
const specRows = []
for (const s of COMPOSED) rows.push({ id: s.id, ...(await count(s.node)) })
for (const s of SPECIMENS) specRows.push({ id: s.id, ...(await count(s.node)) })
await browser.close()

const mean = rows.reduce((n, r) => n + r.boxes, 0) / rows.length
const meanPanels = rows.reduce((n, r) => n + r.panels, 0) / rows.length
const max = Math.max(...rows.map((r) => r.boxes))
const depth = Math.max(...rows.map((r) => r.maxContent))
const rawDepth = Math.max(...rows.map((r) => r.maxDepth))
const w = Math.max(...[...rows, ...specRows].map((r) => r.id.length))
const line = (r) =>
  console.log(`${r.id.padEnd(w)}  ${String(r.boxes).padStart(3)} boxes  ${String(r.panels).padStart(3)} panels  ${String(r.boxes - r.panels).padStart(3)} rules   content depth ${r.maxContent}  (raw ${r.maxDepth})`)
console.log('── composed whole slides — THE GATE ──')
for (const r of [...rows].sort((a, b) => b.boxes - a.boxes)) line(r)
console.log('\n── fidelity specimens — context only, not a gate ──')
for (const r of [...specRows].sort((a, b) => b.boxes - a.boxes)) line(r)
console.log()

const T = { mean: 6, max: 15, depth: 2 }
console.log(`\nmean ${mean.toFixed(1)} boxes (target <= ${T.mean})   max ${max} (target <= ${T.max})   content nesting depth ${depth} (target <= ${T.depth}, raw ${rawDepth} incl. the slide card)`)
console.log(`mean ${meanPanels.toFixed(1)} PANELS per slide — the rectangles, which is what de-boxing removes`)

/* Where the remaining panel budget sits, so what is left to cut is a decision and not a mystery. */
const tally = {}
for (const r of rows) for (const [k, n] of Object.entries(r.byClass)) tally[k] = (tally[k] ?? 0) + n
console.log('\nresidual panels by component, across the five composed slides:')
for (const [k, n] of Object.entries(tally).sort((a, b) => b[1] - a[1]))
  console.log(`  ${String(n).padStart(3)}  .${k}`)
console.log('baseline, shipped VC deck (deck-research §D.4): mean 11.0, max 46, content depth 4')
const bad = [mean > T.mean && 'mean', max > T.max && 'max', depth > T.depth && 'depth'].filter(Boolean)
if (bad.length) console.log(`OVER TARGET: ${bad.join(', ')}`)
process.exit(bad.length ? 1 : 0)
