// Returns the visible text of an HTML file: no <script>, no <style>, no comments,
// entities decoded, whitespace collapsed.
//
// The distinction matters. The 2026-08-16 deck session measured 520 em dashes in source and 427 in
// rendered copy, because source comments are not outward copy and must not be counted as if they
// were.
import { readFile } from 'node:fs/promises'

const ENTITIES = {
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'",
  '&nbsp;': ' ', '&mdash;': '—', '&ndash;': '–',
  '&ldquo;': '“', '&rdquo;': '”', '&lsquo;': '‘', '&rsquo;': '’',
  '&rarr;': '→', '&larr;': '←', '&times;': '×', '&hellip;': '…',
  '&middot;': '·', '&copy;': '©', '&deg;': '°', '&eacute;': 'é',
}

export function toVisibleText(html) {
  let s = html
  s = s.replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
  s = s.replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
  s = s.replace(/<!--[\s\S]*?-->/g, ' ')
  s = s.replace(/<[^>]+>/g, ' ')
  s = s.replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
  s = s.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  for (const [ent, ch] of Object.entries(ENTITIES)) s = s.split(ent).join(ch)
  return s.replace(/\s+/g, ' ').trim()
}

export async function visibleTextOf(path) {
  return toVisibleText(await readFile(path, 'utf8'))
}

// Visible text split into sentence-ish units, for the shape rules.
export function sentences(text) {
  return text.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(Boolean)
}
