import { SlideHeader, Chip } from '@synos/brand-kit'
import { DeckFit, SLIDE_BODY } from './_lib/kit'

/** `.title-block` — eyebrow, title, subtitle stacked. 67 slides. */
export const Stack = () => (
  <DeckFit width={SLIDE_BODY}>
    <SlideHeader
      eyebrow="What we built · job one, today"
      eyebrowTone="indigo"
      title="One environment under the chaos."
      subtitle="Installed once. Every team builds on it."
    />
  </DeckFit>
)

/** `.head-row` — the stack on the left, an aside pinned to its baseline. 58 slides. */
export const Row = () => (
  <DeckFit width={SLIDE_BODY}>
    <SlideHeader
      layout="row"
      eyebrow="Landscape"
      title="Everyone owns one band. Nobody owns the three together."
      aside={<Chip tone="violet">Aug 2026</Chip>}
    />
  </DeckFit>
)

/** Title only — no eyebrow, no subtitle. The statement header. */
export const TitleOnly = () => (
  <DeckFit width={SLIDE_BODY}>
    <SlideHeader title="Every answer starts from zero, in every team, every day." />
  </DeckFit>
)

/** The pain header: a red eyebrow over the walls. */
export const Red = () => (
  <DeckFit width={SLIDE_BODY}>
    <SlideHeader
      eyebrow="Where they are today"
      eyebrowTone="red"
      title="Six walls between a clever demo and real company value."
      subtitle="Every one of them is an infrastructure problem wearing an AI costume."
    />
  </DeckFit>
)
