/**
 * The deck definition: 35 slides, in order, as they appear in
 * `~/ws/synos-gtm/presentations/synos-vc-deck-v6.html`.
 *
 * 1        cover
 * 2–21     the argument
 * 22       closing wordmark
 * 23       "end of the main deck" divider
 * 24–35    appendix
 *
 * The 21-slide main deck is deliberately unchanged. deck-research §F.1 measured the structure
 * against the decks that raised — Front's Series A was also 21 — and found the slide count is not
 * the problem. This pass changes the substrate and nothing else.
 *
 * Takes the built kit as an argument rather than importing it, the same way `tools/composed.mjs`
 * does, so a different build of the kit can render the same deck. That is what makes a
 * before/after comparison honest.
 */
import { mainSlides } from './slides-main.jsx'
import { appendixSlides } from './slides-appendix.jsx'

/** @param K the built brand-kit module — `dist/brand-kit.js`. */
export const deck = (K) => [...mainSlides(K), ...appendixSlides(K)]
