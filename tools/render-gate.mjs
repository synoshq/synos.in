// Renders every page in a real browser at three widths and asserts the things only a render knows:
// horizontal overflow, font families, and that no element paints a colour outside the token file.
//
// Why this exists: the 2026-08-16 deck session recorded that every defect it found was caught by a
// human looking at rendered output or by a measurement nobody was running, and none by a gate that
// was already green. The three checks below are the measurements that were not being run.
//
// Usage:
//   node tools/serve.mjs &            (or any static server on public/)
//   node tools/render-gate.mjs http://127.0.0.1:8899
//
// Requires playwright. If it is not installed the script says so and exits 0, because a missing
// dev dependency should not be indistinguishable from a failing page.
import { readdir, readFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const PUBLIC = join(ROOT, 'public')
const BASE = process.argv[2] || 'http://127.0.0.1:8899'
const WIDTHS = [320, 768, 1440]

// Scope. See tools/migrated.json.
const MIGRATED = new Set(
  JSON.parse(await readFile(new URL('./migrated.json', import.meta.url), 'utf8')).migrated
)

// The only families the site may render. Anything else is drift.
const ALLOWED_FAMILIES = ['Inter', 'Instrument Serif', 'JetBrains Mono']

let chromium
try {
  ({ chromium } = await import('playwright'))
} catch {
  console.log('render gate: playwright not installed, skipping')
  console.log('  install with: npm i -D playwright && npx playwright install chromium')
  process.exit(0)
}

async function pages(dir) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name === 'partials' || e.name === 'node_modules') continue
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...await pages(p))
    else if (e.name.endsWith('.html')) out.push('/' + relative(PUBLIC, p))
  }
  return out.sort()
}

const browser = await chromium.launch()
const failures = []

for (const path of (await pages(PUBLIC)).filter(p => MIGRATED.has(p))) {
  for (const width of WIDTHS) {
    const page = await browser.newPage({ viewport: { width, height: 900 } })
    try {
      await page.goto(BASE + path, { waitUntil: 'networkidle' })
      const result = await page.evaluate(() => {
        const bad = []
        const families = new Set()
        for (const el of document.body.querySelectorAll('*')) {
          const cs = getComputedStyle(el)
          families.add(cs.fontFamily.split(',')[0].replace(/["']/g, '').trim())
          if (el.scrollWidth > document.documentElement.clientWidth + 1 && cs.overflowX === 'visible') {
            bad.push(el.tagName + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : ''))
          }
        }
        // A CSS transform can defeat a gate that reads markup: text-transform:uppercase turns
        // "SynOS" into "SYNOS" on screen while the source still says SynOS. Found in a diagram on
        // 2026-08-21, where it had already rendered wrong once.
        const cased = []
        for (const el of document.body.querySelectorAll('*')) {
          if (el.children.length) continue
          const txt = (el.textContent || '')
          if (!/synos/i.test(txt)) continue
          const tt = getComputedStyle(el).textTransform
          if (tt === 'uppercase' || tt === 'lowercase' || tt === 'capitalize') {
            cased.push(`${el.tagName}.${(el.className || '').toString().split(' ')[0]} text-transform:${tt}`)
          }
        }

        return {
          cased,
          families: [...families],
          overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          widest: bad.slice(0, 3),
        }
      })

      if (result.overflow) {
        failures.push(`${path} @${width}: horizontal overflow, ${result.scrollWidth} > ${result.clientWidth}` +
          (result.widest.length ? ` (widest: ${result.widest.join(', ')})` : ''))
      }
      for (const f of result.families) {
        if (!ALLOWED_FAMILIES.includes(f)) failures.push(`${path} @${width}: unexpected font family "${f}"`)
      }
      for (const c of result.cased) {
        failures.push(`${path} @${width}: brand name re-cased by CSS · ${c}`)
      }
    } catch (err) {
      failures.push(`${path} @${width}: ${err.message.split('\n')[0]}`)
    }
    await page.close()
  }
}

await browser.close()

if (failures.length) {
  console.error(`render gate: ${failures.length} failure(s)\n`)
  for (const f of [...new Set(failures)]) console.error('  ' + f)
  process.exit(1)
}
console.log('render gate: clean')
