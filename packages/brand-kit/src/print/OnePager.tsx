import type { CSSProperties, ReactNode } from 'react'
import { cx, type ToneOrNeutral } from '../types'
import { SPACE_VAR, type Space } from '../deck/Layout'
import './OnePager.css'

export interface OnePagerPageProps {
  /**
   * Rhythm between the page's blocks. Defaults to the extracted 8px, which is right for a page
   * that is full; a page with slack should open its gaps rather than stretch its content, so give
   * it a bigger step instead of padding the copy.
   */
  gap?: Space
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/**
 * One A4 portrait page of a one-pager: 210 x 297mm, `11mm 13mm 9mm` of padding, an 8px column gap.
 *
 * Render several in sequence for a multi-page one-pager — they break correctly in print and show a
 * dashed seam on screen, exactly as the source pair does.
 *
 * @example
 * <OnePagerPage>
 *   <OnePagerHeader brand={<>Syn<span className="sk-a">OS</span></>} tag="The Human-Agent Operating Layer" title="…" />
 *   <SectionHeading title="The now-problem" />
 *   <Callout scale="print" tone="red">…</Callout>
 *   <CtaBar title="Start with one team." />
 * </OnePagerPage>
 */
export function OnePagerPage({ gap, children, className, style }: OnePagerPageProps) {
  return (
    <div
      className={cx('sk-print', 'sk-page', className)}
      style={gap ? ({ '--sk-gap': SPACE_VAR[gap], ...style } as CSSProperties) : style}
    >
      {children}
    </div>
  )
}

export interface OnePagerHeaderProps {
  /** The wordmark. Wrap the accented part in `<span className="sk-a">`. */
  brand: ReactNode
  /** The category line, top right — mono and teal by default. */
  tag?: ReactNode
  /** The 22px headline. */
  title: ReactNode
  /** A bold 13.5px restatement between the title and the sub. The CTO one-pagers use this. */
  lede?: ReactNode
  /** The 10.5px body paragraph — the whole argument in one block. */
  sub?: ReactNode
  /** A small uppercase line below the header. */
  runner?: ReactNode
  /**
   * The bottom rule. `'gradient'` runs indigo → teal at 2.5px (newest); `'solid'` is a flat 2px
   * indigo (the CTO pair).
   * @default 'gradient'
   */
  rule?: 'gradient' | 'solid'
  className?: string
  style?: CSSProperties
}

/** The masthead of a one-pager: wordmark, category, headline, argument. */
export function OnePagerHeader({
  brand,
  tag,
  title,
  lede,
  sub,
  runner,
  rule = 'gradient',
  className,
  style,
}: OnePagerHeaderProps) {
  return (
    <div className={cx('sk-ph', rule === 'solid' && 'sk-ph--solid', className)} style={style}>
      <div className="sk-ph-top">
        <div className="sk-ph-brand">{brand}</div>
        {tag ? <div className="sk-ph-tag">{tag}</div> : null}
      </div>
      <h1 className="sk-ph-title">{title}</h1>
      {lede ? <div className="sk-ph-lede">{lede}</div> : null}
      {sub ? <p className="sk-ph-sub">{sub}</p> : null}
      {runner ? <div className="sk-ph-runner">{runner}</div> : null}
    </div>
  )
}

export interface SectionHeadingProps {
  /** The 13px / 800 heading. Wrap an accented word in `<span className="sk-a">`. */
  title: ReactNode
  /** An 8.8px muted line under it. */
  sub?: ReactNode
  className?: string
  style?: CSSProperties
}

/**
 * A one-pager section heading.
 *
 * For the smaller all-caps label with an optional badge (`.sec-label` in the VC one-pager), use
 * `<Eyebrow scale="print" badge="…" />` instead — it is the same object at a different weight.
 */
export function SectionHeading({ title, sub, className, style }: SectionHeadingProps) {
  return (
    <div className={cx('sk-sh', className)} style={style}>
      <h2 className="sk-sh-title">{title}</h2>
      {sub ? <p className="sk-sh-sub">{sub}</p> : null}
    </div>
  )
}

export interface OutcomeCardProps {
  /** What the team gets. */
  title: ReactNode
  /** How, and how much. */
  body?: ReactNode
  /**
   * Fill hue. Outcomes are wins, so emerald is the default and should usually stay.
   * @default 'emerald'
   */
  tone?: ToneOrNeutral
  className?: string
  style?: CSSProperties
}

/** A fully tinted outcome tile — what changes for the buyer's team. */
export function OutcomeCard({ title, body, tone = 'emerald', className, style }: OutcomeCardProps) {
  return (
    <div
      className={cx('sk-outcome', tone !== 'emerald' && `sk-outcome--${tone}`, className)}
      style={style}
    >
      <div className="sk-outcome-title">{title}</div>
      {body ? <div className="sk-outcome-body">{body}</div> : null}
    </div>
  )
}

/** The 2-column grid outcome cards sit in. */
export function OutcomeGrid({
  children,
  className,
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <div className={cx('sk-outcome-grid', className)} style={style}>
      {children}
    </div>
  )
}

export interface CtaBarProps {
  /** The ask, at 13.5px / 800. */
  title: ReactNode
  /** One line on what happens next. */
  body?: ReactNode
  /** Right-hand block — contact details, a URL, a name. Wrap the emphasis in `<b>`. */
  right?: ReactNode
  /**
   * `'teal'` runs the indigo → teal gradient with a teal border (the VC one-pager, newest);
   * `'indigo'` runs indigo → indigo-tint with an indigo border (the CTO pair).
   * @default 'teal'
   */
  tone?: 'teal' | 'indigo'
  className?: string
  style?: CSSProperties
}

/**
 * The bottom banner of a one-pager. `margin-top: auto` pushes it to the foot of the page.
 *
 * Note: `.cta` also exists in `synos-tech-buyer-v2.html` as a centred closing-slide layout, but it
 * has zero uses there — dead CSS. This is the live meaning of the class. See inventory C12.
 */
export function CtaBar({ title, body, right, tone = 'teal', className, style }: CtaBarProps) {
  return (
    <div className={cx('sk-cta', tone === 'indigo' && 'sk-cta--indigo', className)} style={style}>
      <div>
        <h3 className="sk-cta-title">{title}</h3>
        {body ? <p className="sk-cta-body">{body}</p> : null}
      </div>
      {right ? <div className="sk-cta-right">{right}</div> : null}
    </div>
  )
}

export interface OnePagerFooterProps {
  /** Who is sending it. Rendered bold in the body face. */
  name: ReactNode
  /** The credential line that follows the name — role, background. */
  credential?: ReactNode
  /** The right-hand item, normally the domain. */
  right?: ReactNode
  className?: string
  style?: CSSProperties
}

/**
 * The footer every one-pager page carries: who sent it on the left, where to find them on the
 * right, above a hairline.
 *
 * `margin-top: auto` pins it to the foot of the page's flex column, so a short page still puts its
 * footer on the baseline rather than halfway up. Present on every page of all eleven one-pagers in
 * the corpus, which is why it is a component and not a slot.
 */
export function OnePagerFooter({
  name,
  credential,
  right,
  className,
  style,
}: OnePagerFooterProps) {
  return (
    <div className={cx('sk-1p-foot', className)} style={style}>
      <div>
        <b>{name}</b>
        {credential ? <> · {credential}</> : null}
      </div>
      {right ? <div>{right}</div> : null}
    </div>
  )
}
