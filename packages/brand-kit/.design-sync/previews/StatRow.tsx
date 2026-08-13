import { StatRow, StatCard } from '@synos/brand-kit'
import { DeckFit, SLIDE_BODY } from './_lib/kit'

/** "Why now" — three numbers and where each came from. */
export const WhyNow = () => (
  <DeckFit width={SLIDE_BODY}>
    <StatRow>
      <StatCard value="78%" label="of enterprise AI pilots never reach production" source="Industry survey, 2025" />
      <StatCard tone="violet" value="3" label="engagements live on the layer" source="As of Aug 2026" />
      <StatCard tone="amber" value="6" label="walls between a clever demo and company value" source="Field interviews" />
    </StatRow>
  </DeckFit>
)

/** Two across — the `.g2` cut, when the slide only carries a pair. */
export const TwoUp = () => (
  <DeckFit width={820}>
    <StatRow>
      <StatCard tone="emerald" value="2 wks" label="from install to a working Company Brain" source="Median, first three engagements" />
      <StatCard tone="red" value="0" label="of what one team learns reaches the next" source="Every company we have opened up" />
    </StatRow>
  </DeckFit>
)
