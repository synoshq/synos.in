// Generate a per-page Open Graph card, from the brand kit, with no external assets.
//
// Why this exists: every page shipped pointing at /img/og/synos-og-unblock.png, which carries
// positioning retired in July. A share link is often the first thing a buyer sees, so it was the
// most visible defect left on the site.
//
// The cards are typeset rather than illustrated. A generated picture on a share card is the single
// most reliable way to look machine-made, and the figures do not survive being shrunk to 1200x630.
//
// Usage:
//   node tools/og.mjs           write every card to public/img/og/
//   node tools/og.mjs home      just one
import { chromium } from 'playwright'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const OUT = join(ROOT, 'public/img/og')

// slug -> [eyebrow, title]. The title is set in the display face and must survive at thumbnail
// size, so anything over ~60 characters is too long for this card.
const CARDS = {
  'home':             ['The Human-Agent Operating Layer', 'The environment your company builds and trains its own AI in.'],
  'product':          ['Product', 'One layer underneath every AI tool your teams already use.'],
  'company-brain':    ['Platform', 'Your systems profiled where they sit, and kept honest.'],
  'governance':       ['Platform', 'Agents acting in real systems without opening a hole.'],
  'learning-loop':    ['Platform', 'A correction made once should never be made again.'],
  'build-your-own-ai':['Phase two', 'The environment you would train AI of your own in.'],
  'why-now':          ['The argument', 'Every jump in model capability makes this layer more necessary.'],
  'compare':          ['How this compares', 'Four alternatives, and what each is actually good at.'],
  'build-vs-buy':     ['Compare', 'Your team could build this. Whether they should is the question.'],
  'data-platforms':   ['Compare', 'They are right about context. The precondition is the problem.'],
  'search-and-memory':['Compare', 'What your company wrote, and what your company runs.'],
  'agent-platforms':  ['Compare', 'Getting to one working agent is not the hard part any more.'],
  'about':            ['About', 'Two disciplines that rarely turn up together.'],
  'careers':          ['Careers', 'Unglamorous infrastructure that almost nobody is building.'],
  'use-cases':        ['Use cases', 'What a team actually builds on it.'],
  'security':         ['Security', 'Self-hosted by default, including the controls we do not have.'],
  'trust':            ['Trust centre', 'Everything a security reviewer needs, limits included.'],
  'early-access':     ['Early access', 'A walkthrough on your systems, not a pitch.'],
  'blog':             ['Writing', 'Notes on building the layer enterprises are missing.'],
}

// Tokens are pasted rather than imported: this file renders standalone, and the card must not
// change because a site-wide token moved. Kept in sync by hand, deliberately.
const page = (eyebrow, title) => `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1200px; height:630px; background:#f1f5f9; font-family:'Inter',sans-serif;
         display:flex; flex-direction:column; justify-content:space-between;
         padding:64px 72px; position:relative; overflow:hidden; }
  /* One hairline rule at the top, in the brand indigo, and nothing else decorative. */
  .bar { position:absolute; top:0; left:0; right:0; height:6px;
         background:linear-gradient(90deg,#6366f1,#4c1d95); }
  .top { display:flex; align-items:center; gap:14px; }
  .mark { width:34px; height:34px; }
  .word { font-size:26px; font-weight:600; letter-spacing:-0.02em; color:#0f172a; }
  .eyebrow { font-family:'JetBrains Mono',monospace; font-size:15px; font-weight:500;
             letter-spacing:0.14em; text-transform:uppercase; color:#4338ca;
             margin-bottom:26px; }
  h1 { font-family:'Instrument Serif',Georgia,serif; font-weight:400; font-size:66px;
       line-height:1.08; letter-spacing:-0.025em; color:#0f172a; max-width:19ch; }
  .foot { display:flex; justify-content:space-between; align-items:flex-end;
          font-family:'JetBrains Mono',monospace; font-size:14px; letter-spacing:0.06em;
          color:#475569; }
</style></head><body>
  <div class="bar"></div>
  <div class="top">
    <svg class="mark" viewBox="0 0 32 32" fill="none">
      <path d="M11 7C11 7 11 7 16 7C21 7 23 10 23 13C23 16 21 18 16 18" stroke="#6366f1" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M21 25C21 25 21 25 16 25C11 25 9 22 9 19C9 16 11 14 16 14" stroke="#6366f1" stroke-width="2.4" stroke-linecap="round"/>
    </svg>
    <span class="word">SynOS</span>
  </div>
  <div>
    <p class="eyebrow">${eyebrow}</p>
    <h1>${title}</h1>
  </div>
  <div class="foot">
    <span>synos.in</span>
    <span>self-hosted &middot; model agnostic</span>
  </div>
</body></html>`

const only = process.argv[2]
await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 } })
const p = await ctx.newPage()

let n = 0
for (const [slug, [eyebrow, title]] of Object.entries(CARDS)) {
  if (only && slug !== only) continue
  await p.setContent(page(eyebrow, title), { waitUntil: 'load' })
  await p.evaluate(() => document.fonts.ready)
  await p.waitForTimeout(250)
  // No fullPage: the card is exactly the viewport, and fullPage would follow any overflow.
  await p.screenshot({ path: join(OUT, `${slug}.png`) })
  console.log(`  public/img/og/${slug}.png`)
  n++
}

await browser.close()
console.log(`\n${n} card(s)`)
