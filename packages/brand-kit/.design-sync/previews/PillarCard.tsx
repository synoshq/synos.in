import { PillarCard } from '@synos/brand-kit'
import { Deck, DeckFit, Ico, GLYPH, Stack } from './_lib/kit'

/** `brain` — the Company Brain anchor: full brand gradient, white text, icon inline. */
export const Brain = () => (
  <DeckFit width={620}>
    <PillarCard
      brain
      icon={<Ico d={GLYPH.brain} />}
      kicker="The anchor"
      name="Company Brain"
      desc="One living context graph across every team."
    />
  </DeckFit>
)

/** The default indigo icon tile — every non-brain pillar in the VC deck. */
export const Indigo = () => (
  <Deck>
    <PillarCard
      icon={<Ico d={GLYPH.storage} />}
      name="Agent-native storage"
      desc="Governed, versioned, yours."
    />
  </Deck>
)

/** Violet — the knowledge layer. */
export const Violet = () => (
  <Deck>
    <PillarCard icon={<Ico d={GLYPH.loop} />} tone="violet" name="Self-Learning Loop" desc="Every run traced, every trace a labelled example." />
  </Deck>
)

/** Amber — work in progress. */
export const Amber = () => (
  <Deck>
    <PillarCard icon={<Ico d={GLYPH.skills} />} tone="amber" name="Skills" desc="Reusable, versioned, measured." />
  </Deck>
)

/** Emerald — something live. */
export const Emerald = () => (
  <Deck>
    <PillarCard icon={<Ico d={GLYPH.deploy} />} tone="emerald" name="Deploy" desc="From a laptop to production, in one step." />
  </Deck>
)

/** Red — the guarded edge. */
export const Red = () => (
  <Deck>
    <Stack gap={10}>
      <PillarCard icon={<Ico d={GLYPH.access} />} tone="red" name="Access control" desc="Every action gated. Every action audited." />
      <PillarCard name="Skill Analytics" tone="red" desc="Which skills earn their keep, and which do not." />
    </Stack>
  </Deck>
)
