/**
 * Fidelity specimens.
 *
 * Each specimen pairs one built component with the real slide it was extracted from, and names the
 * CSS properties that carry the brand and must therefore match.
 *
 * `source` is a selector evaluated inside the currently-presented slide of `file`.
 * `built` is a selector evaluated inside the rendered component.
 */
import { createElement as h } from 'react'
import * as K from '../../dist/brand-kit.js'

/**
 * The decisions of the 2026-08-13 improvement pass, in Anoop's own numbering.
 *
 * Every property in a specimen's `intentional` map names one of these. A check that carries an
 * `intentional` entry is NOT weakened — the runner pins both the source value and the built value,
 * so the check still fails on kit drift and now additionally fails if the source artifact moves.
 * Nothing here is licence to delete an assertion; a divergence with no key here is a bug.
 *
 * Plan: docs/plans/2026-08-13-brand-kit-improvement-pass.md
 * Research: docs/plans/2026-08-13-deck-research.md
 * Report: docs/plans/2026-08-13-brand-kit-improvement-report.md
 */
export const REASONS = {
  A: [
    '**Decision A — Instrument Serif as the display face.** The display face was Plus Jakarta Sans,',
    'which deck-research §C.1 measured as the modal face of the free-template ecosystem: it cannot',
    'make a deck read expensive because it is exactly what an inexpensive deck also uses. It is',
    'retired outright rather than demoted, because a display face used for nothing is drift.',
    'Instrument Serif replaces it in exactly three roles — `h1`, `.sk-cover-title` and',
    '`.sk-stat-value` — and nowhere else; it is the face synos.in already uses, so this is the one',
    'change in the pass that makes two artifacts converge instead of adding a variant.',
    '',
    'The face has **one weight and no bold**, so every 700/800 it replaced is re-solved with size:',
    'h1 34/700 → 40/400, cover 47/800 → 56/400, stat value 48/800 → 56/400. It loses its thin',
    'strokes first under projector gamma (§B.3), so it must never render below 24px — which is why',
    '`h2` (26px) and `h3` (20px) and every card title stay Inter, moving from `--sk-font-display` to',
    '`--sk-font-body` without changing size.',
  ].join('\n'),
  B: [
    '**Decision B — the gradient ends at `--sk-violet-ink`, not `--sk-violet`.** An accessibility',
    'fix, not taste. White text on the old ramp ran 4.47:1 at the light end and 3.45:1 at the 80%',
    'opacity the Company Brain block actually used — a WCAG AA failure on the single most important',
    'object in the deck (§E.2). `#4c1d95` was already a token, sits 16.6° from `--sk-violet` so the',
    'brand hue is unchanged, and raises perceptual travel from ΔE_ok 0.087 to 0.215 — 2.5×, and the',
    'first time the ramp moves lightness at all (ΔL −0.206 vs −0.044).',
    '',
    'The light end is unchanged, so it is still the binding constraint: every white-on-gradient text',
    'colour therefore also moved from `rgba(255,255,255,0.8/0.88)` to solid `--sk-on-brand`. Proof',
    'for both halves: `node tools/contrast.mjs`.',
  ].join('\n'),
  C: [
    '**Decision C — open the type scale and de-box.** The extracted scale ran 34/18/17/16/11.5,',
    'which put `h2`, `h3` and `p` inside a 12.5% range covering three semantic levels (§D.2). At',
    "Hale's 25%-zoom test they are 4.5, 4.25 and 4.0px: indistinguishable. Hierarchy was therefore",
    'being carried by weight and colour, which is why the deck needed 7.7 text colours a slide —',
    'colour doing the job size should do. The scale is now **40 / 26 / 20 / 16 / 13**, every',
    'adjacent ratio ≥ 1.25, with the eyebrow rising 11.5 → 13px (1.60%EH → 1.81%EH), lifting the',
    'label that appears on 144 of 148 slides off the ambient-light floor (§B.3).',
    '',
    'De-box, same decision: nesting capped at 2, a group\'s outer container gives up its border in',
    'favour of space, and 1px `--sk-border` hairlines go in most positions — they are 1.23:1, so',
    'they are invisible on a projector while still fragmenting the layout (§D.4). Where a border is',
    'removed the grid gap opens to replace it. Affects `WallGrid`, `PillarGrid`, `UseCaseGrid`,',
    '`StepGrid` and `Callout`. Measured by `node tools/boxes.mjs`.',
  ].join('\n'),
  D: [
    '**Decision D — the cover paragraph slot stays, and is optional.** SynOS ships a reading deck',
    'and a presenting deck deliberately, as two artifacts with two jobs. The reading deck is sent',
    'without a presenter and the paragraph is doing real work there; the presenting deck should omit',
    'it and speak it. `CoverSlide`\'s `lede` prop documents which register sets it. The slot was not',
    'removed — deleting it would have made the reading deck worse in order to fix the presenting',
    'deck. Its size moved onto the scale as part of decision C.',
  ].join('\n'),
  E: [
    '**Decision E — `.sk-stat--amber` takes `--sk-amber`, not `--sk-amber-2`.** A straight defect',
    'fix. `--sk-amber-2 #f59e0b` on `--sk-surface-2` is **2.05:1** — it failed even the 3:1 large-',
    'text threshold, at 72px, making it the kit\'s worst live WCAG failure. `--sk-amber #92400e` is',
    '6.78:1 and is already the amber *text* token in every other component. `--sk-amber-2` remains a',
    'border and accent colour and is now used for no text anywhere.',
  ].join('\n'),
}

/** A stand-in for the stroked 16px icons the sources draw inline. */
const icon = h(
  'svg',
  { width: 16, height: 16, viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6 },
  h('rect', { x: 2.5, y: 2.5, width: 11, height: 11, rx: 3 }),
)

/** Properties that carry the brand and are checked on every pair. */
export const CORE = [
  'font-family',
  'font-size',
  'font-weight',
  'letter-spacing',
  'line-height',
  'color',
  'text-transform',
]
/** Box properties, checked on anything with a surface. */
export const BOX = [
  'background-color',
  'background-image',
  'border-top-width',
  'border-left-width',
  'border-top-color',
  'border-left-color',
  'border-top-left-radius',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
]

const lorem =
  'One environment under the chaos, built once for every team that has to work with agents.'

/**
 * @type {Array<{
 *   id: string, component: string, file: string, slide?: number,
 *   node: import('react').ReactNode,
 *   checks: Array<{ source: string, built: string, props: string[], note?: string }>
 * }>}
 */
export const SPECIMENS = [
  {
    id: 'slide-frame-default',
    component: 'SlideFrame',
    file: 'presenting',
    slide: 1, // "The premise"
    node: h(
      K.SlideFrame,
      { stage: false },
      h(K.SlideHeader, {
        layout: 'row',
        eyebrow: 'The premise',
        title: 'Every company is going to have to become an AI company.',
      }),
      h(
        K.PhaseRow,
        null,
        h(K.PhaseCard, { badge: 'S1', when: 'Today', title: 'Unblock', body: lorem, foot: 'LIVE · 3 engagements' }),
        h(K.PhaseCard, { badge: 'S2', when: 'Next', title: 'Compound', body: lorem, position: 'bridge', foot: 'BUILDING' }),
        h(K.PhaseCard, { badge: 'S3', when: 'Then', title: 'Own the loop', body: lorem, position: 'far', foot: 'THE MOAT' }),
      ),
    ),
    checks: [
      { source: '.card-frame', built: '.sk-slide', props: [...BOX, 'width', 'height', 'box-shadow', 'display', 'flex-direction', 'justify-content'] },
    ],
  },
  {
    id: 'slide-frame-arch',
    component: 'SlideFrame variant="arch"',
    file: 'presenting',
    slide: 5, // "What we built · job one, today"
    node: h(
      K.SlideFrame,
      { stage: false, variant: 'arch' },
      h(K.SlideHeader, {
        eyebrow: 'What we built · job one, today',
        title: 'One environment under the chaos.',
        subtitle: 'Installed once. Every team builds on it.',
      }),
      h(
        K.PillarGrid,
        null,
        h(K.PillarCard, { brain: true, kicker: 'The anchor', name: 'Company Brain', desc: lorem }),
        h(K.PillarCard, { name: 'Skills', tone: 'amber', desc: lorem }),
      ),
    ),
    checks: [
      { source: '.card-frame.arch-card', built: '.sk-slide', props: ['padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'border-top-left-radius', 'justify-content'] },
      // `.arch-card h1 { 24px }` / `h2 { 13.5px }` lose the specificity tie to `.reveal h1/h2` and
      // never take effect; the shipped arch slide renders h1 at 34px and h2 at 18px. Asserting the
      // shipped values, not the declared ones. See inventory §5.7.
      {
        source: '.arch-card h1', built: '.sk-slide h1', props: ['font-size', 'font-family', 'font-weight'],
        intentional: {
          'font-family': ['Plus Jakarta Sans', 'Instrument Serif', 'A'],
          'font-weight': ['700', '400', 'A'],
          'font-size': ['34px', '40px', 'C'],
        },
      },
      {
        source: '.arch-card h2', built: '.sk-slide h2', props: ['font-size', 'font-weight', 'color'],
        // `font-weight: 500` and the --sk-ink-3 colour are unchanged and still asserted; only the
        // size moved. Keeping the other two props on this check is the point of not deleting it.
        intentional: { 'font-size': ['18px', '26px', 'C'] },
      },
      { source: '.arch-card .eyebrow', built: '.sk-slide--arch .sk-eyebrow', props: ['margin-bottom'] },
      { source: '.arch-card .title-block', built: '.sk-slide--arch .sk-header', props: ['margin-bottom'] },
    ],
  },
  {
    // Slide 7's eyebrow is `.eyebrow.indigo` — the most-used hue in the corpus (75 uses).
    // Deliberately not slide 6: that is an arch card, where `.arch-card .eyebrow` cuts the margin
    // to 5px. The arch case is covered by `slide-frame-arch`.
    id: 'eyebrow-indigo',
    component: 'Eyebrow tone="indigo"',
    file: 'presenting',
    slide: 6,
    node: h(
      'div',
      { className: 'sk-deck', style: { padding: 40, background: '#fff', width: 640 } },
      h(K.Eyebrow, { tone: 'indigo' }, "The hard part we're taking on"),
    ),
    checks: [
      {
        source: '.eyebrow', built: '.sk-eyebrow--indigo', props: [...CORE, 'margin-bottom'],
        // Colour, weight, tracking, transform and margin are unchanged and still asserted.
        intentional: { 'font-size': ['11.5px', '13px', 'C'], 'line-height': ['14.95px', '16.9px', 'C'] },
      },
    ],
  },
  {
    // Slide 2's eyebrow is `.eyebrow.violet`.
    id: 'eyebrow-violet',
    component: 'Eyebrow tone="violet"',
    file: 'presenting',
    slide: 1,
    node: h(
      'div',
      { className: 'sk-deck', style: { padding: 40, background: '#fff', width: 640 } },
      h(K.Eyebrow, { tone: 'violet' }, 'The premise'),
    ),
    checks: [
      {
        source: '.eyebrow', built: '.sk-eyebrow--violet', props: [...CORE, 'margin-bottom'],
        // Colour, weight, tracking, transform and margin are unchanged and still asserted.
        intentional: { 'font-size': ['11.5px', '13px', 'C'], 'line-height': ['14.95px', '16.9px', 'C'] },
      },
    ],
  },
  {
    // Slide 4's eyebrow is `.eyebrow.red`.
    id: 'eyebrow-red',
    component: 'Eyebrow tone="red"',
    file: 'presenting',
    slide: 3,
    node: h(
      'div',
      { className: 'sk-deck', style: { padding: 40, background: '#fff', width: 640 } },
      h(K.Eyebrow, { tone: 'red' }, 'Where they are today'),
    ),
    checks: [
      {
        source: '.eyebrow', built: '.sk-eyebrow--red', props: [...CORE, 'margin-bottom'],
        // Colour, weight, tracking, transform and margin are unchanged and still asserted.
        intentional: { 'font-size': ['11.5px', '13px', 'C'], 'line-height': ['14.95px', '16.9px', 'C'] },
      },
    ],
  },
  {
    // The buyer decks' eyebrow, kept as evidence of conflict C4 rather than as a passing check.
    id: 'eyebrow-buyer-conflict',
    component: 'Eyebrow (vs buyer deck — conflict C4)',
    file: 'tech-v2',
    slide: 2,
    expectFail: 'C4: the buyer decks run the eyebrow at 10px / margin-bottom 8px. The newest deck wins at 11.5px / 11px. This check is expected to differ and is kept as evidence of the conflict.',
    node: h(
      'div',
      { className: 'sk-deck', style: { padding: 40, background: '#fff', width: 640 } },
      h(K.Eyebrow, null, 'Our Viewpoint'),
    ),
    checks: [
      {
        source: '.eyebrow', built: '.sk-eyebrow', props: ['font-size', 'letter-spacing', 'font-weight', 'text-transform', 'margin-bottom'],
        // The size gap widened — but it is now two effects stacked, and they must not be conflated:
        // 1.5px of it is conflict C4 (this deck runs 10px, the VC decks ran 11.5px) and the rest is
        // decision C. `margin-bottom` is left un-recorded on purpose: it is pure C4, and it is what
        // keeps this specimen's `expectFail` honest rather than satisfied by the pass's own change.
        intentional: { 'font-size': ['10px', '13px', 'C'] },
      },
    ],
  },
  {
    id: 'slide-header-row',
    component: 'SlideHeader layout="row"',
    file: 'presenting',
    slide: 1,
    node: h(
      'div',
      { className: 'sk-deck', style: { padding: 40, background: '#fff', width: 1180 } },
      h(K.SlideHeader, {
        layout: 'row',
        eyebrow: 'The premise',
        title: 'Every company is going to have to become an AI company.',
      }),
    ),
    checks: [
      { source: '.head-row', built: '.sk-header--row', props: ['display', 'align-items', 'justify-content', 'margin-bottom'] },
      {
        source: '.head-row h1', built: '.sk-header--row h1', props: [...CORE, 'margin-bottom'],
        intentional: {
          'font-family': ['Plus Jakarta Sans', 'Instrument Serif', 'A'],
          'font-weight': ['700', '400', 'A'],
          'letter-spacing': ['-0.34px', '-0.6px', 'A'],
          'line-height': ['40.8px', '44.8px', 'A'],
          'font-size': ['34px', '40px', 'C'],
          'margin-bottom': ['10px', '12px', 'C'],
        },
      },
    ],
  },
  {
    id: 'cover',
    component: 'CoverSlide',
    file: 'presenting',
    slide: 0,
    node: h(
      K.CoverSlide,
      {
        stage: false,
        eyebrow: 'SynOS',
        title: 'The Human-Agent Operating Layer',
        lead: 'The infrastructure to unblock your agentic transformation.',
        lede: h('span', null, 'Self-hosted. ', h('strong', null, 'Your data stays yours.'), ' Model and harness agnostic.'),
        foot: 'Confidential · August 2026',
      },
      h(
        K.ChipRow,
        { center: true },
        h(K.Chip, { size: 'pill' }, 'Company Brain'),
        h(K.Chip, { size: 'pill', tone: 'violet' }, 'Agent-native storage'),
        h(K.Chip, { size: 'pill' }, 'Access control'),
      ),
    ),
    checks: [
      { source: '.card-frame.cover', built: '.sk-slide--cover', props: ['padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'text-align'] },
      {
        source: '.cover .big', built: '.sk-cover-title', props: [...CORE],
        note: 'Declared 58px, overridden to 47px by the v7 cover refit (inventory C8). Decision A then took it to 56px serif, so the refit is superseded, not reverted.',
        intentional: {
          'font-family': ['Plus Jakarta Sans', 'Instrument Serif', 'A'],
          'font-size': ['47px', '56px', 'A'],
          'font-weight': ['800', '400', 'A'],
          'letter-spacing': ['-1.4px', '-1.12px', 'A'],
          'line-height': ['49.82px', '58.24px', 'A'],
        },
      },
      {
        source: '.cover .hero-sub', built: '.sk-cover-lead', props: [...CORE],
        intentional: {
          'font-family': ['Plus Jakarta Sans', 'Inter', 'A'],
          'font-size': ['16.5px', '20px', 'C'],
          'font-weight': ['700', '600', 'C'],
          'line-height': ['22.275px', '27px', 'C'],
        },
      },
      {
        source: '.cover .lede', built: '.sk-cover-lede', props: ['font-size', 'color', 'line-height'],
        // The slot itself is what decision D is about; this is the assertion that proves it still
        // exists. Its colour is unchanged and still asserted.
        intentional: { 'font-size': ['12.3px', '16px', 'D'], 'line-height': ['18.45px', '24px', 'D'] },
      },
      { source: '.cover .eyebrow', built: '.sk-eyebrow', props: ['color', 'letter-spacing', 'margin-bottom'] },
      {
        source: '.cover .foot', built: '.sk-cover-foot', props: [...CORE],
        intentional: { 'font-size': ['12px', '13px', 'C'], 'line-height': ['15.6px', '16.9px', 'C'] },
      },
    ],
  },
  {
    id: 'big-type',
    component: 'BigTypeSlide',
    file: 'presenting',
    slide: 21, // "SynOS" — the only big-type slide carrying both a punch and a tagline
    node: h(K.BigTypeSlide, {
      stage: false,
      eyebrow: 'The gap',
      line1: 'Models learned the entire internet.',
      line2: h('span', { className: 'sk-gradient-text' }, 'They never learned your company.'),
      sub: 'Every answer starts from zero, in every team, every day.',
      punch: 'That gap is the product.',
      tagline: 'synos.in',
    }),
    checks: [
      { source: '.big-type', built: '.sk-slide--big-type', props: ['padding-top', 'padding-left', 'text-align'] },
      // The big-type statement lines are NOT one of the three Instrument Serif roles. Decision A
      // scoped the serif to h1, the cover headline and stat values; these keep Inter and keep both
      // their 800 weight and their size, so only the family moved.
      {
        source: '.big-type .l1', built: '.sk-bigtype-l1', props: [...CORE],
        intentional: { 'font-family': ['Plus Jakarta Sans', 'Inter', 'A'] },
      },
      {
        source: '.big-type .l2', built: '.sk-bigtype-l2', props: ['font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing'],
        intentional: { 'font-family': ['Plus Jakarta Sans', 'Inter', 'A'] },
      },
      { source: '.big-type p.sub', built: '.sk-bigtype-sub', props: ['font-size', 'color', 'line-height'] },
      {
        source: '.big-type .punch', built: '.sk-bigtype-punch', props: [...CORE],
        intentional: { 'font-family': ['Plus Jakarta Sans', 'Inter', 'A'] },
      },
      { source: '.big-type .tagline', built: '.sk-bigtype-tagline', props: ['font-size', 'color'] },
    ],
  },
  {
    id: 'callout-deck',
    component: 'Callout',
    file: 'presenting',
    slide: 23, // "Appendix · What it is" — .stk-note
    node: h(
      'div',
      { className: 'sk-deck', style: { padding: 40, background: '#fff', width: 900, display: 'grid', gap: 12 } },
      h(K.Callout, { tone: 'indigo', fill: 'neutral' }, 'One environment, installed once, that ', h('strong', null, 'every'), ' team builds on.'),
      h(K.Callout, { tone: 'violet' }, 'The same environment, drawn as the training layer.'),
      h(K.Callout, { tone: 'emerald', label: 'What it costs' }, 'Priced like infrastructure.'),
      h(K.Callout, { tone: 'amber', accent: 'top' }, '“Is this another migration?” No.'),
      h(K.Callout, { tone: 'red' }, 'Nothing learned in one team reaches another.'),
    ),
    checks: [
      {
        // Fill, radius, padding and type are all unchanged and still asserted — only the hairline
        // went. `border-top-color` follows because a 0-width border computes to the element colour.
        source: '.stk-note', built: '.sk-callout', props: [...BOX, 'font-size', 'color', 'line-height'],
        intentional: {
          'border-top-width': ['1px', '0px', 'C'],
          'border-top-color': ['rgb(226, 232, 240)', 'rgb(51, 65, 85)', 'C'],
        },
      },
    ],
  },
  {
    id: 'chips',
    component: 'Chip / ChipRow',
    file: 'presenting',
    slide: 23,
    node: h(
      'div',
      { className: 'sk-deck', style: { padding: 40, background: '#fff', width: 900, display: 'grid', gap: 14 } },
      h(K.ChipRow, null, h(K.Chip, null, 'Salesforce'), h(K.Chip, null, 'NetSuite'), h(K.Chip, { tone: 'violet' }, 'SynOS')),
      h(K.ChipRow, null, h(K.Chip, { size: 'lg' }, 'Your systems'), h(K.Chip, { size: 'lg', tone: 'violet' }, 'SynOS')),
      h(K.ChipRow, { tight: true }, h(K.Chip, { size: 'sm' }, 'RBAC'), h(K.Chip, { size: 'sm' }, 'Audit'), h(K.Chip, { size: 'sm' }, 'SSO')),
      h(K.ChipRow, { center: true }, h(K.Chip, { size: 'pill' }, 'Self-hosted'), h(K.Chip, { size: 'pill', tone: 'violet' }, 'Any model')),
    ),
    checks: [
      { source: '.stk-chip', built: '.sk-chip--lg', props: [...BOX, 'font-size', 'font-weight', 'color'] },
      // `.stk-chip.us` is declared but never used in any source body — dead CSS, not asserted.
      { source: '.stk-row', built: '.sk-chip-row--center', props: ['display', 'gap', 'justify-content', 'flex-wrap'] },
    ],
  },
  {
    id: 'chip-md',
    component: 'Chip size="md"',
    file: 'presenting',
    slide: 5, // arch slide carries .d1-sor-chip
    node: h(
      'div',
      { className: 'sk-deck', style: { padding: 40, background: '#fff', width: 700 } },
      h(K.ChipRow, { tight: true }, h(K.Chip, null, 'Salesforce'), h(K.Chip, null, 'Jira'), h(K.Chip, null, 'Snowflake')),
    ),
    checks: [
      { source: '.d1-sor-chip', built: '.sk-chip', props: [...BOX, 'font-size', 'font-weight', 'color'] },
    ],
  },
  {
    id: 'wall',
    component: 'WallCard / WallGrid',
    file: 'presenting',
    slide: 33, // "Appendix · the walls, up close"
    node: h(
      'div',
      { className: 'sk-deck', style: { padding: 40, background: '#fff', width: 1180 } },
      h(
        K.WallGrid,
        null,
        h(K.WallCard, { quote: '“Nobody knows what anyone else automated.”', tag: 'No shared context.' }),
        h(K.WallCard, { quote: '“It works on my laptop and nowhere else.”', tag: 'No way to deploy.' }),
        h(K.WallCard, { quote: '“I am not letting an agent touch that system.”', tag: 'No access control.' }),
      ),
    ),
    checks: [
      {
        // `border-left-width: 3px` and the red rule's colour are unchanged and still asserted:
        // de-boxing kept the signal and dropped the box around it.
        source: '.wall', built: '.sk-wall', props: [...BOX],
        intentional: {
          'background-color': ['rgb(248, 250, 252)', 'rgba(0, 0, 0, 0)', 'C'],
          'border-top-width': ['1px', '0px', 'C'],
          'border-top-color': ['rgb(226, 232, 240)', 'rgb(15, 23, 42)', 'C'],
          'border-top-left-radius': ['10px', '0px', 'C'],
          'padding-top': ['12px', '2px', 'C'],
          'padding-right': ['14px', '0px', 'C'],
          'padding-bottom': ['12px', '2px', 'C'],
        },
      },
      { source: '.wall .w-q', built: '.sk-wall-quote', props: [...CORE, 'font-style', 'margin-bottom'] },
      { source: '.wall .w-t', built: '.sk-wall-tag', props: ['font-size', 'color'] },
      {
        source: '.wall-grid', built: '.sk-wall-grid', props: ['display', 'grid-template-columns', 'gap'],
        // Space replaces the border that was removed above. Three equal columns is unchanged.
        intentional: { gap: ['12px', '22px', 'C'] },
      },
    ],
  },
  {
    id: 'pillar',
    component: 'PillarCard / PillarGrid',
    file: 'presenting',
    slide: 5,
    node: h(
      'div',
      { className: 'sk-deck', style: { padding: 40, background: '#fff', width: 900 } },
      h(
        K.PillarGrid,
        null,
        h(K.PillarCard, { brain: true, icon, kicker: 'The anchor', name: 'Company Brain', desc: 'One living context graph across every team.' }),
        h(K.PillarCard, { icon, name: 'Skills', tone: 'amber', desc: 'Reusable, versioned, measured.' }),
        h(K.PillarCard, { icon, name: 'Storage', tone: 'indigo', desc: 'Agent-native, governed, yours.' }),
        h(K.PillarCard, { icon, name: 'Deploy', tone: 'emerald', desc: 'From a laptop to production.' }),
        h(K.PillarCard, { icon, name: 'Access', tone: 'red', desc: 'Every action gated and audited.' }),
      ),
    ),
    checks: [
      {
        source: '.d1-pillar:not(.d1-brain)', built: '.sk-pillar:not(.sk-pillar--brain)', props: [...BOX],
        intentional: {
          'background-color': ['rgb(248, 250, 252)', 'rgba(0, 0, 0, 0)', 'C'],
          'border-top-width': ['1px', '0px', 'C'],
          'border-left-width': ['1px', '0px', 'C'],
          'border-top-color': ['rgb(226, 232, 240)', 'rgb(15, 23, 42)', 'C'],
          'border-left-color': ['rgb(226, 232, 240)', 'rgb(15, 23, 42)', 'C'],
          'border-top-left-radius': ['11px', '0px', 'C'],
          'padding-top': ['7px', '0px', 'C'],
          'padding-right': ['11px', '0px', 'C'],
          'padding-bottom': ['7px', '0px', 'C'],
          'padding-left': ['11px', '0px', 'C'],
        },
      },
      {
        // 13px is far below the serif's 24px floor, so this title moved family only — size, weight
        // and colour are unchanged and still asserted.
        source: '.d1-pillar:not(.d1-brain) .d1-name', built: '.sk-pillar:not(.sk-pillar--brain) .sk-pillar-name', props: ['font-family', 'font-size', 'font-weight', 'color', 'margin-bottom'],
        intentional: { 'font-family': ['Plus Jakarta Sans', 'Inter', 'A'] },
      },
      { source: '.d1-pillar:not(.d1-brain) .d1-desc', built: '.sk-pillar:not(.sk-pillar--brain) .sk-pillar-desc', props: ['font-size', 'color', 'line-height'] },
      // Every non-brain `.d1-pillar` in the VC deck carries the default indigo icon tile; the
      // per-hue tints (`.pillar.skills .ico` etc.) are a buyer-deck pattern.
      { source: '.d1-pillar:not(.d1-brain) .d1-ico', built: '.sk-pillar--indigo:not(.sk-pillar--brain) .sk-pillar-ico', props: ['width', 'height', 'border-top-left-radius', 'background-color', 'color'] },
      {
        source: '.d1-pillar-grid', built: '.sk-pillar-grid', props: ['display', 'grid-template-columns', 'gap'],
        intentional: { gap: ['7px', '18px', 'C'] },
      },
    ],
  },
  {
    id: 'pillar-brain',
    component: 'PillarCard brain',
    file: 'presenting',
    slide: 5,
    node: h(
      'div',
      { className: 'sk-deck', style: { padding: 40, background: '#fff', width: 900 } },
      h(K.PillarGrid, null, h(K.PillarCard, { brain: true, icon, kicker: 'The anchor', name: 'Company Brain', desc: 'One living context graph across every team.' })),
    ),
    checks: [
      {
        source: '.d1-pillar.d1-brain', built: '.sk-pillar--brain', props: ['background-image', 'display', 'align-items', 'gap', 'border-top-width'],
        intentional: {
          'background-image': [
            'linear-gradient(135deg, rgb(99, 102, 241), rgb(124, 58, 237))',
            'linear-gradient(135deg, rgb(99, 102, 241), rgb(76, 29, 149))',
            'B',
          ],
        },
      },
      { source: '.d1-pillar.d1-brain .d1-name', built: '.sk-pillar--brain .sk-pillar-name', props: ['color', 'font-size'] },
      {
        // The 0.8 alpha was 3.45:1 on this gradient's light end — the AA failure decision B exists
        // to remove. Subordination is now carried by tracking instead, hence letter-spacing moving
        // with it. The mono family, size and uppercase transform are unchanged and still asserted.
        source: '.d1-pillar.d1-brain .d1-kicker', built: '.sk-pillar--brain .sk-pillar-kicker', props: ['font-family', 'font-size', 'letter-spacing', 'text-transform', 'color'],
        intentional: {
          color: ['rgba(255, 255, 255, 0.8)', 'rgb(255, 255, 255)', 'B'],
          'letter-spacing': ['1.2px', '1.6px', 'B'],
        },
      },
      { source: '.d1-pillar.d1-brain .d1-ico', built: '.sk-pillar.sk-pillar--brain .sk-pillar-ico', props: ['width', 'height', 'background-color', 'color'] },
    ],
  },
  {
    id: 'phase',
    component: 'PhaseCard / PhaseRow',
    file: 'presenting',
    slide: 9, // "The play"
    node: h(
      'div',
      { className: 'sk-deck', style: { padding: 40, background: '#fff', width: 1180 } },
      h(
        K.PhaseRow,
        null,
        h(K.PhaseCard, { badge: 'S1', when: 'Today', title: 'Unblock', body: lorem, foot: 'LIVE · 3 engagements' }),
        h(K.PhaseCard, { badge: 'S2', when: 'Next', title: 'Compound', body: lorem, position: 'bridge', foot: 'BUILDING' }),
        h(K.PhaseCard, { badge: 'S3', when: 'Then', title: 'Own the loop', body: lorem, position: 'far', foot: 'THE MOAT' }),
      ),
    ),
    checks: [
      { source: '.sc', built: '.sk-phase', props: [...BOX, 'display', 'flex-direction', 'gap'] },
      { source: '.sc .sn', built: '.sk-phase-badge', props: ['font-family', 'font-size', 'font-weight', 'color', 'background-color', 'border-top-left-radius', 'padding-top', 'padding-left'] },
      { source: '.sc .when', built: '.sk-phase-when', props: [...CORE] },
      {
        source: '.sc h3', built: '.sk-phase-title', props: ['font-family', 'font-size', 'font-weight', 'color'],
        intentional: { 'font-family': ['Plus Jakarta Sans', 'Inter', 'A'] },
      },
      { source: '.sc p', built: '.sk-phase-body', props: ['font-size', 'color', 'line-height'] },
      { source: '.sc .rev', built: '.sk-phase-foot', props: ['font-family', 'font-size', 'color', 'border-top-width', 'border-top-style', 'padding-top'] },
      { source: '.sc.s3 .when', built: '.sk-phase--far .sk-phase-when', props: ['color'] },
      { source: '.flow', built: '.sk-phase-row', props: ['display', 'grid-template-columns', 'gap', 'align-items'] },
    ],
  },
  {
    id: 'usecase',
    component: 'UseCaseCard / UseCaseGrid',
    file: 'presenting',
    slide: 29, // "Appendix · what runs on it"
    node: h(
      'div',
      { className: 'sk-deck', style: { padding: 40, background: '#fff', width: 1180 } },
      h(
        K.UseCaseGrid,
        null,
        h(K.UseCaseCard, { flagship: true, kicker: 'Flagship', title: 'Company Brain', body: lorem }),
        h(K.UseCaseCard, { tone: 'emerald', kicker: 'Function', title: 'Sales Brain', body: lorem }),
        h(K.UseCaseCard, { tone: 'violet', kicker: 'Product', title: 'Custom agents', body: lorem }),
      ),
    ),
    checks: [
      { source: '.uc', built: '.sk-usecase', props: [...BOX] },
      { source: '.uc .uk', built: '.sk-usecase-kicker', props: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'text-transform', 'margin-bottom'] },
      {
        source: '.uc h3', built: '.sk-usecase-title', props: ['font-size', 'font-family', 'font-weight'],
        intentional: { 'font-family': ['Plus Jakarta Sans', 'Inter', 'A'] },
      },
      { source: '.uc p', built: '.sk-usecase-body', props: ['font-size', 'color', 'line-height'] },
      { source: '.uc.brain', built: '.sk-usecase--flagship', props: ['background-image', 'border-top-width', 'border-top-color'] },
      {
        source: '.uc-grid', built: '.sk-usecase-grid', props: ['display', 'grid-template-columns', 'gap'],
        intentional: { gap: ['12px', '16px', 'C'] },
      },
    ],
  },
  {
    id: 'stat',
    component: 'StatCard / StatRow',
    file: 'presenting',
    slide: 26, // "Appendix · Why now" — the .g3 with three stat cards (slide 25's has two)
    node: h(
      'div',
      { className: 'sk-deck', style: { padding: 40, background: '#fff', width: 1180 } },
      h(
        K.StatRow,
        null,
        h(K.StatCard, { value: '78%', label: 'of enterprise AI pilots never reach production', source: 'Industry survey, 2025' }),
        h(K.StatCard, { tone: 'violet', value: '3', label: 'engagements live', source: 'As of Aug 2026' }),
        h(K.StatCard, { tone: 'amber', value: '6', label: 'walls between a demo and company value', source: 'Field interviews' }),
      ),
    ),
    checks: [
      { source: '.stat-card', built: '.sk-stat', props: [...BOX, 'text-align'] },
      {
        source: '.stat-card .n', built: '.sk-stat-value', props: ['font-family', 'font-size', 'font-weight', 'line-height'],
        intentional: {
          'font-family': ['Plus Jakarta Sans', 'Instrument Serif', 'A'],
          'font-size': ['48px', '72px', 'A'],
          'font-weight': ['800', '400', 'A'],
          'line-height': ['48px', '72px', 'A'],
        },
      },
      {
        // NEW assertion, added by the improvement pass. Decision E broke no existing check because
        // nothing pinned the amber variant's value colour — which is how a 2.05:1 contrast failure
        // survived a 103-check harness. It is pinned now.
        source: '.stat-card.a .n', built: '.sk-stat--amber .sk-stat-value', props: ['color'],
        intentional: { color: ['rgb(245, 158, 11)', 'rgb(146, 64, 14)', 'E'] },
      },
      { source: '.stat-card .l', built: '.sk-stat-label', props: ['font-size', 'color', 'margin-top', 'line-height'] },
      { source: '.stat-card .s', built: '.sk-stat-source', props: ['font-family', 'font-size', 'color', 'margin-top', 'letter-spacing'] },
      { source: '.g3', built: '.sk-stat-row', props: ['display', 'grid-template-columns', 'gap'] },
    ],
  },
  {
    id: 'step',
    component: 'StepCard / StepGrid',
    file: 'presenting',
    slide: 6, // "The hard part we're taking on"
    node: h(
      'div',
      { className: 'sk-deck', style: { padding: 40, background: '#fff', width: 1180 } },
      h(
        K.StepGrid,
        null,
        h(K.StepCard, { num: '01', title: 'Ask', body: 'Someone asks the brain a question.', quote: '“Which stores missed target last quarter, and why?”' }),
        h(K.StepCard, { num: '02', title: 'Retrieve', body: 'The right slice of context, deterministically.' }),
        h(K.StepCard, { num: '03', title: 'Act', body: 'Every action gated. Every action audited.' }),
      ),
    ),
    checks: [
      {
        source: '.demo-card', built: '.sk-step', props: [...BOX, 'overflow'],
        // Fill, radius and `overflow: hidden` (which clips the gradient cap) are unchanged.
        intentional: {
          'border-top-width': ['1px', '0px', 'C'],
          'border-left-width': ['1px', '0px', 'C'],
          'border-top-color': ['rgb(226, 232, 240)', 'rgb(15, 23, 42)', 'C'],
          'border-left-color': ['rgb(226, 232, 240)', 'rgb(15, 23, 42)', 'C'],
        },
      },
      {
        source: '.demo-card .db', built: '.sk-step-bar', props: ['height', 'background-image'],
        intentional: {
          'background-image': [
            'linear-gradient(135deg, rgb(99, 102, 241), rgb(124, 58, 237))',
            'linear-gradient(135deg, rgb(99, 102, 241), rgb(76, 29, 149))',
            'B',
          ],
        },
      },
      { source: '.demo-card .dc', built: '.sk-step-body', props: ['padding-top', 'padding-left'] },
      { source: '.demo-card .dn', built: '.sk-step-num', props: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color'] },
      {
        source: '.demo-card h3', built: '.sk-step-title', props: ['font-size', 'font-family', 'font-weight'],
        intentional: { 'font-family': ['Plus Jakarta Sans', 'Inter', 'A'] },
      },
      { source: '.demo-card p', built: '.sk-step-text', props: ['font-size', 'color', 'line-height'] },
      {
        // The nesting case: step -> quote drew the same rectangle twice. The quote keeps only its
        // 3px violet rule, whose width and colour are unchanged and still asserted.
        source: '.demo-card .dq', built: '.sk-step-quote', props: [...BOX, 'font-size', 'font-style'],
        intentional: {
          'background-color': ['rgb(255, 255, 255)', 'rgba(0, 0, 0, 0)', 'C'],
          'border-top-width': ['1px', '0px', 'C'],
          'border-top-color': ['rgb(226, 232, 240)', 'rgb(51, 65, 85)', 'C'],
          'border-top-left-radius': ['7px', '0px', 'C'],
          'padding-top': ['7px', '2px', 'C'],
          'padding-right': ['10px', '0px', 'C'],
          'padding-bottom': ['7px', '2px', 'C'],
        },
      },
      {
        source: '.demo-grid', built: '.sk-step-grid', props: ['display', 'grid-template-columns', 'gap'],
        intentional: { gap: ['14px', '16px', 'C'] },
      },
    ],
  },
  {
    id: 'split',
    component: 'SplitColumns / SplitColumn',
    file: 'presenting',
    slide: 27, // "Appendix · The shift" — the only slide carrying both .moat-col.dies and .wins
    node: h(
      'div',
      { className: 'sk-deck', style: { padding: 40, background: '#fff', width: 1180 } },
      h(
        K.SplitColumns,
        null,
        h(
          K.SplitColumn,
          { eyebrow: 'Buy it', title: "A vendor's AI" },
          h(K.SplitItem, { marker: '✕' }, 'Locked to their platform.'),
          h(K.SplitItem, { marker: '✕' }, 'Their model, their roadmap.'),
        ),
        h(
          K.SplitColumn,
          { tone: 'violet', eyebrow: 'Own it', title: 'Your layer' },
          h(K.SplitItem, { marker: '✓' }, 'Everything it learns stays yours.'),
          h(K.SplitItem, { marker: '✓' }, 'Any model, any harness.'),
        ),
      ),
    ),
    checks: [
      { source: '.moat-col.dies', built: '.sk-split-col', props: [...BOX] },
      { source: '.moat-col.wins', built: '.sk-split-col--violet', props: ['background-color', 'border-top-color'] },
      {
        // The column eyebrow is the same register as the slide eyebrow, so it takes the same step.
        // Its 1.4px tracking, which is genuinely its own, is unchanged and still asserted.
        source: '.moat-col .c-eyebrow', built: '.sk-split-eyebrow', props: ['font-size', 'font-weight', 'letter-spacing', 'text-transform', 'margin-bottom'],
        intentional: { 'font-size': ['11.5px', '13px', 'C'] },
      },
      { source: '.moat-col h3', built: '.sk-split-title', props: ['font-size', 'margin-bottom'] },
      { source: '.moat-split', built: '.sk-split', props: ['display', 'grid-template-columns', 'gap'] },
    ],
  },
  {
    id: 'caption',
    component: 'Caption',
    file: 'presenting',
    slide: 24,
    node: h(
      'div',
      { className: 'sk-deck', style: { padding: 40, background: '#fff', width: 900 } },
      h(K.Caption, null, 'Both doors have converted. ', h('strong', null, 'The next quarter picks the wedge.')),
    ),
    checks: [{ source: '.caption', built: '.sk-caption', props: ['text-align', 'font-size', 'color', 'margin-top'] }],
  },
  {
    id: 'quote',
    component: 'QuoteBar',
    file: 'presenting',
    slide: 25, // "Appendix · Where value gets created"
    node: h(
      'div',
      { className: 'sk-deck', style: { padding: 40, background: '#fff', width: 900 } },
      h(K.QuoteBar, null, h('strong', null, 'The edge moves. '), 'New value is created at the edge of what models cannot do for you.'),
    ),
    checks: [{ source: '.edge-quote', built: '.sk-quote', props: [...BOX, 'font-size', 'color', 'line-height', 'font-style'] }],
  },

  /* ── One-pager, print scale ─────────────────────────────────────────────── */
  {
    id: 'onepager-header',
    component: 'OnePagerHeader',
    file: '1p-vc',
    node: h(
      K.OnePagerPage,
      null,
      h(K.OnePagerHeader, {
        brand: h('span', null, 'Syn', h('span', { className: 'sk-a' }, 'OS')),
        tag: 'The Human-Agent Operating Layer',
        title: 'Where humans and agents work as one company — at AI speed.',
        sub: h('span', null, 'Companies are giving agents to every employee and it is chaos. ', h('strong', null, 'SynOS is the self-hosted layer that fixes that.')),
      }),
    ),
    checks: [
      { source: '.page', built: '.sk-page', props: ['width', 'padding-top', 'padding-left', 'display', 'flex-direction', 'gap'] },
      { source: '.hd', built: '.sk-ph', props: ['border-bottom-width', 'padding-bottom'] },
      {
        // 17px — under the serif floor, so the wordmark stays sans. Its 800 weight survives because
        // decision A extended the Inter load to include 800; without that it would have silently
        // dropped to 700 the moment Plus Jakarta Sans left the load.
        source: '.hd .brand', built: '.sk-ph-brand', props: ['font-family', 'font-size', 'font-weight', 'letter-spacing'],
        intentional: { 'font-family': ['Plus Jakarta Sans', 'Inter', 'A'] },
      },
      { source: '.hd .tag', built: '.sk-ph-tag', props: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'text-transform', 'color'] },
      { source: '.hd h1', built: '.sk-ph-title', props: ['font-size', 'font-weight', 'line-height'] },
      { source: '.hd .sub', built: '.sk-ph-sub', props: ['font-size', 'color', 'line-height'] },
      { source: '.hd .top', built: '.sk-ph-top', props: ['display', 'justify-content', 'align-items'] },
    ],
  },
  {
    id: 'onepager-callout-chip',
    component: 'Callout / Chip at print scale',
    file: '1p-vc',
    node: h(
      K.OnePagerPage,
      null,
      h(K.Eyebrow, { scale: 'print', badge: '3 live' }, 'The now-problem'),
      h(K.Callout, { scale: 'print', tone: 'red' }, h('p', null, 'Nothing deploys safely, and ', h('strong', null, 'nothing learned in one team reaches another.'))),
      h(
        K.ChipRow,
        { tight: true, style: { marginTop: 8 } },
        h(K.Chip, { scale: 'print' }, 'Manufacturing enterprise'),
        h(K.Chip, { scale: 'print', tone: 'emerald' }, 'US software co · paid'),
        h(K.Chip, { scale: 'print', mono: true }, 'martech-saas'),
      ),
    ),
    checks: [
      {
        // Decision C's de-box applies at both scales: a callout is a tint plus a rule, in the deck
        // and on the page. One vocabulary — a print-only exception would be exactly the drift the
        // pass is removing. Radius, padding, fill and the accent rule are unchanged.
        source: '.gap', built: '.sk-callout--print', props: [...BOX],
        intentional: {
          'border-top-width': ['1px', '0px', 'C'],
          'border-top-color': ['rgb(254, 202, 202)', 'rgb(51, 65, 85)', 'C'],
        },
      },
      { source: '.gap p', built: '.sk-callout--print p', props: ['font-size', 'color', 'line-height'] },
      { source: '.pchip:not(.paid)', built: '.sk-chip--print', props: [...BOX, 'font-size', 'font-weight', 'color'] },
      { source: '.pchip.paid', built: '.sk-chip--print.sk-chip--emerald', props: ['background-color', 'border-top-color', 'color'] },
      { source: '.sec-label', built: '.sk-eyebrow--print', props: ['font-size', 'font-weight', 'letter-spacing', 'text-transform', 'color', 'display', 'gap', 'margin-bottom'] },
      { source: '.badge', built: '.sk-eyebrow-badge', props: ['font-family', 'font-size', 'font-weight', 'color', 'background-color', 'border-top-color', 'border-top-left-radius'] },
    ],
  },
  {
    id: 'onepager-phase',
    component: 'PhaseCard scale="print"',
    file: '1p-vc',
    node: h(
      K.OnePagerPage,
      null,
      h(
        'div',
        { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 7 } },
        h(K.PhaseCard, { scale: 'print', badge: 'S1', when: 'Now', title: 'Unblock', body: 'Agents that can actually reach the systems of record.' }),
        h(K.PhaseCard, { scale: 'print', badge: 'S2', when: 'Next', title: 'Compound', body: 'Every run traced, every trace a labelled example.', position: 'bridge' }),
        h(K.PhaseCard, { scale: 'print', badge: 'S3', when: 'Then', title: 'Own it', body: 'The training ground for models you own.', position: 'far' }),
      ),
    ),
    checks: [
      { source: '.sc', built: '.sk-phase--print', props: [...BOX, 'display', 'flex-direction', 'gap'] },
      { source: '.sc .sn', built: '.sk-phase--print .sk-phase-badge', props: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'padding-top', 'padding-left'] },
      { source: '.sc h3', built: '.sk-phase--print .sk-phase-title', props: ['font-size', 'font-weight', 'color'] },
      { source: '.sc p', built: '.sk-phase--print .sk-phase-body', props: ['font-size', 'color', 'line-height'] },
      { source: '.sc .now', built: '.sk-phase--print .sk-phase-when', props: ['font-size', 'font-weight', 'letter-spacing', 'text-transform', 'color'] },
    ],
  },
  {
    id: 'onepager-cta',
    component: 'CtaBar',
    file: '1p-vc',
    node: h(
      K.OnePagerPage,
      null,
      h(K.CtaBar, {
        title: 'Start with one team.',
        body: 'Two weeks to a working Company Brain on your own cloud, with your own data, under your own access rules.',
        right: h('span', null, h('b', null, 'hello@synos.in'), h('br'), 'synos.in'),
      }),
    ),
    checks: [
      // `margin-top: auto` resolves against the page's remaining space, so its used value is not
      // comparable between a full source page and a specimen. The declaration is what matters.
      { source: '.cta', built: '.sk-cta', props: [...BOX, 'display', 'justify-content', 'align-items', 'gap'] },
      { source: '.cta .l h3', built: '.sk-cta-title', props: ['font-size', 'font-weight', 'color'] },
      { source: '.cta .l p', built: '.sk-cta-body', props: ['font-size', 'color', 'line-height', 'margin-top'] },
      { source: '.cta .r', built: '.sk-cta-right', props: ['text-align', 'font-size', 'color', 'line-height'] },
    ],
  },
  {
    id: 'onepager-outcome-heading',
    component: 'OutcomeCard / SectionHeading',
    file: '1p-retail',
    node: h(
      K.OnePagerPage,
      null,
      h(K.SectionHeading, { title: h('span', null, 'What changes for ', h('span', { className: 'sk-a' }, 'your team')), sub: 'Measured on the P&L, not on a dashboard.' }),
      h(
        K.OutcomeGrid,
        null,
        h(K.OutcomeCard, { title: 'Store managers stop chasing numbers', body: h('span', null, 'The brain answers, ', h('b', null, 'with the working shown.')) }),
        h(K.OutcomeCard, { title: 'Ops stops rebuilding the same report', body: 'One skill, versioned, reused across every region.' }),
      ),
    ),
    checks: [
      { source: '.sh h2', built: '.sk-sh-title', props: ['font-size', 'font-weight', 'color', 'line-height'] },
      { source: '.sh p', built: '.sk-sh-sub', props: ['font-size', 'color', 'line-height', 'margin-top'] },
      { source: '.oc', built: '.sk-outcome', props: [...BOX] },
      { source: '.oc .ot', built: '.sk-outcome-title', props: ['font-size', 'font-weight', 'color', 'line-height', 'margin-bottom'] },
      { source: '.oc .od', built: '.sk-outcome-body', props: ['font-size', 'color', 'line-height'] },
      { source: '.outcomes', built: '.sk-outcome-grid', props: ['display', 'grid-template-columns', 'gap'] },
    ],
  },
]
