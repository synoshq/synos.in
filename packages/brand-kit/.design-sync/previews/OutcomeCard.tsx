import { OutcomeCard } from '@synos/brand-kit'
import { PrintFit } from './_lib/kit'

/** Emerald — the default. Outcomes are wins. */
export const Emerald = () => (
  <PrintFit width={420} style={{ padding: 20 }}>
    <OutcomeCard
      title="Store managers stop chasing numbers"
      body={
        <>
          The brain answers, <b>with the working shown.</b>
        </>
      }
    />
  </PrintFit>
)

/** Indigo — an outcome that is about the layer itself. */
export const Indigo = () => (
  <PrintFit width={420} style={{ padding: 20 }}>
    <OutcomeCard tone="indigo" title="One environment on your cloud" body="Nothing leaves your VPC, and nothing new to operate." />
  </PrintFit>
)

/** Violet — an outcome about what the agents learn. */
export const Violet = () => (
  <PrintFit width={420} style={{ padding: 20 }}>
    <OutcomeCard tone="violet" title="Corrections stop evaporating" body="Every correction becomes the next run's starting point." />
  </PrintFit>
)

/** Amber — the outcome still in flight. */
export const Amber = () => (
  <PrintFit width={420} style={{ padding: 20 }}>
    <OutcomeCard tone="amber" title="Skill spend becomes legible" body="Which skills earn their keep, and which quietly do not." />
  </PrintFit>
)

/** Red — the outcome stated as the pain it removes. */
export const Red = () => (
  <PrintFit width={420} style={{ padding: 20 }}>
    <OutcomeCard tone="red" title="No more shadow automations" body="Nothing runs against a system of record without an audit trail." />
  </PrintFit>
)
