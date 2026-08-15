// onepager/src/department-brains.jsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var onePager = (K) => {
  const { OnePagerPage, OnePagerHeader, CtaBar, Callout, Chip, ChipRow, Eyebrow } = K;
  const BRAINS = [
    {
      tone: "indigo",
      name: "Product Brain",
      who: "Product \xB7 engineering \xB7 support",
      plug: /* @__PURE__ */ jsxs(Fragment, { children: [
        "Plugs into ",
        /* @__PURE__ */ jsx("b", { children: "Jira, your codebase, release notes, support tickets, customer calls" })
      ] }),
      asks: [
        "Why does this module behave this way, and who decided it?",
        "Which customers are affected if we change this?",
        "Draft the release note from what actually shipped.",
        "What did we promise this customer, and did we ship it?"
      ],
      win: /* @__PURE__ */ jsxs(Fragment, { children: [
        "The context that lives in ",
        /* @__PURE__ */ jsx("b", { children: "two people\u2019s heads" }),
        " becomes something the whole team can ask."
      ] })
    },
    {
      tone: "violet",
      name: "Sales Brain",
      who: "Sales \xB7 pre-sales \xB7 account teams",
      plug: /* @__PURE__ */ jsxs(Fragment, { children: [
        "Plugs into ",
        /* @__PURE__ */ jsx("b", { children: "your CRM, proposals, pricing sheets, email, past deals" })
      ] }),
      asks: [
        "What did we quote a customer like this, and what did they push back on?",
        "Build the proposal from the three closest deals we\u2019ve won.",
        "Which accounts have gone quiet and why?",
        "Answer this RFP from what we\u2019ve already answered before."
      ],
      win: /* @__PURE__ */ jsxs(Fragment, { children: [
        "A new rep starts with ",
        /* @__PURE__ */ jsx("b", { children: "everything the team has learned" }),
        ", not a folder of decks."
      ] })
    },
    {
      tone: "emerald",
      name: "Marketing Brain",
      who: "Marketing \xB7 growth \xB7 content",
      plug: /* @__PURE__ */ jsxs(Fragment, { children: [
        "Plugs into ",
        /* @__PURE__ */ jsx("b", { children: "your campaign tools, analytics, website, ad accounts, brand guidelines" })
      ] }),
      asks: [
        "Which campaigns actually worked for this segment last year?",
        "Write this in our voice, using rules we\u2019ve already agreed.",
        "Flag what\u2019s underperforming before the month closes.",
        "Who are we actually reaching, and who are we missing?"
      ],
      win: /* @__PURE__ */ jsxs(Fragment, { children: [
        "The team ships ",
        /* @__PURE__ */ jsx("b", { children: "without waiting on analysts" }),
        " for every number."
      ] })
    }
  ];
  const BUILD = [
    ["01", "Connect", "Point it at the systems that team already uses. Nothing is copied out or moved."],
    ["02", "It reads everything", "Spreadsheets and databases alongside documents, tickets and threads."],
    ["03", "It maps how you work", "Your customers, your products, your terms \u2014 including where the same thing has five names."],
    ["04", "Your experts correct it", "The people who know the rules fix what\u2019s wrong, in plain English. It remembers."],
    ["05", "It stays current", "New data, new decisions and new corrections keep folding in, so it doesn\u2019t go stale."]
  ];
  const DIFF = [
    ["It goes and looks", "It reads your live systems directly, so answers reflect today, not the day someone last exported a file."],
    ["It knows the joins", "The same customer under four different IDs across four systems is one customer here. Search can\u2019t do that."],
    ["It learns from corrections", "Fix it once and it stays fixed \u2014 for everyone, including whoever joins next year."],
    ["It captures the unwritten", "The exceptions and judgment calls that were never in a document get captured from the people who hold them."]
  ];
  const MORE = ["Finance Brain", "Operations Brain", "Support Brain", "HR Brain", "Cloud & DevOps Brain", "One company-wide brain, with each team\u2019s view of it"];
  return {
    title: "SynOS: give every team its own brain",
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
            tag: "Make your teams AI-native, one department at a time",
            title: /* @__PURE__ */ jsxs(Fragment, { children: [
              "Give every team ",
              /* @__PURE__ */ jsx("span", { className: "sk-a", children: "its own brain." })
            ] }),
            sub: /* @__PURE__ */ jsx(Fragment, { children: "A Product Brain. A Sales Brain. A Marketing Brain. Each one connects to the systems that team already runs on, learns how that team actually works, and then answers their questions and does their repetitive work. Built in weeks, not quarters \u2014 and your data never leaves your own servers." })
          }
        ),
        /* @__PURE__ */ jsxs(Callout, { scale: "print", tone: "red", children: [
          /* @__PURE__ */ jsx("b", { children: "Your people are already using AI. It just doesn\u2019t know anything about your company." }),
          " So every question starts from zero, every answer has to be checked, and the one person who knows the real rules keeps getting interrupted. The usual fix \u2014 gather the documents into one place and search them \u2014 goes stale the week after you build it, and it was never the hard part. The hard part is everything that was never written down."
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(Eyebrow, { scale: "print", children: [
            "Start with one team ",
            /* @__PURE__ */ jsx("span", { className: "op-hint", children: "\xB7 then add the next" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "op-three op-three--tight", children: BRAINS.map((b) => /* @__PURE__ */ jsxs(Callout, { scale: "print", tone: b.tone, accent: "top", fill: "neutral", className: "op-col", children: [
            /* @__PURE__ */ jsx("b", { className: "op-lay-h", children: b.name }),
            /* @__PURE__ */ jsx("div", { className: "op-who", children: b.who }),
            /* @__PURE__ */ jsx("div", { className: "op-tile-d", children: b.plug }),
            /* @__PURE__ */ jsx("div", { className: "op-asks", children: b.asks.map((a) => /* @__PURE__ */ jsx("div", { className: "op-ask op-ask--tight", children: a }, a)) }),
            /* @__PURE__ */ jsx("div", { className: `op-win${b.tone === "indigo" ? "" : ` op-win--${b.tone}`}`, children: b.win })
          ] }, b.name)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "op-more", children: [
          /* @__PURE__ */ jsx("span", { className: "op-more-t", children: "Same layer, any team:" }),
          /* @__PURE__ */ jsx(ChipRow, { tight: true, children: MORE.map((m) => /* @__PURE__ */ jsx(Chip, { scale: "print", children: m }, m)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(Eyebrow, { scale: "print", children: [
            "How a brain gets built ",
            /* @__PURE__ */ jsx("span", { className: "op-hint", children: "\xB7 weeks, and no data team required" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "op-microrow op-microrow--5", children: BUILD.map(([i, n, d]) => /* @__PURE__ */ jsxs("div", { className: "op-micro", children: [
            /* @__PURE__ */ jsx("div", { className: "op-micro-i", children: i }),
            /* @__PURE__ */ jsx("div", { className: "op-micro-n", children: n }),
            /* @__PURE__ */ jsx("div", { className: "op-micro-d", children: d })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Eyebrow, { scale: "print", children: "What that team can do once it has one" }),
          /* @__PURE__ */ jsxs("div", { className: "op-three op-three--tight", children: [
            /* @__PURE__ */ jsxs("div", { className: "op-tile", children: [
              /* @__PURE__ */ jsx("div", { className: "op-tile-n", children: "Ask, and get an answer you can check" }),
              /* @__PURE__ */ jsxs("div", { className: "op-tile-d", children: [
                "In plain language, from Slack, WhatsApp or a browser. Every answer",
                " ",
                /* @__PURE__ */ jsx("b", { children: "shows where it came from" }),
                ", so nobody has to take it on faith."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "op-tile", children: [
              /* @__PURE__ */ jsx("div", { className: "op-tile-n", children: "Hand over the repetitive work" }),
              /* @__PURE__ */ jsxs("div", { className: "op-tile-d", children: [
                "The weekly report, the reconciliation, the chasing. It",
                " ",
                /* @__PURE__ */ jsx("b", { children: "proposes first and acts once trusted" }),
                " \u2014 and runs without anyone present."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "op-tile", children: [
              /* @__PURE__ */ jsx("div", { className: "op-tile-n", children: "Build their own tools" }),
              /* @__PURE__ */ jsxs("div", { className: "op-tile-d", children: [
                "Someone describes the dashboard or the checklist they need and it gets built \u2014",
                " ",
                /* @__PURE__ */ jsx("b", { children: "no ticket, no waiting on engineering" }),
                "."
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Callout, { scale: "print", tone: "indigo", label: "Why this is different from putting your documents in one place \xB7 the part that usually fails quietly", children: /* @__PURE__ */ jsx("div", { className: "op-four", children: DIFF.map(([n, d]) => /* @__PURE__ */ jsxs("div", { className: "op-brain-f", children: [
          /* @__PURE__ */ jsx("div", { className: "op-brain-n", children: n }),
          /* @__PURE__ */ jsx("div", { className: "op-brain-d", children: d })
        ] }, n)) }) }),
        /* @__PURE__ */ jsxs(ChipRow, { tight: true, children: [
          /* @__PURE__ */ jsx(Chip, { scale: "print", tone: "indigo", mono: true, children: "YOUR SERVERS" }),
          /* @__PURE__ */ jsx(Chip, { scale: "print", children: "Your cloud or on-premise \xB7 your data never leaves" }),
          /* @__PURE__ */ jsx(Chip, { scale: "print", children: "Each team sees only what it should" }),
          /* @__PURE__ */ jsx(Chip, { scale: "print", children: "Every answer traceable to its source" }),
          /* @__PURE__ */ jsx(Chip, { scale: "print", children: "Works with the AI tools your people already use \xB7 no lock-in to one provider" })
        ] }),
        /* @__PURE__ */ jsx(
          CtaBar,
          {
            tone: "indigo",
            title: /* @__PURE__ */ jsxs(Fragment, { children: [
              "Pick one team. One brain. ",
              /* @__PURE__ */ jsx("span", { className: "sk-a", children: "Four to six weeks." })
            ] }),
            body: /* @__PURE__ */ jsx(Fragment, { children: "We agree what success looks like before we start \u2014 usually that the team uses it daily without anyone from engineering in the loop. You keep the brain and everything built on it, whether or not you continue." }),
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
