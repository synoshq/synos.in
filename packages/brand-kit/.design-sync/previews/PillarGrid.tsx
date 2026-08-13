import { PillarGrid, PillarCard } from '@synos/brand-kit'
import { DeckFit, Ico, GLYPH, SLIDE_BODY } from './_lib/kit'

/** The operating layer as the architecture slide draws it: the brain, then five pillars. */
export const OperatingLayer = () => (
  <DeckFit width={SLIDE_BODY}>
    <PillarGrid>
      <PillarCard
        brain
        icon={<Ico d={GLYPH.brain} />}
        kicker="The anchor"
        name="Company Brain"
        desc="One living context graph across every team."
      />
      <PillarCard icon={<Ico d={GLYPH.skills} />} tone="amber" name="Skills" desc="Reusable, versioned, measured." />
      <PillarCard icon={<Ico d={GLYPH.storage} />} tone="indigo" name="Agent-native storage" desc="Governed, versioned, yours." />
      <PillarCard icon={<Ico d={GLYPH.deploy} />} tone="emerald" name="Deploy" desc="From a laptop to production." />
      <PillarCard icon={<Ico d={GLYPH.access} />} tone="red" name="Access control" desc="Every action gated and audited." />
      <PillarCard icon={<Ico d={GLYPH.loop} />} tone="violet" name="Self-Learning Loop" desc="Every trace a labelled example." />
    </PillarGrid>
  </DeckFit>
)

/** `columns={2}` — the half-slide layout, beside a diagram. */
export const TwoColumns = () => (
  <DeckFit width={720}>
    <PillarGrid columns={2}>
      <PillarCard icon={<Ico d={GLYPH.storage} />} tone="indigo" name="Agent-native storage" desc="Governed, versioned, yours." />
      <PillarCard icon={<Ico d={GLYPH.access} />} tone="red" name="Access control" desc="Every action gated and audited." />
      <PillarCard icon={<Ico d={GLYPH.skills} />} tone="amber" name="Skills" desc="Reusable, versioned, measured." />
      <PillarCard icon={<Ico d={GLYPH.deploy} />} tone="emerald" name="Deploy" desc="From a laptop to production." />
    </PillarGrid>
  </DeckFit>
)
