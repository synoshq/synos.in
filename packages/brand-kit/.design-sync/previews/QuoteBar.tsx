import { QuoteBar } from '@synos/brand-kit'
import { Deck, Print, Stack } from './_lib/kit'

/** Deck scale — the line the slide is built around. */
export const DeckScale = () => (
  <Deck>
    <QuoteBar>
      <strong>The edge moves. </strong>
      New value is created at the edge of what models cannot do for you.
    </QuoteBar>
  </Deck>
)

/** An operator's words, quoted straight. */
export const FromAnOperator = () => (
  <Deck>
    <QuoteBar>
      “We had six agents and no idea which of them had ever been right.”
    </QuoteBar>
  </Deck>
)

/** Print scale — the one-pager `.q`, indigo-tinted at 8.6px. */
export const PrintScale = () => (
  <Print>
    <Stack gap={6}>
      <QuoteBar scale="print">
        <strong>Two weeks. </strong>
        A working Company Brain on your own cloud, with your own data.
      </QuoteBar>
      <QuoteBar scale="print">“One skill, versioned, reused across every region.”</QuoteBar>
    </Stack>
  </Print>
)
