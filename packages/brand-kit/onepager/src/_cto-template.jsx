/*
 * The CTO / technical-buyer one-pager template.
 *
 * The second of the two shapes in this corpus. Measured before it was written: the
 * financial-inclusion and retail-multistore CTO pages are **0.98 identical** as markup — the same
 * two pages with different nouns, exactly as the CEO pair was. Same reasoning as
 * `_ceo-template.jsx`: the layout lives once, each page supplies only its words.
 *
 * It is a much longer page than the CEO one and that is the point of it. The CEO page argues that
 * something should happen; this one answers the three questions a technical buyer actually asks —
 * why not build it, what is the brain made of, and what does it cost me in people and time — and it
 * carries a named-customer proof block. Every one of those sections is a slot below.
 *
 * RE-PLATFORMING, NOT A REWRITE. Every word comes from the page file that supplies it.
 */

/**
 * @param K the built brand-kit module.
 * @param c the page's content. Every field is the source page's own words.
 */
export const ctoOnePager = (K, c) => {
  const {
    OnePagerPage,
    OnePagerHeader,
    OnePagerFooter,
    SectionHeading,
    OutcomeCard,
    CtaBar,
    Callout,
    Chip,
    ChipRow,
    Caption,
    StepCard,
    StepGrid,
    Stack,
    Columns,
  } = K

  const foot = (
    <OnePagerFooter
      name="Anoop Jawahar"
      credential="Founder · Ex-CTO Sundial · 8 yrs Nutanix"
      right="synos.in · linkedin.com/in/anoopjawahar"
    />
  )

  /* A label / value row. The source's `.m-row` — used by both "what it takes" and "how the six
     weeks run", which is why it is one shape here rather than two. */
  const Row = ({ k, children }) => (
    <div className="op-row">
      <span className="op-row-k">{k}</span>
      <span>{children}</span>
    </div>
  )

  return {
    title: c.title,
    pages: [
      <OnePagerPage key="p1" gap="snug">
        <OnePagerHeader
          rule="solid"
          brand={<>Syn<span className="sk-a">OS</span></>}
          tag={c.tag}
          title={<>Company Brain <span className="sk-a">and Agent Platform</span></>}
          lede={c.lede}
          sub={c.sub}
        />

        {/* The stakes paragraph. Carries the page's only inline figures, which the source sets in a
            heavier face — `.op-fig` keeps that, because a number that reads like body text stops
            being the thing the sentence is about. */}
        {/* Red, not neutral: this paragraph is the threat the whole page answers, and the source
            rules it in red for that reason. A neutral tint makes it read as context. */}
        <Callout scale="print" tone="red">
          {c.stakes}
        </Callout>

        <div>
          <SectionHeading title={c.outcomesTitle} sub={c.outcomesSub} />
          <div className="op-two">
            {c.outcomes.map((o) => (
              <OutcomeCard key={o.title} title={o.title} body={o.body} />
            ))}
          </div>
        </div>

        <div>
          <SectionHeading title={c.layersTitle} sub={c.layersSub} />
          <Stack gap="snug">
            {c.layers.map((l) => (
              <Callout key={l.kicker} scale="print" tone={l.tone} label={l.kicker}>
                <b className="op-lay-h">{l.title}</b>
                {l.body}
              </Callout>
            ))}
            <Caption>{c.layersJoint}</Caption>
          </Stack>
        </div>

        <div>
          <SectionHeading title={c.actsTitle} sub={c.actsSub} />
          <StepGrid columns={2}>
            {c.steps.map((s, i) => (
              <StepCard
                key={s.title}
                scale="print"
                num={String(i + 1)}
                title={s.title}
                body={s.body}
              />
            ))}
          </StepGrid>
        </div>

        <div>
          <SectionHeading title={c.objectionsTitle} sub={c.objectionsSub} />
          <div className="op-three">
            {c.objections.map((o) => (
              <OutcomeCard key={o.q} tone="amber" title={o.q} body={o.a} />
            ))}
          </div>
        </div>

        {/* Optional: the retail page has no "and it stays yours" line — its close is the proof
            block on page two. A slot that is absent on one of the two pages the template exists for
            is a slot that has to be optional, not one to invent copy for. */}
        {c.ownLine ? (
          <Callout scale="print" tone="emerald">
            {c.ownLine}
          </Callout>
        ) : null}

        <CtaBar tone="indigo" title={c.ctaTitle} body={c.ctaBody} />

        {foot}
      </OnePagerPage>,

      <OnePagerPage key="p2" gap="snug">
        <OnePagerHeader
          rule="solid"
          brand={<>Syn<span className="sk-a">OS</span></>}
          tag="The brain, the agents, and how it starts"
        />

        <div>
          <SectionHeading title={c.brainTitle} sub={c.brainSub} />
          <div className="op-two">
            {c.brain.map((b) => (
              <OutcomeCard key={b.title} tone="indigo" title={b.title} body={b.body} />
            ))}
          </div>
        </div>

        <div>
          <SectionHeading title={c.asksTitle} sub={c.asksSub} />
          {/* The questions are quoted verbatim and each one is the whole point of its own line, so
              they are a stack of quote rows rather than cards — a card would put a heading above a
              sentence that is already a heading. */}
          <Stack gap="tight">
            {c.asks.map((q) => (
              <div className="op-ask" key={q}>
                {q}
              </div>
            ))}
          </Stack>
        </div>

        <div>
          <SectionHeading title={c.agentsTitle} sub={c.agentsSub} />
          <div className="op-three">
            {c.agents.map((a) => (
              <OutcomeCard key={a.title} tone="violet" title={a.title} body={a.body} />
            ))}
          </div>
        </div>

        <Callout scale="print" tone="violet" label={c.plugTitle}>
          {c.plugBody}
          <ChipRow tight className="op-plug-chips">
            <Chip size="sm" mono tone="violet">NOTHING MOVES</Chip>
            {c.plugChips.map((p) => (
              <Chip key={p} size="sm">{p}</Chip>
            ))}
          </ChipRow>
        </Callout>

        <div>
          <SectionHeading title={c.moneyTitle} />
          <Columns gap="snug">
            <Callout scale="print" tone="neutral" label="What it takes from your side">
              <Row k="You provide">{c.provide}</Row>
              <Row k="You do not">{c.doNot}</Row>
              <Row k="Where it runs">{c.whereItRuns}</Row>
            </Callout>
            <Callout scale="print" tone="indigo" label="How the six weeks run">
              <Row k="Weeks 1 to 2">{c.weeks12}</Row>
              <Row k="Weeks 3 to 5">
                The agent goes live proposing rather than acting, so you see exactly what it would do
                before it does anything.
              </Row>
              <Row k="Week 6">
                We measure the outcome on your own reporting, and you decide whether it continues.
              </Row>
            </Callout>
          </Columns>
        </div>

        {/* The proof block names real customers. It is the most load-bearing paragraph on either
            page for this reader and is carried whole. */}
        <Callout scale="print" tone="emerald" label="Where this already runs">
          {c.proof}
        </Callout>

        <CtaBar
          tone="indigo"
          title={<>The first conversation is <span className="sk-a">one question.</span></>}
          body={c.closingAsk}
        />

        {foot}
      </OnePagerPage>,
    ],
  }
}
