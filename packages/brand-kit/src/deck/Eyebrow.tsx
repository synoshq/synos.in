import type { CSSProperties, ReactNode } from 'react'
import { cx, type Scale, type Tone } from '../types'
import './Eyebrow.css'

export interface EyebrowProps {
  /**
   * Hue. `'muted'` is the default grey used on most slides; the four brand hues carry the standard
   * meanings (indigo = us, violet = AI/next, emerald = a win, amber = caution, red = pain).
   * @default 'muted'
   */
  tone?: Tone | 'muted'
  /**
   * `'deck'` renders at 11.5px / 1.6px tracking. `'print'` renders the one-pager `.sec-label`
   * at 8.5px / 1.4px with a slot for a `badge`.
   * @default 'deck'
   */
  scale?: Scale
  /**
   * Widen the tracking to 2.4px. This is the cover-slide treatment and should not be used elsewhere.
   * @default false
   */
  spaced?: boolean
  /**
   * A small mono pill rendered to the right of the label. Print scale only — the deck eyebrow has
   * no badge slot in any source file.
   */
  badge?: ReactNode
  /** The label text. Rendered as written; the uppercase transform is applied in CSS. */
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/**
 * The small uppercase label above a slide title, and the one-pager section label.
 *
 * Used on 144 of the 148 deck slides in the corpus — the most-used text component in the system.
 *
 * @example
 * <Eyebrow tone="indigo">What we built · job one, today</Eyebrow>
 * <Eyebrow scale="print" badge="3 live">The now-problem</Eyebrow>
 */
export function Eyebrow({
  tone = 'muted',
  scale = 'deck',
  spaced = false,
  badge,
  children,
  className,
  style,
}: EyebrowProps) {
  return (
    <div
      className={cx(
        'sk-eyebrow',
        tone !== 'muted' && `sk-eyebrow--${tone}`,
        scale === 'print' && 'sk-eyebrow--print',
        spaced && 'sk-eyebrow--spaced',
        className,
      )}
      style={style}
    >
      {children}
      {badge ? <span className="sk-eyebrow-badge">{badge}</span> : null}
    </div>
  )
}
