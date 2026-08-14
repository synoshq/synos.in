#!/usr/bin/env node
/**
 * Photograph both decks, slide for slide, and stack each pair into one image.
 *
 *   node deck/compare.mjs                # -> deck/comparison/NN-<id>.png, 35 of them
 *   node deck/compare.mjs --only 17,32
 *
 * This is what a human reviews. The machine gates (`deck/probe/measure.mjs`, `npm run fidelity`,
 * `verify_pdf.py`) answer whether the artifact is correct; only a person answers whether it is
 * better. Success for this whole pass is NOT "it looks identical" — the kit is deliberately
 * different now: Instrument Serif instead of Plus Jakarta Sans, a 54px headline instead of 34px,
 * an opened type scale, and most of the boxes gone.
 *
 * Both sides are shot at the deck's own 1280×720 stage with reveal pinned to scale 1, so a
 * difference in the image is a difference in the deck and not in the camera. The source deck is
 * loaded from ~/ws/synos-gtm over `file://` and is never written to.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { chromium } = require(`${process.env.HOME}/ws/cursor_experiment/frontend/node_modules/playwright`)

const HERE = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(HERE, 'comparison')
const SOURCE = `${homedir()}/ws/synos-gtm/presentations/synos-vc-deck-v6.html`
const REBUILT = resolve(HERE, 'out/synos-vc-deck-v6-kit.html')

const W = 1280
const H = 720
const onlyArg = process.argv.indexOf('--only')
const only = onlyArg > -1 ? new Set(process.argv[onlyArg + 1].split(',').map(Number)) : null

mkdirSync(OUT, { recursive: true })

/**
 * Reveal only lays out the current slide, so each capture navigates to it and waits. Scale is
 * pinned to 1 by giving the page the stage's exact size and telling reveal not to fit.
 */
const shoot = async (page, file, n) => {
  await page.goto(`${pathToFileURL(file).href}#/${n}`, { waitUntil: 'load' })
  await page.evaluate(() => {
    if (window.Reveal) Reveal.configure({ transition: 'none', controls: false, progress: false })
  })
  await page.evaluate((i) => window.Reveal && Reveal.slide(i, 0), n)
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(350)
  return page.screenshot({ clip: { x: 0, y: 0, width: W, height: H } })
}

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })

/* Slide ids come from the rebuilt deck, which carries them as data-slide. */
await page.goto(pathToFileURL(REBUILT).href, { waitUntil: 'load' })
const ids = await page.evaluate(() =>
  [...document.querySelectorAll('.reveal .slides > section')].map((s) => s.dataset.slide),
)

/*
 * The two shots are stacked in a second page rather than composited with an image library, so the
 * only dependency is the browser that is already open. Labels name which is which, because a
 * reviewer looking at 35 pairs should never have to remember an order.
 */
const stack = async (a, b, label) => {
  const p = await browser.newPage({ viewport: { width: W, height: H * 2 + 76 }, deviceScaleFactor: 1 })
  await p.setContent(
    `<!doctype html><meta charset="utf-8"><style>
     body{margin:0;background:#0f172a;font:600 13px/1 -apple-system,Segoe UI,sans-serif;color:#e2e8f0}
     .h{padding:8px 12px;letter-spacing:.6px;text-transform:uppercase}
     .h small{float:right;font-weight:400;color:#94a3b8;text-transform:none;letter-spacing:0}
     img{display:block;width:${W}px}
     </style>
     <div class="h">Source · synos-vc-deck-v6.html<small>${label}</small></div>
     <img src="data:image/png;base64,${a.toString('base64')}">
     <div class="h">Rebuilt on @synos/brand-kit<small>${label}</small></div>
     <img src="data:image/png;base64,${b.toString('base64')}">`,
    { waitUntil: 'load' },
  )
  const png = await p.screenshot({ fullPage: true })
  await p.close()
  return png
}

let n = 0
for (let i = 0; i < ids.length; i++) {
  if (only && !only.has(i + 1)) continue
  const label = `slide ${i + 1} / ${ids.length} · ${ids[i]}`
  const src = await shoot(page, SOURCE, i)
  const out = await shoot(page, REBUILT, i)
  writeFileSync(
    resolve(OUT, `${String(i + 1).padStart(2, '0')}-${ids[i]}.png`),
    await stack(src, out, label),
  )
  n++
  process.stdout.write(`\r${n} pairs rendered`)
}
await browser.close()
console.log(`\n-> ${OUT}`)
