import { BigTypeSlide } from '@synos/brand-kit'
import { DeckFit, SLIDE } from './_lib/kit'

/** "The gap" — the one big-type slide carrying both a punch and a tagline. */
export const TheGap = () => (
  <DeckFit width={SLIDE}>
    <BigTypeSlide
      stage={false}
      eyebrow="The gap"
      eyebrowTone="violet"
      line1="Models learned the entire internet."
      line2={<span className="sk-gradient-text">They never learned your company.</span>}
      sub="Every answer starts from zero, in every team, every day."
      punch="That gap is the product."
      tagline="synos.in"
    />
  </DeckFit>
)

/** Two lines and nothing else — the closing statement. */
export const Statement = () => (
  <DeckFit width={SLIDE}>
    <BigTypeSlide
      stage={false}
      line1="One environment under the chaos,"
      line2={<span className="sk-gradient-text">built once for every team.</span>}
      tagline="hello@synos.in"
    />
  </DeckFit>
)
