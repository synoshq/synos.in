import { ChipRow, Chip } from '@synos/brand-kit'
import { Deck, DeckFit, Print } from './_lib/kit'

/** The default row: 8px gaps, wrapping, left-aligned. The systems it reaches. */
export const SystemsOfRecord = () => (
  <DeckFit width={640}>
    <ChipRow>
      <Chip mono>Salesforce</Chip>
      <Chip mono>NetSuite</Chip>
      <Chip mono>Snowflake</Chip>
      <Chip mono>Jira</Chip>
      <Chip mono>Confluence</Chip>
      <Chip mono>SAP</Chip>
    </ChipRow>
  </DeckFit>
)

/** `center` — the stack slide's row (`.stk-row`), under a cover or a statement. */
export const Centered = () => (
  <DeckFit width={640}>
    <ChipRow center>
      <Chip size="lg">Your systems</Chip>
      <Chip size="lg" tone="violet">
        SynOS
      </Chip>
      <Chip size="lg">Your agents</Chip>
    </ChipRow>
  </DeckFit>
)

/** `tight` — 5px gaps, the `.nw-chips` density for a chip wall inside a card. */
export const Tight = () => (
  <Deck>
    <ChipRow tight>
      <Chip size="sm">RBAC</Chip>
      <Chip size="sm">Audit log</Chip>
      <Chip size="sm">SSO</Chip>
      <Chip size="sm">VPC-only</Chip>
      <Chip size="sm">Data residency</Chip>
      <Chip size="sm">BYO keys</Chip>
    </ChipRow>
  </Deck>
)

/** Print scale — the proof row on the one-pager. */
export const PrintScale = () => (
  <Print>
    <ChipRow tight>
      <Chip scale="print">Manufacturing enterprise</Chip>
      <Chip scale="print" tone="emerald">
        US software co · paid
      </Chip>
      <Chip scale="print" mono>
        martech-saas
      </Chip>
    </ChipRow>
  </Print>
)
