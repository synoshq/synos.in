// Writes public/sitemap.xml: every indexable page in public/, at its canonical URL.
//
// A page is listed when it carries <link rel="canonical"> and no robots noindex. The canonical is
// the URL, so the sitemap can never disagree with what the page says about itself. The Agent
// Maturity Index builds its own sitemap (public/agent-maturity-index/sitemap-index.xml), which
// robots.txt lists alongside this one.
//
// Run after adding, removing or renaming a page: `npm run sitemap`.
import { readdir, readFile, writeFile, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const PUBLIC = join(ROOT, 'public')
const SKIP = new Set(['partials', 'figures', 'agent-maturity-index', 'node_modules'])

async function htmlFiles(dir) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...(await htmlFiles(p)))
    else if (e.name.endsWith('.html')) out.push(p)
  }
  return out
}

// Last commit that touched the file, so lastmod moves only when the page does.
function lastmod(file) {
  try {
    const d = execFileSync('git', ['log', '-1', '--format=%cs', '--', file], { cwd: ROOT, encoding: 'utf8' }).trim()
    if (d) return d
  } catch {}
  return null
}

const urls = []
for (const file of await htmlFiles(PUBLIC)) {
  const html = await readFile(file, 'utf8')
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
  if (!canonical || /<meta name="robots" content="[^"]*noindex/.test(html)) continue
  urls.push({ loc: canonical, lastmod: lastmod(file) ?? (await stat(file)).mtime.toISOString().slice(0, 10) })
}
urls.sort((a, b) => a.loc.length - b.loc.length || a.loc.localeCompare(b.loc))

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n')}
</urlset>
`
await writeFile(join(PUBLIC, 'sitemap.xml'), xml)
console.log(`sitemap.xml · ${urls.length} pages`)
