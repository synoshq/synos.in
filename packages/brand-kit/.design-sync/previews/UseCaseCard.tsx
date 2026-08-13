import { UseCaseCard } from '@synos/brand-kit'
import { Deck, DeckFit } from './_lib/kit'

/** `flagship` — the Company Brain: indigo gradient fill, 1.5px indigo border. One per grid. */
export const Flagship = () => (
  <DeckFit width={620}>
    <UseCaseCard
      flagship
      kicker="Flagship"
      title="Company Brain"
      body="One living context graph across every team. Every function brain is an instance inside it."
    />
  </DeckFit>
)

/** Emerald — a function brain already earning. */
export const SalesBrain = () => (
  <Deck>
    <UseCaseCard
      tone="emerald"
      kicker="Function"
      title="Sales Brain"
      body="A template your team builds on SynOS and owns, tuned on your pipeline and your corrections."
    />
  </Deck>
)

/** Violet — the builder's case. */
export const CustomAgents = () => (
  <Deck>
    <UseCaseCard
      tone="violet"
      kicker="Product"
      title="Custom AI agents & products"
      body="Builders and agencies ship on the same rails, without rebuilding the layer underneath."
    />
  </Deck>
)

/** Amber — the one still being built. */
export const FinOpsBrain = () => (
  <Deck>
    <UseCaseCard
      tone="amber"
      kicker="Function"
      title="FinOps Brain"
      body="Cloud spend, tagged and explained, with the working shown against the invoice."
    />
  </Deck>
)

/** Neutral — the default card, no hue claimed. */
export const Neutral = () => (
  <Deck>
    <UseCaseCard
      kicker="Function"
      title="Internal Ops Brain"
      body="One skill, versioned, reused across every region instead of rebuilt in each."
    />
  </Deck>
)
