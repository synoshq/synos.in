import type { ReactNode } from 'react'

/**
 * The five semantic hues of the SynOS system. Every tinted surface in the corpus is one of these,
 * and each carries a fixed meaning that must not be reassigned:
 *
 * - `indigo`  — us / SynOS / the operating layer itself
 * - `violet`  — AI, agents, knowledge, the thing being built next
 * - `emerald` — a win, something live, money saved
 * - `amber`   — caution, an objection, work in progress
 * - `red`     — pain, a wall, the status quo
 *
 * Each hue exists as a `bg` / `br` / saturated-text triple in `tokens.css`.
 */
export type Tone = 'indigo' | 'violet' | 'emerald' | 'amber' | 'red'

/** `Tone` plus the untinted neutral (`--sk-surface-2` on `--sk-border`), used by default chips and cards. */
export type ToneOrNeutral = Tone | 'neutral'

/**
 * Which of the two scales a component renders at.
 *
 * - `deck`  — inside the 1380 x 712 slide card. 10–19px type.
 * - `print` — inside the A4 one-pager page. 7–13px type.
 *
 * The two scales share tokens and fonts. They deliberately share no padding or type scale: the
 * sources set them independently and the ratio between them is not constant.
 */
export type Scale = 'deck' | 'print'

/** Props every component accepts, so a consumer can always reach the underlying element. */
export interface BaseProps {
  /** Extra class names, appended after the component's own. */
  className?: string
  /** Inline style escape hatch. Prefer props; this exists for grid placement. */
  style?: React.CSSProperties
  /** Rendered inside the component's root element. */
  children?: ReactNode
}

/** Join class names, dropping falsy entries. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}
