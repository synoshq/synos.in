import {
  OnePagerPage,
  OnePagerHeader,
  SectionHeading,
  Eyebrow,
  Callout,
  ChipRow,
  Chip,
  PhaseCard,
  OutcomeGrid,
  OutcomeCard,
  QuoteBar,
  CtaBar,
} from '@synos/brand-kit'
import { Fit, PAGE } from './_lib/kit'

/** The VC one-pager, whole: masthead, problem, horizon, outcomes, ask. */
export const VcOnePager = () => (
  <Fit width={PAGE}>
    <OnePagerPage>
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

      <div>
        <Eyebrow scale="print" badge="3 live">
          The now-problem
        </Eyebrow>
        <Callout scale="print" tone="red">
          <p>
            Nothing deploys safely, and{' '}
            <strong>nothing learned in one team reaches another.</strong>
          </p>
        </Callout>
        <ChipRow tight style={{ marginTop: 8 }}>
          <Chip scale="print">Manufacturing enterprise</Chip>
          <Chip scale="print" tone="emerald">
            US software co · paid
          </Chip>
          <Chip scale="print" mono>
            martech-saas
          </Chip>
        </ChipRow>
      </div>

      <div>
        <Eyebrow scale="print">The play</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 7 }}>
          <PhaseCard scale="print" badge="S1" when="Now" title="Unblock" body="Agents that can actually reach the systems of record." />
          <PhaseCard scale="print" badge="S2" when="Next" title="Compound" position="bridge" body="Every run traced, every trace a labelled example." />
          <PhaseCard scale="print" badge="S3" when="Then" title="Own it" position="far" body="The training ground for models you own." />
        </div>
      </div>

      <div>
        <SectionHeading
          title={
            <>
              What changes for <span className="sk-a">your team</span>
            </>
          }
          sub="Measured on the P&L, not on a dashboard."
        />
        <OutcomeGrid>
          <OutcomeCard
            title="Store managers stop chasing numbers"
            body={
              <>
                The brain answers, <b>with the working shown.</b>
              </>
            }
          />
          <OutcomeCard title="Ops stops rebuilding the same report" body="One skill, versioned, reused across every region." />
        </OutcomeGrid>
      </div>

      <QuoteBar scale="print">
        <strong>The edge moves. </strong>
        New value is created at the edge of what models cannot do for you.
      </QuoteBar>

      <CtaBar
        title="Start with one team."
        body="Two weeks to a working Company Brain on your own cloud, with your own data, under your own access rules."
        right={
          <span>
            <b>hello@synos.in</b>
            <br />
            synos.in
          </span>
        }
      />
    </OnePagerPage>
  </Fit>
)

/** The CTO variant: solid header rule, indigo CTA, an objection handled inline. */
export const CtoOnePager = () => (
  <Fit width={PAGE}>
    <OnePagerPage>
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

      <div>
        <Eyebrow scale="print" tone="amber" badge="02">
          The objection
        </Eyebrow>
        <Callout scale="print" tone="amber" accent="top">
          <p>
            “We already have a data platform.” <strong>This is not a data platform.</strong> It is
            the layer agents work through to reach one.
          </p>
        </Callout>
      </div>

      <div>
        <SectionHeading title="What lands in week one" sub="No migration. No rip-and-replace." />
        <OutcomeGrid>
          <OutcomeCard tone="indigo" title="One environment on your cloud" body="Nothing leaves your VPC." />
          <OutcomeCard tone="violet" title="Two systems of record connected" body="Read paths first, write paths gated." />
        </OutcomeGrid>
      </div>

      <CtaBar
        tone="indigo"
        title="Start with one team."
        body="Two weeks to a working Company Brain, under your own access rules."
        right={
          <span>
            <b>hello@synos.in</b>
            <br />
            synos.in
          </span>
        }
      />
    </OnePagerPage>
  </Fit>
)
