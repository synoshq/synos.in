import type { CSSProperties, ReactNode } from 'react'
import { Fragment } from 'react'
import { cx } from '../types'
import './Matrix.css'

/**
 * How much of a capability a cell claims.
 *
 * This is the whole semantic vocabulary of a comparison table and it is deliberately five fixed
 * values, not a free `tone`. A capability matrix that lets each cell pick any colour stops being
 * readable down a column, which is the only direction anyone reads one.
 */
export type MatrixCellTone =
  /** A plain cell that carries prose rather than a verdict. The base fill, no colour claim. */
  | 'neutral'
  /** Absent. Renders as a dashed outline with no fill — visible as a hole, which is the point. */
  | 'none'
  /** Partial, qualified, or true only under a condition. Amber tint. */
  | 'partial'
  /** Present. Violet tint. */
  | 'full'
  /** Ours, and the one cell on the slide that should stop the eye. The brand gradient. */
  | 'brand'

export interface MatrixCell {
  /**
   * Defaults to `'neutral'` — a cell with text and no verdict. Absence must be said explicitly
   * with `'none'`, so an empty cell is never an accident of a short row.
   * @default 'neutral'
   */
  tone?: MatrixCellTone
  /** Bolded lead-in, rendered on its own line above `text`. Use on at most one cell per matrix. */
  title?: ReactNode
  /** The claim itself. Keep it to a phrase — a matrix cell is a label, not a sentence. */
  text?: ReactNode
}

export interface MatrixColumn {
  label: ReactNode
  /** The examples under the heading — "Databricks · Snowflake · Fabric". */
  sub?: ReactNode
  /** Marks this as our column: violet heading instead of ink. At most one. */
  emphasis?: boolean
  /**
   * Track width for this column, as a grid value. Columns are equal `1fr` by default; set this
   * only where a column genuinely carries more text than its neighbours.
   * @default '1fr'
   */
  width?: string
}

export interface MatrixRow {
  label: ReactNode
  sub?: ReactNode
  /** One entry per column, in column order. A short row is padded with `'none'` holes. */
  cells: MatrixCell[]
}

export type MatrixVariant =
  /** Filled state cells on a gapped grid. The capability matrix. */
  | 'cells'
  /** Hairline-ruled rows, no fills. The plain comparison table. */
  | 'rules'

export interface MatrixProps {
  columns: MatrixColumn[]
  rows: MatrixRow[]
  /**
   * Width of the row-label column. The corpus uses 150–180px; anything much narrower wraps the
   * labels to three lines and the table stops scanning.
   * @default '180px'
   */
  labelWidth?: string
  /**
   * Heading for the row-label column. Left empty by default: a capability matrix's rows are the
   * subject and naming them twice is noise. A comparison table usually does want it ("You'll
   * bucket us with…"), which is what this is for.
   */
  cornerLabel?: ReactNode
  /** @default 'cells' */
  variant?: MatrixVariant
  className?: string
  style?: CSSProperties
}

const TONE_CLASS: Record<MatrixCellTone, string | false> = {
  neutral: false,
  none: 'sk-matrix-cell--none',
  partial: 'sk-matrix-cell--partial',
  full: 'sk-matrix-cell--full',
  brand: 'sk-matrix-cell--brand',
}

/**
 * The kit's table.
 *
 * Four slides of the VC deck resisted the kit entirely and all four were tables — a 6x5 capability
 * landscape, a 5x5 model matrix, a 3-column comparison and a 2x2 quadrant. The kit had grids with
 * fixed column counts and no table primitive at all, so the deck grew a local `.dk-matrix` and
 * `.dk-comp`. That was the most expensive gap in the 2026-08-14 rebuild report, and this closes it
 * for three of the four. The quadrant stays deck-local on purpose: its axis labels are the content,
 * which makes it a diagram wearing a grid, not a table.
 *
 * It is ONE component with two variants rather than two components, because the difference between
 * a capability matrix and a comparison table is entirely whether the cells carry state. Everything
 * else — the header row with its examples line, the row label with its qualifier, the column
 * emphasis — is identical, and two components would have drifted apart on the parts that matter.
 *
 * @example
 * <Matrix
 *   labelWidth="180px"
 *   columns={[
 *     { label: 'Data platforms', sub: 'Databricks · Snowflake' },
 *     { label: 'SynOS', sub: 'today, and what it becomes', emphasis: true },
 *   ]}
 *   rows={[
 *     { label: 'Governance', sub: 'RBAC, audit, kill switch',
 *       cells: [{ tone: 'none' }, { tone: 'full', text: 'agent acts as a revocable person' }] },
 *   ]}
 * />
 */
export function Matrix({
  columns,
  rows,
  labelWidth = '180px',
  cornerLabel,
  variant = 'cells',
  className,
  style,
}: MatrixProps) {
  return (
    <div
      className={cx('sk-matrix', variant === 'rules' && 'sk-matrix--rules', className)}
      style={{
        gridTemplateColumns: [labelWidth, ...columns.map((c) => c.width ?? '1fr')].join(' '),
        ...style,
      }}
    >
      {/* The corner above the row labels. Empty by default, and then a bare `<div/>` rather than
          an empty header cell, so the header row's baseline is set by real headings only. */}
      {cornerLabel ? <div className="sk-matrix-head">{cornerLabel}</div> : <div />}
      {columns.map((c, i) => (
        <div
          className={cx('sk-matrix-head', c.emphasis && 'sk-matrix-head--ours')}
          key={`h${i}`}
        >
          {c.label}
          {c.sub ? <span>{c.sub}</span> : null}
        </div>
      ))}

      {rows.map((r, ri) => (
        <Fragment key={`r${ri}`}>
          <div className="sk-matrix-label">
            {r.label}
            {r.sub ? <span>{r.sub}</span> : null}
          </div>
          {columns.map((_, ci) => {
            /* A row shorter than the column list pads with holes, not with blanks: a missing
               entry in a capability matrix means "no", and silently rendering nothing would let a
               data error read as a design choice. */
            const cell = r.cells[ci] ?? { tone: 'none' as const }
            const tone = cell.tone ?? 'neutral'
            return (
              <div className={cx('sk-matrix-cell', TONE_CLASS[tone])} key={`c${ri}-${ci}`}>
                {/* One inner block, always. The cell is a flex container so a short cell centres
                    against a tall neighbour — and a flex container makes every child a flex item,
                    so `<>The <strong>grounding corpus</strong> a model is trained on.</>` would lay
                    its three runs out side by side as columns. That is not hypothetical: it is what
                    this cell did until the wrapper was added. */}
                <span className="sk-matrix-cell-in">
                  {cell.title ? <b>{cell.title}</b> : null}
                  {cell.text}
                </span>
              </div>
            )
          })}
        </Fragment>
      ))}
    </div>
  )
}
