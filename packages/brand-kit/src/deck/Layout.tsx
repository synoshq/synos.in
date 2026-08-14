import type { CSSProperties, ReactNode } from 'react'
import { cx } from '../types'
import './Layout.css'

/**
 * A step on the kit's spacing scale — 4 / 6 / 8 / 12 / 16 / 22 / 32 / 48px.
 *
 * Named by role rather than by number, because a caller choosing between `16` and `18` is exactly
 * the decision the scale exists to remove. See the scale's note in `tokens.css` for the measurement
 * that produced these steps.
 */
export type Space =
  /** 6px. Inside a card, between a label and the thing it labels. */
  | 'tight'
  /** 12px. Between related blocks — a grid and its caption. */
  | 'snug'
  /** 16px. The default rhythm between blocks on a slide. */
  | 'base'
  /** 22px. Between a slide's distinct sections, where the change of subject should be felt. */
  | 'loose'

/* The step is passed as a custom property, NOT as an inline `gap`. An inline `gap` is an inline
   style and therefore unbeatable by any stylesheet — the density register could never tighten a
   stack, which is the one thing it most needs to do. */
export const SPACE_VAR: Record<Space, string> = {
  tight: 'var(--sk-space-2)',
  snug: 'var(--sk-space-4)',
  base: 'var(--sk-space-5)',
  loose: 'var(--sk-space-6)',
}

export interface StackProps {
  /** @default 'base' */
  gap?: Space
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

/**
 * A vertical rhythm for a slide's body.
 *
 * Prefer this to margins on the blocks themselves. A margin makes the spacing a property of the
 * block, so the same component spaces differently depending on where it lands and every slide
 * re-decides; a stack makes it a property of the slide, decided once.
 *
 * `min-height: 0` so a stack inside the card's flex column can actually shrink — without it a tall
 * child pushes the stack past the card instead of the card's own overflow rules applying.
 *
 * @example
 * <SlideFrame>
 *   <SlideHeader eyebrow="Landscape" title="…" />
 *   <Stack gap="snug">
 *     <UseCaseGrid>…</UseCaseGrid>
 *     <Callout tone="indigo">…</Callout>
 *   </Stack>
 * </SlideFrame>
 */
export function Stack({ gap = 'base', children, className, style }: StackProps) {
  return (
    <div
      className={cx('sk-stack', className)}
      style={{ '--sk-gap': SPACE_VAR[gap], ...style } as CSSProperties}
    >
      {children}
    </div>
  )
}

/**
 * The column ratios the deck corpus actually uses. A free `gridTemplateColumns` is how a deck ends
 * up with eleven near-identical splits, so the ratios are an enum.
 */
export type ColumnsRatio =
  /** Two equal columns. The default, and the right answer unless one side genuinely carries more. */
  | 'even'
  /** 1.25fr / 1fr — a lead column with a supporting one. */
  | 'lead'
  /** 1.15fr / 1fr — barely uneven, for two columns of prose of visibly different length. */
  | 'nudge'

const RATIO_CLASS: Record<ColumnsRatio, string> = {
  even: 'sk-cols--even',
  lead: 'sk-cols--lead',
  nudge: 'sk-cols--nudge',
}

export interface ColumnsProps {
  /** @default 'even' */
  ratio?: ColumnsRatio
  /** @default 'base' */
  gap?: Space
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

/**
 * Two columns of arbitrary content.
 *
 * Distinct from `SplitColumns`, which is a *contrast* component with its own eyebrow and marker
 * vocabulary ("before / after", "them / us"). Several slides need only the geometry and were
 * reaching for a local `.dk-cols` to get it; this is that geometry, on the kit's scale.
 *
 * @example
 * <Columns ratio="lead" gap="snug">
 *   <Callout tone="indigo" label="Why this is infrastructure work">…</Callout>
 *   <Callout tone="violet" label="What the round builds">…</Callout>
 * </Columns>
 */
export function Columns({
  ratio = 'even',
  gap = 'base',
  children,
  className,
  style,
}: ColumnsProps) {
  return (
    <div
      className={cx('sk-cols', RATIO_CLASS[ratio], className)}
      style={{ '--sk-gap': SPACE_VAR[gap], ...style } as CSSProperties}
    >
      {children}
    </div>
  )
}
