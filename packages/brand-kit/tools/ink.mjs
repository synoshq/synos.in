#!/usr/bin/env node
/**
 * Headline ink probe — the measurement behind the serif re-solve.
 *
 * deck-research's line, quoted in the improvement report, is that "every 700/800 display weight has
 * to be re-solved with size and colour" once the display face has a single 400 weight. Phase 3
 * applied the face and moved `h1` 34px → 40px, which is *not* a re-solve: presence on a projector is
 * ink on the wall, not nominal point size, and Instrument Serif is both lighter-stemmed and
 * narrower-set than Plus Jakarta Sans. This probe measures both terms.
 *
 * The headline is drawn to a canvas at each candidate spec and the glyph pixels are counted — a
 * pixel counts as ink if its luminance is under half the background's. Two numbers come out:
 *
 * - **set width** — how much of the slide the line occupies. A narrower line is a smaller object
 *   however large its type is.
 * - **ink mass** — the painted area of the strokes. This is the quantity a bold weight buys and a
 *   400-weight serif has to buy back some other way.
 *
 * Not a gate and not wired into `npm run build`; it is the calibration that picked the size, kept so
 * the number can be re-derived rather than taken on trust.
 *
 *   node tools/ink.mjs
 */
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { chromium } = require(`${process.env.HOME}/ws/cursor_experiment/frontend/node_modules/playwright`)

const TEXT ='Six walls between a clever demo and real company value.'

/** (family, size, weight, tracking) — the shipped before, the Phase 3 after, and the candidates. */
const CANDIDATES = [
  { label: 'before   PJS 34/700', family: `'Plus Jakarta Sans'`, size: 34, weight: 700, ls: '-0.01em' },
  { label: 'phase 3  IS  40/400', family: `'Instrument Serif'`, size: 40, weight: 400, ls: '-0.015em' },
  { label: 'cand     IS  46/400', family: `'Instrument Serif'`, size: 46, weight: 400, ls: '-0.02em' },
  { label: 'cand     IS  50/400', family: `'Instrument Serif'`, size: 50, weight: 400, ls: '-0.022em' },
  { label: 'cand     IS  54/400', family: `'Instrument Serif'`, size: 54, weight: 400, ls: '-0.024em' },
  { label: 'cand     IS  58/400', family: `'Instrument Serif'`, size: 58, weight: 400, ls: '-0.024em' },
]

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1400, height: 200 } })
await page.setContent(
  `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Plus+Jakarta+Sans:wght@700&display=swap">
</head><body><canvas id="c" width="1400" height="200"></canvas></body></html>`,
  { waitUntil: 'load' },
)
await page.evaluate(() => document.fonts.load('700 34px "Plus Jakarta Sans"'))
await page.evaluate(() => document.fonts.load('400 54px "Instrument Serif"'))
await page.evaluate(() => document.fonts.ready)

const rows = await page.evaluate(({ cands, text }) => {
  const cv = document.getElementById('c')
  const ctx = cv.getContext('2d', { willReadFrequently: true })
  return cands.map((c) => {
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, cv.width, cv.height)
    ctx.font = `${c.weight} ${c.size}px ${c.family}`
    ctx.letterSpacing = `${(parseFloat(c.ls) * c.size).toFixed(2)}px`
    ctx.fillStyle = '#0f172a'
    ctx.textBaseline = 'alphabetic'
    ctx.fillText(text, 10, 140)
    const w = Math.round(ctx.measureText(text).width)
    const px = ctx.getImageData(0, 0, cv.width, cv.height).data
    let ink = 0
    for (let i = 0; i < px.length; i += 4) {
      const l = 0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]
      if (l < 128) ink++
    }
    return { ...c, w, ink }
  })
}, { cands: CANDIDATES.map((c) => ({ ...c })), text: TEXT })
await browser.close()

const base = rows[0]
console.log(`headline: "${TEXT}"\nslide content width at 1380px slide, 56px pads: 1268px\n`)
for (const r of rows)
  console.log(
    `${r.label}   set width ${String(r.w).padStart(4)}px (${(r.w / base.w).toFixed(2)}× before)   ` +
      `ink ${String(r.ink).padStart(6)}px² (${(r.ink / base.ink).toFixed(2)}× before)`,
  )
