import type { CSSProperties, ReactNode } from 'react'
import { cx, type ToneOrNeutral } from '../types'
import './Tile.css'

export type TileSize =
  /** `.harness-chip` — 12/700 name over a 10px kind, `10px 8px`. For a dense row of six or more. */
  | 'sm'
  /** `.tool-chip` — 13/700 name over a 10px kind, `16px 10px`, room for an icon. The default. */
  | 'md'

export interface TileProps {
  /** What the thing is called. */
  name: ReactNode
  /** What kind of thing it is — "CLI · engineers", "scheduled", "self-hosted". The quiet line. */
  kind?: ReactNode
  /** A glyph in a tinted rounded square above the name. `md` only. */
  icon?: ReactNode
  /**
   * Set the NAME in JetBrains Mono. Same rule as `Chip`: for system names, connector names and
   * anything that reads as an identifier. The kind line stays in the body face — it is prose.
   * @default false
   */
  mono?: boolean
  /**
   * @default 'neutral'
   */
  tone?: ToneOrNeutral
  /**
   * @default 'md'
   */
  size?: TileSize
  className?: string
  style?: CSSProperties
}

/**
 * A named thing with a second, quieter line saying what kind of thing it is.
 *
 * **Why this is not a `Chip` prop.** The slide inventory (§5.5) excluded `.tool-chip` and
 * `.harness-chip` from `Chip` on the grounds that a two-line label with an icon block is a card
 * wearing a chip's name, and that judgement stands: `Chip` is one nowrap line and stays that way.
 * What has changed is the evidence for building the card. When the inventory was written the
 * corpus was the VC deck, where these barely appear. Measured across the buyer decks on
 * 2026-08-14 they are **77 uses** — the single largest gap between the kit and that family, and the
 * one thing standing between it and a mechanical port.
 *
 * It also all but retires a hack: the VC deck rebuild had to relax `white-space` on `.sk-chip`
 * locally to fit two-line labels. That was a deck-local override of a kit class, which is the smell
 * it looks like. The two blocks of them — the architecture slides' harness row and the round
 * slide's proof row — are Tiles now, so both families converge here. One call site keeps the
 * override on purpose: the Qualify -> Land -> Expand flow is a row of large chips with connector
 * arrows between them, where the chip size IS the point and a tile would read as four cards.
 *
 * @example
 * <TileRow>
 *   <Tile name="Claude Code" kind="CLI · engineers" />
 *   <Tile name="SynOS Apps" kind="sandboxed" tone="indigo" />
 * </TileRow>
 */
export function Tile({
  name,
  kind,
  icon,
  mono = false,
  tone = 'neutral',
  size = 'md',
  className,
  style,
}: TileProps) {
  return (
    <div
      className={cx(
        'sk-tile',
        size !== 'md' && `sk-tile--${size}`,
        tone !== 'neutral' && `sk-tile--${tone}`,
        className,
      )}
      style={style}
    >
      {icon && size === 'md' ? <div className="sk-tile-ico">{icon}</div> : null}
      <div className={cx('sk-tile-name', mono && 'sk-tile-name--mono')}>{name}</div>
      {kind ? <div className="sk-tile-kind">{kind}</div> : null}
    </div>
  )
}

export interface TileRowProps {
  /**
   * Lay the tiles out as equal columns instead of letting them size to their content. The buyer
   * decks' harness and tool rows are always equal columns — a row of tiles at ragged widths reads
   * as a list of unrelated things rather than as one set.
   * @default true
   */
  even?: boolean
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/** The row tiles sit in. Equal columns by default. */
export function TileRow({ even = true, children, className, style }: TileRowProps) {
  return (
    <div
      className={cx('sk-tile-row', !even && 'sk-tile-row--auto', className)}
      style={style}
    >
      {children}
    </div>
  )
}
