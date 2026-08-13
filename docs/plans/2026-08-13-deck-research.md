# Deck research — Phase 1 of the brand-kit improvement pass

Research and audit only. **No code, token or component was changed by this document.** Every
proposal at the end is a candidate for Phase 2, where it must be rendered side-by-side and signed
off before anything is implemented.

Companion to `docs/plans/2026-08-13-brand-kit-improvement-pass.md` (the pass), and
`docs/plans/2026-08-13-slide-inventory.md` (the measured inventory this builds on).

---

> ## CORRECTION — added 2026-08-13 after founder review
>
> **SynOS ships a reading deck and a presenting deck deliberately, as two artifacts with two jobs.**
> Verified: `synos-vc-deck-v6.html` has 35 slides and **zero** `class="notes"` blocks — it is the
> **reading deck**, self-contained, and the one that is sent. `synos-vc-deck-presenting.html` has the
> same 35 slides with **22** speaker-note blocks — it is the **presenting deck**, with content
> deliberately moved into notes to be spoken.
>
> §E.1 treats v6's higher density as a defect ("the version investors read is the denser one"). That
> framing is wrong. A reading deck must stand alone without a presenter and is *supposed* to carry
> more. Re-grade everything below against the artifact's own job:
>
> | Finding | Reading deck (v6) | Presenting deck | Buyer decks (sent) |
> |---|---|---|---|
> | Density (§E.1) | 236 w/slide — defensible, not a defect | 190 w/slide — **too dense**, this is where the 11s argument bites | 138–158 w/slide |
> | Type size (§B.2) | laptop reading standard, forgiving | **real defect** — 2.1 m legibility fails the back row | as presenting |
> | PDF export (§B.4) | **fine** — 35pp parity, fonts embedded, 51,864 extractable chars | 30pp for 35 slides, but not the sent artifact | **worst defect** — 0 fonts, 0 extractable text, 96 ppi, 10.4 MB, and these ARE sent |
>
> Unaffected by this correction: the `h1` position drift (§D.1), the 3.45:1 white-on-gradient AA
> failure (§E.2), the one-pager 6.6pt body (§B.5), the four-font leak (§C.4).
>
> **Implication for the improvement pass:** projection standards apply to the presenting deck, reading
> standards to the reading deck and the one-pagers, and the export pipeline must be fixed for the
> buyer decks first. Do not apply one density target across all of them.

## 0. Method, and what is a measurement vs. an opinion

Three kinds of statement appear below and they are labelled:

- **Measured** — produced by running something. Reproduce with the commands in §0.1.
- **Cited** — from a named external source with a URL.
- **Judgement** — mine. Flagged as such, and always attached to a measurement.

### 0.1 How the numbers were produced

`~/ws/synos-gtm` was served read-only over `python3 -m http.server` on `127.0.0.1:8791`; nothing
was written to it. Four probes were run against a headless Chrome (Chrome DevTools Protocol,
`Runtime.evaluate`, 4 s settle after navigation) at each artifact's own stage size — 1280×720 for
the VC family, 1280×800 for the buyer family, 794×1123 (A4 at 96 dpi) for the one-pagers:

| Probe | What it returns |
|---|---|
| Static text density | per-`<section>` word/char counts from the raw HTML with `<script>`, `<style>` and `<aside class="notes">` stripped |
| Rendered inventory | per slide: element count, rendered character count, min/median/max computed `font-size`, count of distinct computed text colours, count of distinct fills, % of text elements under 14px, font families actually resolved |
| Geometry | per slide: `.card-frame` box, `h1` box and computed size, count of elements with a visible border or fill |
| Print | per `.page`: page box in px, char count, min/median/max `font-size`, % of text under 9px |

Contrast was computed with the WCAG 2.x relative-luminance formula. Perceptual colour distance was
computed in **OKLab/OKLCH** (ΔE_ok, ΔL, ΔC, Δh) rather than the unnamed "51 units" the pass document
quotes, because OKLab is the space where "does this gradient travel" is actually answerable.

PDF facts came from `pdfinfo`, `pdffonts`, `pdfimages -list` and `pdftotext` run against the
shipped PDF exports in `~/ws/synos-gtm`.

**One caveat up front.** Every rendered measurement below is of the *source artifacts*, not of
`packages/brand-kit`'s own components. That is deliberate: the kit was extracted to be
byte-faithful to those artifacts and passes 103 fidelity checks proving it. Where a source
measurement is a design problem, the kit inherited that problem exactly. Where the kit's own CSS
diverges, I measured the kit's CSS directly and say so.

---

## Part A — Teardown of decks that actually raised

### A.1 The only large-N primary dataset: DocSend

DocSend instruments the decks founders send, so it reports what investors *do*, not what they say.
Its published Startup Index findings:

- The average investor spends **3 minutes 44 seconds** on a deck, total, on first read
  ([DocSend / Dropbox](https://www.dropbox.com/resources/docsend-pitch-deck-research)).
- Time-on-deck is the strongest single correlate with getting a meeting; decks read for under two
  minutes convert materially worse than decks read for over four
  ([DocSend Startup Index](https://www.docsend.com/pitch-deck-metrics/)).
- Pre-seed and seed decks are read faster still — under two minutes is now typical
  ([DocSend pre-seed guide](https://www.docsend.com/blog/pre-seed-pitch-deck-guide/)).

**The arithmetic that matters:** 224 seconds ÷ 21 main slides = **10.7 seconds per slide**. Our VC
deck's main section carries a median of ~1,400 rendered characters per slide (§E.1). Adult silent
reading runs roughly 200–250 wpm, i.e. ~19–23 characters/second. 1,400 characters needs **60–74
seconds**. We are asking for six to seven times the attention the slide will get.

That single ratio is the frame for everything else in this document.

### A.2 Decks that raised, with the actual slide-level shape

I looked for decks published by the founder or the fund, not "top 30 decks" listicles.

**Front, Series A ($10M, 2016) — 21 slides.** Published by CEO Mathilde Collin
([Medium](https://collinmathilde.medium.com/front-series-a-deck-f2e2775a419b)). Slide-by-slide:
cover / problem / solution / competitive position / beachhead / market+customers / social proof /
metrics / churn / interstitial / product-GTM / acquisition / cohorts / unit economics / why raising
/ team / roadmap / market size / ask / vision / close
([slide-by-slide review](https://www.alexanderjarvis.com/front-series-saas-startup-pitch-deck/)).
The design characterisation in that review is worth quoting as a target: *"exquisite restraint"* on
text density, and a colour palette described as *"minimal… mostly simple and boring"* — offered as
praise. **Data is the loudest thing on the page**: cohort chart, churn split, a single unit-economics
number ($1.08 generated per $1 spent). Colour is spent on the data series and nowhere else.

**Front, Series B ($66M, 2018) — 24–25 slides.** Published by the same founder
([Medium](https://collinmathilde.medium.com/front-series-b-deck-6dc686267a24),
[Inc. writeup](https://www.inc.com/larry-kim/how-this-pitch-deck-raised-66-million-in-vc-funding.html)).
Note the trajectory: A at 21, B at ~24. **The deck does not get denser as the round gets bigger; it
gets a few more slides of the same density.**

**Front, Series C** — same author, same convention
([Medium](https://collinmathilde.medium.com/front-series-c-deck-11773b30b272),
[front.com](https://front.com/blog/front-series-c-deck)).

**Uber seed ($200K, 2008/09) — published by co-founder Garrett Camp**
([Medium](https://medium.com/@gc/the-beginning-of-uber-7fb17e544851), also mirrored at
[Axios](https://www.axios.com/read-the-original-uber-pitch-deck-1513305016-4606664a-58b6-40a8-a9ba-838284a9c4c0.html)).
Camp's own framing is one line: *"I thought it would be interesting to share the very first pitch
deck we created in late 2008."* Reviewers describe the market-timing slide as *"two blocks and 2
supporting bullet points"* and *"easy to read"*, and the cover as *"the logo and a tagline"*
([review](https://www.alexanderjarvis.com/uber-pitch-deck-raise-seed-capital-investment/)). Two
blocks and two bullets is the *unit of a slide* in a deck that raised.

**Airbnb seed ($600K, 2008) — 10–14 slides** depending on the cut circulating
([original on SlideShare](https://www.slideshare.net/PitchDeckExamples/original-airbnb-pitch-deck-2008)).
Order: problem / solution / market / product / business model / competition / team / ask. Cover is a
wordmark plus one sentence: *"Book rooms with locals, rather than hotels."* One idea, one line, whole
slide.

### A.3 What the funds themselves publish

**Sequoia — "Writing a Business Plan"**
([sequoiacap.com](https://www.sequoiacap.com/article/writing-a-business-plan/)). Ten sections:
company purpose (*"define your company in a single declarative sentence"*), problem, solution, why
now, market potential, competition, business model, team, financials, vision. Sequoia gives **no
slide-count rule** and explicitly de-emphasises the artifact: *"it wasn't really the slides we liked
— it was their ideas, the clarity of their thinking, and the scope of their ambition."*

**Y Combinator — Kevin Hale, "How to design a better pitch deck"**
([YC Startup Library](https://www.ycombinator.com/library/4T-how-to-design-a-better-pitch-deck),
[YC blog](https://www.ycombinator.com/blog/how-to-design-a-better-pitch-deck)). Three rules, and
they are the most operational primary source in this whole document:

- *"Legible slides are ones that even old people sitting in the back row with bad eyesight can
  read."*
- *"A simple slide, therefore, expresses one idea."*
- *"Use large type. Bold text. A simple font. With good contrast from the background."*

Hale's concrete numbers, as reported from the talk: headline type **100pt+**, and **20pt is the
smallest you should ever go**, reserved for low-importance text like a team member's credentials
line. His test: **zoom the deck to 25% and check it is still legible.** At 25% of a 1280×720 stage,
our 34px h1 becomes 8.5px and our 11px body becomes 2.75px. The h1 survives. Nothing else does.

### A.4 The conventions that hold across all of them

| Convention | Evidence |
|---|---|
| **20–25 slides for a main deck** | Front A 21, Front B ~24, Airbnb 10–14, Uber ~25 |
| **One idea per slide, stated in the title** | Hale explicitly; Front's titles are claims, not labels |
| **Cover = wordmark + one line** | Airbnb, Uber both |
| **Colour is spent on data and on exactly one "this is us" object** | Front's palette described as deliberately boring; colour goes to chart series |
| **Data is shown as charts, not as tables of prose** | Front's cohort/churn charts are the slides reviewers single out as strong |
| **The ask is a number plus what it buys** | Front slide 19 pairs $10M with a runway visualisation |
| **Depth lives in an appendix or a memo, not on the slide** | Sequoia's emphasis on the *thinking*; every published deck is thin and the diligence pack is separate |

**Judgement:** the strongest common property is not any layout rule. It is that these decks are
built for a reader who will give them 10 seconds a slide, and ours is built for a reader who will
give it an hour. Both readers exist. We have optimised for the rarer one.

---

## Part B — Projection and print reality

### B.1 The relevant standard is AVIXA DISCAS, and it gives a hard number

**AVIXA V202.01:2016, *Display Image Size for 2D Content in Audiovisual Systems* (DISCAS)** is the
ANSI standard that answers "how big must text be on a screen in a room"
([ANSI preview](https://webstore.ansi.org/preview-pages/InfoComm/preview_AVIXA+V202.01-2016.pdf),
[AVIXA explainer and calculators](https://www.avixa.org/resources/display-image-size-calculators/learn-more-about-display-size)).

Its mechanism:

- **%EH** = the height of the smallest element that must be read, as a percentage of total image
  height. For text, the element is the character.
- **Viewing Ratio (VR)** = farthest viewer's distance ÷ image height.
- **Acuity Factor for Basic Decision Making is 200.** BDM is the category a pitch deck falls in —
  "read the words and decide", not "inspect a CAD drawing".

The published minimum-%EH table for BDM:

| Viewing Ratio | Minimum %EH |
|---|---|
| 1.50 – 2.00 | 1.00% |
| 2.00 – 3.00 | 1.50% |
| 3.00 – 4.00 | 2.00% |
| 4.00 – 5.00 | 2.50% |
| **5.00 – 6.00** | **3.00%** |
| 6.00 – 7.00 | 3.50% |

AVIXA's own presets gloss these as **3% = lecture slides, 2% = financials, 1.5% = dense
spreadsheets.**

### B.2 Translating that into pixels on our stage

Because %EH is a *ratio*, it is scale-invariant: a 1280×720 reveal.js stage blown up to a 65" TV or
a projector keeps the same %EH. So the requirement converts directly to CSS pixels on our 720-tall
stage:

| Requirement | %EH | px on a 720 stage |
|---|---|---|
| Lecture slides (AVIXA preset) | 3.0% | **21.6 px** |
| Financials | 2.0% | 14.4 px |
| Dense spreadsheet (floor) | 1.5% | 10.8 px |

And into rooms, for a 55" 16:9 display (image height 0.685 m) and a 100" projected 16:9 image
(image height 1.245 m):

| Text size on our stage | %EH | Max viewer distance, 55" TV | Max viewer distance, 100" screen |
|---|---|---|---|
| 34 px (our h1) | 4.72% | 6.5 m | 11.8 m |
| 21.6 px (AVIXA lecture minimum) | 3.00% | 4.1 m | 7.5 m |
| 16 px (our nominal body) | 2.22% | 3.0 m | 5.5 m |
| **11 px (our measured median)** | **1.53%** | **2.1 m** | **3.8 m** |
| 8.5 px (common in our callouts/chips) | 1.18% | 1.6 m | 2.9 m |
| **7.5 px (our smallest)** | **1.04%** | **1.4 m** | **2.6 m** |

*(Distance = %EH × image height × 200, per the BDM acuity factor.)*

**Measured, and this is the headline of Part B:** in the VC deck, **66% of all text-bearing elements
render below 14px** and the median is 11px. The median slide is legible to a partner sitting **2.1 m
from a 55" screen**. A conference-room table is 2.4–3.6 m long. Half the room cannot read the median
line of our deck. In the buyer decks it is worse — same absolute sizes on an **800**-tall stage, so
11px is 1.38%EH and the limit drops to 1.9 m.

The buyer decks' h1 is **26px = 3.25%EH**. The VC deck's h1 is **34px = 4.72%EH**. The h1 is the only
element in either family that clears the lecture-slide preset with margin.

### B.3 Contrast under projector gamma and ambient light

**ANSI/INFOCOMM 3M-2011, *Projected Image System Contrast Ratio* (PISCR)**
([ANSI](https://webstore.ansi.org/standards/infocomm/ansiinfocomm3m2011),
[preview](https://webstore.ansi.org/preview-pages/InfoComm/preview_ANSI+INFOCOMM+3M-2011.pdf))
defines contrast ratio **as the image is presented to viewers in a space with ambient light**, and
sets four tiers by viewing requirement. The point relevant to us is the framing, not the tier
numbers: the standard measures the *system*, including the room. A ratio that passes in a browser
does not pass on a screen with the lights on.

I modelled that as an ambient black-lift: every luminance is raised toward white by a fraction *k*
before the WCAG ratio is computed. At a conservative **k = 5%** (a lit conference room, a mid-range
TV, or a business projector at 1,500–3,000 lumens against ambient):

| Pair | On a browser | With 5% ambient lift |
|---|---|---|
| `--ink #0f172a` on white | 17.85:1 | 9.69:1 |
| `--muted #64748b` on white | 4.76:1 | **4.01:1 — drops below AA** |
| `--dim #94a3b8` on white | 2.56:1 | 2.38:1 |
| `--indigo-3 #818cf8` on white | 2.98:1 | 2.71:1 |
| `--amber-2 #f59e0b` on white | 2.15:1 | 2.03:1 |
| `--border-2 #cbd5e1` on white | 1.48:1 | 1.45:1 |

`--muted` is the eyebrow colour on 144 of 148 slides and the default source-line colour. It is the
first thing to fall off the screen in a lit room, and it happens to also be set at 11.5px
(1.60%EH) — small *and* the first to wash out.

**Judgement:** the deck's whole light-grey register — `--muted`, `--dim`, `--border`, `--border-2` —
is a screen-design register borrowed into a projection medium. It reads as refinement on a laptop
and as fog in a room.

### B.4 What actually survives the PDF export — measured, and it is bad

This is the largest finding nobody had looked at. The PDF is the artifact a VC actually reads;
DocSend's 3m44s is spent on a PDF, not on a live reveal.js session.

Measured with `pdfinfo` / `pdffonts` / `pdfimages` / `pdftotext` against the shipped exports:

| File | Pages | Page size | Size | Embedded fonts | Extractable text |
|---|---|---|---|---|---|
| `synos-vc-deck-v6.pdf` | 35 ✅ | 960×540 pt | 3.3 MB | Inter, Plus Jakarta Sans, JetBrains Mono — all **Type 3** | **51,864 chars** ✅ |
| `synos-vc-deck-presenting.pdf` | **30** ❌ (deck has 35) | 960×540 pt | 2.6 MB | Menlo, Lucida Grande only | — |
| `synos-tech-buyer-v2.pdf` | 40 ✅ | **1920×1200 pt** | **10.4 MB** | **none** | **40 chars** ❌ |
| `synos-ops-buyer.pdf` | **43** ❌ (deck has 38) | 1920×1200 pt | **11.7 MB** | **none** | — |
| `synos-ops-buyer.vector.pdf` | **36** ❌ | 960×600 pt | 7.6 MB | Type 3 | — |
| `1pager-cloud-infra-brain.pdf` | 1 | **930×1315 pt — not A4** | 379 KB | Type 3 | — |
| `1pager-department-brains.pdf` | 1 | 595.9×842.9 pt (A4) ✅ | 516 KB | Type 3 | — |

Five separate defects, all measured:

1. **The buyer decks are photographs.** `synos-tech-buyer-v2.pdf` contains **zero fonts** and
   **40 characters** of extractable text across 40 pages. `pdfimages -list` shows each page is a
   2560×1600 RGB bitmap placed on a 1920×1200 pt page — **96 ppi**. Not searchable, not selectable,
   not copy-pasteable into a memo, blurry at any zoom past 100%, and 10.4 MB. An associate who
   wants to quote us into an investment memo cannot.
2. **Page-count drift.** `presenting.pdf` has 30 pages for a 35-slide deck — five slides silently
   absent from the exported artifact. `ops-buyer.pdf` has 43 pages for a 38-slide deck — five
   duplicated or fragmented. Nobody is checking export parity.
3. **File size.** 10–12 MB decks exceed several corporate mail gateways' inline limits and are slow
   on a phone, which is where a first read often happens.
4. **The one-pagers do not all export at A4.** `1pager-cloud-infra-brain.pdf` is 930×1315 pt — A4
   scaled by 1.5625. Any recipient who prints it gets a scale-to-fit or a clip.
5. **Type 3 fonts.** Chrome/Skia emits Type 3 when it cannot embed the source font program (our
   fonts arrive as WOFF2 from Google Fonts at render time). Text extraction happens to work on the
   VC deck, so this is currently benign — but Type 3 glyph procedures are not a font program, and
   this is a class of export that degrades silently between Chrome versions. The exports are
   already spread across `Skia/PDF m150`, `m151` and `pdf-lib`, which is exactly how that bites.

### B.5 Print minimums, for the one-pagers

Print guidance clusters tightly:

- **RNIB Clear Print** sets **14pt** as the minimum for material intended to be readable by
  partially sighted readers, and 16pt+ as large print
  ([RNIB Clear Print guidance 2023](https://media.rnib.org.uk/documents/Clear_Print_guidance_2023.docx)).
- **CNIB Clear Print** and the Round Table guidelines put the practical floor at **12pt, preferably
  14pt**
  ([CNIB](https://cnib.ca/sites/default/files/2018-07/CNIB%20Clear%20Print%20Guide.pdf),
  [Round Table 2022](https://printdisability.org/wp-content/uploads/2022/06/Guidelines-for-Producing-Clear-Print-2022-PDF-FINAL.pdf)).
- Ordinary commercial body text sits at **10–12pt**. Below **8pt** is the register of legal
  fine print.

**Measured on our three one-pagers** (A4 at 96 dpi → 794 px wide; 1 CSS px = 0.75 pt):

| File | Page | Chars | Median size | Min size | % of text under 9px (6.75pt) |
|---|---|---|---|---|---|
| `SYNOS_VC_1PAGER.html` | 1 | 4,627 | 8.8px = **6.6 pt** | 7.5px = 5.6 pt | 52% |
| `1pager-retail-multistore-cto.html` | 1 | 4,564 | 8.9px = **6.7 pt** | **6.8px = 5.1 pt** | 55% |
| | 2 | 4,901 | 8.6px = **6.5 pt** | 7.6px = 5.7 pt | **74%** |
| `1pager-financial-inclusion-cto.html` | 1 | 4,783 | 8.9px = **6.7 pt** | **6.8px = 5.1 pt** | 53% |
| | 2 | 4,769 | 8.6px = **6.5 pt** | 7.6px = 5.7 pt | **73%** |

**Our one-pagers are set at roughly half the low end of normal print body text, and page 2 of the
prospect one-pagers is three-quarters fine print.** A CTO reading a printed copy across a desk
cannot read it without picking it up. Someone over 45 cannot read it at all without glasses they may
not be wearing.

---

## Part C — Typography

### C.1 What the current trio actually is

`--sk-font-display: 'Plus Jakarta Sans'` · `--sk-font-body: 'Inter'` · `--sk-font-mono: 'JetBrains
Mono'`. All three are free Google Fonts.

**Inter** (Rasmus Andersson, SIL OFL, [rsms.me/inter](https://rsms.me/inter/),
[GitHub](https://github.com/rsms/inter)) is, by any measure, *the* default UI sans: the system font
in Figma, the default in a large share of design systems, and among the most-served faces on Google
Fonts. It is excellent and it is invisible — which for a product UI is the point and for a brand
artifact is the problem. Choosing Inter communicates nothing except that a competent person chose a
competent font.

**Plus Jakarta Sans** (Tokotype, 2020, [Google Fonts](https://fonts.google.com/specimen/Plus+Jakarta+Sans),
[GitHub](https://github.com/tokotype/PlusJakartaSans)) was commissioned for the Jakarta provincial
government's "+Jakarta City of Collaboration" identity. It is a geometric neo-grotesque. Since
landing on Google Fonts it has become one of the most-used faces in free Figma templates and
Tailwind starter kits, and the trend commentary on geometric sans saturation is explicit — *"Come
on, not another geometric sans!"* ([Pimp my Type](https://pimpmytype.com/font/plus-jakarta-sans/)).

**Judgement:** Plus Jakarta Sans + Inter is not a bad pairing. It is *the* pairing — close to the
modal default of the free-template ecosystem. Two free Google faces from the two most-used
categories, with the display face being the one most associated with template kits, is the
typographic equivalent of a Bootstrap card. It cannot make the deck read expensive because it is
exactly what an inexpensive deck also uses.

### C.2 What companies with actual typographic identity do

| Company | Face | Nature |
|---|---|---|
| Stripe | **Söhne** (Klim Type Foundry, Kris Sowersby, 2019) | Licensed, paid, central to the 2019 rebrand ([Fonts In Use](https://fontsinuse.com/uses/35338/stripe-website-2020), [Typewolf](https://www.typewolf.com/sohne)) |
| Vercel | **Geist** (with Basement Studio, open source) | Commissioned and released as their own ([vercel.com/font](https://vercel.com/font), [origin story](https://basement.studio/post/the-birth-of-geist-a-typeface-crafted-for-the-web)) |
| Linear | **Inter** | Deliberately the default; identity carried by colour, motion and restraint, not by the face |

The pattern: either you **pay for or commission a face nobody else has**, or you **use the default
and carry identity entirely in the system around it**. The expensive-looking middle ground does not
exist. Picking a second-tier free display face is the worst of both — it costs the neutrality of
Inter and buys none of the distinctiveness of Söhne.

### C.3 Would a serif display face help, given synos.in uses Instrument Serif?

The marketing site is set in **Instrument Serif** (display) + **DM Sans** (body) + JetBrains Mono
(`CLAUDE.md` → Design Tokens). The deck is Plus Jakarta Sans + Inter + JetBrains Mono. **Only the
mono is shared. A prospect who reads synos.in and then opens the deck sees two different companies.**
That is a fact about the current state, independent of which trio is right.

What a serif display face would buy, specifically:

1. **Register.** A high-contrast serif at 34–47px on a white slide reads as institutional — the
   register of a fund's own materials, a law firm's, a bank's. It is the single cheapest way to move
   a deck away from "SaaS landing page rendered at 16:9".
2. **Free hierarchy.** Serif display over sans body gives a category break, not just a size break.
   §D.2 shows our current hierarchy is failing precisely because h2 (18px) and h3 (17px) are one
   pixel apart; a face change makes a level distinguishable at 25% zoom, which a 1px size change can
   never do.
3. **One system across site and deck.** Adopting Instrument Serif for deck display is the only
   change in this whole document that makes two artifacts *converge* instead of adding a variant.

What it would cost:

1. **Instrument Serif ships in one weight (Regular) with an italic.** No bold. Every place the deck
   currently leans on weight-800 display type (`.cover .big`, `.sk-stat-value` at 800, every `h1` at
   700) would have to carry emphasis by **size and colour instead of weight**. That is a real
   constraint, not a detail — it forces the type scale to open up, which is arguably the point, but
   it is work.
2. **Projection risk.** High-contrast serifs lose their thin strokes first under ambient light and
   projector gamma (§B.3). Instrument Serif is a moderate-contrast Didone-ish display face; at 34px+
   on a lit screen it is fine, but it must not be used below ~24px. That means serif for h1/cover
   only, sans for everything else — a two-role system, not a replacement.
3. **A third family.** Site is Instrument Serif + DM Sans. Deck is currently PJS + Inter. Bringing
   Instrument Serif into the deck without also resolving PJS-vs-DM-Sans leaves *four* families in
   the brand. The honest version of this change is: **Instrument Serif (display) + one sans (body) +
   JetBrains Mono (data)**, and pick the one sans deliberately.

**Judgement, and it is the one I hold most firmly in Part C:** the display face should change to
Instrument Serif, restricted to `h1`, `.cover .big` and `.sk-stat-value`, and Plus Jakarta Sans
should be **retired entirely** rather than demoted — a display face used for nothing is drift. The
body sans is a genuine open question between Inter (neutral, already there, zero risk) and DM Sans
(matches the site, one fewer family in the brand). I would keep Inter for the deck body on
legibility grounds and accept the site/deck body mismatch, because the display face is what
carries recognition and DM Sans's advantage over Inter at 11–16px on a projected screen is nil.

### C.4 One measured typographic defect, unrelated to face choice

**Measured:** the VC deck renders text in **four** families, not three. `Source Sans Pro` appears on
slide 33, and `SourceSansPro-Semibold` is embedded in `synos-vc-deck-v6.pdf`. Source is not loaded
by the deck. It comes from `reveal.js@5.1.0/dist/theme/white.css`, pulled from jsDelivr at line 11
of the deck — reveal's default body face showing through wherever our CSS does not override.

Two consequences. First, the brand leaks. Second, **the deck's fonts and its entire theme are
CDN-dependent at present time**: Google Fonts at line 9, reveal.js CSS/JS from jsDelivr at lines
10–11. A meeting on bad conference wifi renders the deck in fallback faces at wrong metrics. The
`.standalone.html` buyer build exists because someone hit this; the VC deck has no standalone build.

---

## Part D — What separates a deck that reads expensive from one that reads templated

Four properties, each of which is measurable, each of which we fail. This is the section the Phase 2
renders should be judged against.

### D.1 The title does not move

**The property:** in an expensive deck, you can flip through 20 slides and the h1 baseline does not
shift by a pixel. The eye lands in the same place every time and the content changes underneath it.
It is the single most-visible signal of a designed system, and it is invisible when present and
glaring when absent — because in a live presentation you *see the transition*, not the slide.

**Measured, VC deck, 35 slides:**

| Metric | Value |
|---|---|
| `h1` top offset, minimum | **33.3 px** (slide 9) |
| `h1` top offset, maximum | **197.6 px** (slide 34) |
| Spread | **164.3 px = 22.8% of stage height** |
| Distinct rounded positions | **27 different top offsets across 35 slides** |

The cause is in the extracted CSS and therefore in the kit: `.card-frame` sets
`display:flex; flex-direction:column; justify-content:center`. The card **vertically centres its
contents**, so the title's position is a function of how much content is below it. A sparse slide
pushes the title down; a dense one pulls it up. Advancing from slide 33 to 34 moves the headline
down 63px on screen.

Fixing this is a change to one declaration and it is the highest-value single change in this
document.

### D.2 The type scale is a scale

**The property:** adjacent steps are distinguishable at a glance, ideally at Hale's 25% zoom.
Conventional display scales use a ratio in the 1.2–1.33 range.

**Measured, the canonical VC scale** (conflict C5, resolved in favour of the VC family):

| Role | Size | Ratio to next step down |
|---|---|---|
| h1 | 34 px | 1.89 |
| h2 | 18 px | **1.06** |
| h3 | 17 px | **1.06** |
| p | 16 px | 1.39 |
| eyebrow | 11.5 px | — |

**h2, h3 and p span 18→16px — an 12.5% range covering three semantic levels.** At 25% zoom they are
4.5, 4.25 and 4.0 px: indistinguishable. Hierarchy is therefore carried entirely by weight and
colour, which is why the deck needs 7.7 distinct text colours per slide (§E.1) — colour is doing the
job size should be doing. Then there is a **1.89× cliff** from 34 to 18 with nothing in between, so
there is no sub-head available and every secondary statement has to be either a title or body copy.

The pass document says the type scale "won on recency, not merit". Correct, and the buyer family it
beat (30/16/15/14) has ratios of 1.88 / 1.07 / 1.07 / — i.e. **the same defect**. Neither family is
right. This was never a two-way choice.

### D.3 Colour is scarce and it means one thing

**The property:** an expensive deck uses one accent, spends it on the single most important object
on the slide, and leaves everything else in ink and grey. Front's palette was described as
deliberately "boring". Colour that appears everywhere signals nothing.

**Measured, VC deck:**

| Metric | Value |
|---|---|
| Distinct computed text colours across the deck | **31** |
| Mean distinct text colours per slide | **7.7** |
| Maximum on one slide | **14** (slide 9) |
| Mean distinct fills (backgrounds + gradients) per slide | 4.1 |

The token file declares far fewer than 31 text colours. The extras are untokenised hexes living in
the source CSS: `#3b0764`, `#15803d`, `#b45309`, `#064e3b`, `#0f766e`, `#3730a3`, `#a5b4fc`,
`#818cf8`. Eight colours the brand does not know it has. (The kit is clean here — every kit
component reads a token — but the kit only covers the 24 extracted components; the eight strays live
in the one-off slides the inventory put out of scope, and they will come straight back the next time
someone builds a real deck.)

Fourteen text colours on one slide is not a palette. It is what happens when every nested box gets
its own tint because the box needed to be distinguishable from the box around it.

### D.4 There is white space, and boxes are the exception

**The property:** expensive decks put objects on a page. Templated decks put objects in boxes,
because a box is how you fake alignment when there is no grid.

**Measured, VC deck:** mean **11.0** elements per slide carry a visible border or fill; maximum
**46** (slide 9). Slide 9 has four levels of nesting: the card frame → a bordered band → a bordered
inner panel → cards inside it → chips inside those. Every level has its own border, its own radius
and its own tint.

The visual read of slide 9 in §E.3 is the clearest statement of the problem: it is not a slide, it
is a dashboard screenshot. It would be at home in the product UI — which is the point of the
warning in the pass document that "an operator console and an investor deck want opposite things".
The deck has drifted toward the console.

### D.5 The negative version: what specifically makes ours read templated

Ranked by how visible it is in a room, from the four measurements above:

1. The headline jumps 164px between slides (D.1).
2. Everything is in a box, boxes nest four deep, and the boxes have 1px `#e2e8f0` borders that
   disappear on a projector while still fragmenting the layout (D.4 + B.3).
3. Seven-plus text colours per slide, so no colour is a signal (D.3).
4. Three of five type steps are within 2px of each other (D.2).
5. The gradient — the brand's one distinctive object — is perceptually flat (§E.2).
6. The free-template display face (C.1).

---

## Part E — Audit of our artifacts

Seven artifacts, as inventoried: `synos-vc-deck-presenting.html`, `synos-vc-deck-v6.html`,
`synos-tech-buyer-v2.html`, `synos-ops-buyer.standalone.html`, `SYNOS_VC_1PAGER.html`,
`1pager-retail-multistore-cto.html`, `1pager-financial-inclusion-cto.html`. Plus
`packages/brand-kit` as built.

### E.1 Density — the measurement that reframes everything else

**Static (HTML source, notes stripped):**

| Artifact | Slides | Total words | Mean/slide | Median | Max | Slides >100 words |
|---|---|---|---|---|---|---|
| `synos-vc-deck-v6` | 35 | 8,263 | **236** | 242 | **426** (s18) | 31 / 35 |
| `synos-vc-deck-presenting` | 35 | 6,669 | 190 | 172 | 426 | 28 / 35 |
| `synos-tech-buyer-v2` | 40 | 6,325 | 158 | 163 | 332 | 32 / 40 |
| `synos-ops-buyer.standalone` | 38 | 5,242 | 138 | 144 | 231 | 30 / 38 |

**Rendered (headless Chrome, characters actually painted):** VC deck mean **1,412 characters per
slide**; buyer deck mean 935.

Two things follow.

**First, the presenting build is already the right instinct, executed halfway.** It carries 1,594
fewer words than v6 across the same 35 slides — content moved into `<aside class="notes">` on 22
slides. Somebody already knew the slides were too full. But v6 is the build that gets exported to
PDF and sent, so **the version investors read is the denser one**.

**Second, against §A.1's arithmetic:** 1,412 characters needs ~65 seconds to read; the slide will get
~11. Every slide in the deck is written for a reader who does not exist.

### E.2 The gradient, measured properly

The pass document says indigo→violet are "51 units apart" against indigo→teal at 143, without
naming the space. In OKLab, where perceptual travel is actually measurable:

| Ramp | ΔL | ΔC | Δh | **ΔE_ok** |
|---|---|---|---|---|
| **Current deck: `#6366f1 → #7c3aed`** | −0.044 | +0.043 | 15.9° | **0.087** |
| Site: `#6366f1 → #0d9488` (rejected) | +0.015 | −0.100 | −92.4° | 0.233 |
| `#6366f1 → #4c1d95` (violet-ink, **already a token**) | **−0.206** | −0.026 | 16.6° | **0.215** |
| `#6366f1 → #4338ca` (own dark indigo) | −0.129 | +0.011 | −0.1° | 0.129 |

The current gradient travels **ΔE_ok 0.087 with ΔL of −0.044** — it barely changes lightness, which
is the channel the eye reads a gradient by. It is flat, and the measurement says so.

The rejection of indigo→teal was correct and the OKLCH numbers prove it more sharply than the
original reasoning did: teal sits at **h=185°**, emerald at **h=166°** — 19° apart at nearly
identical chroma (0.104 vs 0.105). They are the same colour to a viewer at 3 m. Teal genuinely
cannot be the far end of the brand gradient while emerald means "a win".

**But `--sk-violet-ink #4c1d95` is already in `tokens.css`**, already used (`.dual-next .dual-cell
p`), sits at h=294° — 1° from `--sk-violet`, so it is unambiguously the same family — and gives
**ΔE_ok 0.215, a 2.5× increase in travel** over the current ramp. The "wider violet-family ramp
proposed and not tested" in the pass document has an obvious candidate that costs no new token.

**And it fixes an accessibility failure, which is the part nobody has noticed:**

| Background | White text | White @ 80% opacity |
|---|---|---|
| `#6366f1` (current gradient **start**) | **4.47:1 — fails AA (needs 4.5)** | **3.45:1 — fails** |
| `#7c3aed` (current gradient end) | 5.70:1 | 4.22:1 — fails |
| `#4c1d95` (proposed end) | **10.95:1** | 7.52:1 |
| `#312e81` (`--sk-indigo-ink`) | 11.42:1 | 7.90:1 |

The Company Brain block on slide 9 — the single most important object in the deck — is white and
`rgba(255,255,255,0.8)` text at **9.5px** on a gradient whose light end is `#6366f1`. That is
**3.45:1 at 1.32%EH**. It fails WCAG AA, and under §B.3's ambient lift it is worse.

**This directly contradicts the pass document's Phase 3 note that "the kit currently has no known AA
failure."** Two failures exist in the kit as built:

1. `--sk-stat-value` for `.sk-stat--amber` resolves to `--sk-amber-2 #f59e0b` on white = **2.15:1**,
   at 48px/800 weight. Large text needs 3:1. It fails even the large-text threshold.
2. Any white text on the gradient's `#6366f1` end is at or below 4.47:1, and the sources set that
   text at 80% opacity.

Widening the ramp to `#4c1d95` moves white text on the important half of that block from 3.45:1 to
7.52:1. **The gradient change is a contrast fix that happens to also look better**, which is a much
stronger case than "the gradient is flat".

### E.3 What the slides actually look like — three renders

Rendered at the deck's own 1280×720 stage and read directly.

**Slide 1, cover.** Six stacked centred blocks: eyebrow, h1 at 47px, a 16.5px sub-line, then a
**100-word / 939-character paragraph set at 9.5px (1.32%EH)**, then a postage-stamp diagram roughly
120px tall, then three chips, then a date line. Compare Airbnb's cover — a wordmark and one sentence
— and Uber's — *"the logo and a tagline"*. Our cover asks a partner to read a dense paragraph before
they know what the company does, in text they cannot read past 1.8 m, and it does it in the ten
seconds when they are deciding whether to keep going. Meanwhile the top 110px and bottom 60px of the
slide are empty. The composition wastes the space it has and crowds the space it uses.

**Slide 9, "the training layer".** Four nesting levels: card frame → amber-bordered model band with
six sub-boxes → violet-bordered SynOS panel → four cards inside it, one of them the gradient Company
Brain block with six chips in it → a dashed governance strip with five chips → a bottom band with
six chips. **46 bordered/filled elements. 14 distinct text colours. 2,017 rendered characters.
Minimum type 7.5px.** This is the densest slide in the deck and it is the slide that explains the
product. Judgement: it is a systems diagram that has been asked to also be a slide, and it succeeds
at neither.

**Slide 17, "Landscape".** A 6×5 comparison matrix — genuinely well-made, the strongest information
design in the deck — followed by a **130-word footnote paragraph at 9.5px** running the full 1,150px
width. The matrix would be a good slide. The footnote is speaker notes that were not moved into
speaker notes.

**Slide 33, appendix quadrant.** Clean 2×2, good white space — and the h1 sits at **197.6px** from
the top while slide 9's sits at **33.3px**. Advancing between them, the headline visibly falls down
the screen.

### E.4 The one-pagers

Covered numerically in §B.5. The type is the dominant problem — median 6.6pt, min 5.1pt, page 2 at
73–74% under 6.75pt. Beyond that:

- **4,600–4,900 characters per A4 page.** Dense is defensible for a leave-behind; dense *at 6.6pt*
  is not. The same content at 9pt needs about 1.9 pages, which is why it was set at 6.6pt — the
  page count was fixed first and the type was shrunk to fit. That is the wrong order.
- **17–30 bordered/filled boxes per page.** Same box-nesting habit as the decks.
- **10 distinct text colours per page** in a print artifact that may be photocopied or printed
  mono, where several of them collapse to the same grey.
- **Page-size inconsistency in export** (§B.4, item 4).

### E.5 The built kit — what it inherited

The kit is faithful, and that is exactly the finding. Measured directly from
`packages/brand-kit/src/**/*.css`:

- **22 of the deck components' font-size declarations are below 12px**; smallest is
  `.sk-eyebrow-badge` at **7.5px**. Nine more in `print/OnePager.css`, smallest 8.0px.
- `.sk-eyebrow` at 11.5px in `--sk-muted` — the 4.01:1-under-ambient colour at 1.60%EH — is the
  label on 144 of 148 slides.
- `.sk-stat--amber` is a live AA failure (§E.2).
- `--sk-dim #94a3b8` (2.56:1) and `--sk-indigo-3 #818cf8` (2.98:1) are declared in `tokens.css` and
  referenced by **no component**. They are loaded guns left in the token file; the next deck built
  on the kit will reach for them.
- `--sk-slide-pad: 40px 56px 34px` with `justify-content: center` on the frame is what produces the
  164px title spread (§D.1).

Nothing here is a bug in the extraction. It is the extraction working correctly on a source that has
these properties.

### E.6 Ranked gaps, by what they cost us

Cost is judged against the pass document's bar: *would a partner who sees a thousand decks a year
read this as expensive?*

| # | Gap | Measured | What it costs | Confidence |
|---|---|---|---|---|
| **1** | **Density: 236 words / 1,412 chars per slide against ~11 seconds of attention** | §E.1 | The deck cannot be read at the speed it will be read. Everything else is cosmetics on top of this. | Very high — measured both statically and rendered, and the DocSend timing is primary data |
| **2** | **The buyer-deck PDFs are 96-ppi bitmaps with zero extractable text; page counts drift by 5 on two exports** | §B.4 | The artifact that actually circulates is unquotable, unsearchable, 10 MB and visibly soft. An associate cannot paste us into a memo. | Very high — `pdffonts` returns nothing, `pdftotext` returns 40 chars |
| **3** | **66% of text under 14px; median 11px = 1.53%EH; legible to 2.1 m on a 55" screen** | §B.2 | Half the room reads the title and nothing else. Directly fails Hale's back-row test and AVIXA's lecture-slide preset. | Very high — measured, and the standard is explicit |
| **4** | **One-pagers set at 6.6pt median, 5.1pt minimum** | §B.5 | Half the low end of normal print body text. A printed leave-behind is not readable across a desk. | Very high |
| **5** | **`h1` top varies 33→198px across 35 slides; 27 distinct positions** | §D.1 | The most visible "homemade" tell there is, and it is visible precisely during the transitions a live presentation is made of. One CSS declaration. | Very high |
| **6** | **White on the gradient's `#6366f1` end is 4.47:1, and 3.45:1 at the 80% opacity actually used — on the deck's most important object** | §E.2 | An AA failure on the Company Brain block, and it contradicts the pass document's stated baseline. | Very high — computed |
| **7** | **Gradient travels ΔE_ok 0.087 with ΔL −0.044** | §E.2 | The brand's one distinctive object reads flat. Compounds #6: the fix for both is the same fix. | High |
| **8** | **7.7 text colours per slide, 14 max, 31 across the deck, 8 of them untokenised** | §D.3 | No colour means anything, so emphasis has to be re-established by boxing, which drives #9. | High |
| **9** | **Mean 11 bordered/filled elements per slide, max 46, four levels of nesting** | §D.4 | Reads as an operator console, not a deck. The exact drift the pass document warned against. | High |
| **10** | **h2/h3/p span 18→16px — three levels inside 12.5%** | §D.2 | Hierarchy collapses at any zoom or distance; forces #8 and #9 to compensate. | High |
| **11** | **Display face is the modal free-template face; site and deck share only the mono** | §C.1, §C.3 | Cannot read expensive when it is what an inexpensive deck also uses. Two artifacts, two brands. | Medium-high — judgement on a factual base |
| **12** | **Four font families render, not three; reveal's Source Sans Pro leaks through and is embedded in the PDF** | §C.4 | Small, but it is the brand losing control of its own type in the shipped file. | High — measured |
| **13** | **Fonts, reveal CSS and reveal JS all load from CDNs at present time; VC deck has no standalone build** | §C.4 | A meeting on bad wifi renders the deck wrong. Low probability, total loss when it happens. | High |
| **14** | **`--sk-dim` and `--sk-indigo-3` declared, 2.56:1 and 2.98:1, referenced by no component** | §E.5 | Latent AA failures waiting for the next deck author. | High |
| **15** | **One-pager PDF export is not consistently A4** | §B.4 | Prints scaled or clipped. | High |

Gaps 1–4 are about whether the artifact works at all. 5–10 are about whether it reads expensive.
11–15 are hygiene. **The pass document's known-weak list covers #7 (gradient), #10 (type scale) and
the `.cover .big` refit — three of fifteen, and none of the top four.** That is the answer to
whether the known-weak list was the whole story: it was not, and the items it missed are the
expensive ones.

---

## Part F — Is the 35-slide structure right at all?

Nobody had asked. Here is the answer, and it is not the one the question implies.

### F.1 The deck is not 35 slides

I pulled every eyebrow and `h1` in order. The actual structure:

| Range | What it is | Count |
|---|---|---|
| 1 | Cover | 1 |
| 2–21 | The argument: premise → gap → today → the trap → what we built → the hard part → tomorrow → job two → the play → trust → why it compounds → who buys → the wedge → traction → business model → landscape → how we build differently → if models get better → why us → the round | 20 |
| 22 | Closing wordmark slide | 1 |
| 23 | "End of the main deck" divider | 1 |
| 24–35 | Appendix (12 slides, every eyebrow prefixed `Appendix ·`) | 12 |

**The main deck is 21 slides. Front's Series A was 21 slides.** The structure is not the problem —
it is dead on the convention, and it already does the right thing by fencing depth behind an
explicit divider.

So the answer to "is 35 right" is: **yes, and the question was mis-framed.** 35 = 21 + 14, and 21 is
correct. What is wrong is not how many slides there are. It is that each of the 21 carries 236 words
instead of 40.

### F.2 What *is* wrong with the structure

Three things, all fixable inside 21 slides.

**Traction arrives at slide 15 of 21 — 71% of the way through.** Front put customers at slide 6 and
metrics at slide 8 of 21. Sequoia's ordering puts market potential at 5 and financials at 9, but
Sequoia is describing a business plan, not a read order under a 3m44s clock. We have three live
engagements all verbally committed to paid contracts — the strongest fact we own — and we spend
slides 2 through 14 on argument before mentioning it. Under DocSend timing, a meaningful share of
readers stop before slide 15.

**Slides 6, 8 and 9 are three passes at one idea.** "One environment under the chaos" (6), "the same
environment, tomorrow" (8), "the same environment, drawn as the training layer" (9). The titles say
it: it is the same environment three times. That is one slide with a build, not three slides.

**Two slides have no `h1`.** Slides 3 ("The gap") and 22 (closing wordmark). Slide 23 is a divider.
Three of 23 pre-appendix slides carry no claim. In a deck where the title is supposed to be the one
idea (§A.3), a slide with no title is a slide with no idea.

**And two conventional slides are absent from the main deck:** there is no team slide (slide 20,
"Why us", carries founder credibility inside an argument about disciplines) and no market-size slide.
For a pre-seed, "why us" doing double duty is defensible and market-size may be deliberately omitted
— but it should be a decision on the record, not an accident. Sequoia lists both.

### F.3 The structural view I would defend

Keep 21 + appendix. Do four things to the order and count:

1. **Move traction to slide 5 or 6.** Three committed contracts, immediately after the problem.
2. **Collapse 6 / 8 / 9 into one slide with two builds.** Frees two slides.
3. **Give slides 3 and 22 titles, or delete them.**
4. **Spend the two freed slides on air**, not on new content — the main deck lands at 19–21 and
   every slide gets ~25% more room at the same word count, before any density work.

This is a content decision, not a kit decision, and it is out of scope for a brand-kit pass. It is
recorded here because the question was asked and because it changes what the kit needs to support:
if traction moves early, `StatCard`/`StatRow` becomes a hero component rather than a mid-deck one,
and it is currently the component with a live AA failure (§E.2).

---

## Part G — Ranked candidate improvements

**None of these are implemented. None should be implemented before Phase 2 renders and Anoop's
sign-off.** Ranked by cost-of-gap ÷ cost-of-change. Each states what it changes, what it costs, and
how it would be proven.

---

**G1 — Pin the title. Remove `justify-content: center` from the slide frame.**

- **Changes:** `SlideFrame.css` — the frame becomes `justify-content: flex-start`; `SlideHeader`
  gets a fixed block height so eyebrow+h1+sub always occupy the same box whether or not a sub is
  present. Content below flows from a constant baseline.
- **Costs:** every slide's vertical composition shifts. Sparse slides (3, 22, 23, 33, 34) will have
  visible space at the bottom, which is correct but will look "unfinished" until the eye adjusts.
  Breaks fidelity assertions on `slide-frame-default`, `slide-frame-arch`, `slide-header-row`.
  Roughly a day including re-pinning.
- **Proven by:** re-run the geometry probe. Success is `h1TopSpread ≤ 2px` and
  `distinctH1Tops ≤ 2` (one value for standard frames, one for arch frames) across all 35 slides.
  Plus a flip-through animation, current vs proposed, at deck scale.
- **Reversible:** yes, trivially.

---

**G2 — Widen the gradient to `#6366f1 → #4c1d95`.**

- **Changes:** `--sk-grad` only. `#4c1d95` is already `--sk-violet-ink` in `tokens.css`. No new
  token, no new hue, same family (Δh 16.6°).
- **Costs:** every gradient surface darkens at its far end — the Company Brain block, `.sk-step-bar`,
  the one-pager header rule, `.sc.s2 .sn`. Any dark text currently sitting on the violet end must be
  re-checked. Breaks the `pillar-brain`, `step` and `slide-frame` fidelity assertions.
- **Proven by:** (a) ΔE_ok 0.087 → 0.215, a 2.5× increase in perceptual travel, recomputed;
  (b) white-on-gradient contrast at the block's own text opacity goes 3.45:1 → 7.52:1, clearing AA
  where it currently fails; (c) side-by-side render of the Company Brain block at deck scale,
  photographed off an actual TV in the actual room.
- **Reversible:** yes — one token.

---

**G3 — Raise the floor. No text below 14px on a deck slide; no text below 9pt (12px) in print.**

- **Changes:** a floor rule across the kit. 22 deck declarations and 9 print declarations move.
  In practice this means the smallest chips, source lines, badges and footnotes get bigger — which
  means **content has to come off the slide**, which is why this is coupled to G4.
- **Costs:** the largest change in this document. Every dense slide overflows and has to be re-cut.
  Breaks most of the 103 fidelity assertions. Multi-day, and it forces content decisions that are
  not the kit's to make.
- **Proven by:** re-run the rendered-inventory probe. Success is `%<14px = 0` and
  `globalMinPx ≥ 14` for the deck, `min ≥ 12px` for print. Then the AVIXA check: 14px = 1.94%EH,
  which clears the 2.0% "financials" preset at a viewing ratio of 3–4 — a 55" screen readable to
  4.1 m. And Hale's test: screenshot at 25% and confirm every line is still resolvable.
- **Reversible:** yes, but expensive to redo.

---

**G4 — A slide-density budget, enforced by the kit.**

- **Changes:** not a visual change — a build-time check. A script that renders any deck built on the
  kit and fails if a slide exceeds a character budget (proposal: **450 rendered characters**, which
  at 20 chars/sec is ~22 seconds — twice the DocSend budget, so still generous). Sits alongside the
  fidelity harness.
- **Costs:** cheap to build (the probe already exists — §0.1). Expensive to *satisfy*: the current
  VC deck fails on 35 of 35 slides at 450 chars. Needs a companion convention for where the
  overflow goes — speaker notes, appendix, or the founder memo.
- **Proven by:** the check runs and reports. Prove the target is right by rebuilding three real
  slides at ≤450 chars and reading them at 10 seconds each, side by side with the current versions.
- **Reversible:** yes — it is a lint rule.
- **Note:** the `presenting` build already moved 1,594 words into speaker notes across 22 slides.
  This formalises an instinct that already exists in the corpus.

---

**G5 — Fix the PDF export pipeline.**

- **Changes:** outside `packages/brand-kit` proper, but it is where the largest measured defect is
  (§B.4). One export path, vector text, self-hosted fonts embedded as real font programs (not Type
  3), asserted page-count parity, A4 for print artifacts, and a size budget.
- **Costs:** engineering, not design. No fidelity assertions touched. Needs self-hosting the three
  (or two, post-G8) font files rather than pulling from Google Fonts at render time.
- **Proven by:** `pdffonts` shows embedded TrueType/CFF, not Type 3, and not empty. `pdftotext`
  returns the full slide text for every deck (currently 40 chars for tech-buyer-v2).
  `pdfinfo` page count equals slide count exactly. `pdfimages -list` shows no full-page rasters.
  File size under 5 MB. Page size exactly 595.9×842.9 pt for A4 artifacts.
- **Reversible:** yes.
- **Judgement:** this is #2 in the gap ranking and the cheapest of the top four to fix. It should
  probably go first even though it is the least visual.

---

**G6 — Open the type scale.**

- **Changes:** replace 34 / 18 / 17 / 16 / 11.5 with a scale that has real ratios. Illustrative
  target at ~1.25: **40 / 26 / 20 / 16 / 13**, with the eyebrow rising from 11.5 to 13 (1.81%EH,
  which also lifts it off the ambient-light floor in §B.3). h3 disappears as a distinct level or
  becomes a weight variant of h2.
- **Costs:** touches every component. Interacts with G3 (the floor) and G8 (the face). Breaks most
  fidelity assertions. Larger type on already-dense slides forces the same content cuts as G3, so
  these three should be proposed as **one** Phase 2 render, not three.
- **Proven by:** every adjacent pair distinguishable at 25% zoom (Hale's test); ratio between
  adjacent steps ≥ 1.2 throughout; no step under 13px.
- **Reversible:** yes.

---

**G7 — Cut the per-slide colour count.**

- **Changes:** a rule rather than a token change: **at most 3 accent-coloured text values per slide,
  plus ink/ink-2/ink-3.** Delete the eight untokenised hexes (§D.3) — they only live in
  out-of-scope one-off slides, so this is a convention for deck authors plus a lint check, not a
  component change. Retire `--sk-dim` and `--sk-indigo-3` from `tokens.css` outright (§E.5).
- **Costs:** near zero in the kit. Some one-off slides lose distinctions they were using colour to
  carry; those need to become spatial distinctions instead, which is G9.
- **Proven by:** re-run the rendered-inventory probe. Success is `meanColors ≤ 4.0` and
  `maxColors ≤ 6` (from 7.7 and 14), and `distinctTextColors ≤ 12` deck-wide (from 31).
- **Reversible:** yes.

---

**G8 — Instrument Serif as the display face; retire Plus Jakarta Sans.**

- **Changes:** `--sk-font-display` becomes `'Instrument Serif', Georgia, serif`, applied to `h1`,
  `.cover .big` and `.sk-stat-value` only. Everything else stays Inter. Plus Jakarta Sans is removed
  from the font load and from `tokens.css`. Brings the deck's display register onto the same face as
  synos.in.
- **Costs:** Instrument Serif has **one weight and an italic — no bold**. Every 700/800 display
  weight in the kit has to be re-solved with size and colour. It must not go below ~24px (§C.3), so
  it cannot be the face for h2/h3. It is a strong, visible change and it is the one most likely to
  be rejected on taste — which is exactly why it needs a render before anything else happens.
- **Proven by:** side-by-side of the cover, a stat row and three argument slides at deck scale;
  then the same three photographed off a TV under room lights, because a high-contrast serif's thin
  strokes are the thing at risk (§B.3). A 25%-zoom legibility check on the serif h1.
- **Reversible:** yes, but it is the most disruptive single change here, and it should be decided
  before G6 because the scale depends on the face.

---

**G9 — De-box. Borders become the exception.**

- **Changes:** a composition convention plus component defaults: nesting depth capped at 2, the
  outer container of a group loses its border in favour of space, and 1px `--sk-border` hairlines
  (1.23:1 — invisible on a projector anyway, §B.3) are dropped in most positions. Affects
  `WallGrid`, `PillarGrid`, `UseCaseGrid`, `StepGrid`, `Callout`.
- **Costs:** medium. Alignment currently comes from box edges; without them the layout needs an
  actual column grid, which the kit does not have. This is the change most likely to expose that
  the kit has no grid system.
- **Proven by:** re-run the geometry probe. Success is `boxesMean ≤ 6` and `boxesMax ≤ 15` (from
  11.0 and 46), with nesting depth ≤ 2. Then a side-by-side of slide 9 — the 46-box slide — as the
  hardest case.
- **Reversible:** yes.

---

**G10 — Re-cut the cover.**

- **Changes:** `CoverSlide` drops the 100-word paragraph slot. Wordmark, one claim, one qualifying
  line, the mark. The paragraph moves to speaker notes or slide 2.
- **Costs:** small in the kit, contentious in content — the paragraph is doing real work for a
  PDF-only reader. That tension is real and should be resolved by making slide 2 carry it, not by
  keeping it on the cover.
- **Proven by:** cover at ≤ 25 rendered words, nothing below 16px, compared side by side against
  Airbnb's and Uber's covers at the same scale.
- **Reversible:** yes.

---

**G11 — Fix `.sk-stat--amber`.**

- **Changes:** `--sk-stat-value` for the amber variant moves from `--sk-amber-2 #f59e0b` (2.15:1) to
  `--sk-amber #92400e` (7.09:1), which is already the token used for amber *text* everywhere else.
- **Costs:** one line. Breaks the `stat` fidelity assertion — correctly, and with a recorded reason.
- **Proven by:** contrast recomputed at ≥ 4.5:1. This is the one item in this list that is a
  straight defect fix and needs no render.
- **Reversible:** yes.

---

**G12 — Lift the one-pager type floor to 9pt.**

- **Changes:** every print declaration below 12px rises. Median moves 6.6pt → ~9pt.
- **Costs:** the retail and financial-inclusion one-pagers grow from 2 pages to ~3, or lose ~35% of
  their content. That is a real content decision, not a styling one, and it is the reason the type
  is small in the first place (§E.4).
- **Proven by:** print probe returns `min ≥ 12px` and `median ≥ 12px`; a physical print read at
  arm's length by someone over 45 without reading glasses.
- **Reversible:** yes.

---

**G13 — Self-host fonts and reveal.js; kill the Source Sans Pro leak.**

- **Changes:** vendor the font files and reveal's CSS/JS instead of CDN-loading them; override
  reveal's `theme/white.css` body font explicitly so nothing falls through to Source Sans Pro.
  Produce a standalone VC-deck build, as the buyer deck already has.
- **Costs:** small, purely mechanical.
- **Proven by:** rendered-inventory probe returns exactly the intended families (currently returns
  four, including Source Sans Pro); `pdffonts` on the export shows no Source Sans Pro; the deck
  renders correctly with the network disabled.
- **Reversible:** yes.

---

### G.14 — Suggested Phase 2 grouping

These do not decompose into thirteen independent renders. Proposed bundles, in the order I would
put them in front of Anoop:

| Bundle | Contains | Why together |
|---|---|---|
| **A — free wins, no render needed** | G11, G13, G5 | Defect fixes and pipeline. No taste judgement involved. Do these regardless. |
| **B — the one-line composition fix** | G1 | Single declaration, single most visible improvement. Render as a flip-through, not a still. |
| **C — the typographic system** | G8 + G6 + G3 | Face, scale and floor are one decision. Rendering them separately produces three renders that all look wrong because each is missing the other two. |
| **D — the brand object** | G2 + G7 | Gradient and colour discipline. G2 is also an AA fix, so it carries independently if D is rejected. |
| **E — composition** | G9 + G10 + G4 | De-boxing, the cover, and the density budget. The largest content dependency; do last, and expect it to surface that the kit needs a grid. |

**Judgement on sequencing:** Bundle A costs nothing and fixes the #2 gap. Bundle B costs one line
and fixes the #5 gap. If nothing else in this document ships, those two should.

---

## Sources

**Primary — data**
- [DocSend Startup Index — pitch deck metrics](https://www.docsend.com/pitch-deck-metrics/)
- [DocSend / Dropbox — how DocSend data helps founders build better pitch decks](https://www.dropbox.com/resources/docsend-pitch-deck-research)
- [DocSend — pre-seed pitch deck guide](https://www.docsend.com/blog/pre-seed-pitch-deck-guide/)

**Primary — decks published by their founders**
- [Mathilde Collin — Front Series A deck](https://collinmathilde.medium.com/front-series-a-deck-f2e2775a419b)
- [Mathilde Collin — Front Series B deck](https://collinmathilde.medium.com/front-series-b-deck-6dc686267a24)
- [Mathilde Collin — Front Series C deck](https://collinmathilde.medium.com/front-series-c-deck-11773b30b272) · [front.com version](https://front.com/blog/front-series-c-deck)
- [Garrett Camp — The Beginning of Uber (first pitch deck)](https://medium.com/@gc/the-beginning-of-uber-7fb17e544851) · [Axios mirror](https://www.axios.com/read-the-original-uber-pitch-deck-1513305016-4606664a-58b6-40a8-a9ba-838284a9c4c0.html)
- [Airbnb original pitch deck, 2008 (SlideShare)](https://www.slideshare.net/PitchDeckExamples/original-airbnb-pitch-deck-2008)

**Primary — investors and accelerators**
- [Sequoia Capital — Writing a Business Plan](https://www.sequoiacap.com/article/writing-a-business-plan/)
- [Y Combinator — Kevin Hale, How to design a better pitch deck](https://www.ycombinator.com/library/4T-how-to-design-a-better-pitch-deck) · [YC blog version](https://www.ycombinator.com/blog/how-to-design-a-better-pitch-deck)

**Slide-level teardowns of the real decks** (used for slide-by-slide structure only, cross-checked against the founder-published originals)
- [Front Series A, slide by slide](https://www.alexanderjarvis.com/front-series-saas-startup-pitch-deck/)
- [Front Series B, slide by slide](https://www.alexanderjarvis.com/front-pitch-deck-to-raise-series-b-capital-investment/)
- [Uber seed deck, slide by slide](https://www.alexanderjarvis.com/uber-pitch-deck-raise-seed-capital-investment/)
- [Inc. — how Front's Series B deck raised $66M](https://www.inc.com/larry-kim/how-this-pitch-deck-raised-66-million-in-vc-funding.html)

**Standards — projection and contrast**
- [AVIXA / ANSI V202.01:2016 — Display Image Size for 2D Content in Audiovisual Systems (DISCAS), preview](https://webstore.ansi.org/preview-pages/InfoComm/preview_AVIXA+V202.01-2016.pdf)
- [AVIXA — Learn more about display size (%EH, acuity factor, viewing ratio table)](https://www.avixa.org/resources/display-image-size-calculators/learn-more-about-display-size)
- [AVIXA — Analytical and Basic Decision Making calculators](https://www.avixa.org/resources/display-image-size-calculators/analytical-and-basic-decision-making-calculations)
- [ANSI/INFOCOMM 3M-2011 — Projected Image System Contrast Ratio](https://webstore.ansi.org/standards/infocomm/ansiinfocomm3m2011) · [preview](https://webstore.ansi.org/preview-pages/InfoComm/preview_ANSI+INFOCOMM+3M-2011.pdf)

**Standards — print legibility**
- [RNIB — Clear Print guidance (2023)](https://media.rnib.org.uk/documents/Clear_Print_guidance_2023.docx)
- [CNIB — Clear Print Accessibility Guidelines](https://cnib.ca/sites/default/files/2018-07/CNIB%20Clear%20Print%20Guide.pdf)
- [Round Table — Guidelines for Producing Clear Print (2022)](https://printdisability.org/wp-content/uploads/2022/06/Guidelines-for-Producing-Clear-Print-2022-PDF-FINAL.pdf)

**Typography**
- [Inter — rsms.me/inter](https://rsms.me/inter/) · [GitHub](https://github.com/rsms/inter)
- [Plus Jakarta Sans — Google Fonts](https://fonts.google.com/specimen/Plus+Jakarta+Sans) · [Tokotype on GitHub](https://github.com/tokotype/PlusJakartaSans) · [Pimp my Type review](https://pimpmytype.com/font/plus-jakarta-sans/)
- [Söhne on stripe.com — Fonts In Use](https://fontsinuse.com/uses/35338/stripe-website-2020) · [Typewolf on Söhne](https://www.typewolf.com/sohne)
- [Vercel Geist](https://vercel.com/font) · [The birth of Geist — Basement Studio](https://basement.studio/post/the-birth-of-geist-a-typeface-crafted-for-the-web)

**Internal**
- `docs/plans/2026-08-13-brand-kit-improvement-pass.md` — the pass
- `docs/plans/2026-08-13-slide-inventory.md` — the measured inventory
- `docs/plans/2026-08-13-brand-kit-spec.md`, `docs/plans/2026-08-13-brand-kit-report.md`
- `packages/brand-kit/src/styles/tokens.css`, `packages/brand-kit/fidelity/`
