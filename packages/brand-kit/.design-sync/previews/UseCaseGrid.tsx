import { UseCaseGrid, UseCaseCard } from '@synos/brand-kit'
import { DeckFit, SLIDE_BODY } from './_lib/kit'

/** What teams build on the layer — the flagship, then the function brains. */
export const WhatTeamsBuild = () => (
  <DeckFit width={SLIDE_BODY}>
    <UseCaseGrid>
      <UseCaseCard
        flagship
        kicker="Flagship"
        title="Company Brain"
        body="One living context graph across every team. Every function brain is an instance inside it."
      />
      <UseCaseCard tone="emerald" kicker="Function" title="Sales Brain" body="Tuned on your pipeline and your corrections." />
      <UseCaseCard tone="violet" kicker="Function" title="Marketing Brain" body="One position, held across every channel." />
      <UseCaseCard tone="amber" kicker="Function" title="FinOps Brain" body="Cloud spend, tagged and explained." />
      <UseCaseCard kicker="Function" title="Internal Ops Brain" body="One skill, versioned, reused across every region." />
      <UseCaseCard tone="indigo" kicker="Product" title="Custom AI agents & products" body="Builders ship on the same rails." />
    </UseCaseGrid>
  </DeckFit>
)

/** Three across, no flagship — the appendix cut. */
export const ThreeUp = () => (
  <DeckFit width={SLIDE_BODY}>
    <UseCaseGrid>
      <UseCaseCard tone="emerald" kicker="Function" title="Sales Brain" body="A template your team builds and owns on SynOS." />
      <UseCaseCard tone="violet" kicker="Function" title="Support / CX Brain" body="Every resolution becomes the next answer's starting point." />
      <UseCaseCard tone="amber" kicker="Function" title="FinOps Brain" body="Cloud spend, tagged and explained." />
    </UseCaseGrid>
  </DeckFit>
)
