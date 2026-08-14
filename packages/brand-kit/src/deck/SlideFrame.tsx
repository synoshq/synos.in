import type { CSSProperties, ReactNode } from 'react'
import { cx } from '../types'
import './SlideFrame.css'
import './Density.css'

/** Which frame treatment the slide uses. */
export type SlideVariant =
  /** The default card: `padding: 40px 56px 34px`, contents vertically centred. 140 of 148 slides. */
  | 'default'
  /** `.arch-card` — tightened to `14px 44px 12px` and shrinks h1/h2 for diagram-heavy slides. 8 slides. */
  | 'arch'
  /** `.cover` — centred, `56px 60px 48px`. One per deck. Pair with `CoverSlide` for the contents. */
  | 'cover'
  /** `.big-type` — centred, `56px 64px`. Pair with `BigTypeSlide` for the contents. */
  | 'bigType'

/**
 * Which type register the slide's contents use.
 *
 * This is an artifact-level choice, not a per-slide escape hatch: a deck picks one and applies it
 * to every slide that needs it. See `Density.css` for what compact moves and what it may never
 * touch.
 */
export type SlideDensity =
  /**
   * The kit's scale — 54 / 26 / 20 / 16 / 13. Tuned for a PRESENTING deck: read across a room off
   * a projector, with a presenter carrying the words that are not on the slide.
   */
  | 'default'
  /**
   * The reading register — subtitle 19, body 13.5, card titles 17, gaps back to ~12px. For a deck
   * that is SENT rather than presented, so it legitimately carries more words a slide and is read
   * at arm's length. `h1` and everything above it are identical to `default` by construction.
   */
  | 'compact'

export interface SlideFrameProps {
  /**
   * Frame treatment. Defaults to `'default'`.
   * @default 'default'
   */
  variant?: SlideVariant
  /**
   * Render the 720px-tall grey stage the card is centred inside. Set this when the frame is not
   * already inside a reveal.js `section.has-card`; leave it off when it is.
   * @default true
   */
  stage?: boolean
  /**
   * Cap on the card width, so the card can shrink on a narrow viewport the way the source does
   * (`.card-frame { max-width: 99% }`). Set to `'none'` for a pixel-exact 1380px card.
   * @default '99%'
   */
  maxWidth?: string
  /**
   * Type register for the slide's contents. Defaults to `'default'` (the presenting scale).
   * @default 'default'
   */
  density?: SlideDensity
  /** Slide contents. Normally a `SlideHeader` followed by one body block. */
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

const VARIANT_CLASS: Record<SlideVariant, string | false> = {
  default: false,
  arch: 'sk-slide--arch',
  cover: 'sk-slide--cover',
  bigType: 'sk-slide--big-type',
}

/**
 * The 1380 x 712 white card that every SynOS deck slide sits inside.
 *
 * Extracted from `presentations/synos-vc-deck-presenting.html` (`.card-frame`). This is the one
 * component no deck slide can skip — 148 of 148 slides in the corpus use it.
 *
 * @example
 * <SlideFrame>
 *   <SlideHeader eyebrow="The premise" title="Every company is going to have to become an AI company." />
 *   <PhaseRow>…</PhaseRow>
 * </SlideFrame>
 */
export function SlideFrame({
  variant = 'default',
  density = 'default',
  stage = true,
  maxWidth = '99%',
  children,
  className,
  style,
}: SlideFrameProps) {
  const card = (
    <div
      className={cx(
        'sk-deck',
        'sk-slide',
        VARIANT_CLASS[variant],
        density === 'compact' && 'sk-density-compact',
        className,
      )}
      style={maxWidth === 'none' ? style : { maxWidth, ...style }}
    >
      {children}
    </div>
  )
  return stage ? <div className="sk-stage">{card}</div> : card
}
