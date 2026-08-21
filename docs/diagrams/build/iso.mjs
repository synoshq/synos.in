// Isometric primitives, shared by every diagram that draws in 2:1 isometric.
//
// Hand-placing extruded blocks is where isometric diagrams go wrong: one wrong vertex and a face
// no longer shares an edge, which reads as sloppy long before a viewer can say why. So the
// geometry is computed and the SVG is emitted as a static file. The output ships; this does not.
//
// Convention. A plane is a rhombus with half-width W and half-height H = W/2, centred at (cx, cy).
// Surface coordinates are (a, b) in [0,1], measured from the LEFT vertex along the two edges:
//
//        top                      a runs left -> top -> right
//    left     right               b runs left -> bottom -> right
//       bottom
//
//   P(a,b) = ( cx + W*(a + b - 1),  cy + H*(b - a) )

export const ISO = { W: 260, H: 130 }

export function P(cx, cy, a, b, { W = ISO.W, H = ISO.H } = {}) {
  return [cx + W * (a + b - 1), cy + H * (b - a)]
}

const pts = arr => arr.map(([x, y]) => `${round(x)},${round(y)}`).join(' ')
const round = n => Math.round(n * 100) / 100

/** A flat plane: the top face plus its two visible extruded side faces. */
export function plane(cx, cy, thickness, cls, opts = {}) {
  const c = k => P(cx, cy, ...k, opts)
  const top = [c([0, 0]), c([1, 0]), c([1, 1]), c([0, 1])]  // left, top, right, bottom
  const [L, T, R, B] = top
  const down = ([x, y]) => [x, y + thickness]
  return [
    // left-facing side: left vertex -> bottom vertex
    `<polygon class="${cls}-l" points="${pts([L, B, down(B), down(L)])}"/>`,
    // right-facing side: bottom vertex -> right vertex
    `<polygon class="${cls}-r" points="${pts([B, R, down(R), down(B)])}"/>`,
    `<polygon class="${cls}-t" points="${pts(top)}"/>`,
  ].join('\n    ')
}

/**
 * An extruded block sitting ON a plane's surface.
 * (a, b) is its near-left corner, s its footprint, h its height above the surface.
 * Returned back-to-front so a list of these can be painted in draw order.
 */
export function block(cx, cy, a, b, s, h, cls, opts = {}) {
  const g = (u, v) => P(cx, cy, u, v, opts)
  const up = ([x, y]) => [x, y - h]

  // Footprint rhombus, named by where each corner lands ON SCREEN.
  const left   = g(a,     b    )
  const top    = g(a + s, b    )
  const right  = g(a + s, b + s)
  const bottom = g(a,     b + s)

  // Only two side faces are visible from this viewpoint: the two that meet at the bottom corner.
  return [
    `<polygon class="${cls}-l" points="${pts([left, bottom, up(bottom), up(left)])}"/>`,
    `<polygon class="${cls}-r" points="${pts([bottom, right, up(right), up(bottom)])}"/>`,
    `<polygon class="${cls}-t" points="${pts([up(left), up(top), up(right), up(bottom)])}"/>`,
  ].join('\n    ')
}

/** Depth order for blocks on a plane: things further back are painted first. */
export function byDepth(blocks) {
  return [...blocks].sort((p, q) => (p.a + p.b) - (q.a + q.b))
}

/** A grid of faint lines clipped to the plane's rhombus, so a surface reads as a surface. */
export function surfaceGrid(cx, cy, n, cls, opts = {}) {
  const out = []
  for (let i = 1; i < n; i++) {
    const t = i / n
    const [x1, y1] = P(cx, cy, t, 0, opts)
    const [x2, y2] = P(cx, cy, t, 1, opts)
    out.push(`<line class="${cls}" x1="${round(x1)}" y1="${round(y1)}" x2="${round(x2)}" y2="${round(y2)}"/>`)
    const [x3, y3] = P(cx, cy, 0, t, opts)
    const [x4, y4] = P(cx, cy, 1, t, opts)
    out.push(`<line class="${cls}" x1="${round(x3)}" y1="${round(y3)}" x2="${round(x4)}" y2="${round(y4)}"/>`)
  }
  return out.join('\n    ')
}

export { round, pts }
