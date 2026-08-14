#!/usr/bin/env node
/**
 * Vendor the three brand faces from Google Fonts, once, into this directory.
 *
 * deck-research §C.4 measured the shipped VC deck loading its fonts, reveal's CSS and reveal's JS
 * from CDNs at present time — so a meeting on bad conference wifi renders the deck in fallback
 * faces at the wrong metrics, and there is no standalone build to fall back to. The deck build
 * inlines `fonts.css` and base64s these files, so the shipped `.html` resolves every glyph from
 * itself.
 *
 * Only the `latin` and `latin-ext` subsets are kept. The full css2 response carries 51 files
 * across Cyrillic, Greek and Vietnamese; the deck is English and every byte of the rest would be
 * base64'd into the artifact a VC downloads.
 *
 *   node fetch-fonts.mjs      # re-run only to re-vendor; the output is committed
 */
import { writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'
const API =
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1' +
  '&family=Inter:wght@400;500;600;700;800' +
  '&family=JetBrains+Mono:wght@500;600&display=swap'

/** The two subsets an English investor deck needs. Everything else is weight in the artifact. */
const KEEP = new Set(['latin', 'latin-ext'])

const css = await (await fetch(API, { headers: { 'User-Agent': UA } })).text()

/** css2 emits `/* latin *\/` immediately before each @font-face it belongs to. */
const blocks = []
const re = /\/\*\s*([a-z0-9-]+)\s*\*\/\s*(@font-face\s*\{[^}]*\})/gi
for (let m; (m = re.exec(css)); ) blocks.push({ subset: m[1], rule: m[2] })

const out = []
let n = 0
for (const { subset, rule } of blocks) {
  if (!KEEP.has(subset)) continue
  const family = /font-family:\s*'([^']+)'/.exec(rule)[1]
  const weight = /font-weight:\s*(\d+)/.exec(rule)[1]
  const style = /font-style:\s*(\w+)/.exec(rule)[1]
  const url = /src:\s*url\(([^)]+)\)/.exec(rule)[1]
  const file = `${family.toLowerCase().replace(/\s+/g, '-')}-${weight}${style === 'italic' ? 'i' : ''}-${subset}.woff2`
  writeFileSync(resolve(HERE, file), Buffer.from(await (await fetch(url)).arrayBuffer()))
  out.push(rule.replace(url, `./${file}`))
  n++
}

writeFileSync(
  resolve(HERE, 'fonts.css'),
  `/* Vendored from Google Fonts by fetch-fonts.mjs. ${n} faces, latin + latin-ext only.\n` +
    `   Do not edit by hand; do not point this at a CDN. deck-research §C.4 / G13. */\n` +
    out.join('\n') +
    '\n',
)
console.log(`vendored ${n} faces -> ${HERE}`)
