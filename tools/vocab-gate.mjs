// The vocabulary guardrails recorded in CLAUDE.md, as an exit code.
// CLAUDE.md already said this grep "must return zero lines". It did not.
import { readdir, readFile } from 'node:fs/promises'

import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { visibleTextOf } from './lib/render-text.mjs'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const PUBLIC = join(ROOT, 'public')

// Scope. See tools/migrated.json: a gate that passes because it is not looking is worse than no
// gate, so which pages are checked is written down rather than implied.
const MIGRATED = new Set(
  JSON.parse(await readFile(new URL('./migrated.json', import.meta.url), 'utf8')).migrated
)
const inScope = rel => MIGRATED.has('/' + rel.replace(/^public\//, ''))


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
    if (e.name === 'partials' || e.name === 'node_modules') continue  // partials are checked through the pages they inject into
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...await htmlFiles(p))
    else if (e.name.endsWith('.html')) out.push(p)
  }
  return out
}

const failures = []
let checked = 0, total = 0
for (const file of await htmlFiles(PUBLIC)) {
  const rel = relative(ROOT, file)
  total++
  if (!inScope(rel)) continue
  checked++
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
  console.error(`vocab gate: ${failures.length} failure(s) across ${checked} of ${total} pages in scope\n`)
  for (const f of failures) console.error('  ' + f)
  process.exit(1)
}
console.log(`vocab gate: clean · ${checked} of ${total} pages in scope`)
