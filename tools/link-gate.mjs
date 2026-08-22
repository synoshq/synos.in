// Every internal href on every page has to resolve to a file Vercel will actually serve.
//
// This exists because the site is hand-written HTML with no router and no build step, so a link
// to a page that was renamed or never created fails silently and only in production. Phase 3 and
// phase 4 both shipped links to pages that did not exist yet, deliberately, and nothing would have
// told us if one had been left behind.
//
// Resolution mirrors vercel.json: cleanUrls is on, so /foo serves public/foo.html.
//
// Usage: node tools/link-gate.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const PUBLIC = path.join(ROOT, 'public')

const pages = []
;(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p)
    else if (e.name.endsWith('.html')) pages.push(p)
  }
})(PUBLIC)

// Anything with a scheme, a fragment or a mail target is somebody else's problem. `data:` matters
// here specifically: the favicon is an inline SVG data URI and a naive checker reports it as a
// broken link on every single page, which is how this check first "found" 24 defects.
const external = u =>
  /^(https?:|mailto:|tel:|data:|javascript:|#)/i.test(u)

function resolves(url) {
  const clean = url.split('#')[0].split('?')[0]
  if (!clean) return true
  if (!clean.startsWith('/')) return true       // relative links are not used on this site
  if (clean === '/') return fs.existsSync(path.join(PUBLIC, 'index.html'))
  const candidates = [
    path.join(PUBLIC, clean),                    // an asset with its extension
    path.join(PUBLIC, clean + '.html'),          // cleanUrls
    path.join(PUBLIC, clean, 'index.html'),      // a directory index
  ]
  return candidates.some(c => fs.existsSync(c))
}

let failed = 0
for (const file of pages) {
  const rel = '/' + path.relative(PUBLIC, file)
  const html = fs.readFileSync(file, 'utf8')
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = m[1]
    if (external(url)) continue
    if (resolves(url)) continue
    failed++
    console.log(`  FAIL ${rel}  ->  ${url}`)
  }
}

if (failed) {
  console.error(`\nlink gate: ${failed} unresolved link(s)`)
  process.exit(1)
}
console.log(`link gate: clean · ${pages.length} pages`)
