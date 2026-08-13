import { Chip, ChipRow } from '@synos/brand-kit'
import { Deck, Print, Stack } from './_lib/kit'

/** `sm` — `.nw-chip`, 10px / 600. For dense chip walls inside a card. */
export const Small = () => (
  <Deck>
    <ChipRow tight>
      <Chip size="sm">RBAC</Chip>
      <Chip size="sm">Audit log</Chip>
      <Chip size="sm">SSO</Chip>
      <Chip size="sm">VPC-only</Chip>
    </ChipRow>
  </Deck>
)

/** `md` — the default. `.d1-sor-chip`, the systems-of-record row under the layer. */
export const Medium = () => (
  <Deck>
    <ChipRow tight>
      <Chip mono>Salesforce</Chip>
      <Chip mono>NetSuite</Chip>
      <Chip mono>Snowflake</Chip>
      <Chip mono>Jira</Chip>
    </ChipRow>
  </Deck>
)

/** `lg` — `.stk-chip`, 15px / 600. For a chip row that is the slide's subject. */
export const Large = () => (
  <Deck>
    <ChipRow>
      <Chip size="lg">Your systems</Chip>
      <Chip size="lg" tone="violet">
        SynOS
      </Chip>
      <Chip size="lg">Your agents</Chip>
    </ChipRow>
  </Deck>
)

/** `pill` — `.tagchip`, fully rounded. The cover's tag row. */
export const Pill = () => (
  <Deck>
    <ChipRow center>
      <Chip size="pill">Company Brain</Chip>
      <Chip size="pill" tone="violet">
        Agent-native storage
      </Chip>
      <Chip size="pill">Access control</Chip>
    </ChipRow>
  </Deck>
)

/** One chip per hue — the same meanings the rest of the system carries. */
export const Tones = () => (
  <Deck>
    <Stack gap={8}>
      <ChipRow tight>
        <Chip>Neutral · a system</Chip>
        <Chip tone="indigo">Indigo · us</Chip>
        <Chip tone="violet">Violet · agents</Chip>
      </ChipRow>
      <ChipRow tight>
        <Chip tone="emerald">Emerald · live</Chip>
        <Chip tone="amber">Amber · in progress</Chip>
        <Chip tone="red">Red · the wall</Chip>
      </ChipRow>
    </Stack>
  </Deck>
)

/** `mono` — JetBrains Mono, for anything that reads as an identifier. */
export const Mono = () => (
  <Deck>
    <ChipRow tight>
      <Chip mono>mcp://company-brain</Chip>
      <Chip mono tone="violet">
        skills/quarterly-close@3
      </Chip>
    </ChipRow>
  </Deck>
)

/** Print scale — the one-pager `.pchip`, 8.8px / 600. `size` is ignored. */
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
