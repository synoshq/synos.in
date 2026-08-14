#!/usr/bin/env node
/**
 * Two rules the kit states about itself, checked instead of trusted.
 *
 * **1. Comments must balance.** Added after a CSS comment described "72px/400" with markdown bold
 * around the size. Two asterisks followed by a slash is a comment terminator, so the comment closed
 * on its own first line and every rule after it silently stopped being CSS. `vite build` reported
 * success, the stylesheet shipped 40% shorter, and only a fidelity assertion caught it. That
 * sequence is easy to type and invisible in a diff, so it is checked rather than remembered.
 *
 * **2. No literal colour in a component.** Every colour lives in `tokens.css`; a component that
 * hardcodes one is a colour the brand does not know it has — deck-research §D.3 found eight of
 * those in the source decks. `tokens.css` itself is exempt: that is where the literals belong.
 *
 *   node tools/css-lint.mjs
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(ROOT, 'src')
const TOKENS = join(SRC, 'styles', 'tokens.css')

const walk = (dir) =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n)
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.css') ? [p] : []
  })

const problems = []

for (const file of walk(SRC)) {
  const src = readFileSync(file, 'utf8')
  const rel = relative(ROOT, file)

  /* ── 1. Comment balance ─────────────────────────────────────────────────── */
  let depth = 0
  let i = 0
  const lineAt = (n) => src.slice(0, n).split('\n').length
  while (i < src.length - 1) {
    if (src.startsWith('/*', i)) {
      depth++
      i += 2
      continue
    }
    if (src.startsWith('*/', i)) {
      depth--
      if (depth < 0) {
        problems.push(`${rel}:${lineAt(i)} — a comment closes here that was never opened. Almost certainly a "*/" inside comment prose; everything after it stops being CSS.`)
        break
      }
      i += 2
      continue
    }
    i++
  }
  if (depth > 0) problems.push(`${rel} — ${depth} unclosed comment(s).`)

  /* ── 2. No literal colour outside tokens.css ────────────────────────────── */
  if (file !== TOKENS) {
    // Strip comments first: prose is allowed to name a hex, and every decision note here does.
    const code = src.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    for (const m of code.matchAll(/(#[0-9a-fA-F]{3,8}\b|\brgba?\([^)]*\))/g)) {
      problems.push(`${rel}:${lineAt(m.index)} — literal colour \`${m[0]}\`. Every colour is a token in src/styles/tokens.css.`)
    }
  }
}

for (const p of problems) console.log(`FAIL ${p}`)
console.log(problems.length ? `\n${problems.length} problem(s).` : 'css-lint: comments balance, no literal colour outside tokens.css.')
process.exit(problems.length ? 1 : 0)
