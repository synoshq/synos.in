import { CoverSlide, ChipRow, Chip } from '@synos/brand-kit'
import { DeckFit, SLIDE } from './_lib/kit'

/** The VC deck cover, exactly as shipped. */
export const Cover = () => (
  <DeckFit width={SLIDE}>
    <CoverSlide
      stage={false}
      eyebrow="SynOS"
      title="The Human-Agent Operating Layer"
      lead="The infrastructure to unblock your agentic transformation."
      lede={
        <>
          Self-hosted. <strong>Your data stays yours.</strong> Model and harness agnostic.
        </>
      }
      foot="Confidential · August 2026"
    >
      <ChipRow center>
        <Chip size="pill">Company Brain</Chip>
        <Chip size="pill" tone="violet">
          Agent-native storage
        </Chip>
        <Chip size="pill">Access control</Chip>
      </ChipRow>
    </CoverSlide>
  </DeckFit>
)

/** The buyer-deck treatment: indigo eyebrow, tracked at 1.6px instead of 2.4px. */
export const BuyerCover = () => (
  <DeckFit width={SLIDE}>
    <CoverSlide
      stage={false}
      eyebrow="SynOS · for the CTO"
      eyebrowTone="indigo"
      spacedEyebrow={false}
      title="Where humans and agents work as one company."
      lead="At AI speed, on your own cloud, under your own access rules."
      lede={
        <>
          Two weeks to a working Company Brain. <strong>Nothing leaves your VPC.</strong>
        </>
      }
      foot="Prepared for a manufacturing enterprise · August 2026"
    >
      <ChipRow center>
        <Chip size="pill">Self-hosted</Chip>
        <Chip size="pill">Any model</Chip>
        <Chip size="pill">Any harness</Chip>
      </ChipRow>
    </CoverSlide>
  </DeckFit>
)
