import { SplitColumn, SplitItem } from '@synos/brand-kit'
import { Deck } from './_lib/kit'

/** `marker="✕"` — the column that dies. */
export const Cross = () => (
  <Deck>
    <SplitColumn eyebrow="Buy it" title="A vendor's AI">
      <SplitItem marker="✕">Locked to their platform.</SplitItem>
      <SplitItem marker="✕">Their model, their roadmap, their pace.</SplitItem>
    </SplitColumn>
  </Deck>
)

/** `marker="✓"` — the column that wins. */
export const Check = () => (
  <Deck>
    <SplitColumn tone="violet" eyebrow="Own it" title="Your layer">
      <SplitItem marker="✓">Everything it learns stays yours.</SplitItem>
      <SplitItem marker="✓">Any model, any harness.</SplitItem>
    </SplitColumn>
  </Deck>
)

/** The default `·` — a plain list inside a column. */
export const Middot = () => (
  <Deck>
    <SplitColumn tone="indigo" eyebrow="Week one" title="What lands">
      <SplitItem>One environment, on your cloud.</SplitItem>
      <SplitItem>Two systems of record connected.</SplitItem>
      <SplitItem>Access rules mirrored from your directory.</SplitItem>
    </SplitColumn>
  </Deck>
)
