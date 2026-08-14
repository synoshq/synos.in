#!/usr/bin/env node
/**
 * Measure a built deck, and answer three questions with numbers.
 *
 *   node deck/probe/measure.mjs                     # the rebuilt deck
 *   node deck/probe/measure.mjs --source            # the shipped v6, for the before column
 *   node deck/probe/measure.mjs --json out.json
 *
 * 1. DOES THE h1 STAY PUT? deck-research §D.1 measured the shipped deck's `h1` top offset ranging
 *    33.3px to 197.6px across 35 slides — 27 distinct positions, a 164px spread, 22.8% of stage
 *    height. The cause is `.card-frame { justify-content: center }`: the card vertically centres
 *    its contents, so the title's position is a function of how much content sits below it. It is
 *    the most visible "homemade" tell there is, because in a live presentation you see the
 *    transition, not the slide. Success is a spread at or near zero and at most two distinct
 *    positions — one for the default frame, one for the tighter `arch` frame.
 *
 * 2. DOES ANYTHING LOAD FROM A CDN? Every request that is not `file://` or `data:` is recorded and
 *    aborted. deck-research §C.4 found the shipped deck pulling fonts from Google and reveal's CSS
 *    and JS from jsDelivr at present time, so a meeting on bad wifi renders it wrong. The check is
 *    run with the network refused rather than merely absent, so a pass means the artifact never
 *    wanted the network, not that it happened to have it.
 *
 * 3. WHICH FONT FAMILIES ACTUALLY RENDER? §C.4 measured four families where three were intended:
 *    Source Sans Pro leaked in from reveal's `theme/white.css` and was embedded in the exported
 *    PDF. This reports the first family of every text-bearing element's resolved stack.
 *
 * Also reported per slide, because deck-research §D.3/§D.4 gate on them: distinct text colours and
 * the count of elements carrying a visible border or fill.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { chromium } = require(`${process.env.HOME}/ws/cursor_experiment/frontend/node_modules/playwright`)

const HERE = dirname(fileURLToPath(import.meta.url))
const useSource = process.argv.includes('--source')
const jsonArg = process.argv.indexOf('--json')

const FILE = useSource
  ? `${homedir()}/ws/synos-gtm/presentations/synos-vc-deck-v6.html`
  : resolve(HERE, '../out/synos-vc-deck-v6-kit.html')

/** Reveal scales the 1280x720 stage to the viewport; pin it to 1 so px are px. */
const STAGE = { width: 1280, height: 720 }

const perSlide = () => {
  const secs = [...document.querySelectorAll('.reveal .slides > section')]
  const visible = (el) => {
    const cs = getComputedStyle(el)
    return cs.display !== 'none' && cs.visibility !== 'hidden'
  }
  return secs.map((sec, i) => {
    const card = sec.querySelector('.card-frame, .sk-slide')
    const h1 = sec.querySelector('h1')
    const cardBox = card ? card.getBoundingClientRect() : null
    const h1Box = h1 ? h1.getBoundingClientRect() : null
    const colours = new Set()
    let boxes = 0
    for (const el of sec.querySelectorAll('*')) {
      if (!visible(el)) continue
      const cs = getComputedStyle(el)
      const txt = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())
      if (txt) colours.add(cs.color)
      const bordered =
        ['Top', 'Right', 'Bottom', 'Left'].some(
          (s) => parseFloat(cs[`border${s}Width`]) > 0 && cs[`border${s}Style`] !== 'none',
        )
      const filled = cs.backgroundColor !== 'rgba(0, 0, 0, 0)' || cs.backgroundImage !== 'none'
      if (bordered || filled) boxes++
    }
    return {
      n: i + 1,
      id: sec.dataset.slide || null,
      /* h1 top RELATIVE TO THE CARD, which is the number the eye reads: the card is centred in a
         fixed stage, so card-relative and stage-relative agree, but card-relative survives a
         change to the stage. */
      h1Top: h1Box && cardBox ? Math.round((h1Box.top - cardBox.top) * 10) / 10 : null,
      h1Size: h1 ? getComputedStyle(h1).fontSize : null,
      colours: colours.size,
      boxes,
      chars: sec.innerText.replace(/\s+/g, ' ').trim().length,
      /* How far the slide's content runs past the bottom of the fixed-height card. Zero or less is
         a slide that fits. This is the number that says whether the kit's opened type scale still
         holds a reading deck's content. */
      overflowPx: card ? card.scrollHeight - card.clientHeight : null,
    }
  })
}

/*
 * Scoped to `.slides`, not `.reveal`. Reveal ships its own chrome — the controls, the progress bar,
 * the slide-number readout and a hidden "Resume presentation" button in the pause overlay — and
 * that button carries text, so an unscoped walk reports reveal's own default sans as a fourth
 * family of the brand. It is never visible and never in the PDF. The families that matter are the
 * ones the slides are set in, which is what §C.4's four-family finding was about.
 */
const fontsUsed = () => {
  const fams = new Set()
  for (const el of document.querySelectorAll('.reveal .slides *')) {
    const has = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())
    if (!has) continue
    fams.add(getComputedStyle(el).fontFamily.split(',')[0].replace(/["']/g, '').trim())
  }
  return [...fams].sort()
}

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: STAGE, deviceScaleFactor: 1 })

/* Refuse the network. Anything the artifact still wants is a finding, not a warning. */
const offDisk = []
await page.route('**/*', (route) => {
  const url = route.request().url()
  if (url.startsWith('file:') || url.startsWith('data:') || url.startsWith('about:')) return route.continue()
  offDisk.push(url)
  return route.abort()
})

await page.goto(pathToFileURL(FILE).href, { waitUntil: 'load' })
await page.evaluate(() => {
  /* Show every slide at once and pin the scale, so one pass measures all 35. */
  document.querySelectorAll('.reveal .slides > section').forEach((s) => {
    s.style.display = 'block'
    s.style.opacity = '1'
    s.style.visibility = 'visible'
    s.style.transform = 'none'
    s.style.position = 'relative'
    s.classList.add('present')
  })
  const sl = document.querySelector('.reveal .slides')
  if (sl) sl.style.transform = 'none'
})
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(500)

const slides = await page.evaluate(perSlide)
const families = await page.evaluate(fontsUsed)
await browser.close()

/* ── Report ──────────────────────────────────────────────────────────────── */

const withH1 = slides.filter((s) => s.h1Top !== null)
const tops = withH1.map((s) => Math.round(s.h1Top))
const distinct = [...new Set(tops)].sort((a, b) => a - b)
const spread = distinct.length ? distinct[distinct.length - 1] - distinct[0] : 0
const mean = (xs) => Math.round((xs.reduce((a, b) => a + b, 0) / xs.length) * 10) / 10

const result = {
  file: FILE,
  slides: slides.length,
  h1: {
    slidesWithH1: withH1.length,
    min: distinct[0] ?? null,
    max: distinct[distinct.length - 1] ?? null,
    spreadPx: spread,
    spreadPctOfStage: Math.round((spread / STAGE.height) * 1000) / 10,
    distinctPositions: distinct.length,
    positions: distinct,
  },
  network: { offDiskRequests: offDisk.length, urls: [...new Set(offDisk)] },
  fontFamilies: families,
  overflow: {
    slidesOver: slides.filter((s) => s.overflowPx > 0).length,
    worst: Math.max(...slides.map((s) => s.overflowPx ?? 0)),
    over: slides.filter((s) => s.overflowPx > 0).map((s) => `${s.n}:${s.id ?? ''}+${s.overflowPx}`),
  },
  density: {
    meanColours: mean(slides.map((s) => s.colours)),
    maxColours: Math.max(...slides.map((s) => s.colours)),
    meanBoxes: mean(slides.map((s) => s.boxes)),
    maxBoxes: Math.max(...slides.map((s) => s.boxes)),
    meanChars: mean(slides.map((s) => s.chars)),
  },
  perSlide: slides,
}

console.log(`\n${useSource ? 'SOURCE' : 'REBUILT'}  ${FILE}\n`)
console.log(`slides                  ${result.slides}`)
console.log(`h1 slides               ${result.h1.slidesWithH1}`)
console.log(`h1 top, min..max        ${result.h1.min}px .. ${result.h1.max}px`)
console.log(`h1 top, spread          ${result.h1.spreadPx}px  (${result.h1.spreadPctOfStage}% of stage height)`)
console.log(`h1 distinct positions   ${result.h1.distinctPositions}   ${JSON.stringify(distinct)}`)
console.log(`off-disk requests       ${result.network.offDiskRequests}${offDisk.length ? `  ${[...new Set(offDisk)].slice(0, 6).join(' ')}` : ''}`)
console.log(`font families rendered  ${families.length}   ${families.join(' · ')}`)
console.log(
  `slides overflowing card ${result.overflow.slidesOver} / ${slides.length}   worst +${result.overflow.worst}px` +
    (result.overflow.slidesOver ? `\n  ${result.overflow.over.join('  ')}` : ''),
)
console.log(
  `density                 colours mean ${result.density.meanColours} / max ${result.density.maxColours} · ` +
    `boxes mean ${result.density.meanBoxes} / max ${result.density.maxBoxes} · chars mean ${result.density.meanChars}`,
)

if (jsonArg > -1) {
  writeFileSync(resolve(process.cwd(), process.argv[jsonArg + 1]), JSON.stringify(result, null, 2))
  console.log(`\njson -> ${process.argv[jsonArg + 1]}`)
}

/* Exit non-zero on the two claims this probe exists to hold, so it can gate a build. */
const fails = []
if (!useSource) {
  if (offDisk.length) fails.push(`${offDisk.length} off-disk request(s)`)
  if (families.length > 3) fails.push(`${families.length} font families render, expected 3`)
  if (result.h1.distinctPositions > 2)
    fails.push(`${result.h1.distinctPositions} distinct h1 positions, expected <= 2 (default frame + arch frame)`)
}
if (fails.length) {
  console.error(`\nFAIL: ${fails.join('; ')}`)
  process.exit(1)
}
console.log('')
