import { Eyebrow } from '@synos/brand-kit'
import { Deck, Print } from './_lib/kit'

/** The default grey label. Used on most of the 144 slides that carry an eyebrow. */
export const Muted = () => (
  <Deck>
    <Eyebrow>Landscape</Eyebrow>
  </Deck>
)

/** Indigo — us, SynOS, the operating layer itself. 75 uses, the most-used hue. */
export const Indigo = () => (
  <Deck>
    <Eyebrow tone="indigo">What we built · job one, today</Eyebrow>
  </Deck>
)

/** Violet — AI, agents, knowledge, what comes next. */
export const Violet = () => (
  <Deck>
    <Eyebrow tone="violet">The premise</Eyebrow>
  </Deck>
)

/** Emerald — a win, something live, money saved. */
export const Emerald = () => (
  <Deck>
    <Eyebrow tone="emerald">What it is worth</Eyebrow>
  </Deck>
)

/** Amber — caution, an objection, work in progress. */
export const Amber = () => (
  <Deck>
    <Eyebrow tone="amber">The objections we get</Eyebrow>
  </Deck>
)

/** Red — pain, a wall, the status quo. */
export const Red = () => (
  <Deck>
    <Eyebrow tone="red">Where they are today</Eyebrow>
  </Deck>
)

/** The cover treatment: tracking widened to 2.4px. Cover slides only. */
export const Spaced = () => (
  <Deck>
    <Eyebrow tone="violet" spaced>
      SynOS
    </Eyebrow>
  </Deck>
)

/** Print scale — the one-pager `.sec-label`, with its mono badge. */
export const PrintWithBadge = () => (
  <Print>
    <Eyebrow scale="print" badge="3 live">
      The now-problem
    </Eyebrow>
    <Eyebrow scale="print" tone="emerald" badge="paid">
      Where it already works
    </Eyebrow>
  </Print>
)
