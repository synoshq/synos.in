import { StatCard } from '@synos/brand-kit'
import { Deck } from './_lib/kit'

/** Indigo — the default. */
export const Indigo = () => (
  <Deck>
    <StatCard value="78%" label="of enterprise AI pilots never reach production" source="Industry survey, 2025" />
  </Deck>
)

/** Violet — what the agents are doing. */
export const Violet = () => (
  <Deck>
    <StatCard tone="violet" value="3" label="engagements live on the layer" source="As of Aug 2026" />
  </Deck>
)

/** Emerald — a win. */
export const Emerald = () => (
  <Deck>
    <StatCard tone="emerald" value="2 wks" label="from install to a working Company Brain" source="Median, first three engagements" />
  </Deck>
)

/** Amber — the caution. */
export const Amber = () => (
  <Deck>
    <StatCard tone="amber" value="6" label="walls between a clever demo and company value" source="Field interviews" />
  </Deck>
)

/** Red — the pain. */
export const Red = () => (
  <Deck>
    <StatCard tone="red" value="0" label="of what one team learns reaches the next" source="Every company we have opened up" />
  </Deck>
)
