/*
 * Shared preview scaffolding.
 *
 * Lives in a subdirectory so the preview writer (which only looks at *.tsx
 * directly inside .design-sync/previews/) never mistakes it for a component
 * preview.
 *
 * Two jobs:
 *
 * 1. Put every specimen inside the scale wrapper its CSS expects. `base.css`
 *    scopes the type scale to `.sk-deck` / `.sk-print`, so a bare `<Callout>`
 *    on the page would render with the host's fonts and paragraph sizes.
 * 2. Fit the wide designs into a narrow card. Deck components are drawn for a
 *    1380px slide and the design-system card is ~330px; `Fit` zooms the design
 *    down to the width it is actually given, so the cell shows the whole slide
 *    instead of its top-left corner.
 */
import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

/** The 1380 x 712 slide, minus its 56px side padding — the deck's content width. */
export const SLIDE = 1380
/** The usable width inside a slide card. Most body blocks are drawn to this. */
export const SLIDE_BODY = 1180
/** A4 portrait at 96dpi. */
export const PAGE = 794

/**
 * Render `children` at a fixed design width, zoomed down to fit the container.
 *
 * `zoom` (not `transform: scale`) so the box actually reflows to the smaller
 * size: nothing overflows the card, and the wrapper's height follows the
 * content without measuring it.
 */
export function Fit({
  width,
  children,
  style,
}: {
  width: number
  children: ReactNode
  style?: CSSProperties
}) {
  const box = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)
  useLayoutEffect(() => {
    const el = box.current
    if (!el) return
    // Measured in a layout effect, so the first paint is already correct.
    const measure = () => {
      const w = el.clientWidth
      if (w > 0) setZoom(Math.min(1, w / width))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])
  // `overflow: hidden` only matters for the frame between a container resize
  // and the observer firing — the zoom above is what actually makes it fit.
  return (
    <div ref={box} style={{ width: '100%', overflow: 'hidden' }}>
      <div style={{ width, zoom, ...style }}>{children}</div>
    </div>
  )
}

/** Deck scale, at the card's own width — for blocks that read fine at ~330px. */
export function Deck({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="sk-deck" style={{ background: '#fff', ...style }}>
      {children}
    </div>
  )
}

/** Deck scale, drawn at `width` and zoomed to fit — for slides, grids and rows. */
export function DeckFit({
  width = SLIDE_BODY,
  children,
  style,
}: {
  width?: number
  children: ReactNode
  style?: CSSProperties
}) {
  return (
    <Fit width={width}>
      <div className="sk-deck" style={{ background: '#fff', ...style }}>
        {children}
      </div>
    </Fit>
  )
}

/** One-pager scale, at the card's own width. */
export function Print({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="sk-print" style={{ background: '#fff', ...style }}>
      {children}
    </div>
  )
}

/** One-pager scale, drawn at `width` and zoomed to fit. */
export function PrintFit({
  width = 640,
  children,
  style,
}: {
  width?: number
  children: ReactNode
  style?: CSSProperties
}) {
  return (
    <Fit width={width}>
      <div className="sk-print" style={{ background: '#fff', ...style }}>
        {children}
      </div>
    </Fit>
  )
}

/** Vertical rhythm for a preview that shows several instances of one component. */
export function Stack({
  gap = 12,
  children,
  style,
}: {
  gap?: number
  children: ReactNode
  style?: CSSProperties
}) {
  return <div style={{ display: 'grid', gap, ...style }}>{children}</div>
}

/** Stand-in for the stroked 18px icons the source slides draw inline. */
export const Ico = ({ d }: { d: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)

/** The six pillar glyphs, in the order the architecture slide draws them. */
export const GLYPH = {
  brain: 'M12 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5.8V17a3 3 0 0 0 6 0V7a3 3 0 0 0-2-3Zm0 0a3 3 0 0 1 3 3 3 3 0 0 1 1 5.8',
  skills: 'M4 7h16M4 12h10M4 17h7',
  storage: 'M4 6c0-1.1 3.6-2 8-2s8 .9 8 2-3.6 2-8 2-8-.9-8-2Zm0 0v12c0 1.1 3.6 2 8 2s8-.9 8-2V6',
  deploy: 'M12 3v13m0-13 4 4m-4-4-4 4M5 20h14',
  access: 'M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3Z',
  loop: 'M4 12a8 8 0 0 1 13.7-5.7M20 12a8 8 0 0 1-13.7 5.7M18 4v3h-3M6 20v-3h3',
} as const
