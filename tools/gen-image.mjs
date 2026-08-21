// Generate imagery with OpenAI gpt-image-1.
//
// Scope, deliberately narrow: a hero centrepiece, section textures, OG card backgrounds. Never a
// diagram. A generated picture of a diagram is the most reliable way to make a site look
// machine-made, and it cannot be edited, themed, translated or read by a screen reader.
//
// Prompts are committed next to their output in docs/diagrams/prompts/, so any image on the site
// can be regenerated or varied without guessing what produced it.
//
// Usage:
//   node tools/gen-image.mjs <prompt-file> [--size 1536x1024] [--n 1] [--out .shots/gen]
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join, basename, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))

// The key lives in ~/.synos-secrets.env as `export OPENAI_API_KEY=...`, which is not a format
// node reads. Parse it rather than requiring the caller to have sourced the file.
async function loadKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY
  const envPath = join(process.env.HOME, '.synos-secrets.env')
  const text = await readFile(envPath, 'utf8')
  const m = text.match(/^\s*(?:export\s+)?OPENAI_API_KEY\s*=\s*["']?([^"'\s#]+)/m)
  if (!m) throw new Error(`OPENAI_API_KEY not found in ${envPath}`)
  return m[1]
}

const argv = process.argv.slice(2)
const flag = (name, fallback) => { const i = argv.indexOf(name); return i === -1 ? fallback : argv[i + 1] }
const promptFile = argv.find(a => !a.startsWith('--') && argv[argv.indexOf(a) - 1]?.startsWith('--') !== true)
if (!promptFile) {
  console.error('usage: node tools/gen-image.mjs <prompt-file> [--size 1536x1024] [--n 1] [--out .shots/gen]')
  process.exit(1)
}

const size = flag('--size', '1536x1024')
const n = Number(flag('--n', '1'))
const outDir = join(ROOT, flag('--out', '.shots/gen'))

const prompt = (await readFile(join(ROOT, promptFile), 'utf8')).trim()
const key = await loadKey()

console.log(`gpt-image-1 · ${size} · n=${n}`)
console.log(`prompt: ${promptFile}\n`)

const res = await fetch('https://api.openai.com/v1/images/generations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
  body: JSON.stringify({ model: 'gpt-image-1', prompt, size, n, background: 'transparent', output_format: 'png' }),
})

if (!res.ok) {
  const body = await res.text()
  console.error(`HTTP ${res.status}\n${body.slice(0, 1200)}`)
  process.exit(1)
}

const data = await res.json()
await mkdir(outDir, { recursive: true })
const stem = basename(promptFile, extname(promptFile))

let i = 0
for (const img of data.data) {
  const out = join(outDir, n > 1 ? `${stem}-${++i}.png` : `${stem}.png`)
  await writeFile(out, Buffer.from(img.b64_json, 'base64'))
  console.log('wrote ' + out.replace(ROOT, ''))
}
