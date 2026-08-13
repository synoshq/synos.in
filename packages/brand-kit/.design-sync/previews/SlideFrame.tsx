import {
  SlideFrame,
  SlideHeader,
  PhaseRow,
  PhaseCard,
  PillarGrid,
  PillarCard,
  Callout,
} from '@synos/brand-kit'
import { DeckFit, Ico, GLYPH, SLIDE } from './_lib/kit'

/**
 * `variant="default"` — the card 140 of the 148 slides in the corpus use.
 * Slide 2 of the VC deck, "The premise".
 */
export const Default = () => (
  <DeckFit width={SLIDE}>
    <SlideFrame stage={false} maxWidth="none">
      <SlideHeader
        layout="row"
        eyebrow="The premise"
        title="Every company is going to have to become an AI company."
      />
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
    </SlideFrame>
  </DeckFit>
)

/**
 * `variant="arch"` — the tightened frame the diagram-heavy slides use.
 * Slide 6, "What we built · job one, today".
 */
export const Arch = () => (
  <DeckFit width={SLIDE}>
    <SlideFrame stage={false} maxWidth="none" variant="arch">
      <SlideHeader
        eyebrow="What we built · job one, today"
        eyebrowTone="indigo"
        title="One environment under the chaos."
        subtitle="Installed once. Every team builds on it."
      />
      <PillarGrid>
        <PillarCard
          brain
          icon={<Ico d={GLYPH.brain} />}
          kicker="The anchor"
          name="Company Brain"
          desc="One living context graph across every team."
        />
        <PillarCard icon={<Ico d={GLYPH.skills} />} name="Skills" tone="amber" desc="Reusable, versioned, measured." />
        <PillarCard icon={<Ico d={GLYPH.storage} />} name="Storage" tone="indigo" desc="Agent-native, governed, yours." />
        <PillarCard icon={<Ico d={GLYPH.deploy} />} name="Deploy" tone="emerald" desc="From a laptop to production." />
        <PillarCard icon={<Ico d={GLYPH.access} />} name="Access" tone="red" desc="Every action gated and audited." />
      </PillarGrid>
    </SlideFrame>
  </DeckFit>
)

/**
 * The frame with the grey `stage` on — how a slide sits inside reveal.js.
 */
export const OnStage = () => (
  <DeckFit width={SLIDE}>
    <SlideFrame maxWidth="none">
      <SlideHeader
        eyebrow="Where they are today"
        eyebrowTone="red"
        title="Six walls between a clever demo and real company value."
      />
      <Callout tone="red">
        Nothing deploys safely, and <strong>nothing learned in one team reaches another.</strong>
      </Callout>
    </SlideFrame>
  </DeckFit>
)
