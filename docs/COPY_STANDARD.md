# Copy standard for synos.in

Outward copy only. Source comments, commit messages and this file are not covered.

Derived from `synos-gtm/outreach/ANOOP_VOICE_RULES.md`, adapted from 1:1 outreach register to
marketing register. The reason it exists: the site read as machine-written, and an intention to fix
that is not a mechanism. `npm run gate` is the mechanism.

## Enforced by `npm run gate` (hard failures)

1. **No em dashes or en dashes.** Rewrite the sentence. Do not substitute a comma everywhere; that
   is the same sentence with worse punctuation. Roughly a third become full stops where the clause
   was really a second sentence, a third become colons where the dash introduced a definition, and
   label separators become middots.
2. **Banned vocabulary:** leverage, robust, seamless, unlock, delve, journey, quietly, moat,
   game-changer, cutting-edge, best-in-class, revolutionise, revolutionize, empower, supercharge,
   effortless, turnkey.
   "Which accounts have gone quiet" is a real business phrase and is allowed; the adverb "quietly"
   is not, and it was the single most-flagged tell in the deck pass.
3. **No negation pivot:** "not just X but Y", "X isn't the problem, Y is", "it's not about X, it's
   about Y".
4. **No payoff beat:** a short closing sentence of the shape "That's the part we build.",
   "That's what we fix.", "That's the gap.", "That's us."

## Review rules the gate cannot catch

The gate does not pretend to detect these. They are caught by reading.

5. **No decorative tricolons.** Three items are fine when there are three things. Three items chosen
   for rhythm are a tell.
6. **No clause symmetry.** Two clauses of equal length balanced against each other.
7. **No aphorism closes.** A sentence that restates the section it just ended.
8. **Vary structure between sections.** Identical skeletons down a page read as generated, even when
   every sentence is fine on its own.

## Write to the customer, never to an investor

This is the defect three review passes kept finding, and no gate can see it. The VC deck and this
site argue the same thesis to two different rooms, and sentences migrate from the deck without
anyone deciding to move them.

9. **Never reuse a deck slide's title as a page heading.** The homepage eyebrow was "Why they call
   us", which is slide 2's own title. It narrates our sales experience from our side of the table.
10. **Never defend our own marketing.** "The mechanism that makes the whole thing more than a
    slogan" answers a criticism the reader has not made and would not care about.
11. **Never take a jab.** "The precondition nobody mentions early" scores a point against a
    competitor instead of telling the reader what to do.
12. **No internal vocabulary.** "Door" means a sales entry point to us and nothing to a buyer.
    Same for wedge, motion, land-and-expand, ICP.

The test: read the sentence aloud to a buyer. If it would embarrass you, it is written for the
wrong room.

## Claims must be checked against the capability audit

Source of truth is `synos-gtm/docs/research/product-truth/2026-08-11-capability-audit.md` §7.
Check **figures too** — they were written separately, reviewed separately, and in the third pass
three of them contradicted the platform page they are embedded on. A figure is a claim.

Live/in-build/roadmap status must agree between a figure and its host page. Where they disagreed,
the figure was always the optimistic one.

## Compression leaves stubs

Cutting a paragraph to its first sentence works only when the first sentence is a whole thought.
The 18k-to-12k pass left eleven fragments across the site ("Reading is safe." and stop) and once
deleted the first half of a two-part argument, leaving a paragraph that began "The second answer
is..." with no first answer anywhere. After any compression pass, read the survivors.

## Two things the checkers cannot see

13. **Gate scope is not coverage.** `npm run gate` checks style on 17 of 33 pages. Everything
    outside that set drifts silently: `/use-cases/cloud-finops-agents`, `/early-access` and `/blog`
    had never been migrated at all, and the five legal pages carried a nav and footer predating the
    revamp. The worst defects of the second and third passes were all outside the 17.
14. **Verify against raw source and against the live site.** Two rounds running, the live check
    found what the local one could not: footers sit below a screenshot's fold, and the text
    extractor strips `<script>`, which hid a dash in the subject line of the email the early-access
    form sends. Grep raw source when the question is "where does our copy go", not "what does a
    visitor read".

Metadata drifts from pages, too. `/compare` advertised "four comparisons" beside a page saying five;
`/about` advertised "nine captures" beside a gallery of six. Counts in a description are claims.

## Where "moat" went

Banned. Say the thing instead, choosing the form that fits the section:

- "Two years of corrections take another two years to earn."
- "What your people taught it stays with you."
- "Built capital, not rented intelligence."
- "An advantage a competitor cannot buy."
- "Intelligence of your own."

## Register

Technical buyer. A VP Engineering or CTO with an AI mandate and no bench to fulfil it. Write to
someone who has already tried something and found out what was missing.

Concrete over abstract. Name the system, the permission, the failure. "Raw keys on a laptop" beats
"insecure credential handling".
