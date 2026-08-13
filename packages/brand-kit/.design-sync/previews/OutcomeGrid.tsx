import { OutcomeGrid, OutcomeCard } from '@synos/brand-kit'
import { PrintFit } from './_lib/kit'

/** The two-column grid, as the one-pager ships it. */
export const WhatChanges = () => (
  <PrintFit width={620} style={{ padding: 22 }}>
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
      <OutcomeCard title="Finance sees the same numbers" body="One context graph, not four spreadsheets that disagree." />
      <OutcomeCard title="Nothing runs unaudited" body="Every action gated by the rules your people already work under." />
    </OutcomeGrid>
  </PrintFit>
)

/** Mixed hues — when one tile is the layer and one is the risk removed. */
export const MixedTones = () => (
  <PrintFit width={620} style={{ padding: 22 }}>
    <OutcomeGrid>
      <OutcomeCard tone="indigo" title="One environment on your cloud" body="Nothing leaves your VPC." />
      <OutcomeCard tone="violet" title="Corrections stop evaporating" body="Every correction becomes the next run's starting point." />
    </OutcomeGrid>
  </PrintFit>
)
