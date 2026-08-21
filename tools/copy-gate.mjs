// Fails on the outward-copy rules that are reliably detectable.
// See docs/COPY_STANDARD.md for the four review rules this deliberately does not attempt.
import { readdir } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { visibleTextOf, sentences } from './lib/render-text.mjs'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const PUBLIC = join(ROOT, 'public')

const BANNED = [
  'leverage', 'robust', 'seamless', 'unlock', 'delve', 'journey', 'quietly', 'moat',
  'game-changer', 'cutting-edge', 'best-in-class', 'revolutionise', 'revolutionize',
  'empower', 'supercharge', 'effortless', 'turnkey',
]

const SHAPES = [
  { name: 'negation pivot', re: /\bnot just\b[^.]{0,80}\bbut\b/i },
  { name: 'negation pivot', re: /\bit'?s not about\b[^.]{0,60}\bit'?s about\b/i },
  { name: 'payoff beat', re: /^that'?s (the|what|why|us)\b[^.]{0,40}\.$/i },
]

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

const failures = []
for (const file of await htmlFiles(PUBLIC)) {
  const rel = relative(ROOT, file)
  const text = await visibleTextOf(file)

  for (const m of text.matchAll(/[—–]/g)) {
    failures.push(`${rel}: dash · ${text.slice(Math.max(0, m.index - 45), m.index + 45)}`)
  }
  for (const word of BANNED) {
    for (const m of text.matchAll(new RegExp(`\\b${word}\\b`, 'gi'))) {
      failures.push(`${rel}: banned "${word}" · ${text.slice(Math.max(0, m.index - 45), m.index + 45)}`)
    }
  }
  for (const s of sentences(text)) {
    for (const shape of SHAPES) {
      if (shape.re.test(s)) failures.push(`${rel}: ${shape.name} · ${s.slice(0, 110)}`)
    }
  }
}

if (failures.length) {
  console.error(`copy gate: ${failures.length} failure(s)\n`)
  for (const f of failures) console.error('  ' + f)
  process.exit(1)
}
console.log('copy gate: clean')
