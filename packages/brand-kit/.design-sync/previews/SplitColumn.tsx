import { SplitColumn, SplitItem } from '@synos/brand-kit'
import { Deck } from './_lib/kit'

/** Neutral — the column that dies. */
export const BuyIt = () => (
  <Deck>
    <SplitColumn eyebrow="Buy it" title="A vendor's AI">
      <SplitItem marker="✕">Locked to their platform.</SplitItem>
      <SplitItem marker="✕">Their model, their roadmap, their pace.</SplitItem>
      <SplitItem marker="✕">What it learns, they keep.</SplitItem>
    </SplitColumn>
  </Deck>
)

/** Violet — the column that wins. */
export const OwnIt = () => (
  <Deck>
    <SplitColumn tone="violet" eyebrow="Own it" title="Your layer">
      <SplitItem marker="✓">Everything it learns stays yours.</SplitItem>
      <SplitItem marker="✓">Any model, any harness, swapped without a rebuild.</SplitItem>
      <SplitItem marker="✓">Self-hosted. Nothing leaves your VPC.</SplitItem>
    </SplitColumn>
  </Deck>
)

/** Indigo — the alternative-door column. */
export const Indigo = () => (
  <Deck>
    <SplitColumn tone="indigo" eyebrow="Start here" title="One team, two weeks">
      <SplitItem marker="·">A working Company Brain on your own cloud.</SplitItem>
      <SplitItem marker="·">Your data, your access rules, from day one.</SplitItem>
    </SplitColumn>
  </Deck>
)
