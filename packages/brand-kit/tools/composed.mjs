/**
 * Five whole slides assembled from kit components at the density the shipped deck actually runs —
 * the six walls, the six-pillar architecture slide, the three-horizon play, the demo storyboard, the
 * moat split.
 *
 * Nothing consumes the kit yet, so there are no real slides to measure or to look at. These are the
 * per-slide proxy: deck-research §D.4's box counts are per *slide*, and a reviewer's judgement about
 * whether a headline reads with authority is also per slide. Both `tools/boxes.mjs` (which counts
 * them) and `tools/render-slides.mjs` (which photographs them) work from this one list, so the
 * number and the picture are always of the same thing.
 *
 * Takes the built module as an argument rather than importing it, so an older build can be composed
 * from the same source — which is what makes a before/after render honest.
 */
import { createElement as h } from 'react'

const body = 'One environment under the chaos, built once for every team that has to work with agents.'
const icon = h(
  'svg',
  { width: 16, height: 16, viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6 },
  h('rect', { x: 2.5, y: 2.5, width: 11, height: 11, rx: 3 }),
)

/** @param K the built brand-kit module — `dist/brand-kit.js`, of whatever vintage. */
export const composed = (K) => [
  {
    id: 'slide/six-walls',
    node: h(
      K.SlideFrame, { stage: false },
      h(K.SlideHeader, { eyebrow: 'Where they are today', title: 'Six walls between a clever demo and real company value.' }),
      h(K.WallGrid, null, ...[
        ['“Nobody knows what anyone else automated.”', 'No shared context.'],
        ['“It works on my laptop and nowhere else.”', 'No way to deploy.'],
        ['“I am not letting an agent touch that system.”', 'No access control.'],
        ['“We rebuilt the same skill in three teams.”', 'Nothing is reusable.'],
        ['“We cannot tell if any of it worked.”', 'Nothing is measured.'],
        ['“Every vendor wants our data.”', 'Nothing stays ours.'],
      ].map(([quote, tag], i) => h(K.WallCard, { key: i, quote, tag }))),
      h(K.Callout, { tone: 'indigo', fill: 'neutral', accent: 'left', style: { marginTop: 18 } },
        'Six walls. ', h('strong', null, 'One layer that answers all six.')),
    ),
  },
  {
    id: 'slide/architecture',
    node: h(
      K.SlideFrame, { stage: false, variant: 'arch' },
      h(K.SlideHeader, { eyebrow: 'What we built · job one, today', title: 'One environment under the chaos.', subtitle: 'Installed once. Every team builds on it.' }),
      h(K.PillarGrid, null,
        h(K.PillarCard, { brain: true, icon, kicker: 'The anchor', name: 'Company Brain', desc: body }),
        h(K.PillarCard, { icon, name: 'Skills', tone: 'amber', desc: 'Reusable, versioned, measured.' }),
        h(K.PillarCard, { icon, name: 'Storage', tone: 'indigo', desc: 'Agent-native, governed, yours.' }),
        h(K.PillarCard, { icon, name: 'Deploy', tone: 'emerald', desc: 'From a laptop to production.' }),
        h(K.PillarCard, { icon, name: 'Access', tone: 'red', desc: 'Every action gated and audited.' }),
        h(K.PillarCard, { icon, name: 'Analytics', tone: 'violet', desc: 'Every run traced and scored.' }),
      ),
      h(K.ChipRow, { tight: true, style: { marginTop: 16 } },
        ...['Salesforce', 'NetSuite', 'Jira', 'Snowflake', 'Slack', 'GitHub'].map((n, i) => h(K.Chip, { key: i }, n))),
      h(K.Callout, { tone: 'violet', accent: 'left', style: { marginTop: 14 } }, 'The same environment, drawn as the training layer.'),
    ),
  },
  {
    id: 'slide/the-play',
    node: h(
      K.SlideFrame, { stage: false },
      h(K.SlideHeader, { layout: 'row', eyebrow: 'The play', title: 'Unblock now. Compound later. Own the loop.' }),
      h(K.PhaseRow, null,
        h(K.PhaseCard, { badge: 'S1', when: 'Today', title: 'Unblock', body, foot: 'LIVE · 3 engagements' }),
        h(K.PhaseCard, { badge: 'S2', when: 'Next', title: 'Compound', body, position: 'bridge', foot: 'BUILDING' }),
        h(K.PhaseCard, { badge: 'S3', when: 'Then', title: 'Own the loop', body, position: 'far', foot: 'THE MOAT' }),
      ),
      /*
       * 40px, not the 18px the other slides use. This is a composition value, not a kit value, and
       * it is the one place decision G's cost shows: two de-boxed grids stacked 18px apart read as
       * ONE block, because the card edges that used to mark the boundary are gone and nothing took
       * over the job. A deck author would spend the space here; the proxy has to spend it too or it
       * is not a fair rendering of the design. It is also the clearest argument yet for the item
       * already at the top of the backlog — the kit has no spacing scale, so every number like this
       * one is a judgement call made in a composition file instead of a token.
       */
      h(K.StatRow, { style: { marginTop: 40 } },
        h(K.StatCard, { value: '78%', label: 'of enterprise AI pilots never reach production', source: 'Industry survey, 2025' }),
        h(K.StatCard, { tone: 'violet', value: '3', label: 'engagements live', source: 'As of Aug 2026' }),
        h(K.StatCard, { tone: 'amber', value: '6', label: 'walls between a demo and company value', source: 'Field interviews' }),
      ),
      h(K.Caption, null, 'Both doors have converted. ', h('strong', null, 'The next quarter picks the wedge.')),
    ),
  },
  {
    id: 'slide/demo',
    node: h(
      K.SlideFrame, { stage: false },
      h(K.SlideHeader, { eyebrow: "The hard part we're taking on", title: 'Ask. Retrieve. Act — with the working shown.' }),
      h(K.StepGrid, null,
        h(K.StepCard, { num: '01', title: 'Ask', body: 'Someone asks the brain a question.', quote: '“Which stores missed target last quarter, and why?”' }),
        h(K.StepCard, { num: '02', title: 'Retrieve', body: 'The right slice of context, deterministically.', quote: '“Pull Q3 by store, joined to staffing.”' }),
        h(K.StepCard, { num: '03', title: 'Act', body: 'Every action gated. Every action audited.', quote: '“Draft the regional plan for review.”' }),
      ),
      h(K.Callout, { tone: 'emerald', accent: 'left', label: 'What it costs', style: { marginTop: 18 } }, 'Priced like infrastructure.'),
      h(K.ChipRow, { tight: true, style: { marginTop: 14 } },
        ...['RBAC', 'Audit', 'SSO', 'Self-hosted'].map((n, i) => h(K.Chip, { key: i, size: 'sm' }, n))),
    ),
  },
  {
    id: 'slide/moat',
    node: h(
      K.SlideFrame, { stage: false },
      h(K.SlideHeader, { eyebrow: 'The shift', title: 'Buy a vendor’s AI, or own your layer.' }),
      h(K.SplitColumns, null,
        h(K.SplitColumn, { eyebrow: 'Buy it', title: "A vendor's AI" },
          h(K.SplitItem, { marker: '✕' }, 'Locked to their platform.'),
          h(K.SplitItem, { marker: '✕' }, 'Their model, their roadmap.')),
        h(K.SplitColumn, { tone: 'violet', eyebrow: 'Own it', title: 'Your layer' },
          h(K.SplitItem, { marker: '✓' }, 'Everything it learns stays yours.'),
          h(K.SplitItem, { marker: '✓' }, 'Any model, any harness.')),
      ),
      h(K.UseCaseGrid, { style: { marginTop: 18 } },
        h(K.UseCaseCard, { flagship: true, kicker: 'Flagship', title: 'Company Brain', body }),
        h(K.UseCaseCard, { tone: 'emerald', kicker: 'Function', title: 'Sales Brain', body }),
        h(K.UseCaseCard, { tone: 'violet', kicker: 'Product', title: 'Custom agents', body }),
      ),
      h(K.QuoteBar, { style: { marginTop: 14 } }, h('strong', null, 'The edge moves. '), 'New value is created at the edge of what models cannot do for you.'),
    ),
  },
]
