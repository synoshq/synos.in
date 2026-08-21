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


// Two rule sets, because they have different scopes.
//
// ALWAYS runs on every page, migrated or not. These are names, and a name being wrong on a page
// nobody has rewritten yet is still wrong on the live site. They are also cheap to keep right.
//
// SCOPED runs only on pages in migrated.json. These are style rules whose fixes would be thrown
// away on a page scheduled for rewrite.
//
// [pattern, allowed-contexts] — a hit is a failure only when no allowed context matches the window.
const ALWAYS = [
  // migrated Jul 14, still shipping until 2026-08-21
  [/Agent-Native Operating Layer/gi, []],
  [/Context Brain/gi, []],
  // canonical casing decided 2026-08-21. Bare word only: synos.in and synos-landing are fine.
  [/(?<![\w./-])Synos(?![\w.-])/g, []],
]

const SCOPED = [
  [/self-learning/gi, [/Self-Learning Loop/i]],
  [/shared brain/gi, []],
  [/hive mind/gi, []],
  [/\bAI OS\b/g, []],
  [/\bagent OS\b/gi, []],
  [/operating system/gi, []],
  [/solo founder/gi, []],
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
  const scoped = inScope(rel)
  if (scoped) checked++
  const text = await visibleTextOf(file)
  for (const [re, allow] of scoped ? [...ALWAYS, ...SCOPED] : ALWAYS) {
    for (const m of text.matchAll(re)) {
      const window = text.slice(Math.max(0, m.index - 40), m.index + 60)
      if (allow.some(a => a.test(window))) continue
      failures.push(`${rel}: "${m[0]}" · ${window}`)
    }
  }
}

if (failures.length) {
  console.error(`vocab gate: ${failures.length} failure(s) · names on all ${total} pages, style rules on ${checked}\n`)
  for (const f of failures) console.error('  ' + f)
  process.exit(1)
}
console.log(`vocab gate: clean · names checked on all ${total} pages, style rules on ${checked}`)
