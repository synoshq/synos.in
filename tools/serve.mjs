// Dev server. Serves public/ the way Vercel does, and mounts the diagram prototypes at
// /_diagrams/ so work-in-progress figures can be opened in a real browser without moving them
// into public/ and risking a deploy.
//
// Usage:  node tools/serve.mjs [port]      default 8900
import { createServer } from 'node:http'
import { readdir, readFile } from 'node:fs/promises'
import { join, extname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const PUBLIC = join(ROOT, 'public')
const DIAGRAMS = join(ROOT, 'docs/diagrams')
const PORT = Number(process.argv[2] || 8900)

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.mp4': 'video/mp4', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8',
}

async function list(dir, base) {
  const out = []
  try {
    for (const e of await readdir(dir, { withFileTypes: true })) {
      if (e.name === 'partials' || e.name === 'node_modules' || e.name.startsWith('.')) continue
      const p = join(dir, e.name)
      if (e.isDirectory()) out.push(...await list(p, base))
      else if (e.name.endsWith('.html')) out.push('/' + relative(base, p))
    }
  } catch {}
  return out.sort()
}

function indexPage(pages, diagrams) {
  const li = (href, label) => `<li><a href="${href}">${label}</a></li>`
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>SynOS dev</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/synos.css">
<style>
  body{padding:64px 24px}
  .wrap{max-width:760px;margin:0 auto}
  h2{margin-top:var(--sk-space-8)}
  ul{list-style:none;display:grid;gap:var(--sk-space-2);margin-top:var(--sk-space-5)}
  li a{display:block;padding:12px 16px;background:var(--sk-surface);border:1px solid var(--sk-border);
       border-radius:var(--sk-radius-sm);text-decoration:none;color:var(--sk-ink);font-size:14px}
  li a:hover{border-color:var(--sk-indigo-2);color:var(--sk-brand-text)}
</style></head><body><div class="wrap">
<p class="sk-eyebrow">Local dev</p>
<h1>SynOS</h1>
<p class="sk-sub" style="margin-top:var(--sk-space-5)">Serving <code>public/</code> as Vercel does, with the diagram prototypes mounted at <code>/_diagrams/</code>.</p>
<h2>Diagram prototypes</h2><ul>${diagrams.map(d => li('/_diagrams' + d, d.replace(/^\//, '').replace(/\.html$/, ''))).join('')}</ul>
<h2>Pages</h2><ul>${pages.map(p => li(p, p.replace(/^\//, ''))).join('')}</ul>
</div></body></html>`
}

// Mirror the response headers vercel.json sets in production.
//
// This exists because the dev server used to send none of them, so anything header-dependent
// worked locally and broke only once deployed. That is precisely how X-Frame-Options: DENY sat in
// vercel.json unnoticed while every figure on the site is a same-origin iframe: locally the frames
// loaded, in production every one of them would have been blank. Serving the real headers means
// the render gate and every screenshot now exercise what visitors actually get.
const VERCEL_HEADERS = await (async () => {
  try {
    const cfg = JSON.parse(await readFile(join(ROOT, 'vercel.json'), 'utf8'))
    const all = (cfg.headers || []).filter(h => h.source === '/(.*)')
    return Object.fromEntries(all.flatMap(h => h.headers.map(x => [x.key, x.value])))
  } catch {
    return {}
  }
})()

const server = createServer(async (req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0])

  if (p === '/' || p === '/_index') {
    const body = indexPage(await list(PUBLIC, PUBLIC), await list(DIAGRAMS, DIAGRAMS))
    res.writeHead(200, { 'Content-Type': MIME['.html'] }).end(body)
    return
  }

  const roots = p.startsWith('/_diagrams/')
    ? [join(DIAGRAMS, p.replace('/_diagrams/', '')), null]
    : [join(PUBLIC, p), null]

  // Shared assets always come from public/, whichever mount the page came from.
  roots[1] = join(PUBLIC, p)

  for (let file of roots) {
    if (!file) continue
    if (!extname(file)) file += '.html'   // Vercel cleanUrls
    try {
      const body = await readFile(file)
      res.writeHead(200, {
        ...VERCEL_HEADERS,
        'Content-Type': MIME[extname(file)] || 'application/octet-stream',
        'Cache-Control': 'no-store',
      }).end(body)
      return
    } catch {}
  }
  res.writeHead(404, { 'Content-Type': MIME['.html'] }).end('<p>not found. <a href="/">index</a></p>')
})

server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n  SynOS dev server\n`)
  console.log(`  index      http://localhost:${PORT}/`)
  console.log(`  diagrams   http://localhost:${PORT}/_diagrams/hero-layer-stack.html`)
  console.log(`  about      http://localhost:${PORT}/about\n`)
})
