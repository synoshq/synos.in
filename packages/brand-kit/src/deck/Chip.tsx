import type { CSSProperties, ReactNode } from 'react'
import { cx, type Scale, type ToneOrNeutral } from '../types'
import './Chip.css'

/** Chip size. Each maps to one measured source class — see `Chip.css`. */
export type ChipSize =
  /** `.nw-chip` — 10px / 600, `2px 9px`. For dense chip walls inside a card. */
  | 'sm'
  /** `.d1-sor-chip` / `.source-chip` — 10.5px / 500, `4px 10px`. The default. */
  | 'md'
  /** `.stk-chip` — 15px / 600, `10px 18px`. For a chip row that is the slide's subject. */
  | 'lg'
  /** `.tagchip` — 11px / 600, fully rounded. The cover's tag row. */
  | 'pill'

export interface ChipProps {
  /**
   * @default 'neutral'
   */
  tone?: ToneOrNeutral
  /**
   * @default 'md'
   */
  size?: ChipSize
  /**
   * Set the label in JetBrains Mono. The corpus uses this for system names, connector names and
   * anything that reads as an identifier.
   * @default false
   */
  mono?: boolean
  /**
   * `'print'` renders the one-pager `.pchip` (8.8px / 600) and ignores `size`.
   * @default 'deck'
   */
  scale?: Scale
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/**
 * A small bordered label: a system of record, a connector, a harness, a proof point, a tag.
 *
 * @example
 * <ChipRow>
 *   <Chip mono>Salesforce</Chip>
 *   <Chip mono>NetSuite</Chip>
 *   <Chip tone="violet" mono>SynOS</Chip>
 * </ChipRow>
 */
export function Chip({
  tone = 'neutral',
  size = 'md',
  mono = false,
  scale = 'deck',
  children,
  className,
  style,
}: ChipProps) {
  return (
    <span
      className={cx(
        'sk-chip',
        scale === 'print' ? 'sk-chip--print' : size !== 'md' && `sk-chip--${size}`,
        tone !== 'neutral' && `sk-chip--${tone}`,
        mono && 'sk-chip--mono',
        className,
      )}
      style={style}
    >
      {children}
    </span>
  )
}

export interface ChipRowProps {
  /**
   * Centre the row. The stack slide (`.stk-row`) centres; chip walls inside cards do not.
   * @default false
   */
  center?: boolean
  /**
   * Drop the gap from 8px to 5px — the `.nw-chips` / `.d1-sor-row` density.
   * @default false
   */
  tight?: boolean
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/** A wrapping row of `Chip`s. */
export function ChipRow({ center = false, tight = false, children, className, style }: ChipRowProps) {
  return (
    <div
      className={cx(
        'sk-chip-row',
        center && 'sk-chip-row--center',
        tight && 'sk-chip-row--tight',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  )
}
