import { StepCard } from '@synos/brand-kit'
import { Deck } from './_lib/kit'

/** With the quoted prompt — the shape the demo storyboard uses. */
export const Ask = () => (
  <Deck>
    <StepCard
      num="01"
      title="Ask"
      body="Someone asks the brain a question in the words they would use with a colleague."
      quote="“Which stores missed target last quarter, and why?”"
    />
  </Deck>
)

/** Body only. */
export const Retrieve = () => (
  <Deck>
    <StepCard num="02" title="Retrieve" body="The right slice of context, deterministically — not whatever the model happens to recall." />
  </Deck>
)

/** The closing beat. */
export const Act = () => (
  <Deck>
    <StepCard num="03" title="Act" body="Every action gated by the same access rules your people work under. Every action audited." />
  </Deck>
)

/** `bar={false}` — the gradient cap dropped, for a step inside an already-tinted block. */
export const NoBar = () => (
  <Deck>
    <StepCard bar={false} num="04" title="Improve" body="The correction becomes a labelled example. The next run starts from it." />
  </Deck>
)
