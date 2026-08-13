#!/usr/bin/env node
/**
 * Reproduces the measurements in docs/plans/2026-08-13-slide-inventory.md.
 *
 *   node fidelity/scripts/inventory.mjs            # class frequency table
 *   node fidelity/scripts/inventory.mjs --slides   # per-slide archetype walk
 *
 * Read-only against ~/ws/synos-gtm.
 */
import { readFileSync } from 'node:fs'
import { SOURCES, SOURCE_ROOT } from './sources.mjs'

const bodyOf = (html) => {
  const i = html.indexOf('<body')
  return (i > 0 ? html.slice(i) : html)
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
}

const files = SOURCES.map((s) => ({ ...s, html: readFileSync(`${SOURCE_ROOT}/${s.path}`, 'utf8') }))

if (process.argv.includes('--slides')) {
  for (const f of files) {
    const body = bodyOf(f.html).replace(/<svg[\s\S]*?<\/svg>/g, ' [SVG] ')
    const slides = body.split(/<section[^>]*class="[^"]*has-card/).slice(1)
    console.log(`#### ${f.key} — ${slides.length} slides`)
    slides.forEach((s, i) => {
      const frame = /class="card-frame([^"]*)"/.exec(s)?.[1]?.trim() || '-'
      const eyebrow = /class="eyebrow[^"]*"[^>]*>([^<]*)/.exec(s)?.[1]?.trim() ?? ''
      const h1 = /<h1[^>]*>([\s\S]*?)<\/h1>/.exec(s)?.[1]?.replace(/<[^>]+>/g, '').trim() ?? ''
      console.log(`${String(i + 1).padStart(2)} | ${frame} | ${eyebrow.slice(0, 34)} | ${h1.slice(0, 50)}`)
    })
    console.log()
  }
  process.exit(0)
}

const per = new Map()
for (const f of files) {
  const counts = new Map()
  for (const m of bodyOf(f.html).matchAll(/class="([^"]+)"/g)) {
    for (const cls of m[1].split(/\s+/)) counts.set(cls, (counts.get(cls) ?? 0) + 1)
  }
  per.set(f.key, counts)
}

const keys = files.map((f) => f.key)
const total = new Map()
for (const counts of per.values()) {
  for (const [cls, n] of counts) total.set(cls, (total.get(cls) ?? 0) + n)
}

console.log(['class', ...keys, 'TOTAL', 'FILES'].join('\t'))
for (const [cls, n] of [...total].sort((a, b) => b[1] - a[1])) {
  const row = keys.map((k) => per.get(k).get(cls) ?? 0)
  const nFiles = row.filter(Boolean).length
  if (nFiles >= 2 || n >= 3) console.log([cls, ...row, n, nFiles].join('\t'))
}
