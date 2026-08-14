import type { CSSProperties, ReactNode } from 'react'
import { cx, type Scale, type Tone, type ToneOrNeutral } from '../types'
import './Cards.css'

/* ════════════════════════════════════════════════════════════════════════════
 * Wall
 * ═══════════════════════════════════════════════════════════════════════════ */

export interface WallCardProps {
  /** The complaint, in the operator's own words. The lead line. */
  quote?: ReactNode
  /** The consequence, in muted grey. */
  tag?: ReactNode
  className?: string
  style?: CSSProperties
}

/**
 * One of the six walls between a clever demo and real company value.
 *
 * The only body block that appears six times in every deck in the corpus. The red left rule is
 * fixed — a wall is always pain, so `WallCard` takes no `tone`.
 *
 * @example
 * <WallGrid>
 *   <WallCard quote="Nobody knows what anyone else automated." tag="No shared context." />
 * </WallGrid>
 */
export function WallCard({ quote, tag, className, style }: WallCardProps) {
  return (
    <div className={cx('sk-wall', className)} style={style}>
      {quote ? <div className="sk-wall-quote">{quote}</div> : null}
      {tag ? <div className="sk-wall-tag">{tag}</div> : null}
    </div>
  )
}

export interface GridProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/** The 3-column grid the six walls sit in. Two rows of three. */
export function WallGrid({ children, className, style }: GridProps) {
  return (
    <div className={cx('sk-wall-grid', className)} style={style}>
      {children}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
 * Pillar
 * ═══════════════════════════════════════════════════════════════════════════ */

export interface PillarCardProps {
  /** Icon, usually a 16–20px stroked SVG. Sits in a tinted rounded square. */
  icon?: ReactNode
  /** Small mono label above the name. Used by the brain card in the source. */
  kicker?: ReactNode
  /** The pillar's name. */
  name: ReactNode
  /** One or two lines on what the pillar does. */
  desc?: ReactNode
  /**
   * Hue of the icon tile.
   * @default 'indigo'
   */
  tone?: Tone
  /**
   * Render as the Company Brain anchor: full brand gradient, white text, icon inline, spanning two
   * grid columns. One per architecture slide.
   * @default false
   */
  brain?: boolean
  className?: string
  style?: CSSProperties
}

/**
 * One part of the operating layer.
 *
 * @example
 * <PillarGrid>
 *   <PillarCard brain kicker="The anchor" name="Company Brain"
 *               desc="One living context graph across every team." icon={<BrainIcon />} />
 *   <PillarCard name="Skills" tone="amber" desc="Reusable, versioned, measured." />
 * </PillarGrid>
 */
export function PillarCard({
  icon,
  kicker,
  name,
  desc,
  tone = 'indigo',
  brain = false,
  className,
  style,
}: PillarCardProps) {
  return (
    <div
      className={cx(
        'sk-pillar',
        `sk-pillar--${tone}`,
        brain && 'sk-pillar--brain',
        className,
      )}
      style={style}
    >
      {icon ? <div className="sk-pillar-ico">{icon}</div> : null}
      <div className="sk-pillar-text">
        {kicker ? <div className="sk-pillar-kicker">{kicker}</div> : null}
        <div className="sk-pillar-name">{name}</div>
        {desc ? <div className="sk-pillar-desc">{desc}</div> : null}
      </div>
    </div>
  )
}

/** The pillar grid. 3 columns by default; the brain card spans the first two. */
export function PillarGrid({
  columns = 3,
  children,
  className,
  style,
}: GridProps & {
  /**
   * Column count.
   * @default 3
   */
  columns?: number
}) {
  return (
    <div
      className={cx('sk-pillar-grid', className)}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, ...style }}
    >
      {children}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
 * Phase
 * ═══════════════════════════════════════════════════════════════════════════ */

export interface PhaseCardProps {
  /** Badge text — `S1`, `S2`, `Phase 1`. Renders as a mono pill. */
  badge?: ReactNode
  /** When this phase happens. Small uppercase, in the phase's accent hue. */
  when?: ReactNode
  /** The phase's name. */
  title: ReactNode
  /** What happens in it. */
  body?: ReactNode
  /** Bottom line pinned above a dashed rule — revenue, outcome, status. */
  foot?: ReactNode
  /**
   * Where in the arc this phase sits. `'near'` is indigo; `'bridge'` gives the badge the brand
   * gradient; `'far'` goes violet. Conflict C11: the buyer decks and the VC one-pager take `'far'`
   * to teal — the newest deck's violet wins.
   * @default 'near'
   */
  position?: 'near' | 'bridge' | 'far'
  /**
   * @default 'deck'
   */
  scale?: Scale
  className?: string
  style?: CSSProperties
}

/**
 * A numbered horizon card: where the product is now, next, and after that.
 *
 * @example
 * <PhaseRow>
 *   <PhaseCard badge="S1" when="Today" title="Unblock" body="…" foot="Live · 3 engagements" />
 *   <PhaseCard badge="S2" when="Next" title="Compound" position="bridge" />
 *   <PhaseCard badge="S3" when="Then" title="Own the loop" position="far" />
 * </PhaseRow>
 */
export function PhaseCard({
  badge,
  when,
  title,
  body,
  foot,
  position = 'near',
  scale = 'deck',
  className,
  style,
}: PhaseCardProps) {
  return (
    <div
      className={cx(
        'sk-phase',
        position === 'bridge' && 'sk-phase--bridge',
        position === 'far' && 'sk-phase--far',
        scale === 'print' && 'sk-phase--print',
        className,
      )}
      style={style}
    >
      {badge ? <span className="sk-phase-badge">{badge}</span> : null}
      {when ? <div className="sk-phase-when">{when}</div> : null}
      <h3 className="sk-phase-title">{title}</h3>
      {body ? <p className="sk-phase-body">{body}</p> : null}
      {foot ? <div className="sk-phase-foot">{foot}</div> : null}
    </div>
  )
}

/** The 3-column row phases sit in. */
export function PhaseRow({ children, className, style }: GridProps) {
  return (
    <div className={cx('sk-phase-row', className)} style={style}>
      {children}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
 * Use case
 * ═══════════════════════════════════════════════════════════════════════════ */

export interface UseCaseCardProps {
  /** Small mono label — the category. Takes the card's hue. */
  kicker?: ReactNode
  /** What the team builds. */
  title: ReactNode
  /** One or two lines on the shape of it. */
  body?: ReactNode
  /**
   * Hue of the kicker, and for `violet` the fill too.
   * @default 'neutral'
   */
  tone?: ToneOrNeutral
  /**
   * Render as the Company Brain flagship: an indigo gradient fill with a 1.5px indigo border.
   * One per grid.
   * @default false
   */
  flagship?: boolean
  className?: string
  style?: CSSProperties
}

/**
 * One thing a team builds on the layer — a Sales Brain, a FinOps Brain, a custom agent product.
 *
 * @example
 * <UseCaseGrid>
 *   <UseCaseCard flagship kicker="Flagship" title="Company Brain" body="…" />
 *   <UseCaseCard tone="emerald" kicker="Function" title="Sales Brain" body="…" />
 * </UseCaseGrid>
 */
export function UseCaseCard({
  kicker,
  title,
  body,
  tone = 'neutral',
  flagship = false,
  className,
  style,
}: UseCaseCardProps) {
  return (
    <div
      className={cx(
        'sk-usecase',
        tone !== 'neutral' && `sk-usecase--${tone}`,
        flagship && 'sk-usecase--flagship',
        className,
      )}
      style={style}
    >
      {kicker ? <div className="sk-usecase-kicker">{kicker}</div> : null}
      <h3 className="sk-usecase-title">{title}</h3>
      {body ? <p className="sk-usecase-body">{body}</p> : null}
    </div>
  )
}

/** The 3-column use-case grid. */
export function UseCaseGrid({ children, className, style }: GridProps) {
  return (
    <div className={cx('sk-usecase-grid', className)} style={style}>
      {children}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
 * Stat
 * ═══════════════════════════════════════════════════════════════════════════ */

export interface StatCardProps {
  /**
   * The number. Rendered at 72px Instrument Serif in the tone's hue. Keep it short — since decision
   * G de-boxed the card it is not merely the whole card, it IS the card: there is no surface behind
   * it, so the number and its hue are the only things marking the object out.
   */
  value: ReactNode
  /** What the number means. */
  label?: ReactNode
  /** Where the number came from. Mono, muted. Every stat in the corpus carries one. */
  source?: ReactNode
  /**
   * @default 'indigo'
   */
  tone?: Tone
  className?: string
  style?: CSSProperties
}

/**
 * A single large number with its label and its source.
 *
 * @example
 * <StatRow>
 *   <StatCard value="78%" label="of enterprises report an AI pilot that never shipped" source="McKinsey, 2025" />
 * </StatRow>
 */
export function StatCard({ value, label, source, tone = 'indigo', className, style }: StatCardProps) {
  return (
    <div className={cx('sk-stat', `sk-stat--${tone}`, className)} style={style}>
      <div className="sk-stat-value">{value}</div>
      {label ? <div className="sk-stat-label">{label}</div> : null}
      {source ? <div className="sk-stat-source">{source}</div> : null}
    </div>
  )
}

/** The 3-column stat row. */
export function StatRow({ children, className, style }: GridProps) {
  return (
    <div className={cx('sk-stat-row', className)} style={style}>
      {children}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
 * Step
 * ═══════════════════════════════════════════════════════════════════════════ */

export interface StepCardProps {
  /** Step marker — `01`, `Step 2`. Mono, violet. */
  num?: ReactNode
  /** What happens at this step. */
  title: ReactNode
  /** How it happens. */
  body?: ReactNode
  /** A quoted prompt or line of dialogue, in a violet-ruled box under the body. */
  quote?: ReactNode
  /**
   * Show the 9px gradient cap along the top of the card.
   * @default true
   */
  bar?: boolean
  className?: string
  style?: CSSProperties
}

/**
 * A storyboard step: one beat of a demo or a delivery sequence.
 *
 * @example
 * <StepGrid>
 *   <StepCard num="01" title="Ask" body="Someone asks the brain a question."
 *             quote="Which stores missed target last quarter, and why?" />
 * </StepGrid>
 */
export function StepCard({ num, title, body, quote, bar = true, className, style }: StepCardProps) {
  return (
    <div className={cx('sk-step', className)} style={style}>
      {bar ? <div className="sk-step-bar" /> : null}
      <div className="sk-step-body">
        {num ? <div className="sk-step-num">{num}</div> : null}
        <h3 className="sk-step-title">{title}</h3>
        {body ? <p className="sk-step-text">{body}</p> : null}
        {quote ? <div className="sk-step-quote">{quote}</div> : null}
      </div>
    </div>
  )
}

/** The 3-column storyboard grid. */
export function StepGrid({ children, className, style }: GridProps) {
  return (
    <div className={cx('sk-step-grid', className)} style={style}>
      {children}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
 * Split
 * ═══════════════════════════════════════════════════════════════════════════ */

export interface SplitColumnProps {
  /** Small uppercase label at the top of the column. */
  eyebrow?: ReactNode
  /** The column's claim. */
  title?: ReactNode
  /**
   * Hue. `'neutral'` is the grey "this is what dies" column; `'violet'` is the "this is what wins"
   * column; `'indigo'` is the alternative-door column.
   * @default 'neutral'
   */
  tone?: ToneOrNeutral
  /** Column contents. Normally `SplitItem`s. */
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

/** One side of a two-column contrast. */
export function SplitColumn({
  eyebrow,
  title,
  tone = 'neutral',
  children,
  className,
  style,
}: SplitColumnProps) {
  return (
    <div
      className={cx('sk-split-col', tone !== 'neutral' && `sk-split-col--${tone}`, className)}
      style={style}
    >
      {eyebrow ? <div className="sk-split-eyebrow">{eyebrow}</div> : null}
      {title ? <h3 className="sk-split-title">{title}</h3> : null}
      {children}
    </div>
  )
}

/**
 * A two-column contrast: what the old world does, what the new one does.
 *
 * @example
 * <SplitColumns>
 *   <SplitColumn eyebrow="Buy it" title="A vendor's AI">
 *     <SplitItem>Locked to their platform.</SplitItem>
 *   </SplitColumn>
 *   <SplitColumn tone="violet" eyebrow="Own it" title="Your layer">
 *     <SplitItem>Everything it learns stays yours.</SplitItem>
 *   </SplitColumn>
 * </SplitColumns>
 */
export function SplitColumns({ children, className, style }: GridProps) {
  return (
    <div className={cx('sk-split', className)} style={style}>
      {children}
    </div>
  )
}

/** One bullet row inside a `SplitColumn`. */
export function SplitItem({
  marker = '·',
  children,
  className,
  style,
}: GridProps & {
  /**
   * The leading glyph. The sources use a check, a cross or a middot depending on the column.
   * @default '·'
   */
  marker?: ReactNode
}) {
  return (
    <div className={cx('sk-split-item', className)} style={style}>
      <span aria-hidden>{marker}</span>
      <span>{children}</span>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
 * Caption / QuoteBar
 * ═══════════════════════════════════════════════════════════════════════════ */

export interface CaptionProps {
  /**
   * Italicise the line, for an attributed remark rather than a summary.
   * @default false
   */
  italic?: boolean
  /**
   * Set the line in JetBrains Mono at the caption's size, for a line of *evidence* rather than a
   * remark — a contract shape, a metric, a status. The mono face is the kit's third and quietest
   * register and it reads as "this is a fact, not a claim", which is precisely the job a caption
   * under a traction slide is doing.
   *
   * Added because the v7 rebuild lost that face: the traction line had been a `StepCard.quote`,
   * which renders mono, and moving it to a Caption silently dropped it. Rather than route the
   * content back through a card it does not belong in, the register it needed became a prop.
   * @default false
   */
  mono?: boolean
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/**
 * The centred line under a body block that says what the block means.
 *
 * `<strong>` inside a caption goes indigo — that is the emphasis convention, not a colour choice.
 */
export function Caption({ italic = false, mono = false, children, className, style }: CaptionProps) {
  return (
    <div
      className={cx(
        'sk-caption',
        italic && 'sk-caption--italic',
        mono && 'sk-caption--mono',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  )
}

export interface QuoteBarProps {
  /**
   * `'print'` renders the one-pager `.q`: indigo-tinted, 8.6px.
   * @default 'deck'
   */
  scale?: Scale
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/** A quoted line in a bordered bar — a customer's words, or a line from an operator. */
export function QuoteBar({ scale = 'deck', children, className, style }: QuoteBarProps) {
  return (
    <div className={cx('sk-quote', scale === 'print' && 'sk-quote--print', className)} style={style}>
      {children}
    </div>
  )
}
