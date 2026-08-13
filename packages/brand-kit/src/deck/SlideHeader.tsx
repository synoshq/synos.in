import type { CSSProperties, ReactNode } from 'react'
import { Eyebrow } from './Eyebrow'
import { cx, type Tone } from '../types'
import './SlideHeader.css'

/** How the header lays out. */
export type SlideHeaderLayout =
  /** `.title-block` — eyebrow, title and subtitle stacked. Used by 67 slides. */
  | 'stack'
  /** `.head-row` — the stack on the left, `aside` pinned to its baseline on the right. Used by 58 slides. */
  | 'row'

export interface SlideHeaderProps {
  /** The uppercase label above the title. Omit for a title-only header. */
  eyebrow?: ReactNode
  /**
   * Hue of the eyebrow.
   * @default 'muted'
   */
  eyebrowTone?: Tone | 'muted'
  /** The slide title. Renders as `h1` at 34px / 700. */
  title: ReactNode
  /** Optional deck below the title. Renders as `h2` at 18px / 500 in `--sk-ink-3`. */
  subtitle?: ReactNode
  /**
   * Layout. `'row'` needs an `aside` to be worth using.
   * @default 'stack'
   */
  layout?: SlideHeaderLayout
  /**
   * Content pinned to the right of the title, baseline-aligned with it. `layout="row"` only —
   * ignored when stacked, because no source slide puts an aside in a stacked header.
   */
  aside?: ReactNode
  className?: string
  style?: CSSProperties
}

/**
 * The opening block of a slide: eyebrow, title, optional subtitle.
 *
 * Extracted from `.title-block` (buyer decks) and `.head-row` (VC decks), which are the same job
 * done two ways and never appear together. See inventory §2 and conflict C6.
 *
 * @example
 * <SlideHeader
 *   layout="row"
 *   eyebrow="Landscape"
 *   title="Everyone owns one band. Nobody owns the three together."
 *   aside={<Chip tone="violet">2026</Chip>}
 * />
 */
export function SlideHeader({
  eyebrow,
  eyebrowTone = 'muted',
  title,
  subtitle,
  layout = 'stack',
  aside,
  className,
  style,
}: SlideHeaderProps) {
  const main = (
    <>
      {eyebrow ? <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow> : null}
      <h1>{title}</h1>
      {subtitle ? <h2>{subtitle}</h2> : null}
    </>
  )

  if (layout === 'row') {
    return (
      <div className={cx('sk-header', 'sk-header--row', className)} style={style}>
        <div className="sk-header-main">{main}</div>
        {aside ? <div className="sk-header-aside">{aside}</div> : null}
      </div>
    )
  }

  return (
    <div className={cx('sk-header', className)} style={style}>
      {main}
    </div>
  )
}
