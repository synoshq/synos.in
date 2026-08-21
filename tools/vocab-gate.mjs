// The vocabulary guardrails recorded in CLAUDE.md, as an exit code.
// CLAUDE.md already said this grep "must return zero lines". It did not.
import { readdir } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { visibleTextOf } from './lib/render-text.mjs'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const PUBLIC = join(ROOT, 'public')

// [pattern, allowed-contexts] — a hit is a failure only when no allowed context matches
// the window around it.
const RULES = [
  [/self-learning/gi, [/Self-Learning Loop/i]],
  [/shared brain/gi, []],
  [/hive mind/gi, []],
  [/\bAI OS\b/g, []],
  [/\bagent OS\b/gi, []],
  [/operating system/gi, []],
  [/solo founder/gi, []],
  // migrated Jul 14, never swept
  [/Agent-Native Operating Layer/gi, []],
  [/Context Brain/gi, []],
  // canonical casing decided 2026-08-21
  [/\bSynos\b/g, []],
]

async function htmlFiles(dir) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules') continue
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
  for (const [re, allow] of RULES) {
    for (const m of text.matchAll(re)) {
      const window = text.slice(Math.max(0, m.index - 40), m.index + 60)
      if (allow.some(a => a.test(window))) continue
      failures.push(`${rel}: "${m[0]}" · ${window}`)
    }
  }
}

if (failures.length) {
  console.error(`vocab gate: ${failures.length} failure(s)\n`)
  for (const f of failures) console.error('  ' + f)
  process.exit(1)
}
console.log('vocab gate: clean')
