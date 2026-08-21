// Screenshot pages to the host filesystem, so a human and the model can both look at them.
//
// Why this exists rather than the Playwright MCP: that browser runs network- and filesystem-
// isolated, so it cannot reach a local server and its screenshots land inside the container where
// nothing on the host can read them. A local playwright has neither problem.
//
// Serves public/ itself, so there is no separate server to remember to start.
//
// Usage:
//   node tools/shot.mjs                              every page, three widths
//   node tools/shot.mjs /about.html                  one page, three widths
//   node tools/shot.mjs /index.html 1440             one page, one width
//   node tools/shot.mjs --dir docs/diagrams --out .shots/diagrams   any folder of html
import { createServer } from 'node:http'
import { readdir, readFile, mkdir } from 'node:fs/promises'
import { join, extname, relative, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const ROOT = fileURLToPath(new URL('..', import.meta.url))

const argv = process.argv.slice(2)
const flag = name => { const i = argv.indexOf(name); return i === -1 ? null : argv[i + 1] }
const SERVE_DIR = join(ROOT, flag('--dir') || 'public')
const OUT_DIR = join(ROOT, flag('--out') || '.shots')
const positional = argv.filter(a => !a.startsWith('--') && argv[argv.indexOf(a) - 1] !== '--dir' && argv[argv.indexOf(a) - 1] !== '--out')
const ONE_PAGE = positional.find(a => a.startsWith('/')) || null
const ONE_WIDTH = positional.find(a => /^\d+$/.test(a))
const WIDTHS = ONE_WIDTH ? [Number(ONE_WIDTH)] : [320, 768, 1440]

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.mp4': 'video/mp4', '.woff2': 'font/woff2',
}

const server = createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(req.url.split('?')[0])
    if (p.endsWith('/')) p += 'index.html'
    // Vercel cleanUrls: /about resolves to about.html
    let file = join(SERVE_DIR, p)
    if (!extname(file)) file += '.html'
    let body
    try {
      body = await readFile(file)
    } catch {
      // Shared assets (/css, /js, /media) always live in public/, even when --dir points at a
      // folder of diagram prototypes elsewhere in the repo.
      file = join(ROOT, 'public', p)
      body = await readFile(file)
    }
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' })
    res.end(body)
  } catch {
    res.writeHead(404).end('not found')
  }
})

await new Promise(r => server.listen(0, '127.0.0.1', r))
const BASE = `http://127.0.0.1:${server.address().port}`

async function pages(dir) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name === 'partials' || e.name === 'node_modules' || e.name.startsWith('.')) continue
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...await pages(p))
    else if (e.name.endsWith('.html')) out.push('/' + relative(SERVE_DIR, p))
  }
  return out.sort()
}

const list = ONE_PAGE ? [ONE_PAGE] : await pages(SERVE_DIR)
const browser = await chromium.launch()
const written = []

for (const path of list) {
  for (const width of WIDTHS) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 2 })
    await page.goto(BASE + path, { waitUntil: 'networkidle' })
    // Reveal animations are opacity:0 until observed. Show everything, or the shot is of a blank page.
    await page.addStyleTag({ content: '.sk-reveal,.reveal{opacity:1 !important;transform:none !important}' })
    // Lazy iframes never load in a full-page screenshot, because nothing scrolls past them. Walk
    // the page so they enter view, then give the figures time to measure and report back.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y)
        await new Promise(r => setTimeout(r, 40))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(900)

    // Chromium's fullPage capture does not paint iframe content below the original viewport, which
    // is why a page with embedded figures screenshots as a tall column of blank boxes. Resizing the
    // viewport to the whole page forces real layout and paint, so capture that instead.
    const pageHeight = Math.min(
      await page.evaluate(() => document.documentElement.scrollHeight),
      24000,
    )
    await page.setViewportSize({ width, height: pageHeight })
    await page.waitForTimeout(700)

    const name = path.replace(/^\//, '').replace(/\.html$/, '').replace(/\//g, '-')
    const out = join(OUT_DIR, `${name}-${width}.png`)
    await mkdir(dirname(out), { recursive: true })
    await page.screenshot({ path: out })
    written.push(relative(ROOT, out))
    await page.close()
  }
}

await browser.close()
server.close()

for (const w of written) console.log(w)
console.log(`\n${written.length} screenshot(s) in ${relative(ROOT, OUT_DIR)}/`)
