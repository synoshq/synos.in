// onepager/src/_cto-template.jsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var ctoOnePager = (K, c) => {
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
    Columns
  } = K;
  const foot = /* @__PURE__ */ jsx(
    OnePagerFooter,
    {
      name: "Anoop Jawahar",
      credential: "Founder \xB7 Ex-CTO Sundial \xB7 8 yrs Nutanix",
      right: "synos.in \xB7 linkedin.com/in/anoopjawahar"
    }
  );
  const Row = ({ k, children }) => /* @__PURE__ */ jsxs("div", { className: "op-row", children: [
    /* @__PURE__ */ jsx("span", { className: "op-row-k", children: k }),
    /* @__PURE__ */ jsx("span", { children })
  ] });
  return {
    title: c.title,
    pages: [
      /* @__PURE__ */ jsxs(OnePagerPage, { gap: "tight", className: "op-dense", children: [
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
        /* @__PURE__ */ jsx(Callout, { scale: "print", tone: "red", children: c.stakes }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(SectionHeading, { title: c.outcomesTitle, sub: c.outcomesSub }),
          /* @__PURE__ */ jsx("div", { className: "op-two", children: c.outcomes.map((o) => /* @__PURE__ */ jsx(OutcomeCard, { title: o.title, body: o.body }, o.title)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(SectionHeading, { title: c.layersTitle, sub: c.layersSub }),
          /* @__PURE__ */ jsxs(Stack, { gap: "snug", children: [
            c.layers.map((l) => /* @__PURE__ */ jsxs(Callout, { scale: "print", tone: l.tone, label: l.kicker, children: [
              /* @__PURE__ */ jsx("b", { className: "op-lay-h", children: l.title }),
              l.body
            ] }, l.kicker)),
            /* @__PURE__ */ jsx(Caption, { children: c.layersJoint })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(SectionHeading, { title: c.actsTitle, sub: c.actsSub }),
          /* @__PURE__ */ jsx(StepGrid, { columns: 2, children: c.steps.map((s, i) => /* @__PURE__ */ jsx(
            StepCard,
            {
              scale: "print",
              num: String(i + 1),
              title: s.title,
              body: s.body
            },
            s.title
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(SectionHeading, { title: c.objectionsTitle, sub: c.objectionsSub }),
          /* @__PURE__ */ jsx("div", { className: "op-three", children: c.objections.map((o) => /* @__PURE__ */ jsx(OutcomeCard, { tone: "amber", title: o.q, body: o.a }, o.q)) })
        ] }),
        c.ownLine ? /* @__PURE__ */ jsx(Callout, { scale: "print", tone: "emerald", children: c.ownLine }) : null,
        /* @__PURE__ */ jsx(CtaBar, { tone: "indigo", title: c.ctaTitle, body: c.ctaBody }),
        foot
      ] }, "p1"),
      /* @__PURE__ */ jsxs(OnePagerPage, { gap: "tight", className: "op-dense", children: [
        /* @__PURE__ */ jsx(
          OnePagerHeader,
          {
            rule: "solid",
            brand: /* @__PURE__ */ jsxs(Fragment, { children: [
              "Syn",
              /* @__PURE__ */ jsx("span", { className: "sk-a", children: "OS" })
            ] }),
            tag: "The brain, the agents, and how it starts"
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(SectionHeading, { title: c.brainTitle, sub: c.brainSub }),
          /* @__PURE__ */ jsx("div", { className: "op-two", children: c.brain.map((b) => /* @__PURE__ */ jsx(OutcomeCard, { tone: "indigo", title: b.title, body: b.body }, b.title)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(SectionHeading, { title: c.asksTitle, sub: c.asksSub }),
          /* @__PURE__ */ jsx(Stack, { gap: "tight", children: c.asks.map((q) => /* @__PURE__ */ jsx("div", { className: "op-ask", children: q }, q)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(SectionHeading, { title: c.agentsTitle, sub: c.agentsSub }),
          /* @__PURE__ */ jsx("div", { className: "op-three", children: c.agents.map((a) => /* @__PURE__ */ jsx(OutcomeCard, { tone: "violet", title: a.title, body: a.body }, a.title)) })
        ] }),
        /* @__PURE__ */ jsxs(Callout, { scale: "print", tone: "violet", label: c.plugTitle, children: [
          c.plugBody,
          /* @__PURE__ */ jsxs(ChipRow, { tight: true, className: "op-plug-chips", children: [
            /* @__PURE__ */ jsx(Chip, { size: "sm", mono: true, tone: "violet", children: "NOTHING MOVES" }),
            c.plugChips.map((p) => /* @__PURE__ */ jsx(Chip, { size: "sm", children: p }, p))
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(SectionHeading, { title: c.moneyTitle }),
          /* @__PURE__ */ jsxs(Columns, { gap: "snug", children: [
            /* @__PURE__ */ jsxs(Callout, { scale: "print", tone: "neutral", label: "What it takes from your side", children: [
              /* @__PURE__ */ jsx(Row, { k: "You provide", children: c.provide }),
              /* @__PURE__ */ jsx(Row, { k: "You do not", children: c.doNot }),
              /* @__PURE__ */ jsx(Row, { k: "Where it runs", children: c.whereItRuns })
            ] }),
            /* @__PURE__ */ jsxs(Callout, { scale: "print", tone: "indigo", label: "How the six weeks run", children: [
              /* @__PURE__ */ jsx(Row, { k: "Weeks 1 to 2", children: c.weeks12 }),
              /* @__PURE__ */ jsx(Row, { k: "Weeks 3 to 5", children: "The agent goes live proposing rather than acting, so you see exactly what it would do before it does anything." }),
              /* @__PURE__ */ jsx(Row, { k: "Week 6", children: "We measure the outcome on your own reporting, and you decide whether it continues." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Callout, { scale: "print", tone: "emerald", label: "Where this already runs", children: c.proof }),
        /* @__PURE__ */ jsx(
          CtaBar,
          {
            tone: "indigo",
            title: /* @__PURE__ */ jsxs(Fragment, { children: [
              "The first conversation is ",
              /* @__PURE__ */ jsx("span", { className: "sk-a", children: "one question." })
            ] }),
            body: c.closingAsk
          }
        ),
        foot
      ] }, "p2")
    ]
  };
};

// onepager/src/retail-multistore-cto.jsx
import { Fragment as Fragment2, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var onePager = (K) => ctoOnePager(K, {
  title: "SynOS for Multi-store Retail Groups \u2014 technical brief",
  tag: "For multi-store retail groups",
  lede: /* @__PURE__ */ jsxs2(Fragment2, { children: [
    "You already have the reports. ",
    /* @__PURE__ */ jsx2("span", { className: "sk-a", children: "Nothing happens because of them." })
  ] }),
  sub: /* @__PURE__ */ jsxs2(Fragment2, { children: [
    "Someone still has to read them and then make sure something actually happens, store by store, day after day. And a question that falls outside what your systems were built to answer costs two weeks of somebody\u2019s time, so it never gets asked at all. SynOS gives your business",
    " ",
    /* @__PURE__ */ jsx2("b", { children: "a Company Brain that understands how you operate" }),
    ", and",
    " ",
    /* @__PURE__ */ jsx2("b", { children: "agents that act on what it finds" }),
    "."
  ] }),
  stakes: /* @__PURE__ */ jsx2(Fragment2, { children: /* @__PURE__ */ jsxs2("b", { children: [
    "This is where the margin goes. Four in five retailers lose",
    " ",
    /* @__PURE__ */ jsx2("span", { className: "op-fig", children: "5%+ of operating margin" }),
    " to problems that were visible and never acted on. The stock transfer nobody raised. The ageing units nobody moved. On a business running ",
    /* @__PURE__ */ jsx2("span", { className: "op-fig", children: "4 to 8% net margin" }),
    ", that is most of the profit, and more dashboards have not fixed it. The information was already there."
  ] }) }),
  outcomesTitle: /* @__PURE__ */ jsxs2(Fragment2, { children: [
    "What changes, ",
    /* @__PURE__ */ jsx2("span", { className: "sk-a", children: "in your P&L" })
  ] }),
  outcomesSub: /* @__PURE__ */ jsxs2(Fragment2, { children: [
    "The pilot moves ",
    /* @__PURE__ */ jsx2("b", { children: "one of these, chosen by you, measured on your own reporting" }),
    ". Not all four at once."
  ] }),
  outcomes: [
    { title: "Attach rate goes up", body: "Accessories, care plans and finance carry roughly double the margin of the box itself. On thin net margins, a small shift in mix pays for the year." },
    { title: "Less capital sitting still", body: "Ageing stock gets moved, bundled or marked down while it still has margin left in it, rather than after it has gone." },
    { title: "Upgrades stop being missed", body: "Every customer due a replacement gets reached, with the right offer at the right moment, before they walk into somebody else's store." },
    { title: "Store quality stops depending on who is on shift", body: "New staff sell the way your best staff sell, in their own language, from their first week rather than their sixth month." }
  ],
  layersTitle: /* @__PURE__ */ jsxs2(Fragment2, { children: [
    "What you are actually getting: ",
    /* @__PURE__ */ jsx2("span", { className: "sk-a", children: "a Company Brain, and agents that act on it" })
  ] }),
  layersSub: "Two layers. The brain understands your business. The agents do something about what it sees.",
  layers: [
    {
      kicker: "Layer 1 \xB7 the infrastructure",
      tone: "indigo",
      title: "A Company Brain",
      body: /* @__PURE__ */ jsxs2(Fragment2, { children: [
        " ",
        "One place that understands your whole business: every store, every brand, and the language your business actually uses for things. It reads the systems you already run and works out where the truth for each thing lives. ",
        /* @__PURE__ */ jsx2("b", { children: "Nothing gets moved or migrated." })
      ] })
    },
    {
      kicker: "Layer 2 \xB7 the work",
      tone: "violet",
      title: "Agents that act",
      body: /* @__PURE__ */ jsxs2(Fragment2, { children: [
        " ",
        "On top of that brain, agents that watch for what matters, work out why it is happening, do something about it, and check whether it worked.",
        " ",
        /* @__PURE__ */ jsx2("b", { children: "Each one is built around a problem you actually have, rather than picked off a shelf." }),
        " ",
        "You start with one and add more as they earn your trust."
      ] })
    }
  ],
  layersJoint: /* @__PURE__ */ jsxs2(Fragment2, { children: [
    "Because every agent shares the same brain, ",
    /* @__PURE__ */ jsx2("b", { children: "the second one starts where the first finished" }),
    ". The first agent takes six weeks because the brain gets built alongside it. The ones after that take days. And you are not buying six separate tools, each needing its own integration and its own explanation of how your business works."
  ] }),
  actsTitle: /* @__PURE__ */ jsxs2(Fragment2, { children: [
    "What ",
    /* @__PURE__ */ jsx2("span", { className: "sk-a", children: "\u201Cacts\u201D means: one agent, start to finish" })
  ] }),
  actsSub: "Attach rate. Runs every week, in every store, with nobody launching it.",
  steps: [
    { title: "Notices", body: /* @__PURE__ */ jsxs2(Fragment2, { children: [
      "One store\u2019s accessory and care plan attach has slipped ",
      /* @__PURE__ */ jsx2("b", { children: "below its own past three months" }),
      ", and below comparable stores."
    ] }) },
    { title: "Works out why", body: /* @__PURE__ */ jsxs2(Fragment2, { children: [
      "Footfall is normal and stock is fine. It is ",
      /* @__PURE__ */ jsx2("b", { children: "two people who joined six weeks ago" }),
      ", working the same shifts and missing the same attachments."
    ] }) },
    { title: "Does something", body: /* @__PURE__ */ jsxs2(Fragment2, { children: [
      "Sends those two a short brief ",
      /* @__PURE__ */ jsx2("b", { children: "on their phone, in their language" }),
      ": the exact products to offer with this month\u2019s mix, and what to say."
    ] }) },
    { title: "Checks it worked", body: /* @__PURE__ */ jsxs2(Fragment2, { children: [
      "Re-measures next week. If it moved, it moves on. ",
      /* @__PURE__ */ jsx2("b", { children: "If it did not, it escalates to the manager" }),
      " with what it already tried."
    ] }) }
  ],
  objectionsTitle: /* @__PURE__ */ jsxs2(Fragment2, { children: [
    "Why this is not something ",
    /* @__PURE__ */ jsx2("span", { className: "sk-a", children: "you already have" })
  ] }),
  objectionsSub: "Three fair objections, answered directly.",
  objections: [
    { q: "\u201COur ERP already does reorder points and transfers.\u201D", a: /* @__PURE__ */ jsxs2(Fragment2, { children: [
      "It does, and you should keep it. That is a threshold on one system, and a person still has to raise the indent and chase it. ",
      /* @__PURE__ */ jsx2("b", { children: "This works across billing, service, rosters and finance at the same time, and it does the chasing." })
    ] }) },
    { q: "\u201CWe have dashboards and reports already.\u201D", a: /* @__PURE__ */ jsxs2(Fragment2, { children: [
      "Everyone does, and that is the point. ",
      /* @__PURE__ */ jsx2("b", { children: "Four in five retailers still lose margin to things the dashboard already showed them." }),
      " Reports do not act. Nobody has spare hours to read one per store per day."
    ] }) },
    { q: "\u201CWe could just hire two more analysts.\u201D", a: /* @__PURE__ */ jsxs2(Fragment2, { children: [
      "Two analysts can tell you what happened last month. ",
      /* @__PURE__ */ jsx2("b", { children: "They cannot tell the person at the counter what to say right now" }),
      ", in their language, in every store, every day. And each new question is another week of their time."
    ] }) }
  ],
  ctaTitle: /* @__PURE__ */ jsxs2(Fragment2, { children: [
    "Pick one number you want moved. ",
    /* @__PURE__ */ jsx2("span", { className: "sk-a", children: "Six weeks." })
  ] }),
  ctaBody: "We agree what success looks like before we start, and measure it against your own reporting rather than ours. You keep everything built, whether or not you continue.",
  brainTitle: /* @__PURE__ */ jsxs2(Fragment2, { children: [
    "The Company Brain: ",
    /* @__PURE__ */ jsx2("span", { className: "sk-a", children: "how it knows your business" })
  ] }),
  brainSub: "This is the part that takes six months and a specialist team to build in house, and it is what the agents run on.",
  brain: [
    { title: "It reads your systems directly", body: /* @__PURE__ */ jsxs2(Fragment2, { children: [
      "Billing, stock, service centres, rosters, loyalty, finance partners. It learns where the truth for each thing lives and goes there when asked. ",
      /* @__PURE__ */ jsx2("b", { children: "No warehouse project, no cleanup exercise, nothing copied out." })
    ] }) },
    { title: "It learns how you talk", body: /* @__PURE__ */ jsxs2(Fragment2, { children: [
      "Your brands, your store codes, your categories, the names your business actually uses for things. So a question asked in plain English ",
      /* @__PURE__ */ jsx2("b", { children: "lands on the right data and comes back right" }),
      "."
    ] }) },
    { title: "It stays current on its own", body: /* @__PURE__ */ jsxs2(Fragment2, { children: [
      "A new store, a new brand, a changed system: it picks that up and carries on, ",
      /* @__PURE__ */ jsx2("b", { children: "instead of decaying into something that needs rebuilding next year" }),
      "."
    ] }) },
    { title: "It keeps what your people know", body: /* @__PURE__ */ jsxs2(Fragment2, { children: [
      "The rules, exceptions and judgement calls that live in your best managers\u2019 heads get captured once and stay in the business, ",
      /* @__PURE__ */ jsx2("b", { children: "including after those people leave" }),
      "."
    ] }) }
  ],
  asksTitle: /* @__PURE__ */ jsxs2(Fragment2, { children: [
    "Things you can just ask it, ",
    /* @__PURE__ */ jsx2("span", { className: "sk-a", children: "in plain English" })
  ] }),
  asksSub: "Not a fixed set of reports. Any question about your business, answered in minutes rather than as a two week project. These each need three or four of your systems at once, which is why nobody asks them today.",
  asks: [
    "\u201CWhich customers who bought two years ago have not been back, and what is the right offer for each of them?\u201D",
    "\u201CWhy did attach rate drop in Kochi last month, and is it the same reason as Coimbatore?\u201D",
    "\u201CWhich stores run out of what before the weekend, and who nearby is holding spare?\u201D",
    "\u201CWhat is sitting in stock past ninety days that we could still move at full margin?\u201D",
    "\u201CWhich of my new joiners are behind, and on which products specifically?\u201D",
    "\u201CIf we run an exchange offer next month, which stores and which customers should we aim it at?\u201D"
  ],
  agentsTitle: "Agents you can run on it",
  agentsSub: "These fit most retail groups. If the problem you care about is not on this list, that is fine. The agents get built on the brain, so they follow your business rather than a product roadmap.",
  agents: [
    { title: "Attach rate coach", body: /* @__PURE__ */ jsxs2(Fragment2, { children: [
      "Finds where accessories, care plans and finance are being left on the table, works out which person or shift it is, and ",
      /* @__PURE__ */ jsx2("b", { children: "coaches them directly" }),
      ". The example on page one."
    ] }) },
    { title: "Upgrade and exchange", body: /* @__PURE__ */ jsxs2(Fragment2, { children: [
      "Who is due a replacement, from purchase date, ",
      /* @__PURE__ */ jsx2("b", { children: "device age out of your service centres" }),
      ", stock on hand and finance eligibility. Produces the call list, the offer and the script."
    ] }) },
    { title: "Launch allocation", body: /* @__PURE__ */ jsxs2(Fragment2, { children: [
      "Splits launch stock across stores on real demand signal rather than gut feel, then ",
      /* @__PURE__ */ jsx2("b", { children: "rebalances daily" }),
      " through launch week as the actual numbers land."
    ] }) },
    { title: "Ageing stock", body: /* @__PURE__ */ jsxs2(Fragment2, { children: [
      "Flags units past the point where they still earn their margin and proposes ",
      /* @__PURE__ */ jsx2("b", { children: "move it, bundle it, or mark it down" }),
      ", with the rupee impact of each option."
    ] }) },
    { title: "Store manager's morning brief", body: /* @__PURE__ */ jsxs2(Fragment2, { children: [
      "One message per manager: ",
      /* @__PURE__ */ jsx2("b", { children: "the three things that changed in their store" }),
      " overnight, and what to do about each. Not another dashboard nobody opens."
    ] }) },
    { title: "Counter assistant", body: /* @__PURE__ */ jsxs2(Fragment2, { children: [
      "Staff ask anything, from stock to policy to exchange value, and get a real answer ",
      /* @__PURE__ */ jsx2("b", { children: "in their own language" }),
      ", from live data rather than a printed FAQ."
    ] }) }
  ],
  plugTitle: "It reads what you already run",
  plugBody: "No migration, no cleanup project, no replacing anything. Keep every system you have, and anything you buy later reads from the same brain.",
  plugChips: [
    "Your POS and billing",
    "ERP and inventory",
    "Service centre systems",
    "Loyalty and CRM",
    "Staff rosters",
    "Finance and EMI partners"
  ],
  moneyTitle: /* @__PURE__ */ jsxs2(Fragment2, { children: [
    "What it takes from you, ",
    /* @__PURE__ */ jsx2("span", { className: "sk-a", children: "and how the six weeks run" })
  ] }),
  provide: "Read access to the systems you already run, and one person part time as the point of contact.",
  doNot: "Migrate data. Clean data. Hire anyone. Change or replace a single existing system.",
  whereItRuns: "Inside your own environment, if that is what you prefer.",
  weeks12: /* @__PURE__ */ jsxs2(Fragment2, { children: [
    "We connect to the systems you already run and build the brain.",
    " ",
    /* @__PURE__ */ jsx2("b", { children: "First result by the end of week two." })
  ] }),
  proof: /* @__PURE__ */ jsxs2(Fragment2, { children: [
    "The same system is running today inside ",
    /* @__PURE__ */ jsx2("b", { children: "an auto manufacturer" }),
    " (operations and cost agents across their cloud estate), ",
    /* @__PURE__ */ jsx2("b", { children: "a US database company" }),
    ", ",
    /* @__PURE__ */ jsx2("b", { children: "a marketing technology platform" }),
    " ",
    "serving its own clients, and ",
    /* @__PURE__ */ jsx2("b", { children: "a healthtech company" }),
    ", where one team moved onto it in six weeks: a shared source of truth the team works from, a checking agent that posts what needs attention at 6:30 every morning with nobody running it, and an agent that proposes changes on a live account and waits for a person to approve. Anoop\u2019s previous company built systems of this kind for ",
    /* @__PURE__ */ jsx2("b", { children: "OpenAI and Character.AI" }),
    "."
  ] }),
  closingAsk: "Tell us something about your business you wanted answered last month and could not get. We will show you the answer, and what the agent would do about it."
});
export {
  onePager
};
