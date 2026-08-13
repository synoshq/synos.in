import { Callout } from '@synos/brand-kit'
import { Deck, Print } from './_lib/kit'

/** Indigo — us, SynOS, the operating layer itself. */
export const Indigo = () => (
  <Deck>
    <Callout tone="indigo">
      One environment, installed once, that <strong>every</strong> team builds on.
    </Callout>
  </Deck>
)

/** Violet — AI, agents, knowledge, what comes next. */
export const Violet = () => (
  <Deck>
    <Callout tone="violet">The same environment, drawn as the training layer.</Callout>
  </Deck>
)

/** Emerald — a win, something live, money saved. */
export const Emerald = () => (
  <Deck>
    <Callout tone="emerald" label="What it costs">
      Priced like infrastructure, not like seats. <strong>One line, per environment.</strong>
    </Callout>
  </Deck>
)

/** Amber — caution, an objection, work in progress. */
export const Amber = () => (
  <Deck>
    <Callout tone="amber" label="The objection">
      “Is this another migration?” No. It installs beside what you already run.
    </Callout>
  </Deck>
)

/** Red — pain, a wall, the status quo. */
export const Red = () => (
  <Deck>
    <Callout tone="red">
      Nothing learned in one team reaches another. <strong>Every answer starts from zero.</strong>
    </Callout>
  </Deck>
)

/** `fill="neutral"` — the `.stk-note` shape: grey surface, hue in the rule and the label only. */
export const NeutralFill = () => (
  <Deck>
    <Callout tone="indigo" fill="neutral">
      One environment, installed once, that <strong>every</strong> team builds on.
    </Callout>
  </Deck>
)

/** `accent="top"` — the objection cards in the CTO one-pagers. */
export const TopAccent = () => (
  <Deck>
    <Callout tone="amber" accent="top" label="Objection 02">
      “We already have a data platform.” This is not a data platform. It is the layer agents work
      through.
    </Callout>
  </Deck>
)

/** `flush` — the accented corner squared off (`.q2note` / `.lstk-foot`). */
export const Flush = () => (
  <Deck>
    <Callout tone="violet" flush>
      Every run traced. Every trace a labelled example the next run starts from.
    </Callout>
  </Deck>
)

/** `banner` — the centred gradient closer (`.oneliner-foot`). */
export const Banner = () => (
  <Deck>
    <Callout banner>
      The infrastructure to unblock your agentic transformation.
    </Callout>
  </Deck>
)

/** Print scale — the one-pager `.gap` box, at 10px. */
export const PrintScale = () => (
  <Print>
    <Callout scale="print" tone="red">
      <p>
        Nothing deploys safely, and <strong>nothing learned in one team reaches another.</strong>
      </p>
    </Callout>
  </Print>
)
