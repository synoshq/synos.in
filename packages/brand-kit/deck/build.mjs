#!/usr/bin/env node
/**
 * Build the VC reading deck into ONE self-contained `.html`.
 *
 *   node deck/build.mjs                       # -> deck/out/synos-vc-deck-v6-kit.html
 *   node deck/build.mjs --out path/to.html
 *   node deck/build.mjs --deck ops-buyer      # any src/<name>.jsx exporting deck(K)
 *
 * The approach, and why it is this one: the slides are React components from `dist/brand-kit.js`,
 * server-rendered to static markup at build time and injected into a reveal.js shell. The output is
 * the same portable single-file `.html` the GTM repo already ships, so the existing PDF export path
 * (`_build_deck_pdf.py`) and its verifier (`verify_pdf.py`) keep working unchanged. A React +
 * reveal runtime app would have broken all three and bought nothing — a deck is a static document.
 *
 * Everything is inlined and NOTHING is fetched at render time:
 *
 *   - reveal.js 5.1.0 CSS and JS from `deck/vendor/reveal/`
 *   - the three brand faces from `deck/vendor/fonts/`, base64'd into the stylesheet
 *   - `dist/brand-kit.css`, with its Google Fonts `@import` stripped (see STRIP_IMPORT below)
 *   - `deck/src/deck.css`, the deck-local one-offs
 *
 * reveal's `theme/white.css` is deliberately NOT loaded. deck-research §C.4 measured the shipped
 * deck rendering FOUR font families where three were intended, with Source Sans Pro — reveal's
 * default theme body face — showing through on slide 33 and embedded in the exported PDF. Skipping
 * the theme removes that leak by construction rather than by override, and the shell CSS below
 * supplies the handful of rules the theme was actually providing.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { renderToStaticMarkup } from 'react-dom/server'
import * as esbuild from 'esbuild'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HERE, '..')
const outArg = process.argv.indexOf('--out')
/* Which deck. `src/<name>.jsx` must export a `deck(K)` returning the slide records. Defaults to the
   VC reading deck, so every existing invocation keeps working unchanged. */
const deckArg = process.argv.indexOf('--deck')
const DECK = deckArg > -1 ? process.argv[deckArg + 1] : 'deck'
const OUT = resolve(outArg > -1 ? process.argv[outArg + 1] : resolve(HERE, `out/${DECK === 'deck' ? 'synos-vc-deck-v6-kit' : DECK}.html`))

/* ── The kit ─────────────────────────────────────────────────────────────── */

const K = await import(pathToFileURL(resolve(ROOT, 'dist/brand-kit.js')).href)

/*
 * `src/styles/base.css` opens with `@import url('https://fonts.googleapis.com/css2?...')`, which
 * survives into the built bundle. Leaving it in would make the "no CDN at render" claim false in
 * the one place nobody looks. It is removed here rather than in the kit because the kit is also
 * consumed by the fidelity harness and by /design-sync, both of which are online by definition;
 * the deck is the artifact that has to survive a room with no wifi.
 */
/*
 * vite minifies `@import url('…')` down to `@import"…"`, so both forms have to be matched — and the
 * match has to run to the closing quote, NOT to the first `;`. The Google Fonts URL contains
 * semicolons inside its own query string (`ital@0;1`, `wght@400;500;…`), and a `[^;]*` version of
 * this regex truncates mid-URL, leaves the tail of the URL as top-level CSS, and silently voids the
 * entire stylesheet. That bug shipped once here and was caught only because the geometry probe
 * reported the deck rendering in Arial and Times. Hence the assertions below.
 */
const STRIP_IMPORT = /@import\s*(?:url\(\s*)?(['"])[^'"]*fonts\.googleapis\.com[^'"]*\1\s*\)?\s*;?/g
const kitCss = readFileSync(resolve(ROOT, 'dist/brand-kit.css'), 'utf8')
const kitCssOffline = kitCss.replace(STRIP_IMPORT, '/* the Google Fonts @import was stripped by deck/build.mjs; the faces are vendored above */')
if (kitCssOffline === kitCss) throw new Error('brand-kit.css no longer carries the Google Fonts @import — update build.mjs')
if (kitCssOffline.includes('fonts.googleapis.com')) throw new Error('a fonts.googleapis.com reference survived the strip')
if (kitCss.length - kitCssOffline.length > 400) throw new Error('the @import strip removed far more than one @import — check the regex')
for (const token of ['--sk-ink:', '.sk-slide{', '.sk-eyebrow{'])
  if (!kitCssOffline.includes(token)) throw new Error(`the stripped stylesheet lost "${token}" — the regex over-matched`)

/* ── Vendored assets ─────────────────────────────────────────────────────── */

const FONT_DIR = resolve(HERE, 'vendor/fonts')
const fontCss = readFileSync(resolve(FONT_DIR, 'fonts.css'), 'utf8').replace(
  /url\(\.\/([^)]+\.woff2)\)/g,
  (_, file) =>
    `url(data:font/woff2;base64,${readFileSync(resolve(FONT_DIR, file)).toString('base64')})`,
)
if (fontCss.includes('http')) throw new Error('a font face still points at a URL')

const revealCss = readFileSync(resolve(HERE, 'vendor/reveal/reveal.css'), 'utf8')
const revealJs = readFileSync(resolve(HERE, 'vendor/reveal/reveal.js'), 'utf8')
/*
 * Shared shell rules first, then the deck's own one-offs. `src/<deck>.css` is optional; a deck that
 * needs nothing local says so by not having one, which is the outcome to aim for.
 *
 * `_shared.css` is NOT optional. Omitting it once cost an 85-page PDF from a 43-slide deck,
 * silently — see the note at the top of that file.
 */
const sharedCss = readFileSync(resolve(HERE, 'src/_shared.css'), 'utf8')
const localCssPath = resolve(HERE, `src/${DECK}.css`)
const deckCss = sharedCss + '\n' + (existsSync(localCssPath) ? readFileSync(localCssPath, 'utf8') : '')

/* ── The slides ──────────────────────────────────────────────────────────── */

/*
 * The slide definitions are JSX, which node cannot parse. esbuild bundles them into one ESM module
 * with `react` and `react/jsx-runtime` left external, so the components below and the ones in
 * `dist/` are the same React instance.
 */
const BUNDLE = resolve(HERE, `.build/${DECK}.bundle.mjs`)
mkdirSync(dirname(BUNDLE), { recursive: true })
await esbuild.build({
  entryPoints: [resolve(HERE, `src/${DECK}.jsx`)],
  bundle: true,
  format: 'esm',
  jsx: 'automatic',
  platform: 'node',
  outfile: BUNDLE,
  external: ['react', 'react/jsx-runtime', 'react-dom'],
  /* An imported image becomes a data: URI at bundle time. The alternative is what the hand-written
     ops-buyer deck does — `<img src="../blogs/…png">`, a path OUTSIDE the deck's own directory,
     which resolves on the authoring machine and arrives broken in the buyer's inbox. Here it is
     impossible to ship that mistake: an image either imports and is embedded, or the build fails. */
  loader: { '.png': 'dataurl', '.jpg': 'dataurl', '.svg': 'dataurl' },
})
/* Written to disk rather than imported as a data: URL — a data: module cannot resolve the bare
   `react` specifier the externals leave behind. `.build/` is generated and gitignored. */
const mod = await import(pathToFileURL(BUNDLE).href)
const slides = mod.deck(K)

/* Per-deck section count, asserted rather than trusted: a silently short deck is the failure mode
   that survives every other check here, and the PDF verifier is downstream of this file. */
const EXPECTED = { deck: 35, 'ops-buyer': 43 }
/* A deck under construction says so, and the count is not enforced until it stops saying so. The
   alternative — dropping the assertion while porting and remembering to restore it — is how a deck
   ships three sections short. `mod.wip` is the deliberate, visible opt-out. */
if (EXPECTED[DECK] && !mod.wip && slides.length !== EXPECTED[DECK])
  throw new Error(`expected ${EXPECTED[DECK]} slides in "${DECK}", the definition has ${slides.length}`)
if (mod.wip) console.log(`  WIP: ${slides.length} of ${EXPECTED[DECK] ?? '?'} sections ported`)

/*
 * Each slide goes inside `section.has-card`, which is the source deck's own wrapper and what
 * reveal's print-pdf path counts. The page number is rendered here rather than injected by a script
 * on load, as the source does — a `.pnum` appended by JS is a thing that can silently not run
 * during a PDF export, and the count is known at build time.
 *
 * The section carries no density class. Density used to be a `dense: true` flag on the slide record
 * that this line turned into `.dk-dense` on the wrapper; it is now `<SlideFrame density="compact">`
 * inside the slide itself, because the register moved into the kit (`src/deck/Density.css`) and the
 * card is the thing that has a register. One source of truth, and it travels with the component
 * rather than with this deck's build script.
 */
const sections = slides
  .map(
    (s, i) =>
      `<section class="has-card" data-slide="${s.id}">${renderToStaticMarkup(s.node)}` +
      (i === 0 ? '' : `<div class="dk-pnum">${i + 1} / ${slides.length}</div>`) +
      `</section>`,
  )
  .join('\n')

/* ── The shell ───────────────────────────────────────────────────────────── */

/*
 * What reveal's `theme/white.css` was providing and this replaces, explicitly:
 * the page background, the body face, left-aligned slide text, and zeroed section padding. The
 * `.has-card` rules are copied from the source deck (lines 27-30 of its `<style>`), because they
 * are shell, not brand — the kit's own `.sk-stage` does the same job outside reveal.
 */
const shellCss = `
html, body { background: var(--sk-bg); margin: 0; padding: 0; }
.reveal { font-family: var(--sk-font-body); color: var(--sk-ink); }
.reveal .slides { text-align: left; }
.reveal .slides section {
  background: var(--sk-bg); color: var(--sk-ink); padding: 0 !important;
  box-sizing: border-box; overflow: visible; text-transform: none;
}
.reveal .slides section.has-card {
  display: flex !important; align-items: center; justify-content: center; height: 720px;
}
.reveal .slides > section.present.has-card, .reveal .slides > section.has-card { top: 0 !important; }
/* The card is 1380px wide against a 1280px stage and clamps to 99%, exactly as the source does. */
.reveal .slides section.has-card > .sk-slide { flex: 0 0 auto; }
`

const html = `<!DOCTYPE html>
<!--
  GENERATED FILE — DO NOT EDIT.

  Built from @synos/brand-kit by packages/brand-kit/deck/build.mjs in the
  synos-landing repo. Any edit here is lost on the next build.

  To change a slide, edit deck/src/slides-main.jsx or slides-appendix.jsx and run:
      node deck/build.mjs --out <path>

  Fonts and reveal.js 5.1.0 are vendored and inlined: this file renders correctly
  with no network. reveal's theme/white.css is deliberately absent — loading it
  leaked Source Sans Pro into the deck and into the exported PDF.
-->
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SynOS — The Human-Agent Operating Layer (VC · v7 · reading deck · built on the brand kit)</title>
<!--
  Built by packages/brand-kit/deck/build.mjs from @synos/brand-kit.
  Self-contained by design: no stylesheet, script or font is fetched at render time.
  Do not hand-edit — edit deck/src/*.jsx and rebuild.
-->
<style>${fontCss}</style>
<style>${revealCss}</style>
<style>${kitCssOffline}</style>
<style>${shellCss}</style>
<style>${deckCss}</style>
</head>
<body>
<div class="reveal"><div class="slides">
${sections}
</div></div>
<script>${revealJs}</script>
<script>
  Reveal.initialize({ width: 1280, height: 720, margin: 0, controls: true, progress: true,
                      hash: true, transition: 'fade', center: false });
</script>
</body>
</html>
`

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, html)

const kb = (n) => `${Math.round(n / 1024)} kB`
console.log(`${slides.length} slides -> ${OUT}  (${kb(Buffer.byteLength(html))})`)
console.log(
  `  fonts ${readdirSync(FONT_DIR).filter((f) => f.endsWith('.woff2')).length} inlined · reveal 5.1.0 vendored · theme/white.css deliberately absent`,
)
