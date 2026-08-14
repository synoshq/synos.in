/**
 * @synos/brand-kit
 *
 * SynOS brand components for investor decks and prospect one-pagers, extracted from the seven
 * shipped artifacts in ~/ws/synos-gtm. The extraction record, every conflict found between the
 * source decks, and every deliberate deviation are in
 * `docs/plans/2026-08-13-slide-inventory.md`.
 *
 * Two scales, one system:
 *   - deck components render inside the 1380 x 712 `SlideFrame`
 *   - one-pager components render at A4 width
 * They share `tokens.css` and the three fonts. They share no padding and no type scale.
 */

import './styles/tokens.css'
import './styles/base.css'

export { SlideFrame } from './deck/SlideFrame'
export type { SlideFrameProps, SlideVariant, SlideDensity } from './deck/SlideFrame'

export { Eyebrow } from './deck/Eyebrow'
export type { EyebrowProps } from './deck/Eyebrow'

export { SlideHeader } from './deck/SlideHeader'
export type { SlideHeaderProps, SlideHeaderLayout } from './deck/SlideHeader'

export { CoverSlide, BigTypeSlide } from './deck/Slides'
export type { CoverSlideProps, BigTypeSlideProps } from './deck/Slides'

export { Matrix } from './deck/Matrix'
export type {
  MatrixProps,
  MatrixColumn,
  MatrixRow,
  MatrixCell,
  MatrixCellTone,
  MatrixVariant,
} from './deck/Matrix'

export { Callout } from './deck/Callout'
export type { CalloutProps, CalloutAccent } from './deck/Callout'

export { Chip, ChipRow } from './deck/Chip'
export type { ChipProps, ChipRowProps, ChipSize } from './deck/Chip'

export {
  WallCard,
  WallGrid,
  PillarCard,
  PillarGrid,
  PhaseCard,
  PhaseRow,
  UseCaseCard,
  UseCaseGrid,
  StatCard,
  StatRow,
  StepCard,
  StepGrid,
  SplitColumns,
  SplitColumn,
  SplitItem,
  Caption,
  QuoteBar,
} from './deck/Cards'
export type {
  WallCardProps,
  PillarCardProps,
  PhaseCardProps,
  UseCaseCardProps,
  StatCardProps,
  StepCardProps,
  SplitColumnProps,
  CaptionProps,
  QuoteBarProps,
} from './deck/Cards'

export {
  OnePagerPage,
  OnePagerHeader,
  SectionHeading,
  OutcomeCard,
  OutcomeGrid,
  CtaBar,
} from './print/OnePager'
export type {
  OnePagerPageProps,
  OnePagerHeaderProps,
  SectionHeadingProps,
  OutcomeCardProps,
  CtaBarProps,
} from './print/OnePager'

export type { Tone, ToneOrNeutral, Scale, BaseProps } from './types'
