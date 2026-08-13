import { SplitColumns, SplitColumn, SplitItem } from '@synos/brand-kit'
import { DeckFit } from './_lib/kit'

/** "The shift" — what dies on the left, what wins on the right. */
export const BuyItOwnIt = () => (
  <DeckFit width={980}>
    <SplitColumns>
      <SplitColumn eyebrow="Buy it" title="A vendor's AI">
        <SplitItem marker="✕">Locked to their platform.</SplitItem>
        <SplitItem marker="✕">Their model, their roadmap, their pace.</SplitItem>
        <SplitItem marker="✕">What it learns, they keep.</SplitItem>
      </SplitColumn>
      <SplitColumn tone="violet" eyebrow="Own it" title="Your layer">
        <SplitItem marker="✓">Everything it learns stays yours.</SplitItem>
        <SplitItem marker="✓">Any model, any harness, swapped without a rebuild.</SplitItem>
        <SplitItem marker="✓">Self-hosted. Nothing leaves your VPC.</SplitItem>
      </SplitColumn>
    </SplitColumns>
  </DeckFit>
)

/** The delivery contrast: what you build, what we ship under it. */
export const BuildVsInfra = () => (
  <DeckFit width={980}>
    <SplitColumns>
      <SplitColumn tone="indigo" eyebrow="You build" title="The 20% that is you">
        <SplitItem marker="·">The skills only your operators know.</SplitItem>
        <SplitItem marker="·">The context only your company holds.</SplitItem>
      </SplitColumn>
      <SplitColumn tone="emerald" eyebrow="We ship" title="The 80% that is plumbing">
        <SplitItem marker="✓">Storage, deploy, access control, tracing.</SplitItem>
        <SplitItem marker="✓">Installed once, under every team.</SplitItem>
      </SplitColumn>
    </SplitColumns>
  </DeckFit>
)
