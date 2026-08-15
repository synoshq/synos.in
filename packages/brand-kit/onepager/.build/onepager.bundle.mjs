// onepager/src/_ceo-template.jsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var ceoOnePager = (K, c) => {
  const {
    OnePagerPage,
    OnePagerHeader,
    OnePagerFooter,
    SectionHeading,
    OutcomeCard,
    CtaBar,
    Callout,
    PhaseCard,
    PhaseRow,
    StepCard,
    StepGrid,
    Stack,
    Columns
  } = K;
  const foot = /* @__PURE__ */ jsx(
    OnePagerFooter,
    {
      name: "Anoop Jawahar",
      credential: "Founder \xB7 Ex-CTO Sundial \xB7 8 yrs Nutanix",
      right: "synos.in"
    }
  );
  return {
    title: c.title,
    pages: [
      /* @__PURE__ */ jsxs(OnePagerPage, { gap: "loose", children: [
        /* @__PURE__ */ jsx(
          OnePagerHeader,
          {
            rule: "solid",
            brand: /* @__PURE__ */ jsxs(Fragment, { children: [
              "Syn",
              /* @__PURE__ */ jsx("span", { className: "sk-a", children: "OS" })
            ] }),
            tag: c.tag,
            title: /* @__PURE__ */ jsxs(Fragment, { children: [
              "Company Brain ",
              /* @__PURE__ */ jsx("span", { className: "sk-a", children: "and Agent Platform" })
            ] }),
            lede: c.lede,
            sub: c.sub
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "op-diagram", children: [
          /* @__PURE__ */ jsxs(Columns, { gap: "snug", children: [
            /* @__PURE__ */ jsxs("div", { className: "op-side", children: [
              /* @__PURE__ */ jsx("div", { className: "op-side-label op-side-label--now", children: "Today" }),
              /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: c.svgToday } })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "op-side", children: [
              /* @__PURE__ */ jsx("div", { className: "op-side-label op-side-label--new", children: "With SynOS" }),
              /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: c.svgSynos } })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "op-diagram-cap", children: [
            "Same systems on both sides. ",
            /* @__PURE__ */ jsx("b", { children: "Nothing gets moved or migrated." }),
            " ",
            c.diagramCap
          ] })
        ] }),
        /* @__PURE__ */ jsx(Stack, { gap: "snug", children: c.outcomes.map((o) => /* @__PURE__ */ jsx(OutcomeCard, { title: o.title, body: o.body }, o.title)) }),
        /* @__PURE__ */ jsx(Callout, { scale: "print", tone: "violet", label: "What it takes from you", children: c.whatItTakes }),
        foot
      ] }, "p1"),
      /* @__PURE__ */ jsxs(OnePagerPage, { gap: "loose", children: [
        /* @__PURE__ */ jsx(
          OnePagerHeader,
          {
            rule: "solid",
            brand: /* @__PURE__ */ jsxs(Fragment, { children: [
              "Syn",
              /* @__PURE__ */ jsx("span", { className: "sk-a", children: "OS" })
            ] }),
            tag: "How it works in practice"
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            SectionHeading,
            {
              title: /* @__PURE__ */ jsxs(Fragment, { children: [
                "One of them, ",
                /* @__PURE__ */ jsx("span", { className: "sk-a", children: "start to finish" })
              ] }),
              sub: c.walkthroughSub
            }
          ),
          /* @__PURE__ */ jsx(StepGrid, { columns: 2, children: c.steps.map((s, i) => /* @__PURE__ */ jsx(StepCard, { scale: "print", num: String(i + 1), title: s.title, body: s.body }, s.title)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            SectionHeading,
            {
              title: /* @__PURE__ */ jsxs(Fragment, { children: [
                "The same thing, ",
                /* @__PURE__ */ jsx("span", { className: "sk-a", children: "for other problems" })
              ] }),
              sub: c.adjacentSub
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "op-three", children: c.adjacent.map((a) => /* @__PURE__ */ jsx(OutcomeCard, { tone: "violet", title: a.title, body: a.body }, a.title)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(SectionHeading, { title: "How the six weeks run" }),
          /* @__PURE__ */ jsxs(PhaseRow, { children: [
            /* @__PURE__ */ jsx(
              PhaseCard,
              {
                scale: "print",
                when: "Weeks 1 to 2",
                body: /* @__PURE__ */ jsxs(Fragment, { children: [
                  c.weeks12,
                  " ",
                  /* @__PURE__ */ jsx("b", { children: "First result by the end of week two." })
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              PhaseCard,
              {
                scale: "print",
                position: "bridge",
                when: "Weeks 3 to 5",
                body: /* @__PURE__ */ jsxs(Fragment, { children: [
                  "The agent goes live proposing rather than acting, so you see what it would do",
                  " ",
                  /* @__PURE__ */ jsx("b", { children: "before it does anything" }),
                  "."
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              PhaseCard,
              {
                scale: "print",
                position: "far",
                when: "Week 6",
                body: /* @__PURE__ */ jsxs(Fragment, { children: [
                  "We measure the outcome ",
                  /* @__PURE__ */ jsx("b", { children: "on your own reporting" }),
                  ", and you decide whether it continues."
                ] })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Callout, { scale: "print", tone: "emerald", children: [
          /* @__PURE__ */ jsx("b", { children: "And it stays yours." }),
          " Everything your team teaches the system stays with you, and over time it becomes AI of your own, trained on how your business works."
        ] }),
        /* @__PURE__ */ jsx(
          CtaBar,
          {
            tone: "indigo",
            title: /* @__PURE__ */ jsxs(Fragment, { children: [
              "The first conversation is ",
              /* @__PURE__ */ jsx("span", { className: "sk-a", children: "one question." })
            ] }),
            body: c.cta
          }
        ),
        foot
      ] }, "p2")
    ]
  };
};

// onepager/src/financial-inclusion-ceo-svgs.js
var SVG_TODAY = '<svg viewBox="0 0 300 250" width="100%" style="max-height:80mm">\n          <defs>\n            <marker id="ag" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">\n              <path d="M0,0 L6,3 L0,6 z" fill="#94a3b8"/>\n            </marker>\n          </defs>\n          <g font-family="Inter" font-size="9" font-weight="600" fill="#64748b" text-anchor="middle">\n            <rect x="2"   y="4" width="64" height="26" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/><text x="34"  y="21">Transactions</text>\n            <rect x="71"  y="4" width="58" height="26" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/><text x="100" y="21">Settlement</text>\n            <rect x="134" y="4" width="46" height="26" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/><text x="157" y="21">Support</text>\n            <rect x="185" y="4" width="64" height="26" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/><text x="217" y="21">Distributors</text>\n            <rect x="254" y="4" width="44" height="26" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/><text x="276" y="21">Banks</text>\n          </g>\n          <g stroke="#cbd5e1" stroke-width="1.4" fill="none" marker-end="url(#ag)">\n            <path d="M34,32  C34,60 130,58 146,84"/>\n            <path d="M100,32 C100,58 138,62 146,84"/>\n            <path d="M157,32 L152,82"/>\n            <path d="M217,32 C217,58 166,62 156,84"/>\n            <path d="M276,32 C276,60 172,58 156,84"/>\n          </g>\n          <circle cx="150" cy="105" r="19" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.4"/>\n          <circle cx="150" cy="100" r="6" fill="#94a3b8"/>\n          <path d="M138,116 C140,106 160,106 162,116 z" fill="#94a3b8"/>\n          <text x="150" y="143" font-family="Inter" font-size="11" font-weight="600" fill="#64748b" text-anchor="middle">One person, pulling it</text>\n          <text x="150" y="156" font-family="Inter" font-size="11" font-weight="600" fill="#64748b" text-anchor="middle">together by hand</text>\n          <path d="M150,163 L150,177" stroke="#cbd5e1" stroke-width="1.4" marker-end="url(#ag)"/>\n          <rect x="107" y="181" width="86" height="28" rx="6" fill="#ffffff" stroke="#cbd5e1"/>\n          <text x="150" y="199" font-family="Inter" font-size="11" font-weight="600" fill="#64748b" text-anchor="middle">A report</text>\n          <path d="M150,211 L150,226" stroke="#cbd5e1" stroke-width="1.4" stroke-dasharray="3 3"/>\n          <text x="150" y="240" font-family="Inter" font-size="11" font-style="italic" fill="#94a3b8" text-anchor="middle">and there it stops</text>\n        </svg>';
var SVG_SYNOS = '<svg viewBox="0 0 300 250" width="100%" style="max-height:80mm">\n          <defs>\n            <marker id="ai" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">\n              <path d="M0,0 L6,3 L0,6 z" fill="#6366f1"/>\n            </marker>\n            <marker id="ae" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">\n              <path d="M0,0 L6,3 L0,6 z" fill="#10b981"/>\n            </marker>\n          </defs>\n          <g font-family="Inter" font-size="9" font-weight="600" fill="#64748b" text-anchor="middle">\n            <rect x="2"   y="4" width="64" height="26" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/><text x="34"  y="21">Transactions</text>\n            <rect x="71"  y="4" width="58" height="26" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/><text x="100" y="21">Settlement</text>\n            <rect x="134" y="4" width="46" height="26" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/><text x="157" y="21">Support</text>\n            <rect x="185" y="4" width="64" height="26" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/><text x="217" y="21">Distributors</text>\n            <rect x="254" y="4" width="44" height="26" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/><text x="276" y="21">Banks</text>\n          </g>\n          <g stroke="#c7d2fe" stroke-width="1.4" fill="none" marker-end="url(#ai)">\n            <path d="M34,32 L34,58"/><path d="M100,32 L100,58"/><path d="M157,32 L157,58"/>\n            <path d="M217,32 L217,58"/><path d="M276,32 L276,58"/>\n          </g>\n          <rect x="2" y="63" width="296" height="34" rx="9" fill="#eef2ff" stroke="#6366f1" stroke-width="1.6"/>\n          <text x="150" y="79" font-family="Plus Jakarta Sans" font-size="13" font-weight="800" fill="#0f172a" text-anchor="middle">Company Brain</text>\n          <text x="150" y="91" font-family="Inter" font-size="9.5" fill="#4338ca" text-anchor="middle">understands the whole network together</text>\n\n          <g stroke="#6366f1" stroke-width="1.4" fill="none" marker-end="url(#ai)">\n            <path d="M62,100 L62,116"/><path d="M150,100 L150,116"/><path d="M238,100 L238,116"/>\n          </g>\n          <g font-family="Inter" font-size="9.5" font-weight="600" fill="#4338ca" text-anchor="middle">\n            <rect x="18"  y="120" width="88" height="30" rx="15" fill="#f5f3ff" stroke="#7c3aed"/>\n            <text x="62"  y="132">Watches</text><text x="62" y="144">and decides</text>\n            <rect x="106" y="120" width="88" height="30" rx="15" fill="#f5f3ff" stroke="#7c3aed"/>\n            <text x="150" y="132">Then does</text><text x="150" y="144">something</text>\n            <rect x="194" y="120" width="88" height="30" rx="15" fill="#f5f3ff" stroke="#7c3aed"/>\n            <text x="238" y="132">Checks it</text><text x="238" y="144">worked</text>\n          </g>\n\n          <g stroke="#10b981" stroke-width="1.6" fill="none" marker-end="url(#ae)">\n            <path d="M62,154 L62,178"/><path d="M150,154 L150,178"/><path d="M238,154 L238,178"/>\n          </g>\n          <g font-family="Inter" font-size="10.5" font-weight="600" fill="#047857" text-anchor="middle">\n            <rect x="14"  y="182" width="96" height="28" rx="6" fill="#ecfdf5" stroke="#6ee7b7"/><text x="62"  y="200">An outlet</text>\n            <rect x="112" y="182" width="76" height="28" rx="6" fill="#ecfdf5" stroke="#6ee7b7"/><text x="150" y="200">Field team</text>\n            <rect x="190" y="182" width="96" height="28" rx="6" fill="#ecfdf5" stroke="#6ee7b7"/><text x="238" y="200">A distributor</text>\n          </g>\n          <text x="150" y="230" font-family="Inter" font-size="11" font-weight="600" fill="#047857" text-anchor="middle">and something actually changes</text>\n        </svg>';

// onepager/src/financial-inclusion-ceo.jsx
import { Fragment as Fragment2, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var onePager = (K) => ceoOnePager(K, {
  title: "SynOS for Distributed Financial Services Networks",
  tag: "For distributed financial networks",
  lede: "Your network runs beautifully. Nobody can ask it anything.",
  sub: /* @__PURE__ */ jsxs2(Fragment2, { children: [
    "Your platform moves the money and settles it. But every question worth asking needs four systems at once, so it becomes a week of somebody\u2019s time. SynOS gives you",
    " ",
    /* @__PURE__ */ jsx2("b", { children: "one brain that understands how the network behaves" }),
    ", and",
    " ",
    /* @__PURE__ */ jsx2("b", { children: "agents that act on what it finds" }),
    "."
  ] }),
  svgToday: SVG_TODAY,
  svgSynos: SVG_SYNOS,
  diagramCap: /* @__PURE__ */ jsx2(Fragment2, { children: "It reads what your team already built." }),
  outcomes: [
    {
      title: "Fewer outlets go dormant",
      body: "Decline gets caught while it is still reversible, and something happens that same week rather than surfacing in the next quarterly review."
    },
    {
      title: "Lending losses drop",
      body: "Credit decisions see behaviour, seasonality and support history, not just three months of transaction volume on its own."
    },
    {
      title: "More products per outlet",
      body: "The right outlet gets offered the right next product at the point it is ready, instead of a blanket push down the whole channel."
    }
  ],
  whatItTakes: /* @__PURE__ */ jsxs2(Fragment2, { children: [
    "Read access to the systems your team already runs, and one engineer part time as the point of contact. ",
    /* @__PURE__ */ jsx2("b", { children: "Nothing to migrate, no re-platforming, nobody to hire." }),
    " Runs inside your own environment."
  ] }),
  walkthroughSub: "Outlet retention. Runs every week, across the whole network, with nobody launching it.",
  steps: [
    {
      title: "It notices",
      body: /* @__PURE__ */ jsxs2(Fragment2, { children: [
        "An outlet\u2019s volumes are down three weeks running, ",
        /* @__PURE__ */ jsx2("b", { children: "against its own seasonality" }),
        " ",
        "rather than a flat threshold."
      ] })
    },
    {
      title: "It works out why",
      body: /* @__PURE__ */ jsxs2(Fragment2, { children: [
        "Seasonality and district both check out. It is",
        " ",
        /* @__PURE__ */ jsx2("b", { children: "two failed settlements and an unresolved ticket" }),
        ", and a competitor is courting them."
      ] })
    },
    {
      title: "It does something",
      body: /* @__PURE__ */ jsxs2(Fragment2, { children: [
        "Clears the settlement, alerts the distributor with ",
        /* @__PURE__ */ jsx2("b", { children: "the reason and what to say" }),
        ", and holds the credit line rather than cutting it on falling volume."
      ] })
    },
    {
      title: "It checks it worked",
      body: /* @__PURE__ */ jsxs2(Fragment2, { children: [
        "Re-measures the following week. Recovered outlets close out.",
        " ",
        /* @__PURE__ */ jsx2("b", { children: "The ones that do not, escalate" }),
        " with the full history attached."
      ] })
    }
  ],
  adjacentSub: "You start with one. Each one after that is faster, because the brain is already there. It also sits under whatever your own team builds next.",
  adjacent: [
    {
      title: "Credit lines",
      body: "Which outlets can safely take a bigger limit, underwritten on behaviour rather than volume alone."
    },
    {
      title: "Failure clusters",
      body: "Where transaction failures are clustering, and whether it is a bank, a device or a district."
    },
    {
      title: "Distributors",
      body: "Who is genuinely growing their network once you adjust for the territory they were given."
    }
  ],
  weeks12: /* @__PURE__ */ jsx2(Fragment2, { children: "We connect to the systems your team already runs and build the brain." }),
  cta: "Tell us something about the network you wanted answered last month and could not get. We will come with the answer, and with what the agent would do about it."
});
export {
  onePager
};
