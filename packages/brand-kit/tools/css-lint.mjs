#!/usr/bin/env node
/**
 * Three rules the kit states about itself, checked instead of trusted.
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
 * **3. The density register may not reach above the headline.** `Density.css` is a second type
 * register a deck opts into (`<SlideFrame density="compact">`). The eyebrow sits ABOVE the h1, so
 * any rule that tightens it MOVES the headline — and the h1's fixed top offset is decision I, the
 * thing the 2026-08-14 rebuild bought by collapsing 27 distinct h1 positions across 35 slides down
 * to 2. A `.sk-eyebrow` rule in that deck's original dense block produced a third position
 * immediately, which is how the constraint was found. A comment cannot enforce it; this can.
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

/* ── 3. The density register may not reach above the headline ─────────────── */
const DENSITY = join(SRC, 'deck', 'Density.css')
{
  const src = readFileSync(DENSITY, 'utf8')
  const rel = relative(ROOT, DENSITY)
  const lineAt = (n) => src.slice(0, n).split('\n').length
  /* Blank comments out in place, so offsets — and therefore line numbers — stay true. */
  const code = src.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))

  /* The h1 may give up the space BELOW it and nothing else: its own bottom margin closes the gap
     under the headline without moving the headline. */
  const H1_ALLOWED = new Set(['margin-bottom', 'padding-bottom'])

  for (const rule of code.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selector = rule[1].trim().replace(/\s+/g, ' ')
    const at = lineAt(rule.index)
    const props = [...rule[2].matchAll(/([a-z-]+)\s*:/g)].map((m) => m[1])

    if (/\.sk-eyebrow\b/.test(selector)) {
      problems.push(
        `${rel}:${at} — \`${selector}\` targets the eyebrow. The eyebrow sits above the h1, so ` +
          `changing it moves the headline and breaks decision I. Pay the space out of the ` +
          `subtitle, the body or the gaps instead.`,
      )
    }

    if (/\bh1\b/.test(selector)) {
      const bad = props.filter((p) => !H1_ALLOWED.has(p))
      if (bad.length) {
        problems.push(
          `${rel}:${at} — \`${selector}\` sets ${bad.map((p) => `\`${p}\``).join(', ')}. The ` +
            `density register may only set ${[...H1_ALLOWED].map((p) => `\`${p}\``).join(' or ')} ` +
            `on the h1: its size, face and top position are fixed across every register.`,
        )
      }
    }

    /* `.sk-header` itself: its bottom margin is the gap under the whole block and is fair game;
       anything that shortens it from the top drags the headline up with it. */
    if (/\.sk-header\s*$/.test(selector)) {
      const bad = props.filter((p) => /^(margin|padding)-top$/.test(p) || p === 'margin' || p === 'padding')
      if (bad.length) {
        problems.push(
          `${rel}:${at} — \`${selector}\` sets ${bad.map((p) => `\`${p}\``).join(', ')}, which ` +
            `moves the header block's top edge and therefore the h1. Only its bottom spacing may ` +
            `change between registers.`,
        )
      }
    }
  }
}

for (const p of problems) console.log(`FAIL ${p}`)
console.log(
  problems.length
    ? `\n${problems.length} problem(s).`
    : 'css-lint: comments balance, no literal colour outside tokens.css, density register stays below the h1.',
)
process.exit(problems.length ? 1 : 0)
