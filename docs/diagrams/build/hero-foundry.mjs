// Candidate A · "the foundry"
//
// The message this has to carry, which the first attempt did not: this is the layer where a company
// BUILDS ITS OWN AI. A plane with nothing on it says "middleware". A plane with the company's own
// work standing on it, thickening left to right, and a model taking shape out of that work, says
// what the product is for.
//
// Left to right across the surface is time. Nothing on the far left, the company's own artefacts
// accumulating toward the right, and the model they train rising from the far corner.
//
// node docs/diagrams/build/hero-foundry.mjs   ->  docs/diagrams/hero-foundry.html
import { writeFile } from 'node:fs/promises'
import { plane, block, surfaceGrid, P, round } from './iso.mjs'

const W = 300, H = 150
const O = { W, H }
const CX = 520

const LAYER_Y = 430           // the layer's surface
const SYS_Y = 610             // systems of record, below and untouched
const LAYER_T = 40            // the layer is thick: it is the substrate, not a membrane
const SYS_T = 16

// What the company builds, in the order it accumulates. (a, b) is the near-left corner on the
// surface, s the footprint, h the height. Heights grow toward the right: the same layer, later.
const BUILT = [
  { a: 0.10, b: 0.62, s: 0.13, h: 20, cls: 'bk',  label: 'skills' },
  { a: 0.26, b: 0.74, s: 0.13, h: 28, cls: 'bk',  label: 'agents' },
  { a: 0.30, b: 0.46, s: 0.13, h: 24, cls: 'bk',  label: 'apps' },
  { a: 0.48, b: 0.62, s: 0.13, h: 38, cls: 'bk',  label: 'traces' },
  { a: 0.52, b: 0.30, s: 0.13, h: 30, cls: 'bk',  label: 'corrections' },
  { a: 0.70, b: 0.46, s: 0.13, h: 46, cls: 'bk',  label: 'evals' },
]

// The thing all of it is for. Taller, gradient, set apart at the far corner.
const MODEL = { a: 0.72, b: 0.14, s: 0.17, h: 96, cls: 'md' }

const depth = o => o.a + o.b
const painted = [...BUILT, MODEL].sort((p, q) => depth(p) - depth(q))

// Leader from a point on the surface out to the right rail.
function leader(a, b, ry, label, sub, brand = false) {
  const [x, y] = P(CX, LAYER_Y, a, b, O)
  const rx = CX + W + 74
  return `
    <polyline class="ld${brand ? ' ld-brand' : ''}" points="${round(x)},${round(y)} ${round(x + 26)},${round(y - 18)} ${rx - 12},${ry}"/>
    <circle class="ld-dot${brand ? ' ld-dot-brand' : ''}" cx="${round(x)}" cy="${round(y)}" r="3"/>
    <text class="rail-t" x="${rx}" y="${ry - 4}">${label}</text>
    <text class="rail-s" x="${rx}" y="${ry + 15}">${sub}</text>`
}

const svg = `<svg viewBox="120 90 1120 720" role="img"
     aria-label="An isometric view of the SynOS layer as a surface the company builds on. Its own systems of record sit below it, untouched. On the surface, the skills, agents, apps, traces, corrections and evals its people produce accumulate from left to right, and out of them a model of the company's own rises at the far corner.">
  <defs>
    <linearGradient id="layerTop" x1="0.1" y1="0" x2="0.9" y2="1">
      <stop offset="0" stop-color="var(--sk-indigo-2)"/>
      <stop offset="1" stop-color="var(--sk-violet-ink)"/>
    </linearGradient>
    <linearGradient id="modelTop" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0" stop-color="var(--sk-indigo-3)"/>
      <stop offset="1" stop-color="var(--sk-indigo-2)"/>
    </linearGradient>
    <filter id="lift" x="-30%" y="-40%" width="160%" height="200%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="var(--sk-ink)" flood-opacity="0.13"/>
    </filter>
  </defs>

  <!-- systems of record: below the layer, connected, never moved -->
  <g filter="url(#lift)">
    ${plane(CX, SYS_Y, SYS_T, 'sys', O)}
  </g>
  <text class="sys-t" x="${CX}" y="${SYS_Y + 10}" text-anchor="middle">your systems of record</text>
  <text class="sys-s" x="${CX}" y="${SYS_Y + 30}" text-anchor="middle">profiled where they sit · queried live · nothing migrated</text>

  <!-- the layer -->
  <g filter="url(#lift)">
    ${plane(CX, LAYER_Y, LAYER_T, 'lay', O)}
    <g class="grid">${surfaceGrid(CX, LAYER_Y, 8, 'gl', O)}</g>
  </g>

  <!-- what the company builds on it -->
  ${painted.map(o => block(CX, LAYER_Y, o.a, o.b, o.s, o.h, o.cls, O)).join('\n  ')}

  <!-- context rises out of the systems into the layer -->
  <g class="fil">
    ${[0.30, 0.5, 0.70].map(t => {
      const [x1, y1] = P(CX, SYS_Y, t, t, O)
      const [x2, y2] = P(CX, LAYER_Y, t, t, O)
      return `<line x1="${round(x1)}" y1="${round(y1)}" x2="${round(x2)}" y2="${round(y2 + LAYER_T)}"/>`
    }).join('\n    ')}
  </g>

  <!-- the right rail -->
  ${leader(MODEL.a + MODEL.s / 2, MODEL.b, 208, 'AI of your own', 'trained on how you actually operate', true)}
  ${leader(0.70, 0.46, 330, 'What your people build', 'skills · agents · apps, in plain English')}
  ${leader(0.48, 0.62, 452, 'What running it produces', 'traces · corrections · private evals')}
  ${leader(0.12, 0.98, 566, 'The layer itself', 'self-hosted · governed · model-agnostic')}

  <!-- time -->
  <g class="axis">
    <line x1="${round(P(CX, LAYER_Y, 0, 1, O)[0] - 6)}" y1="738" x2="${round(P(CX, LAYER_Y, 1, 0, O)[0] + 6)}" y2="738"/>
    <text class="axis-t" x="${round(P(CX, LAYER_Y, 0, 1, O)[0] - 6)}" y="760">week one</text>
    <text class="axis-t" x="${round(P(CX, LAYER_Y, 1, 0, O)[0] + 6)}" y="760" text-anchor="end">and every week after</text>
  </g>
</svg>`

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Candidate A · the foundry</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/synos.css">
<style>
  body { display: grid; place-items: center; min-height: 100vh; padding: 48px 24px; }
  .stage { width: 100%; max-width: 1120px; }
  svg { width: 100%; height: auto; display: block; overflow: visible; }

  /* systems: present, connected, deliberately quiet */
  .sys-t   { fill: var(--sk-surface-2); stroke: var(--sk-border-2); stroke-width: 1.25; }
  .sys-l   { fill: var(--sk-border); stroke: var(--sk-border-2); stroke-width: 1.25; }
  .sys-r   { fill: var(--sk-border-2); stroke: var(--sk-border-2); stroke-width: 1.25; }

  /* the layer */
  .lay-t   { fill: url(#layerTop); }
  .lay-l   { fill: var(--sk-indigo-ink); }
  .lay-r   { fill: var(--sk-violet-ink); }
  .gl      { stroke: var(--sk-on-brand); stroke-opacity: 0.13; stroke-width: 1; }

  /* what you build: pale solids, so they read as objects standing on the layer */
  .bk-t    { fill: var(--sk-surface); stroke: var(--sk-indigo-br); stroke-width: 1; }
  .bk-l    { fill: var(--sk-indigo-bg); stroke: var(--sk-indigo-br); stroke-width: 1; }
  .bk-r    { fill: var(--sk-indigo-br); stroke: var(--sk-indigo-br); stroke-width: 1; }

  /* the model: the one object that is not pale */
  .md-t    { fill: url(#modelTop); }
  .md-l    { fill: var(--sk-indigo); }
  .md-r    { fill: var(--sk-indigo-ink); }

  .fil     { stroke: var(--sk-indigo-3); stroke-width: 1.75; stroke-linecap: round;
             stroke-dasharray: 5 9; animation: flow 2.4s linear infinite; }
  @keyframes flow { to { stroke-dashoffset: -14; } }
  @media (prefers-reduced-motion: reduce) { .fil { animation: none; stroke-dasharray: none; stroke-opacity: 0.5; } }

  .ld          { fill: none; stroke: var(--sk-border-2); stroke-width: 1.25; }
  .ld-brand    { stroke: var(--sk-indigo-2); }
  .ld-dot      { fill: var(--sk-border-2); }
  .ld-dot-brand{ fill: var(--sk-indigo-2); }

  .rail-t  { font-family: var(--sk-font-body); font-size: 15px; font-weight: 600; fill: var(--sk-ink); }
  .rail-s  { font-family: var(--sk-font-mono); font-size: 11px; letter-spacing: 0.03em; fill: var(--sk-ink-3); }
  .sys-t, .sys-s { font-family: var(--sk-font-mono); }
  text.sys-t { font-size: 12.5px; letter-spacing: 0.06em; fill: var(--sk-ink-3); stroke: none; }
  .sys-s   { font-size: 11px; letter-spacing: 0.03em; fill: var(--sk-dim); }

  .axis    { stroke: var(--sk-border-2); stroke-width: 1; }
  .axis-t  { font-family: var(--sk-font-mono); font-size: 10.5px; letter-spacing: 0.1em;
             text-transform: uppercase; fill: var(--sk-dim); stroke: none; }
</style>
</head>
<body>
<div class="stage">
${svg}
</div>
</body>
</html>
`

await writeFile(new URL('../hero-foundry.html', import.meta.url), html)
console.log('wrote docs/diagrams/hero-foundry.html')
