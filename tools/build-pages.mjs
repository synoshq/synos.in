// Injects public/partials/*.html between markers in every page and rewrites in place.
//
// Not a framework. The committed HTML stays exactly what Vercel serves, so the property that made
// the original "no build step" rule good survives. What it buys: sixteen pages cannot drift into
// sixteen different navs.
//
// A page opts in by carrying the marker pair:
//   <!-- @partial nav -->  ...anything here is replaced...  <!-- @endpartial nav -->
//
// Running it twice must change nothing the second time. `npm run pages` reports whether that held.
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const PUBLIC = join(ROOT, 'public')
const PARTIALS = join(PUBLIC, 'partials')

const partials = {}
for (const e of await readdir(PARTIALS)) {
  if (e.endsWith('.html')) {
    partials[e.replace(/\.html$/, '')] = (await readFile(join(PARTIALS, e), 'utf8')).trim()
  }
}

async function htmlFiles(dir) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name === 'partials' || e.name === 'node_modules') continue
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...await htmlFiles(p))
    else if (e.name.endsWith('.html')) out.push(p)
  }
  return out
}

let changed = 0
const missing = []

for (const file of await htmlFiles(PUBLIC)) {
  const before = await readFile(file, 'utf8')
  let after = before
  for (const [name, body] of Object.entries(partials)) {
    const re = new RegExp(`(<!--\\s*@partial ${name}\\s*-->)[\\s\\S]*?(<!--\\s*@endpartial ${name}\\s*-->)`, 'g')
    if (!re.test(after)) { missing.push(`${relative(ROOT, file)} has no ${name} marker`); continue }
    after = after.replace(re, `$1\n${body}\n$2`)
  }
  if (after !== before) {
    await writeFile(file, after)
    changed++
    console.log('updated ' + relative(ROOT, file))
  }
}

console.log(`\nbuild-pages: ${changed} file(s) updated`)
if (missing.length) {
  console.log('\nnot injected (no marker):')
  for (const m of missing) console.log('  ' + m)
}
