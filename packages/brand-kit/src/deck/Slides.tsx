import type { CSSProperties, ReactNode } from 'react'
import { SlideFrame } from './SlideFrame'
import { Eyebrow } from './Eyebrow'
import { cx, type Tone } from '../types'
import './Slides.css'

export interface CoverSlideProps {
  /** The label above the title — usually just "SynOS". */
  eyebrow?: ReactNode
  /**
   * Hue of the eyebrow. The VC deck uses violet; the buyer decks use indigo.
   * @default 'violet'
   */
  eyebrowTone?: Tone
  /**
   * Track the eyebrow at 2.4px instead of 1.6px. The VC cover does; the buyer covers do not.
   * @default true
   */
  spacedEyebrow?: boolean
  /** The 56px Instrument Serif headline. */
  title: ReactNode
  /** The 20px semibold line under the headline — the positioning sentence. */
  lead?: ReactNode
  /**
   * The long paragraph under that — the argument, in one breath, at body size.
   *
   * **Optional by design, and which register you are building decides it.** SynOS ships two decks
   * from one narrative and they are two artifacts with two jobs:
   *
   * - **Reading deck** (`synos-vc-deck-v6.html`, 35 slides, zero speaker-note blocks) — this is
   *   the artifact that is *sent*. It is read on a laptop with no presenter in the room, so the
   *   cover paragraph is doing real work: it is the only thing standing between the headline and
   *   a reader who has no one to explain it. **Set `lede`.**
   * - **Presenting deck** (`synos-vc-deck-presenting.html`, same 35 slides, 22 speaker-note
   *   blocks) — shown on a screen with a presenter, who says this paragraph out loud. On a cover
   *   the room reads in the first ten seconds, it is a wall of type nobody will read.
   *   **Omit `lede`** and put the text in that slide's `<aside class="notes">`.
   *
   * Do not apply the live-presentation convention to the PDF-first artifact. The slot is optional,
   * not removed — deleting it would have made the reading deck worse to fix the presenting deck.
   */
  lede?: ReactNode
  /** Rendered between the lede and the footer. The source puts a seam diagram or a chip row here. */
  children?: ReactNode
  /** The uppercase line at the bottom — date, audience, confidentiality. */
  foot?: ReactNode
  /**
   * Render the 720px grey stage around the card.
   * @default true
   */
  stage?: boolean
  className?: string
  style?: CSSProperties
}

/**
 * The deck's first slide.
 *
 * Two covers exist in the corpus and they disagree substantially; this builds the newest (VC)
 * one. See inventory conflicts C7 and C8. The headline was extracted at **47px**, not the 58px the
 * stylesheet first declares and then overrides; the 2026-08-13 improvement pass then moved it to
 * 56px Instrument Serif at weight 400, because the face has no bold and the 800 had to be bought
 * back with size (decision A).
 *
 * `lede` is the register switch — read its doc before building a cover.
 *
 * @example Reading deck — sent without a presenter, so the paragraph stays.
 * <CoverSlide
 *   eyebrow="SynOS"
 *   title="The Human-Agent Operating Layer"
 *   lead="The infrastructure to unblock your agentic transformation."
 *   lede={<>Self-hosted. <strong>Your data stays yours.</strong> Model and harness agnostic.</>}
 *   foot="Confidential · August 2026"
 * >
 *   <ChipRow center><Chip size="pill">Company Brain</Chip></ChipRow>
 * </CoverSlide>
 *
 * @example Presenting deck — same cover, paragraph spoken instead of set.
 * <CoverSlide
 *   eyebrow="SynOS"
 *   title="The Human-Agent Operating Layer"
 *   lead="The infrastructure to unblock your agentic transformation."
 *   foot="Confidential · August 2026"
 * />
 */
export function CoverSlide({
  eyebrow,
  eyebrowTone = 'violet',
  spacedEyebrow = true,
  title,
  lead,
  lede,
  children,
  foot,
  stage = true,
  className,
  style,
}: CoverSlideProps) {
  return (
    <SlideFrame variant="cover" stage={stage} className={className} style={style}>
      {eyebrow ? (
        <Eyebrow tone={eyebrowTone} spaced={spacedEyebrow}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <div className="sk-cover-title">{title}</div>
      {lead ? <div className="sk-cover-lead">{lead}</div> : null}
      {lede ? <p className="sk-cover-lede">{lede}</p> : null}
      {children}
      {foot ? <div className="sk-cover-foot">{foot}</div> : null}
    </SlideFrame>
  )
}

export interface BigTypeSlideProps {
  /** The label above the statement. */
  eyebrow?: ReactNode
  /**
   * @default 'muted'
   */
  eyebrowTone?: Tone | 'muted'
  /** First display line, 44px. The setup. */
  line1: ReactNode
  /**
   * Second display line, 48px. The turn. Wrap it in `<span className="sk-gradient-text">` to run
   * the brand gradient through the glyphs, as the source does.
   */
  line2?: ReactNode
  /** Supporting paragraph at 20px. */
  sub?: ReactNode
  /** Rendered between the sub and the punch. The source puts a seam diagram here. */
  children?: ReactNode
  /** The 25px bold closing sentence. */
  punch?: ReactNode
  /** A muted 14px line under everything. */
  tagline?: ReactNode
  /**
   * @default true
   */
  stage?: boolean
  className?: string
  style?: CSSProperties
}

/**
 * The statement slide: two lines of display type and nothing to read around them.
 *
 * @example
 * <BigTypeSlide
 *   eyebrow="The gap"
 *   line1="Models learned the entire internet."
 *   line2={<span className="sk-gradient-text">They never learned your company.</span>}
 *   punch="That gap is the product."
 * />
 */
export function BigTypeSlide({
  eyebrow,
  eyebrowTone = 'muted',
  line1,
  line2,
  sub,
  children,
  punch,
  tagline,
  stage = true,
  className,
  style,
}: BigTypeSlideProps) {
  return (
    <SlideFrame variant="bigType" stage={stage} className={cx(className)} style={style}>
      {eyebrow ? <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow> : null}
      <div className="sk-bigtype-l1">{line1}</div>
      {line2 ? <div className="sk-bigtype-l2">{line2}</div> : null}
      {sub ? <p className="sk-bigtype-sub">{sub}</p> : null}
      {children}
      {punch ? <div className="sk-bigtype-punch">{punch}</div> : null}
      {tagline ? <div className="sk-bigtype-tagline">{tagline}</div> : null}
    </SlideFrame>
  )
}
