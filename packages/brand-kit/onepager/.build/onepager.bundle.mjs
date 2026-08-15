// onepager/src/softlink-ceo.jsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var onePager = (K) => {
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
    Eyebrow,
    PhaseCard,
    PhaseRow,
    StepCard,
    StepGrid,
    Columns
  } = K;
  const foot = (credential) => /* @__PURE__ */ jsx(OnePagerFooter, { name: "Anoop Jawahar", credential, right: "synos.in" });
  const SYSTEMS = ["Logi-Sys", "Live IMPEX", "Documents", "Email", "30 years of code", "People"];
  const systemChips = (tone) => /* @__PURE__ */ jsx(ChipRow, { tight: true, children: SYSTEMS.map((s) => /* @__PURE__ */ jsx(Chip, { scale: "print", tone, children: s }, s)) });
  return {
    title: "SynOS for Softlink Global",
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
            tag: "AI-Native Operating Layer \xB7 For Softlink Global",
            title: /* @__PURE__ */ jsxs(Fragment, { children: [
              "You have shipped the AI features.",
              /* @__PURE__ */ jsx("br", {}),
              "Becoming an ",
              /* @__PURE__ */ jsx("span", { className: "sk-a", children: "AI-native ERP" }),
              " is a different problem."
            ] }),
            sub: /* @__PURE__ */ jsxs(Fragment, { children: [
              "Boxy, LogiBRAIN and LogiLENS put Softlink ahead of most of this industry. But in December CargoWise put an agentic AI workflow engine into every customer\u2019s pack and removed seat fees entirely, and a generation of AI-native platforms is being built with no legacy to carry. ",
              /* @__PURE__ */ jsx("b", { children: "AI features are becoming table stakes." }),
              " What separates an AI-native ERP is the layer underneath \u2014 ",
              /* @__PURE__ */ jsx("b", { children: "a brain for each client that gets more accurate every week it is used" }),
              ", and experts and customers who can build what they need without going through engineering."
            ] })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "op-diagram", children: [
          /* @__PURE__ */ jsxs(Columns, { gap: "snug", children: [
            /* @__PURE__ */ jsxs("div", { className: "op-side op-side--text", children: [
              /* @__PURE__ */ jsx("div", { className: "op-side-label op-side-label--now", children: "Today" }),
              systemChips("neutral"),
              /* @__PURE__ */ jsx("div", { className: "op-flow op-flow--now", children: "Every conversation starts from zero. What the system learns on Monday is gone by Friday. Every change to what an agent does goes back to engineering, and waits." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "op-side op-side--text", children: [
              /* @__PURE__ */ jsx("div", { className: "op-side-label op-side-label--new", children: "With SynOS" }),
              systemChips("indigo"),
              /* @__PURE__ */ jsxs("div", { className: "op-flow op-flow--new", children: [
                /* @__PURE__ */ jsx("b", { children: "A brain per client" }),
                " that understands how that forwarder actually operates. Agents read from it and act. Your experts correct them in plain English.",
                " ",
                /* @__PURE__ */ jsx("b", { children: "The brain keeps the correction \u2014 permanently, for everyone." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "op-diagram-cap", children: [
            "Same systems on both sides. ",
            /* @__PURE__ */ jsx("b", { children: "Nothing is moved, migrated or replaced." }),
            " It reads what you already run, inside your own environment."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(SectionHeading, { title: /* @__PURE__ */ jsxs(Fragment, { children: [
            "What it is worth to ",
            /* @__PURE__ */ jsx("span", { className: "sk-a", children: "Softlink" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "op-two", children: [
            /* @__PURE__ */ jsx(
              OutcomeCard,
              {
                title: /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(Eyebrow, { scale: "print", tone: "emerald", children: "Topline" }),
                  "A premium tier where customers build their own"
                ] }),
                body: /* @__PURE__ */ jsxs(Fragment, { children: [
                  "Your customers describe the workflow, report or dashboard they need in plain English and get it \u2014 ",
                  /* @__PURE__ */ jsx("b", { children: "on their own data, inside Logi-Sys, without a developer" }),
                  ". Custom requirements stop becoming custom projects. It is a tier, not a feature, and it upsells into ",
                  /* @__PURE__ */ jsx("b", { children: "5,000 businesses already on the platform" }),
                  "."
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              OutcomeCard,
              {
                title: /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(Eyebrow, { scale: "print", tone: "emerald", children: "Topline" }),
                  "Answers that get better the longer a customer stays"
                ] }),
                body: /* @__PURE__ */ jsxs(Fragment, { children: [
                  "Generic AI gives every forwarder the same answer. A brain that has absorbed",
                  " ",
                  /* @__PURE__ */ jsx("b", { children: "one client\u2019s exceptions, rates and standing arrangements" }),
                  " gives that client answers nobody else can. That is a renewal argument, and it strengthens every year they stay."
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              OutcomeCard,
              {
                tone: "violet",
                title: /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(Eyebrow, { scale: "print", tone: "violet", children: "Internal" }),
                  "Your experts change what agents do. Not your engineers."
                ] }),
                body: /* @__PURE__ */ jsxs(Fragment, { children: [
                  "Someone who knows a filing rule or a client exception should be able to teach it to the system directly, in plain English. Today that is a ticket, a sprint and a release. ",
                  /* @__PURE__ */ jsx("b", { children: "Engineering sets the rails once; the people with the knowledge do the rest." })
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              OutcomeCard,
              {
                tone: "violet",
                title: /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(Eyebrow, { scale: "print", tone: "violet", children: "Internal" }),
                  "Three decades of platform knowledge stops walking out of the door"
                ] }),
                body: /* @__PURE__ */ jsxs(Fragment, { children: [
                  "A long-lived product carries knowledge that lives in a few people rather than anywhere readable. ",
                  /* @__PURE__ */ jsx("b", { children: "Captured once, it becomes something a new joiner can ask" }),
                  " ",
                  "\u2014 so the platform gets easier to change rather than harder, without anything being rewritten."
                ] })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Callout, { scale: "print", tone: "violet", label: "What it takes from you", children: [
          "Read access to the systems you already run, and ",
          /* @__PURE__ */ jsx("b", { children: "one person part time" }),
          " as the point of contact. Nothing to migrate, nothing to clean up, nobody to hire, and not one existing system replaced. ",
          /* @__PURE__ */ jsx("b", { children: "It runs inside your own environment \u2014 no client data moves anywhere." })
        ] }),
        foot("Founder, Synos Labs \xB7 Ex-CTO Sundial \xB7 8 yrs Nutanix")
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
            tag: "Softlink Global \xB7 page 2"
          }
        ),
        /* @__PURE__ */ jsxs(Callout, { scale: "print", tone: "indigo", label: "The part nobody else can buy", children: [
          /* @__PURE__ */ jsx("b", { className: "op-asset-h", children: "You are sitting on the largest record of how Indian trade actually moves \u2014 and today none of it compounds." }),
          "A model trained on the internet knows what a bill of lading is. It does not know how",
          " ",
          /* @__PURE__ */ jsx("b", { children: "this" }),
          " forwarder handles a short-shipped container, which charges ",
          /* @__PURE__ */ jsx("b", { children: "that" }),
          " client has agreed to absorb, or the filing convention a broker learned in 2013. That knowledge lives in your code, your data, and the heads of people who will eventually retire.",
          " ",
          /* @__PURE__ */ jsx("b", { children: "Capture it first and you stop competing on features." }),
          /* @__PURE__ */ jsxs("div", { className: "op-stat-row", children: [
            /* @__PURE__ */ jsxs("div", { className: "op-stat", children: [
              /* @__PURE__ */ jsx("div", { className: "op-stat-n", children: "~80%" }),
              /* @__PURE__ */ jsx("div", { className: "op-stat-l", children: "of Indian ICEGATE filings run through Live IMPEX" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "op-stat", children: [
              /* @__PURE__ */ jsx("div", { className: "op-stat-n", children: "5,000+" }),
              /* @__PURE__ */ jsx("div", { className: "op-stat-l", children: "logistics businesses on the platform" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "op-stat", children: [
              /* @__PURE__ */ jsx("div", { className: "op-stat-n", children: "50+" }),
              /* @__PURE__ */ jsx("div", { className: "op-stat-l", children: "countries, one million-plus users" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "op-stat", children: [
              /* @__PURE__ */ jsx("div", { className: "op-stat-n", children: "30 yrs" }),
              /* @__PURE__ */ jsx("div", { className: "op-stat-l", children: "of freight logic already written down in code" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(SectionHeading, { title: /* @__PURE__ */ jsxs(Fragment, { children: [
            "One of them, ",
            /* @__PURE__ */ jsx("span", { className: "sk-a", children: "start to finish" })
          ] }) }),
          /* @__PURE__ */ jsxs(StepGrid, { columns: 2, children: [
            /* @__PURE__ */ jsx(
              StepCard,
              {
                scale: "print",
                num: "1",
                title: "It answers",
                body: /* @__PURE__ */ jsxs(Fragment, { children: [
                  "A user asks why a charge appeared on an invoice. The agent answers correctly from the ERP \u2014 ",
                  /* @__PURE__ */ jsx("b", { children: "and misses that this client has a standing waiver" }),
                  " that was never written down anywhere."
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              StepCard,
              {
                scale: "print",
                num: "2",
                title: "Someone corrects it",
                body: /* @__PURE__ */ jsxs(Fragment, { children: [
                  "The operations lead types one sentence explaining the waiver. ",
                  /* @__PURE__ */ jsx("b", { children: "No ticket, no engineer, no release." }),
                  " She is asked to confirm it, and it is recorded against her name."
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              StepCard,
              {
                scale: "print",
                num: "3",
                title: "It becomes knowledge",
                body: /* @__PURE__ */ jsxs(Fragment, { children: [
                  "That exception enters ",
                  /* @__PURE__ */ jsx("b", { children: "that client\u2019s brain" }),
                  ". Every answer after it \u2014 every user, every channel, including the customer\u2019s own portal \u2014 already knows."
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              StepCard,
              {
                className: "op-step-done",
                scale: "print",
                num: "4",
                title: "And you can see it",
                body: /* @__PURE__ */ jsxs(Fragment, { children: [
                  "Accuracy for that client is scored weekly against questions your own experts wrote. ",
                  /* @__PURE__ */ jsx("b", { children: "The number goes up, and you can show a customer that it went up." })
                ] })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            SectionHeading,
            {
              title: /* @__PURE__ */ jsxs(Fragment, { children: [
                "The same thing, ",
                /* @__PURE__ */ jsx("span", { className: "sk-a", children: "for the rest of it" })
              ] }),
              sub: "You start with one. Each one after that is faster, because the brain is already there."
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "op-three", children: [
            /* @__PURE__ */ jsx(
              OutcomeCard,
              {
                tone: "violet",
                title: "A brain for your product team",
                body: "What was decided, why, and what has already been tried \u2014 so a PRD starts from institutional memory rather than from whoever remembers."
              }
            ),
            /* @__PURE__ */ jsx(
              OutcomeCard,
              {
                tone: "violet",
                title: "A brain for engineering",
                body: "Thirty years of Logi-Sys, answerable in plain English. New engineers stop being blocked on the few who were there when it was written."
              }
            ),
            /* @__PURE__ */ jsx(
              OutcomeCard,
              {
                tone: "violet",
                title: "Agents your customers build",
                body: "A forwarder describes the report or automation they want in their own words, and gets it \u2014 inside Logi-Sys, on their own data. Custom work without custom work."
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(SectionHeading, { title: /* @__PURE__ */ jsxs(Fragment, { children: [
            "Six weeks, ",
            /* @__PURE__ */ jsx("span", { className: "sk-a", children: "one outcome" })
          ] }) }),
          /* @__PURE__ */ jsxs(PhaseRow, { children: [
            /* @__PURE__ */ jsx(
              PhaseCard,
              {
                scale: "print",
                when: "Weeks 1\u20132",
                body: /* @__PURE__ */ jsxs(Fragment, { children: [
                  "We connect to the systems you already run and build the brain for ",
                  /* @__PURE__ */ jsx("b", { children: "one client and one team" }),
                  ". First result by the end of week two."
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              PhaseCard,
              {
                scale: "print",
                position: "bridge",
                when: "Weeks 3\u20135",
                body: /* @__PURE__ */ jsxs(Fragment, { children: [
                  "Agents go live ",
                  /* @__PURE__ */ jsx("b", { children: "proposing rather than acting" }),
                  ", so you see exactly what they would do before anything is done. Your experts correct; the brain absorbs."
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
                  "We measure accuracy ",
                  /* @__PURE__ */ jsx("b", { children: "on questions your own people wrote" }),
                  ", show whether it improved over the six weeks, and you decide whether it continues."
                ] })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          CtaBar,
          {
            tone: "indigo",
            title: /* @__PURE__ */ jsxs(Fragment, { children: [
              "The first conversation is ",
              /* @__PURE__ */ jsx("span", { className: "sk-a", children: "one question." })
            ] }),
            body: /* @__PURE__ */ jsxs(Fragment, { children: [
              "Tell us something a customer asked your team last month that took three people and two systems to answer. We will come back with how the brain would have answered it, and what it would have learned by doing so. ",
              /* @__PURE__ */ jsx("b", { children: "Everything the system is taught stays yours" }),
              " \u2014 AI of your own, built on how Softlink and your customers actually work, and it never leaves your environment."
            ] })
          }
        ),
        foot("Founder, Synos Labs \xB7 anoop@synos.in")
      ] }, "p2")
    ]
  };
};
export {
  onePager
};
