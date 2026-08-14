# A one-pager on the brand kit — what mapped, what did not

`1pager-financial-inclusion-ceo.html` rebuilt on the kit. First one-pager to consume the print
components at all: they were extracted, fidelity-checked and synced, but never proven on a whole
page. Output is `synos-gtm/pitch-materials/1pager-financial-inclusion-ceo-kit.html`, alongside the
shipped page, not replacing it.

Same discipline as the deck rebuild: **re-platforming, not rewriting.** Every word is the shipped
page's own. If the content moved at the same time as the platform, nobody could tell which caused a
difference.

## Why this page

The two Aug-13 one-pagers — financial-inclusion-ceo and retail-multistore-ceo — share one template
byte for byte in its class vocabulary. Rebuilding either proves both, and the CEO template is the
one being sent.

## What mapped cleanly

| Source | Kit |
|---|---|
| `.hd` header block | `OnePagerHeader rule="solid"` |
| `.oc` outcome tiles | `OutcomeCard` in a `Stack` |
| `.effort` violet strip | `Callout scale="print" tone="violet"` |
| `.own-line` teal-ruled line | `Callout scale="print" tone="emerald"` |
| `.sh2` section headings | `SectionHeading` |
| `.tl` / `.tw` six-week timeline | `PhaseRow` + `PhaseCard scale="print"` |
| `.al` three-up cards | `OutcomeCard tone="violet"` |
| `.cta` closing banner | `CtaBar tone="indigo"` |
| `.foot` page footer | `OnePagerFooter` (new) |

## What the kit gained, and why each earned it

- **`OnePagerFooter`** — on every page of all eleven one-pagers in the corpus. That is not a
  one-off; it was simply never extracted.
- **`StepCard scale="print"`** — the numbered step. Both Aug-2026 one-pager templates use a
  four-step sequence. The marker becomes a ringed circle rather than a mono label, because at 11px
  a bare "1" reads as a bullet, and the gradient cap is dropped: on a page the cards sit in a 2x2
  block and eight gradient edges in one field is exactly the fragmentation decision C removed.
- **`StepGrid columns={2}`** — a four-step sequence in one row runs each step to a ~40mm measure,
  which is unreadable. The deck's three-across default is right for a slide and wrong for a page.
- **`OnePagerPage gap`** — the page is a stack, and its rhythm is now selectable from the spacing
  scale. Needed the moment a page had slack: a page with room should open its gaps, not stretch its
  content.

Each of these is a *scale* of something the kit already had, except the footer. Nothing was invented
to force this page through.

## What stayed local — `onepager/src/onepager.css`

- **The diagram frame** (`.op-diagram`, `.op-side*`). The page's top half is two hand-drawn SVGs
  under a shared caption. The kit has no diagram vocabulary and should not grow one — the same call
  the deck made for its five SVG slides. **The SVGs are carried across byte for byte**, injected
  rather than transcribed: re-typing 40 shaped elements into JSX introduces differences that then
  get mistaken for design decisions. Their literal colours are the source's own and are the one
  place in this build that does not read a token.
- **A three-up grid** (`.op-three`). `OutcomeGrid` is two columns. A `columns` prop on it is the
  obvious fix, and is deliberately *not* taken yet: one page wanting a different count is not
  evidence about what the grid should be. If the second template wants three too, it becomes a prop.

## The finding worth acting on: the page is now ~0.7 pages of content

At the kit's print register the same words occupy visibly less page than they did. Page 1 ends
around 62% down, page 2 around 55%, with the CTA and footer pinned to the foot by their own
`margin-top: auto`. Opening the page gaps to the scale's `loose` step recovers some of it; it does
not close it, and it should not — the compression is the kit being tighter and more editorial than
the hand-written page, which is the improvement, not a defect.

That leaves a genuine composition decision, and it is a content decision rather than a CSS one:

1. **Add a block per page** — there is room for one more outcome or a proof line.
2. **Recompose to one dense page plus a short second**, which is what the whitespace is arguing for.
3. **Leave it.** Whitespace on a printed page is not the same failure it is on a slide, and a
   confident page with air is a legitimate look.

**This is Anoop's call, not mine** — it changes what a prospect sees, and taste decides it rather
than measurement. Nothing here is blocked on the answer: the platform work is done and the page
builds either way.

## Verification

- 2 pages in, 2 pages out; PDF exported and `verify_pdf.py --slides 2` reports SAFE.
- Nothing fetched at render: fonts inlined as base64, no script tag at all, the Google Fonts
  `@import` stripped from the kit CSS with the same assertions the deck build uses.
- Kit gates all green after the additions: `build`, `css-lint`, `fidelity` 27/27 · 104 checks,
  `contrast` 40/43 (3 known, 0 unexpected).
- Both pages screenshotted against the shipped page and reviewed side by side.

## Next

`retail-multistore-ceo` is the same template and should now be a mechanical port — that is the test
of whether this generalised or whether it just fitted one page. The CTO pair
(`financial-inclusion-cto`, `retail-multistore-cto`) is a different, denser template and has not
been looked at.
