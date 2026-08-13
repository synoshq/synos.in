import { PhaseRow, PhaseCard } from '@synos/brand-kit'
import { DeckFit, SLIDE_BODY } from './_lib/kit'

/** "The play" — today, next, then. The arc runs indigo → gradient → violet. */
export const ThePlay = () => (
  <DeckFit width={SLIDE_BODY}>
    <PhaseRow>
      <PhaseCard
        badge="S1"
        when="Today"
        title="Unblock"
        body="Agents that can actually reach the systems of record, under the access rules you already run."
        foot="LIVE · 3 engagements"
      />
      <PhaseCard
        badge="S2"
        when="Next"
        title="Compound"
        position="bridge"
        body="Every run traced. Every trace a labelled example the next run starts from."
        foot="BUILDING"
      />
      <PhaseCard
        badge="S3"
        when="Then"
        title="Own the loop"
        position="far"
        body="The training ground for the models and the skills your company owns outright."
        foot="THE MOAT"
      />
    </PhaseRow>
  </DeckFit>
)

/** Two phases — the shorter arc the buyer decks run. */
export const TwoUp = () => (
  <DeckFit width={820}>
    <PhaseRow>
      <PhaseCard badge="01" when="Weeks 1–2" title="One team" body="A working Company Brain on your own cloud, with your own data." foot="PILOT" />
      <PhaseCard badge="02" when="Quarter 1" title="Every team" position="far" body="The same environment, the same access rules, across the company." foot="ROLLOUT" />
    </PhaseRow>
  </DeckFit>
)
