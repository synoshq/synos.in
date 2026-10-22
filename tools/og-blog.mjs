// Share card for a blog post, in the homepage / blog style (Inter, the AMI palette), with a small
// bar chart drawn from the post's own figures. tools/og.mjs keeps the older serif cards for the
// rest of the site; the blog moved to the homepage system on 2026-10-22, so its cards did too.
//
// The chart is data, not illustration: every bar is a figure printed in the post's table. Edit
// POSTS below when a post's figures change, then run:
//   node tools/og-blog.mjs                 every post
//   node tools/og-blog.mjs <slug>          one
//
// Set OG_CHROMIUM to a browser binary if Playwright's own download is not installed.
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const OUT = join(ROOT, 'public/img/og')

const POSTS = {
  'blog-domain-trained-open-weight-models': {
    eyebrow: 'Research · 21 October 2026',
    title: '36 domain-trained <span class="nw">open-weight</span> models, compared',
    chartTitle: 'Points gained over the base model',
    max: 60,
    bars: [
      ['Pangaea K1', "HR · Deel's own evaluation", 51, true],
      ['Lawma-8B', 'Legal', 37.7],
      ['Foundation-Sec-8B-R', 'Security', 22.2],
      ['MedGemma 1.5 4B', 'Medical', 18.4],
      ['Sarvam-M', 'Indic languages', 16],
      ['DianJin-R1-32B', 'Finance', 14.1],
      ['MedGemma 27B', 'Medical', 12.8],
      ['MiMo-V2.6 9B', 'Coding', 12.6],
    ],
  },
}

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

const card = p => `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root { --paper:#ffffff; --mist:#f4f6f9; --ink:#0f1b2d; --slate:#525e70; --line:#e2e6ec; --accent:#2747e8; --a-ink:#1f3bd0; }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1200px; height:630px; background:var(--paper); color:var(--ink); font-family:'Inter',sans-serif;
         display:grid; grid-template-columns:1fr 520px; gap:56px; padding:60px 64px 52px; overflow:hidden; }
  .left { display:flex; flex-direction:column; justify-content:space-between; }
  .logo { display:flex; align-items:center; gap:12px; font-weight:650; font-size:26px; letter-spacing:-.01em; }
  .eyebrow { font-size:20px; font-weight:600; color:var(--a-ink); margin-bottom:18px; }
  h1 { font-size:58px; line-height:1.03; font-weight:700; letter-spacing:-.04em; }
  .nw { white-space:nowrap; }
  .url { font-size:19px; color:var(--slate); }
  .chart { background:var(--mist); border-radius:22px; padding:30px 30px 24px; display:flex; flex-direction:column; align-self:center; }
  .ct { font-size:17px; font-weight:600; color:var(--slate); margin-bottom:18px; }
  .row { display:grid; grid-template-columns:190px 1fr; column-gap:14px; align-items:center; height:44px; }
  .n { font-size:16px; font-weight:600; line-height:1.15; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .n span { display:block; font-size:12.5px; font-weight:400; color:var(--slate); }
  .t { display:flex; align-items:center; gap:8px; height:100%; border-left:1.5px solid var(--slate); }
  .b { height:20px; background:var(--accent); border-radius:0 5px 5px 0; }
  .b.ref { background:transparent; border:2px dashed var(--accent); border-left:0; }
  .v { font-size:15px; font-weight:700; font-variant-numeric:tabular-nums; }
</style></head><body>
  <div class="left">
    <div class="logo">
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none"><path d="M11 7C11 7 11 7 16 7C21 7 23 10 23 13C23 16 21 18 16 18" stroke="#0f1b2d" stroke-width="2.4" stroke-linecap="round"/><path d="M21 25C21 25 21 25 16 25C11 25 9 22 9 19C9 16 11 14 16 14" stroke="#0f1b2d" stroke-width="2.4" stroke-linecap="round"/></svg>
      SynOS
    </div>
    <div>
      <p class="eyebrow">${esc(p.eyebrow)}</p>
      <h1>${p.title}</h1>
    </div>
    <p class="url">getsynos.ai/blog</p>
  </div>
  <div class="chart">
    <p class="ct">${esc(p.chartTitle)}</p>
    ${p.bars.map(([n, d, v, ref]) => `<div class="row"><div class="n">${esc(n)}<span>${esc(d)}</span></div><div class="t"><div class="b${ref ? ' ref' : ''}" style="width:${(v / p.max) * 100}%"></div><span class="v">+${v}</span></div></div>`).join('')}
  </div>
</body></html>`

const only = process.argv[2]
await mkdir(OUT, { recursive: true })
const browser = await chromium.launch(process.env.OG_CHROMIUM ? { executablePath: process.env.OG_CHROMIUM } : {})
const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 } })
if (globalThis.__ogRoute) await globalThis.__ogRoute(ctx)
const page = await ctx.newPage()
let n = 0
for (const [slug, post] of Object.entries(POSTS)) {
  if (only && slug !== only) continue
  await page.setContent(card(post), { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(250)
  await page.screenshot({ path: join(OUT, `${slug}.png`) })
  console.log(`  public/img/og/${slug}.png`)
  n++
}
await browser.close()
console.log(`\n${n} card(s)`)
