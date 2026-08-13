import { homedir } from 'node:os'

/** The GTM repo is READ-ONLY for this package. Nothing here ever writes to it. */
export const SOURCE_ROOT = `${homedir()}/ws/synos-gtm`

/** The seven source artifacts, newest first within each kind. */
export const SOURCES = [
  { key: 'presenting', path: 'presentations/synos-vc-deck-presenting.html', kind: 'deck', date: '2026-08-12' },
  { key: 'v6', path: 'presentations/synos-vc-deck-v6.html', kind: 'deck', date: '2026-08-12' },
  { key: 'tech-v2', path: 'presentations/synos-tech-buyer-v2.html', kind: 'deck', date: '2026-08-09' },
  { key: 'ops', path: 'presentations/synos-ops-buyer.standalone.html', kind: 'deck', date: '2026-07-17' },
  { key: '1p-vc', path: 'pitch-materials/SYNOS_VC_1PAGER.html', kind: 'onepager', date: '2026-08-11' },
  { key: '1p-retail', path: 'pitch-materials/1pager-retail-multistore-cto.html', kind: 'onepager', date: '2026-08-09' },
  { key: '1p-fin', path: 'pitch-materials/1pager-financial-inclusion-cto.html', kind: 'onepager', date: '2026-08-09' },
  { key: 'memo', path: 'pitch-materials/SYNOS_FOUNDER_MEMO_SHORT.html', kind: 'memo', date: '2026-08-11' },
]

export const byKey = (k) => SOURCES.find((s) => s.key === k)

/**
 * Reveal.js stage size per deck, read out of each file's `Reveal.initialize({ width, height })`.
 * This matters: `.card-frame` declares `width:1380px` but also `max-width:99%`, and the VC decks
 * run reveal at 1280 wide — so the card as actually shipped renders at 1267.2px, not 1380px.
 * Fidelity captures use the deck's own stage size so both sides are measured under the same clamp.
 */
export const STAGE = {
  presenting: { width: 1280, height: 720 },
  v6: { width: 1280, height: 720 },
  'tech-v2': { width: 1280, height: 800 },
  ops: { width: 1280, height: 800 },
}
