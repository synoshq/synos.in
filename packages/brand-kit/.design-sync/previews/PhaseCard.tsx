import { PhaseCard } from '@synos/brand-kit'
import { Deck, Print } from './_lib/kit'

/** `position="near"` — indigo. Where the product is today. */
export const Near = () => (
  <Deck>
    <PhaseCard
      badge="S1"
      when="Today"
      title="Unblock"
      body="Agents that can actually reach the systems of record, under the access rules you already run."
      foot="LIVE · 3 engagements"
    />
  </Deck>
)

/** `position="bridge"` — the badge takes the brand gradient. */
export const Bridge = () => (
  <Deck>
    <PhaseCard
      badge="S2"
      when="Next"
      title="Compound"
      position="bridge"
      body="Every run traced. Every trace a labelled example the next run starts from."
      foot="BUILDING"
    />
  </Deck>
)

/** `position="far"` — violet. The horizon. */
export const Far = () => (
  <Deck>
    <PhaseCard
      badge="S3"
      when="Then"
      title="Own the loop"
      position="far"
      body="The training ground for the models and the skills your company owns outright."
      foot="THE MOAT"
    />
  </Deck>
)

/** Print scale — the one-pager's three-across horizon strip. */
export const PrintScale = () => (
  <Print>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 7 }}>
      <PhaseCard scale="print" badge="S1" when="Now" title="Unblock" body="Agents that can actually reach the systems of record." />
      <PhaseCard scale="print" badge="S2" when="Next" title="Compound" position="bridge" body="Every run traced, every trace a labelled example." />
      <PhaseCard scale="print" badge="S3" when="Then" title="Own it" position="far" body="The training ground for models you own." />
    </div>
  </Print>
)
