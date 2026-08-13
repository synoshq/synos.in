import type { CSSProperties, ReactNode } from 'react'
import { cx } from '../types'
import './SlideFrame.css'

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
  stage = true,
  maxWidth = '99%',
  children,
  className,
  style,
}: SlideFrameProps) {
  const card = (
    <div
      className={cx('sk-deck', 'sk-slide', VARIANT_CLASS[variant], className)}
      style={maxWidth === 'none' ? style : { maxWidth, ...style }}
    >
      {children}
    </div>
  )
  return stage ? <div className="sk-stage">{card}</div> : card
}
