/**
 * The PRESENTING deck: the same 36 sections as `deck.jsx`, with the main argument cut for a room.
 *
 *   node deck/build.mjs --deck presenting
 *
 * Two artifacts, two jobs. `deck.jsx` is the READING deck — sent without a presenter, so its words
 * are doing real work. This one is projected while somebody talks, so the words a presenter is
 * going to say are not also on the wall. Nothing is lost: every cut sentence is on the slide it came
 * off as a speaker note (`notes` on the slide record → reveal's `<aside class="notes">`, press S).
 *
 * The appendix is deliberately SHARED with the reading deck and NOT cut. Appendix slides are never
 * presented — they are turned to when a specific question is asked, and then they are read, at the
 * reading register, by two people leaning at a screen. Cutting them would remove the detail at
 * exactly the moment somebody asked for detail.
 */
import { presentingMainSlides } from './presenting-main.jsx'
import { appendixSlides } from './slides-appendix.jsx'

/** @param K the built brand-kit module — `dist/brand-kit.js`. */
export const deck = (K) => [...presentingMainSlides(K), ...appendixSlides(K)]
