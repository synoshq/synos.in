import type { CSSProperties, ReactNode } from 'react'
import { cx, type Scale, type Tone } from '../types'
import './Callout.css'

/** Which edge carries the 3px accent rule. */
export type CalloutAccent =
  /** `border-left: 3px solid` — the dominant treatment (`.stk-note`, `.gap`, `.bx`, `.edge-pt`). */
  | 'left'
  /** `border-top: 3px solid` — used by the objections cards (`.ob`) in the CTO one-pagers. */
  | 'top'
  /** No accent rule; the tint alone carries the meaning (`.fw-band`, `.velocity`). */
  | 'none'

export interface CalloutProps {
  /**
   * The hue, and with it the meaning. Drives the `bg` / `br` / accent / label-colour quadruple.
   * @default 'indigo'
   */
  tone?: Tone
  /**
   * `'tinted'` fills the box with the hue's `bg`. `'neutral'` keeps the grey `--sk-surface-2`
   * surface and lets only the accent rule and the label carry the hue — the `.stk-note` shape.
   * @default 'tinted'
   */
  fill?: 'tinted' | 'neutral'
  /**
   * Which edge carries the 3px rule.
   * @default 'left'
   */
  accent?: CalloutAccent
  /**
   * Square off the accented corner (`border-radius: 0 10px 10px 0`) — the `.q2note` / `.lstk-foot`
   * treatment. `accent="left"` only.
   * @default false
   */
  flush?: boolean
  /**
   * Render as the centred gradient banner (`.oneliner-foot`): 1.5px border, 16px type, an
   * indigo-tinted gradient. Overrides `fill` and `accent`. Deck scale only.
   * @default false
   */
  banner?: boolean
  /** Small uppercase label above the body, in the tone colour. */
  label?: ReactNode
  /**
   * @default 'deck'
   */
  scale?: Scale
  /** Body content. Plain text, or `<p>` elements for multiple paragraphs. */
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/**
 * The tinted callout box — the pattern that appears in all seven source artifacts and carries more
 * of the brand than any other block.
 *
 * One hue per meaning: indigo for us/SynOS, violet for AI and what comes next, emerald for a win,
 * amber for caution or an objection, red for pain.
 *
 * @example
 * <Callout tone="indigo" fill="neutral">
 *   One environment, installed once, that <strong>every</strong> team builds on.
 * </Callout>
 *
 * @example
 * <Callout scale="print" tone="emerald" accent="left" label="What it costs">
 *   Priced like infrastructure.
 * </Callout>
 */
export function Callout({
  tone = 'indigo',
  fill = 'tinted',
  accent = 'left',
  flush = false,
  banner = false,
  label,
  scale = 'deck',
  children,
  className,
  style,
}: CalloutProps) {
  return (
    <div
      className={cx(
        'sk-callout',
        `sk-callout--${tone}`,
        !banner && fill === 'neutral' && 'sk-callout--neutral-fill',
        !banner && accent !== 'none' && `sk-callout--accent-${accent}`,
        !banner && flush && 'sk-callout--flush',
        banner && 'sk-callout--banner',
        scale === 'print' && 'sk-callout--print',
        className,
      )}
      style={style}
    >
      {label ? <div className="sk-callout-label">{label}</div> : null}
      {children}
    </div>
  )
}
