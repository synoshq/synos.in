#!/usr/bin/env node
/**
 * Build a one-pager into ONE self-contained `.html`.
 *
 *   node onepager/build.mjs financial-inclusion-ceo
 *   node onepager/build.mjs financial-inclusion-ceo --out path/to.html
 *
 * Same mechanism as `deck/build.mjs` and for the same reasons: the page is React components from
 * `dist/brand-kit.js`, server-rendered to static markup at build time. The output is a portable
 * single file that prints to A4 from any browser with no network — which for a one-pager matters
 * more than for a deck, because these get printed and handed over in rooms.
 *
 * There is no reveal shell here and no vendored JS at all. A one-pager is paper.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { renderToStaticMarkup } from 'react-dom/server'
import * as esbuild from 'esbuild'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HERE, '..')

const args = process.argv.slice(2)
const outArg = args.indexOf('--out')
/* Skip flags and the value that follows `--out`; whatever is left is the page name. Guarding on
   `outArg > -1` matters: without it, `outArg + 1` is 0 and the first positional argument — the
   name — is the thing that gets skipped. */
const name = args.find((a, i) => !a.startsWith('--') && !(outArg > -1 && i === outArg + 1))
if (!name) throw new Error('usage: node onepager/build.mjs <name> [--out path]')
const OUT = resolve(outArg > -1 ? args[outArg + 1] : resolve(HERE, `out/1pager-${name}-v2.html`))

const K = await import(pathToFileURL(resolve(ROOT, 'dist/brand-kit.js')).href)

/* Same strip, same reason, same assertions as deck/build.mjs — a printed page must not depend on
   a font CDN either, and a silently voided stylesheet is even harder to notice on paper. */
const STRIP_IMPORT = /@import\s*(?:url\(\s*)?(['"])[^'"]*fonts\.googleapis\.com[^'"]*\1\s*\)?\s*;?/g
const kitCss = readFileSync(resolve(ROOT, 'dist/brand-kit.css'), 'utf8')
const kitCssOffline = kitCss.replace(STRIP_IMPORT, '/* @import stripped by onepager/build.mjs; faces are vendored above */')
if (kitCssOffline === kitCss) throw new Error('brand-kit.css no longer carries the Google Fonts @import — update build.mjs')
if (kitCssOffline.includes('fonts.googleapis.com')) throw new Error('a fonts.googleapis.com reference survived the strip')
if (kitCss.length - kitCssOffline.length > 400) throw new Error('the @import strip removed far more than one @import — check the regex')
for (const token of ['--sk-ink:', '.sk-page{', '.sk-outcome{'])
  if (!kitCssOffline.includes(token)) throw new Error(`the stripped stylesheet lost "${token}" — the regex over-matched`)

const FONT_DIR = resolve(ROOT, 'deck/vendor/fonts')
const fontCss = readFileSync(resolve(FONT_DIR, 'fonts.css'), 'utf8').replace(
  /url\(\.\/([^)]+\.woff2)\)/g,
  (_, file) => `url(data:font/woff2;base64,${readFileSync(resolve(FONT_DIR, file)).toString('base64')})`,
)
if (fontCss.includes('http')) throw new Error('a font face still points at a URL')

const pageCss = readFileSync(resolve(HERE, 'src/onepager.css'), 'utf8')

/* ── The pages ───────────────────────────────────────────────────────────── */

const BUNDLE = resolve(HERE, '.build/onepager.bundle.mjs')
mkdirSync(dirname(BUNDLE), { recursive: true })
await esbuild.build({
  entryPoints: [resolve(HERE, `src/${name}.jsx`)],
  bundle: true,
  format: 'esm',
  jsx: 'automatic',
  platform: 'node',
  outfile: BUNDLE,
  external: ['react', 'react/jsx-runtime', 'react-dom'],
})
const mod = await import(pathToFileURL(BUNDLE).href)
const { title, pages } = mod.onePager(K)

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${title}</title>
<!--
  GENERATED FILE — DO NOT EDIT.
  Source: synos-landing/packages/brand-kit/onepager/src/${name}.jsx
  Rebuild: node onepager/build.mjs ${name} --out <path>
-->
<style>
${fontCss}
${kitCssOffline}
${pageCss}
</style>
</head>
<body>
${pages.map((p) => renderToStaticMarkup(p)).join('\n')}
</body>
</html>
`

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, html)
console.log(`${pages.length} page(s) -> ${OUT}  (${Math.round(html.length / 1024)} kB)`)
console.log(`  fonts inlined · no script · no network`)
