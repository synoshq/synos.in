import { StepGrid, StepCard } from '@synos/brand-kit'
import { DeckFit, SLIDE_BODY } from './_lib/kit'

/** The demo storyboard: ask, retrieve, act. */
export const HowItWorks = () => (
  <DeckFit width={SLIDE_BODY}>
    <StepGrid>
      <StepCard
        num="01"
        title="Ask"
        body="Someone asks the brain a question in the words they would use with a colleague."
        quote="“Which stores missed target last quarter, and why?”"
      />
      <StepCard num="02" title="Retrieve" body="The right slice of context, deterministically — not whatever the model happens to recall." />
      <StepCard num="03" title="Act" body="Every action gated by the same access rules your people work under. Every action audited." />
    </StepGrid>
  </DeckFit>
)

/** The delivery sequence, four beats wide. */
export const Delivery = () => (
  <DeckFit width={SLIDE_BODY}>
    <StepGrid>
      <StepCard num="01" title="Install" body="One environment, on your cloud, beside what you already run." />
      <StepCard num="02" title="Connect" body="The systems of record your teams already answer from." />
      <StepCard num="03" title="Build" body="One team's brain first. The template the rest extend." />
      <StepCard num="04" title="Compound" body="Every correction becomes the next run's starting point." />
    </StepGrid>
  </DeckFit>
)
