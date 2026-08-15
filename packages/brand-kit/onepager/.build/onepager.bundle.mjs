// onepager/src/ai-enablement.jsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var onePager = (K) => {
  const { OnePagerPage, OnePagerHeader, CtaBar, Callout, Chip, ChipRow, Eyebrow } = K;
  const OUTCOMES = [
    ["Adoption moves past the early adopters", "The laggard 80% get a surface they can actually use, not another training deck."],
    ["Engineering stops being the queue", "Access, deploy and guardrails are set once as rails, not per request."],
    ["Wins stop dying on a laptop", "One person\u2019s workflow becomes the team\u2019s starting point, versioned and reusable."],
    ["You can finally see the programme", "What\u2019s running, who uses it, what it costs, and what nobody has flagged yet."]
  ];
  const BRAIN = [
    ["Agentic profiling", "Agents read your systems and derive the ontology: entities, metrics, the words your business actually uses."],
    ["Structured + unstructured", "Warehouse and tickets alongside policy docs, decks and threads. One graph."],
    ["Stays live", "Incremental re-profiling catches schema drift and decays what\u2019s stale, so it doesn\u2019t rot."],
    ["Curation loop", "Every correction reviewed, gated and promoted, so knowledge survives turnover."]
  ];
  const RAILS = [
    ["Permission controls", "Scoped, audited access to real systems. Agents act under a person\u2019s identity, never a shared key on a laptop."],
    ["Safe deploy sandboxes", "AST-scanned builds, egress proxy, kill switch, token budgets. Somewhere for non-engineers\u2019 work to actually run."],
    ["Agent-native storage", "Schema-enforced record of what agents produce, instead of output scattering into Sheets and chat."],
    ["Skill marketplace", "Publish, fork, version and reuse across teams. Analytics per skill: runs, cost, where corrections cluster."],
    ["Traces & evals", "Every run traced to source rows. Eval sets you own. Drift flagged before someone notices it downstream."],
    ["Observability", "Usage, cost per run, per-tool-call audit. The answer when finance asks what this returned."]
  ];
  const HARNESSES = ["Claude Code", "Cowork", "Codex", "Cursor", "In-house LangGraph", "Any model, swap by config"];
  return {
    title: "SynOS: AI enablement beyond engineering",
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
            tag: "AI enablement beyond engineering",
            title: /* @__PURE__ */ jsxs(Fragment, { children: [
              "Your engineers are flying. ",
              /* @__PURE__ */ jsx("span", { className: "sk-a", children: "Everyone else is filing tickets." })
            ] }),
            sub: /* @__PURE__ */ jsx(Fragment, { children: "SynOS is the layer that lets non-engineering teams actually use Claude Code, Cowork and Codex on real company systems, with permissions, safe deployment, a shared Company Brain and an audit trail, so the work stops routing through your engineering backlog. Self-hosted, any model, any harness." })
          }
        ),
        /* @__PURE__ */ jsxs(Callout, { scale: "print", tone: "red", children: [
          /* @__PURE__ */ jsx("b", { children: "The adoption number stops moving, and it isn\u2019t a training problem." }),
          " You bought the licences, ran the sessions, named the champions. Engineering compounds; the other eighty percent stall at the same three places. They can\u2019t reach real data, there\u2019s nowhere to put what they built, and the best workflow in the company is trapped on one laptop. No amount of enablement fixes infrastructure."
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(Eyebrow, { scale: "print", children: [
            "What changes ",
            /* @__PURE__ */ jsx("span", { className: "op-hint", children: "\xB7 the numbers you report upward" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "op-four", children: OUTCOMES.map(([n, d]) => /* @__PURE__ */ jsxs("div", { className: "op-tile", children: [
            /* @__PURE__ */ jsx("div", { className: "op-tile-n", children: n }),
            /* @__PURE__ */ jsx("div", { className: "op-tile-d", children: d })
          ] }, n)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Eyebrow, { scale: "print", children: "What your teams ship on it" }),
          /* @__PURE__ */ jsxs("div", { className: "op-three op-three--tight", children: [
            /* @__PURE__ */ jsxs(Callout, { scale: "print", tone: "indigo", accent: "top", fill: "neutral", className: "op-col", children: [
              /* @__PURE__ */ jsx("b", { className: "op-lay-h", children: "Agents that just run" }),
              /* @__PURE__ */ jsx("div", { className: "op-who", children: "Ops \xB7 finance \xB7 support" }),
              /* @__PURE__ */ jsxs("div", { className: "op-tile-d", children: [
                "Scheduled work that needs no one present: exception digests, reconciliations, weekly reports, ",
                /* @__PURE__ */ jsx("b", { children: "proposing first, acting once trusted" }),
                "."
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "op-win", children: [
                /* @__PURE__ */ jsx("b", { children: "Runs at 6:30am" }),
                " without anyone opening a terminal."
              ] })
            ] }),
            /* @__PURE__ */ jsxs(Callout, { scale: "print", tone: "violet", accent: "top", fill: "neutral", className: "op-col", children: [
              /* @__PURE__ */ jsx("b", { className: "op-lay-h", children: "Apps & dashboards" }),
              /* @__PURE__ */ jsx("div", { className: "op-who", children: "Anyone who can describe it" }),
              /* @__PURE__ */ jsxs("div", { className: "op-tile-d", children: [
                "Describe a review queue or a scorecard; it\u2019s generated, scanned, sandboxed and deployed ",
                /* @__PURE__ */ jsx("b", { children: "for the whole team" }),
                ", not a personal script."
              ] }),
              /* @__PURE__ */ jsx("div", { className: "op-win op-win--violet", children: /* @__PURE__ */ jsx("b", { children: "No sprint, no backlog ticket." }) })
            ] }),
            /* @__PURE__ */ jsxs(Callout, { scale: "print", tone: "emerald", accent: "top", fill: "neutral", className: "op-col", children: [
              /* @__PURE__ */ jsx("b", { className: "op-lay-h", children: "Shared skills" }),
              /* @__PURE__ */ jsx("div", { className: "op-who", children: "SMEs across functions" }),
              /* @__PURE__ */ jsxs("div", { className: "op-tile-d", children: [
                "The person who knows the rules writes them in plain English. Versioned, governed,",
                " ",
                /* @__PURE__ */ jsx("b", { children: "forkable by the next team" }),
                "."
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "op-win op-win--emerald", children: [
                /* @__PURE__ */ jsx("b", { children: "Corrections stick" }),
                ", so the same mistake stops recurring."
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Callout, { scale: "print", tone: "indigo", label: "Underneath it all, the Company Brain \xB7 built by agents \xB7 kept live \xB7 answers you can trace", children: /* @__PURE__ */ jsx("div", { className: "op-four", children: BRAIN.map(([n, d]) => /* @__PURE__ */ jsxs("div", { className: "op-brain-f", children: [
          /* @__PURE__ */ jsx("div", { className: "op-brain-n", children: n }),
          /* @__PURE__ */ jsx("div", { className: "op-brain-d", children: d })
        ] }, n)) }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Eyebrow, { scale: "print", children: "The rails engineering sets once" }),
          /* @__PURE__ */ jsx("div", { className: "op-three op-three--tight", children: RAILS.map(([n, d]) => /* @__PURE__ */ jsxs("div", { className: "op-tile op-tile--rule-amber", children: [
            /* @__PURE__ */ jsx("div", { className: "op-tile-n", children: n }),
            /* @__PURE__ */ jsx("div", { className: "op-tile-d", children: d })
          ] }, n)) })
        ] }),
        /* @__PURE__ */ jsxs(Callout, { scale: "print", tone: "emerald", className: "op-harness", children: [
          /* @__PURE__ */ jsxs("div", { className: "op-harness-t", children: [
            /* @__PURE__ */ jsx("b", { className: "op-harness-h", children: "Works with what your people already opened" }),
            "Exposed over MCP, so the same brain, permissions and audit apply no matter which harness a team picks next year."
          ] }),
          /* @__PURE__ */ jsxs(ChipRow, { tight: true, className: "op-harness-c", children: [
            /* @__PURE__ */ jsx(Chip, { scale: "print", tone: "emerald", mono: true, children: "MCP" }),
            HARNESSES.map((h) => /* @__PURE__ */ jsx(Chip, { scale: "print", tone: "emerald", children: h }, h))
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Callout, { scale: "print", tone: "emerald", fill: "neutral", label: "Running today", children: [
          "Inside a healthtech company, marketing operations moved onto this layer in",
          " ",
          /* @__PURE__ */ jsx("b", { children: "six weeks" }),
          ": a shared ledger of ",
          /* @__PURE__ */ jsx("code", { children: "56,000+ rows" }),
          " as the team\u2019s source of truth, a hygiene agent posting findings to Slack at 6:30 every morning with nobody running it, review apps the team uses directly, and an operator agent that proposes changes on a live ad account and waits for a human to approve. The same substrate runs cloud-operations agents at an auto manufacturer and a US database company, and client-facing agents inside a martech platform."
        ] }),
        /* @__PURE__ */ jsxs(ChipRow, { tight: true, children: [
          /* @__PURE__ */ jsx(Chip, { scale: "print", tone: "indigo", mono: true, children: "SELF-HOSTED" }),
          /* @__PURE__ */ jsx(Chip, { scale: "print", children: "Your VPC or on-prem \xB7 air-gap clean" }),
          /* @__PURE__ */ jsx(Chip, { scale: "print", children: "Tenant + project + role on every read and write" }),
          /* @__PURE__ */ jsx(Chip, { scale: "print", children: "Per-tool-call audit \xB7 run traces \xB7 cost per run" }),
          /* @__PURE__ */ jsx(Chip, { scale: "print", children: "Snowflake \xB7 BigQuery \xB7 Redshift \xB7 Postgres \xB7 S3 \xB7 Slack \xB7 Jira" })
        ] }),
        /* @__PURE__ */ jsx(
          CtaBar,
          {
            tone: "indigo",
            title: /* @__PURE__ */ jsxs(Fragment, { children: [
              "One team. One workflow they\u2019re already blocked on.",
              " ",
              /* @__PURE__ */ jsx("span", { className: "sk-a", children: "Four weeks." })
            ] }),
            body: /* @__PURE__ */ jsx(Fragment, { children: "Success agreed up front, usually that a named non-engineer runs it end to end with no engineer in the loop. You keep the deployment, the brain and everything built on it, whether or not you continue." }),
            right: /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("b", { children: "Anoop Jawahar" }),
              " \xB7 Founder",
              /* @__PURE__ */ jsx("br", {}),
              "Ex-CTO Sundial \xB7 8 yrs Nutanix",
              /* @__PURE__ */ jsx("br", {}),
              "synos.in \xB7 linkedin.com/in/anoopjawahar"
            ] })
          }
        )
      ] }, "p1")
    ]
  };
};
export {
  onePager
};
