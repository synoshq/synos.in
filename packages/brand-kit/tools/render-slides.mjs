#!/usr/bin/env node
/**
 * Photograph the five composed slides.
 *
 * The 2026-08-13 pass produced its before/after renders by hand and left no script, so the evidence
 * could not be regenerated when the design changed under it — which is how a headline that reads
 * quieter than the one it replaced survived a report claiming it read more confidently. This is that
 * script. Same five slides `tools/boxes.mjs` counts, from `tools/composed.mjs`, so the number and
 * the picture are always of the same build.
 *
 *   node tools/render-slides.mjs fidelity/composed/after
 *   SK_DIST=/tmp/old/dist node tools/render-slides.mjs fidelity/composed/before
 *
 * `SK_DIST` points at another build's `dist/` — that is how the "before" half is produced, by
 * checking an older commit out into a worktree, building it, and composing the *same* slides from
 * it. The CSS is read from `<SK_DIST>/brand-kit.css` and the components from
 * `<SK_DIST>/brand-kit.js`.
 *
 * Each slide is also measured for headline ink: the h1's set width, and the count of glyph pixels
 * inside its box. That is the quantity `tools/ink.mjs` calibrated decision F against, reported here
 * per slide so "the serif now reads with more authority" is checkable against a number as well as
 * against the picture.
 */
import { mkdirSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'
import { renderToStaticMarkup } from 'react-dom/server'
import { composed } from './composed.mjs'

const require = createRequire(import.meta.url)
const { chromium } = require(`${process.env.HOME}/ws/cursor_experiment/frontend/node_modules/playwright`)

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = resolve(process.env.SK_DIST || resolve(ROOT, 'dist'))
const OUT = resolve(process.cwd(), process.argv[2] || 'fidelity/composed/after')
mkdirSync(OUT, { recursive: true })

const CSS = readFileSync(resolve(DIST, 'brand-kit.css'), 'utf8')
const K = await import(pathToFileURL(resolve(DIST, 'brand-kit.js')).href)
const SLIDES = composed(K)

/** The slide is 1380x712 on a 1380x720 stage; shoot the stage so the card edge is visible. */
const SLIDE_W = 1380
const STAGE_H = 720

/**
 * Headline presence, in the browser. Draws the h1's own computed spec to a canvas and counts the
 * pixels dark enough to be a stroke. Measuring the live element instead of re-deriving the spec is
 * the point: it reports what the slide actually renders, including any override a slide variant
 * applies.
 */
const inkProbe = () => {
  const h1 = document.querySelector('h1')
  if (!h1) return null
  const cs = getComputedStyle(h1)
  const cv = document.createElement('canvas')
  cv.width = 1600
  cv.height = Math.ceil(parseFloat(cs.fontSize) * 2)
  const ctx = cv.getContext('2d', { willReadFrequently: true })
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, cv.width, cv.height)
  ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
  ctx.letterSpacing = cs.letterSpacing === 'normal' ? '0px' : cs.letterSpacing
  ctx.fillStyle = cs.color
  ctx.textBaseline = 'middle'
  ctx.fillText(h1.textContent, 4, cv.height / 2)
  const px = ctx.getImageData(0, 0, cv.width, cv.height).data
  let ink = 0
  for (let i = 0; i < px.length; i += 4) {
    const l = 0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]
    if (l < 128) ink++
  }
  return {
    text: h1.textContent,
    face: cs.fontFamily.split(',')[0].replace(/["']/g, ''),
    size: cs.fontSize,
    weight: cs.fontWeight,
    tracking: cs.letterSpacing,
    width: Math.round(ctx.measureText(h1.textContent).width),
    ink,
  }
}

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: SLIDE_W, height: STAGE_H }, deviceScaleFactor: 1 })
const rows = []
for (const s of SLIDES) {
  const name = s.id.replace('slide/', 'slide-')
  await page.setContent(
    `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style>
<style>html,body{margin:0;padding:0;background:#f1f5f9;width:${SLIDE_W}px}</style></head>
<body>${renderToStaticMarkup(s.node)}</body></html>`,
    { waitUntil: 'load' },
  )
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: resolve(OUT, `${name}.png`) })
  rows.push({ name, ...(await page.evaluate(`(${inkProbe.toString()})()`)) })
}
await browser.close()

console.log(`rendered ${SLIDES.length} slides from ${DIST}\n  -> ${OUT}\n`)
const w = Math.max(...rows.map((r) => r.name.length))
for (const r of rows)
  console.log(
    r.text
      ? `${r.name.padEnd(w)}  h1 ${r.face} ${r.size}/${r.weight} ${r.tracking}` +
        `   set width ${String(r.width).padStart(4)}px   ink ${String(r.ink).padStart(6)}px²`
      : `${r.name.padEnd(w)}  (no h1)`,
  )
