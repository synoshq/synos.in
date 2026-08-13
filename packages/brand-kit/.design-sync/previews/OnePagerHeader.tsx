import { OnePagerHeader } from '@synos/brand-kit'
import { PrintFit } from './_lib/kit'

/** The newest masthead: gradient rule under it. */
export const Gradient = () => (
  <PrintFit width={700} style={{ padding: '24px 28px' }}>
    <OnePagerHeader
      brand={
        <>
          Syn<span className="sk-a">OS</span>
        </>
      }
      tag="The Human-Agent Operating Layer"
      title="Where humans and agents work as one company — at AI speed."
      sub={
        <>
          Companies are giving agents to every employee and it is chaos.{' '}
          <strong>SynOS is the self-hosted layer that fixes that.</strong>
        </>
      }
    />
  </PrintFit>
)

/** `rule="solid"` — the CTO pair, with a lede and a runner line. */
export const Solid = () => (
  <PrintFit width={700} style={{ padding: '24px 28px' }}>
    <OnePagerHeader
      rule="solid"
      brand={
        <>
          Syn<span className="sk-a">OS</span>
        </>
      }
      tag="For the CTO"
      title="One environment under the chaos."
      lede="Installed once, beside what you already run."
      sub="Self-hosted, model and harness agnostic, and governed by the access rules your people already work under."
      runner="Prepared for a retail multi-store CTO · August 2026"
    />
  </PrintFit>
)
