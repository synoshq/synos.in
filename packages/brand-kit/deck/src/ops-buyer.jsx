/*
 * synos-ops-buyer — the 43-section operations-buyer deck, rebuilt on the brand kit.
 *
 * RE-PLATFORMING, NOT A REWRITE. Every word is the shipped deck's own
 * (`synos-gtm/presentations/synos-ops-buyer.html`). Content and platform must not move in the same
 * pass or nobody can tell which caused a difference. Where a slide's copy is wrong or stale, it
 * goes in the report for Anoop — it does not get quietly fixed here.
 *
 * WHY THIS DECK AND NOT THE OTHER. The two buyer decks share 288 of 328 class names — 91% of class
 * uses — so they are one family and this port carries tech-buyer with it. They share only 29% with
 * the VC deck, which is why this needed its own measurement pass first:
 * `docs/plans/2026-08-14-buyer-decks-mapping.md`.
 *
 * COMPLETE at 43 of 43. The `wip` export is gone, so `build.mjs` now ASSERTS the section count
 * on every build — a deck that silently loses a section fails rather than ships short.
 */
import unblockDiagram from './ops-assets/unblock.png'

/* CARRIED SVGs: token names are rewritten to the kit's namespace on the way in. The source's
   stylesheet declares `--red-bg`; the kit declares `--sk-red-bg`. An SVG attribute pointing at an
   undefined custom property does not fall back — `fill="var(--red-bg)"` renders BLACK, which is how
   the root-cause diagram shipped a black bar across its problem band until the full-deck sweep
   caught it. Nothing warns; the file is valid.

   The two hand-drawn diagrams, verbatim from the source. Injected rather than transcribed into
   JSX: re-typing shaped elements is a way to introduce differences that then get mistaken for
   design decisions. Their classes are styled in ops-buyer.css. */
const LOOP_SVG = "<svg viewBox=\"0 0 1080 320\" xmlns=\"http://www.w3.org/2000/svg\">\n        <defs>\n          <radialGradient id=\"obLpCore\" cx=\"50%\" cy=\"36%\" r=\"72%\">\n            <stop offset=\"0\" stop-color=\"#8B8DF7\"/><stop offset=\"0.55\" stop-color=\"#6366F1\"/><stop offset=\"1\" stop-color=\"#7C3AED\"/>\n          </radialGradient>\n          <filter id=\"obLpGlow\" x=\"-60%\" y=\"-60%\" width=\"220%\" height=\"220%\">\n            <feDropShadow dx=\"0\" dy=\"6\" stdDeviation=\"12\" flood-color=\"#6366F1\" flood-opacity=\"0.28\"/>\n          </filter>\n          <marker id=\"obLpA\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\">\n            <path d=\"M1 1 L9 5 L1 9 Z\" fill=\"#6366F1\"/>\n          </marker>\n          <marker id=\"obLpAv\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\">\n            <path d=\"M1 1 L9 5 L1 9 Z\" fill=\"#7C3AED\"/>\n          </marker>\n        </defs>\n        <circle cx=\"300\" cy=\"160\" r=\"64\" fill=\"url(#obLpCore)\" filter=\"url(#obLpGlow)\"/>\n        <circle cx=\"300\" cy=\"160\" r=\"64\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".35\" stroke-width=\"1.4\"/>\n        <text x=\"300\" y=\"156\" text-anchor=\"middle\" style=\"font-family:'Plus Jakarta Sans';font-weight:800;font-size:19px;fill:#fff\">Synos</text>\n        <text x=\"300\" y=\"177\" text-anchor=\"middle\" style=\"font-family:'JetBrains Mono';font-size:8.5px;letter-spacing:1.4px;fill:rgba(255,255,255,.85)\">THE LOOP</text>\n        <rect class=\"lp-node\" x=\"196\" y=\"16\" width=\"208\" height=\"52\" rx=\"12\"/>\n        <circle class=\"lp-badge\" cx=\"216\" cy=\"42\" r=\"10\"/><text class=\"lp-badge-t\" x=\"216\" y=\"46\" text-anchor=\"middle\">1</text>\n        <text class=\"lp-h\" x=\"234\" y=\"38\">Your team corrects it</text>\n        <text class=\"lp-m\" x=\"234\" y=\"56\">\"top-tier \u2014 email, never SMS\"</text>\n        <rect class=\"lp-node\" x=\"452\" y=\"134\" width=\"160\" height=\"52\" rx=\"12\"/>\n        <circle class=\"lp-badge\" cx=\"472\" cy=\"160\" r=\"10\"/><text class=\"lp-badge-t\" x=\"472\" y=\"164\" text-anchor=\"middle\">2</text>\n        <text class=\"lp-h\" x=\"490\" y=\"156\">The AI acts</text>\n        <text class=\"lp-m\" x=\"490\" y=\"174\">in any tool you use</text>\n        <rect class=\"lp-node-plain\" x=\"196\" y=\"252\" width=\"208\" height=\"52\" rx=\"12\"/>\n        <circle class=\"lp-badge\" cx=\"216\" cy=\"278\" r=\"10\"/><text class=\"lp-badge-t\" x=\"216\" y=\"282\" text-anchor=\"middle\">3</text>\n        <text class=\"lp-h\" x=\"234\" y=\"274\">Systems report results</text>\n        <text class=\"lp-m\" x=\"234\" y=\"292\">measured, not guessed</text>\n        <path class=\"lp-edge lp-flow\" d=\"M 350 72 C 396 92, 428 112, 452 142\" marker-end=\"url(#obLpA)\"/>\n        <path class=\"lp-edge lp-flow\" d=\"M 456 186 C 424 226, 396 244, 360 258\" marker-end=\"url(#obLpA)\"/>\n        <path class=\"lp-edge lp-flow\" d=\"M 208 252 C 178 220, 178 100, 210 66\" marker-end=\"url(#obLpA)\"/>\n        <path class=\"lp-edge-v lp-flow\" d=\"M 366 178 C 500 236, 620 216, 686 178\" marker-end=\"url(#obLpAv)\"/>\n        <rect class=\"lp-panel\" x=\"692\" y=\"62\" width=\"230\" height=\"196\" rx=\"15\"/>\n        <text class=\"lp-ph\" x=\"807\" y=\"92\" text-anchor=\"middle\">What builds up</text>\n        <text class=\"lp-pr\" x=\"807\" y=\"122\" text-anchor=\"middle\">What actually worked</text>\n        <text class=\"lp-pr\" x=\"807\" y=\"152\" text-anchor=\"middle\">Ways of working that improve</text>\n        <text class=\"lp-pr\" x=\"807\" y=\"182\" text-anchor=\"middle\">The Company Brain itself</text>\n        <text class=\"lp-tag\" x=\"807\" y=\"216\" text-anchor=\"middle\">sharper every week</text>\n        <path class=\"lp-edge-v\" d=\"M 922 122 H 946\" marker-end=\"url(#obLpAv)\"/>\n        <path class=\"lp-edge-v\" d=\"M 922 196 H 946\" marker-end=\"url(#obLpAv)\"/>\n        <rect class=\"lp-pay\" x=\"950\" y=\"96\" width=\"122\" height=\"50\" rx=\"11\"/>\n        <text class=\"lp-pay-h\" x=\"1011\" y=\"117\" text-anchor=\"middle\">Better results now</text>\n        <text class=\"lp-pay-s\" x=\"1011\" y=\"133\" text-anchor=\"middle\">with today's AI</text>\n        <rect class=\"lp-pay\" x=\"950\" y=\"170\" width=\"122\" height=\"50\" rx=\"11\"/>\n        <text class=\"lp-pay-h\" x=\"1011\" y=\"191\" text-anchor=\"middle\">An asset you own</text>\n        <text class=\"lp-pay-s\" x=\"1011\" y=\"207\" text-anchor=\"middle\">yours, not a vendor's</text>\n      </svg>"

const SCATTER_SVG = "<svg class=\"diagram-svg\" viewBox=\"0 0 1080 340\" xmlns=\"http://www.w3.org/2000/svg\">\n          <defs>\n            <marker id=\"sc-arr\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\"><path d=\"M0,0 L10,5 L0,10 z\" fill=\"#7c3aed\"/></marker>\n          </defs>\n          <!-- scattered silos (top) -->\n          <g>\n            <rect class=\"node\" x=\"20\"  y=\"14\" width=\"150\" height=\"42\" rx=\"8\" stroke-dasharray=\"4 3\"/><text class=\"h\" x=\"95\"  y=\"33\" text-anchor=\"middle\">Data warehouse</text><text class=\"muted\" x=\"95\"  y=\"48\" text-anchor=\"middle\">customer_id 4821</text>\n            <rect class=\"node\" x=\"200\" y=\"14\" width=\"150\" height=\"42\" rx=\"8\" stroke-dasharray=\"4 3\"/><text class=\"h\" x=\"275\" y=\"33\" text-anchor=\"middle\">CRM</text><text class=\"muted\" x=\"275\" y=\"48\" text-anchor=\"middle\">Acct \"Acme Corp\"</text>\n            <rect class=\"node\" x=\"380\" y=\"14\" width=\"150\" height=\"42\" rx=\"8\" stroke-dasharray=\"4 3\"/><text class=\"h\" x=\"455\" y=\"33\" text-anchor=\"middle\">Slack \u00b7 Email</text><text class=\"muted\" x=\"455\" y=\"48\" text-anchor=\"middle\">\"the Acme folks\"</text>\n            <rect class=\"node\" x=\"560\" y=\"14\" width=\"150\" height=\"42\" rx=\"8\" stroke-dasharray=\"4 3\"/><text class=\"h\" x=\"635\" y=\"33\" text-anchor=\"middle\">Docs</text><text class=\"muted\" x=\"635\" y=\"48\" text-anchor=\"middle\">SOP v3 (stale?)</text>\n            <rect class=\"node\" x=\"740\" y=\"14\" width=\"150\" height=\"42\" rx=\"8\" stroke-dasharray=\"4 3\"/><text class=\"h\" x=\"815\" y=\"33\" text-anchor=\"middle\">Support tickets</text><text class=\"muted\" x=\"815\" y=\"48\" text-anchor=\"middle\">acme@ \u00b7 #7781</text>\n            <rect class=\"node\" x=\"920\" y=\"14\" width=\"140\" height=\"42\" rx=\"8\" stroke-dasharray=\"4 3\"/><text class=\"h\" x=\"990\" y=\"33\" text-anchor=\"middle\">Spreadsheets</text><text class=\"muted\" x=\"990\" y=\"48\" text-anchor=\"middle\">\"ACME (EU)\"</text>\n          </g>\n          <!-- grey stubs silo \u2192 problem band -->\n          <path class=\"edge\" d=\"M 95 56 L 95 78\"/><path class=\"edge\" d=\"M 275 56 L 275 78\"/><path class=\"edge\" d=\"M 455 56 L 455 78\"/>\n          <path class=\"edge\" d=\"M 635 56 L 635 78\"/><path class=\"edge\" d=\"M 815 56 L 815 78\"/><path class=\"edge\" d=\"M 990 56 L 990 78\"/>\n          <!-- problem band -->\n          <rect x=\"40\" y=\"78\" width=\"1000\" height=\"26\" rx=\"8\" fill=\"var(--sk-red-bg)\" stroke=\"var(--sk-red-br)\"/>\n          <text x=\"540\" y=\"95\" text-anchor=\"middle\" font-style=\"italic\" font-size=\"11\" fill=\"#b91c1c\">same customer \u00b7 six identities \u00b7 no shared meaning \u00b7 no freshness \u00b7 no lineage</text>\n          <!-- 6 arrows converge band \u2192 brain -->\n          <path class=\"edge-violet\" d=\"M 95 104 L 498 226\" marker-end=\"url(#sc-arr)\"/>\n          <path class=\"edge-violet\" d=\"M 275 104 L 516 226\" marker-end=\"url(#sc-arr)\"/>\n          <path class=\"edge-violet\" d=\"M 455 104 L 532 226\" marker-end=\"url(#sc-arr)\"/>\n          <path class=\"edge-violet\" d=\"M 635 104 L 548 226\" marker-end=\"url(#sc-arr)\"/>\n          <path class=\"edge-violet\" d=\"M 815 104 L 564 226\" marker-end=\"url(#sc-arr)\"/>\n          <path class=\"edge-violet\" d=\"M 990 104 L 582 226\" marker-end=\"url(#sc-arr)\"/>\n          <!-- brain layer node -->\n          <rect class=\"node-violet\" x=\"330\" y=\"232\" width=\"420\" height=\"76\" rx=\"14\"/>\n          <text class=\"h\" x=\"540\" y=\"260\" text-anchor=\"middle\" fill=\"#7c3aed\" font-size=\"13\">Company Brain \u2014 one resolved graph</text>\n          <text class=\"tag\" x=\"540\" y=\"281\" text-anchor=\"middle\" font-size=\"10.5\">entity-resolved \u00b7 relationship-linked \u00b7 freshness-aware \u00b7 cited</text>\n          <text class=\"muted\" x=\"540\" y=\"298\" text-anchor=\"middle\" font-size=\"10\">Acme Corp = customer_id 4821 = \"ACME (EU)\" \u00b7 one node, every source</text>\n        </svg>"

const RETRIEVAL_SVG = "<svg viewBox=\"0 0 380 400\" xmlns=\"http://www.w3.org/2000/svg\">\n            <defs>\n              <marker id=\"ag-arr\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\">\n                <path d=\"M0,0 L10,5 L0,10 z\" fill=\"#7c3aed\"/>\n              </marker>\n              <marker id=\"ag-arr-dim\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"5\" markerHeight=\"5\" orient=\"auto-start-reverse\">\n                <path d=\"M0,0 L10,5 L0,10 z\" fill=\"#a78bfa\"/>\n              </marker>\n            </defs>\n            <rect x=\"100\" y=\"6\" width=\"180\" height=\"46\" rx=\"10\" fill=\"#f5f3ff\" stroke=\"#7c3aed\" stroke-width=\"1.5\"/>\n            <text x=\"190\" y=\"24\" text-anchor=\"middle\" font-family=\"'Plus Jakarta Sans'\" font-size=\"9.5\" font-weight=\"800\" fill=\"#7c3aed\" letter-spacing=\"1.3\">RETRIEVAL SUB-AGENT</text>\n            <text x=\"190\" y=\"40\" text-anchor=\"middle\" font-family=\"'JetBrains Mono'\" font-size=\"10\" font-weight=\"600\" fill=\"#0f172a\">plan \u2192 call \u2192 observe \u2192 refine</text>\n            <path d=\"M 290 28 Q 340 28 340 56 Q 340 88 300 88\" fill=\"none\" stroke=\"#a78bfa\" stroke-width=\"1.4\" stroke-dasharray=\"3 3\" marker-end=\"url(#ag-arr-dim)\"/>\n            <text x=\"345\" y=\"60\" font-family=\"'JetBrains Mono'\" font-size=\"9\" fill=\"#7c3aed\" font-weight=\"700\">\u21bb 4\u00d7</text>\n            <text x=\"20\" y=\"30\" font-family=\"'JetBrains Mono'\" font-size=\"10\" fill=\"#475569\" font-weight=\"600\">Q:</text>\n            <text x=\"20\" y=\"44\" font-family=\"'JetBrains Mono'\" font-size=\"9\" fill=\"#64748b\">\"Why is</text>\n            <text x=\"20\" y=\"56\" font-family=\"'JetBrains Mono'\" font-size=\"9\" fill=\"#64748b\">Maya at risk?\"</text>\n            <path d=\"M 70 36 L 100 30\" fill=\"none\" stroke=\"#7c3aed\" stroke-width=\"1.4\" marker-end=\"url(#ag-arr)\"/>\n            <circle cx=\"80\" cy=\"120\" r=\"22\" fill=\"#eef2ff\" stroke=\"#6366f1\" stroke-width=\"1.8\"/>\n            <text x=\"80\" y=\"118\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"700\" fill=\"#4338ca\">Maya</text>\n            <text x=\"80\" y=\"129\" text-anchor=\"middle\" font-size=\"8\" fill=\"#64748b\">Customer</text>\n            <circle cx=\"62\" cy=\"103\" r=\"9\" fill=\"#7c3aed\"/>\n            <text x=\"62\" y=\"106\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"800\" fill=\"#fff\">1</text>\n            <circle cx=\"190\" cy=\"135\" r=\"22\" fill=\"#eef2ff\" stroke=\"#6366f1\" stroke-width=\"1.5\"/>\n            <text x=\"190\" y=\"133\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"700\" fill=\"#4338ca\">Order #42</text>\n            <text x=\"190\" y=\"144\" text-anchor=\"middle\" font-size=\"8\" fill=\"#64748b\">SLA breach</text>\n            <circle cx=\"172\" cy=\"118\" r=\"9\" fill=\"#7c3aed\"/>\n            <text x=\"172\" y=\"121\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"800\" fill=\"#fff\">2</text>\n            <circle cx=\"310\" cy=\"160\" r=\"22\" fill=\"#eef2ff\" stroke=\"#6366f1\" stroke-width=\"1.5\"/>\n            <text x=\"310\" y=\"158\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"700\" fill=\"#4338ca\">Ticket</text>\n            <text x=\"310\" y=\"169\" text-anchor=\"middle\" font-size=\"8\" fill=\"#64748b\">delivery</text>\n            <circle cx=\"292\" cy=\"143\" r=\"9\" fill=\"#7c3aed\"/>\n            <text x=\"292\" y=\"146\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"800\" fill=\"#fff\">3</text>\n            <circle cx=\"140\" cy=\"240\" r=\"22\" fill=\"#fef2f2\" stroke=\"#ef4444\" stroke-width=\"1.5\"/>\n            <text x=\"140\" y=\"238\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"700\" fill=\"#b91c1c\">Region policy</text>\n            <text x=\"140\" y=\"249\" text-anchor=\"middle\" font-size=\"8\" fill=\"#64748b\">apology+reship</text>\n            <circle cx=\"122\" cy=\"223\" r=\"9\" fill=\"#7c3aed\"/>\n            <text x=\"122\" y=\"226\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"800\" fill=\"#fff\">4</text>\n            <circle cx=\"270\" cy=\"260\" r=\"22\" fill=\"#ecfeff\" stroke=\"#0e7490\" stroke-width=\"1.5\"/>\n            <text x=\"270\" y=\"258\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"700\" fill=\"#0e7490\">WA evening</text>\n            <text x=\"270\" y=\"269\" text-anchor=\"middle\" font-size=\"8\" fill=\"#64748b\">preference</text>\n            <circle cx=\"252\" cy=\"243\" r=\"9\" fill=\"#7c3aed\"/>\n            <text x=\"252\" y=\"246\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"800\" fill=\"#fff\">5</text>\n            <circle cx=\"40\" cy=\"195\" r=\"14\" fill=\"#f8fafc\" stroke=\"#cbd5e1\" stroke-width=\"1\" stroke-dasharray=\"2 2\"/>\n            <text x=\"40\" y=\"198\" text-anchor=\"middle\" font-size=\"7\" fill=\"#94a3b8\">Tier</text>\n            <circle cx=\"350\" cy=\"240\" r=\"14\" fill=\"#f8fafc\" stroke=\"#cbd5e1\" stroke-width=\"1\" stroke-dasharray=\"2 2\"/>\n            <text x=\"350\" y=\"243\" text-anchor=\"middle\" font-size=\"7\" fill=\"#94a3b8\">SKU</text>\n            <path d=\"M 130 56 Q 100 80 86 100\" fill=\"none\" stroke=\"#7c3aed\" stroke-width=\"1.6\" marker-end=\"url(#ag-arr)\"/>\n            <path d=\"M 100 125 L 168 132\" fill=\"none\" stroke=\"#6366f1\" stroke-width=\"1.4\" marker-end=\"url(#ag-arr-dim)\"/>\n            <path d=\"M 211 142 L 288 156\" fill=\"none\" stroke=\"#6366f1\" stroke-width=\"1.4\" marker-end=\"url(#ag-arr-dim)\"/>\n            <path d=\"M 295 180 Q 220 230 162 232\" fill=\"none\" stroke=\"#6366f1\" stroke-width=\"1.4\" marker-end=\"url(#ag-arr-dim)\"/>\n            <path d=\"M 162 245 L 248 257\" fill=\"none\" stroke=\"#6366f1\" stroke-width=\"1.4\" marker-end=\"url(#ag-arr-dim)\"/>\n            <rect x=\"50\" y=\"328\" width=\"280\" height=\"56\" rx=\"10\" fill=\"#ecfdf5\" stroke=\"#10b981\" stroke-width=\"1.5\"/>\n            <text x=\"190\" y=\"348\" text-anchor=\"middle\" font-family=\"'Plus Jakarta Sans'\" font-size=\"9.5\" font-weight=\"800\" fill=\"#047857\" letter-spacing=\"1.3\">SYNTHESISED CONTEXT PACK</text>\n            <text x=\"190\" y=\"364\" text-anchor=\"middle\" font-family=\"'JetBrains Mono'\" font-size=\"9\" fill=\"#0f172a\">5 nodes \u00b7 4 hops \u00b7 reasoning trace attached</text>\n            <text x=\"190\" y=\"377\" text-anchor=\"middle\" font-size=\"9\" font-style=\"italic\" fill=\"#475569\">\"Apology + reship + WA evening dispatch\"</text>\n            <path d=\"M 270 282 Q 240 310 220 326\" fill=\"none\" stroke=\"#10b981\" stroke-width=\"1.6\" marker-end=\"url(#ag-arr)\"/>\n          </svg>"

const GOV_SVG = "<svg class=\"diagram-svg\" viewBox=\"0 0 480 220\" xmlns=\"http://www.w3.org/2000/svg\">\n            <rect class=\"node-violet\" x=\"8\" y=\"22\" width=\"92\" height=\"22\" rx=\"6\"/><text x=\"54\" y=\"37\" text-anchor=\"middle\">UI click</text>\n            <rect class=\"node-violet\" x=\"8\" y=\"62\" width=\"92\" height=\"22\" rx=\"6\"/><text x=\"54\" y=\"77\" text-anchor=\"middle\">ChatGPT</text>\n            <rect class=\"node-violet\" x=\"8\" y=\"102\" width=\"92\" height=\"22\" rx=\"6\"/><text x=\"54\" y=\"117\" text-anchor=\"middle\">Claude Code</text>\n            <rect class=\"node-violet\" x=\"8\" y=\"142\" width=\"92\" height=\"22\" rx=\"6\"/><text x=\"54\" y=\"157\" text-anchor=\"middle\">Worker</text>\n            <path class=\"edge-indigo\" d=\"M 100 34 L 168 100\"/><path class=\"edge-indigo\" d=\"M 100 74 L 168 100\"/>\n            <path class=\"edge-indigo\" d=\"M 100 114 L 168 100\"/><path class=\"edge-indigo\" d=\"M 100 154 L 168 100\"/>\n            <rect class=\"node-indigo\" x=\"168\" y=\"50\" width=\"158\" height=\"115\" rx=\"12\"/>\n            <text class=\"h\" x=\"247\" y=\"72\" text-anchor=\"middle\">Governed Gate</text>\n            <line x1=\"178\" y1=\"82\" x2=\"316\" y2=\"82\" stroke=\"#c7d2fe\"/>\n            <text class=\"muted\" x=\"180\" y=\"98\">\u25b8 role check</text>\n            <text class=\"muted\" x=\"180\" y=\"114\">\u25b8 tool allowlist</text>\n            <text class=\"muted\" x=\"180\" y=\"130\">\u25b8 parameter contract</text>\n            <text class=\"muted\" x=\"180\" y=\"146\">\u25b8 tenant boundary</text>\n            <text class=\"muted\" x=\"180\" y=\"162\">\u25b8 egress proxy</text>\n            <path class=\"edge-indigo\" d=\"M 326 84 L 384 48\"/>\n            <rect class=\"node-emerald\" x=\"384\" y=\"32\" width=\"88\" height=\"22\" rx=\"6\"/><text x=\"428\" y=\"47\" text-anchor=\"middle\" fill=\"#047857\" font-weight=\"600\">allowed</text>\n            <path class=\"edge\" d=\"M 326 130 L 384 168\" stroke=\"#ef4444\"/>\n            <rect class=\"node-red\" x=\"384\" y=\"156\" width=\"88\" height=\"22\" rx=\"6\"/><text x=\"428\" y=\"171\" text-anchor=\"middle\" fill=\"#b91c1c\" font-weight=\"600\">denied</text>\n            <rect class=\"node\" x=\"120\" y=\"178\" width=\"254\" height=\"34\" rx=\"8\"/><text class=\"h\" x=\"247\" y=\"193\" text-anchor=\"middle\" font-size=\"11\">Audit row</text>\n            <text class=\"tag\" x=\"247\" y=\"206\" text-anchor=\"middle\" font-size=\"9.5\">who \u00b7 what \u00b7 when \u00b7 result</text>\n          </svg>"

const FLYWHEEL_SVG = "<svg class=\"flywheel-svg\" viewBox=\"0 0 360 360\" xmlns=\"http://www.w3.org/2000/svg\">\n        <defs>\n          <marker id=\"fwArr\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\">\n            <path d=\"M0,0 L10,5 L0,10 z\" fill=\"#6366f1\"/>\n          </marker>\n        </defs>\n        <circle cx=\"180\" cy=\"180\" r=\"48\" fill=\"#f5f3ff\" stroke=\"#7c3aed\" stroke-width=\"1.5\"/>\n        <text x=\"180\" y=\"175\" text-anchor=\"middle\" font-family=\"'Plus Jakarta Sans'\" font-size=\"12\" font-weight=\"800\" fill=\"#7c3aed\">Company</text>\n        <text x=\"180\" y=\"192\" text-anchor=\"middle\" font-family=\"'Plus Jakarta Sans'\" font-size=\"12\" font-weight=\"800\" fill=\"#7c3aed\">Brain</text>\n        <g>\n          <rect x=\"120\" y=\"20\" width=\"120\" height=\"60\" rx=\"10\" fill=\"#eef2ff\" stroke=\"#c7d2fe\" stroke-width=\"1.5\"/>\n          <text x=\"180\" y=\"42\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"800\" fill=\"#4338ca\" letter-spacing=\"1.4\">1 \u00b7 INPUT \u2014 STATE</text>\n          <text x=\"180\" y=\"60\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#0f172a\">Context pack</text>\n          <text x=\"180\" y=\"74\" text-anchor=\"middle\" font-size=\"10\" fill=\"#475569\">entity \u00b7 policy \u00b7 history</text>\n        </g>\n        <g>\n          <rect x=\"280\" y=\"150\" width=\"60\" height=\"60\" rx=\"10\" fill=\"#eef2ff\" stroke=\"#c7d2fe\" stroke-width=\"1.5\"/>\n          <text x=\"310\" y=\"172\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"800\" fill=\"#4338ca\" letter-spacing=\"1.2\">2 \u00b7 ACTION</text>\n          <text x=\"310\" y=\"187\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#0f172a\">Agent</text>\n          <text x=\"310\" y=\"200\" text-anchor=\"middle\" font-size=\"10\" fill=\"#475569\">decision</text>\n        </g>\n        <g>\n          <rect x=\"120\" y=\"280\" width=\"120\" height=\"60\" rx=\"10\" fill=\"#ecfdf5\" stroke=\"#6ee7b7\" stroke-width=\"1.5\"/>\n          <text x=\"180\" y=\"302\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"800\" fill=\"#047857\" letter-spacing=\"1.4\">3 \u00b7 OUTCOME</text>\n          <text x=\"180\" y=\"320\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#0f172a\">measured uplift</text>\n          <text x=\"180\" y=\"334\" text-anchor=\"middle\" font-size=\"10\" fill=\"#475569\">did it work?</text>\n        </g>\n        <g>\n          <rect x=\"20\" y=\"150\" width=\"60\" height=\"60\" rx=\"10\" fill=\"#f5f3ff\" stroke=\"#ddd6fe\" stroke-width=\"1.5\"/>\n          <text x=\"50\" y=\"170\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"800\" fill=\"#7c3aed\" letter-spacing=\"1.2\">4 \u00b7 REVIEW</text>\n          <text x=\"50\" y=\"184\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#0f172a\">calibrate</text>\n          <text x=\"50\" y=\"198\" text-anchor=\"middle\" font-size=\"10\" fill=\"#475569\">corrections</text>\n        </g>\n        <path d=\"M 240 50 Q 320 80 310 150\" fill=\"none\" stroke=\"#6366f1\" stroke-width=\"1.8\" marker-end=\"url(#fwArr)\"/>\n        <path d=\"M 310 210 Q 320 280 240 310\" fill=\"none\" stroke=\"#6366f1\" stroke-width=\"1.8\" marker-end=\"url(#fwArr)\"/>\n        <path d=\"M 120 310 Q 40 280 50 210\" fill=\"none\" stroke=\"#6366f1\" stroke-width=\"1.8\" marker-end=\"url(#fwArr)\"/>\n        <path d=\"M 50 150 Q 40 80 120 50\" fill=\"none\" stroke=\"#7c3aed\" stroke-width=\"1.8\" stroke-dasharray=\"4 3\" marker-end=\"url(#fwArr)\"/>\n      </svg>"

const SOR_SVG = "<svg class=\"diagram-svg\" viewBox=\"0 0 480 210\" xmlns=\"http://www.w3.org/2000/svg\">\n            <defs><marker id=\"aSi\" markerWidth=\"7\" markerHeight=\"7\" refX=\"5\" refY=\"3.5\" orient=\"auto\"><path d=\"M0 0 L7 3.5 L0 7 z\" fill=\"#6366f1\"/></marker>\n            <marker id=\"aSv\" markerWidth=\"7\" markerHeight=\"7\" refX=\"5\" refY=\"3.5\" orient=\"auto\"><path d=\"M0 0 L7 3.5 L0 7 z\" fill=\"#7c3aed\"/></marker></defs>\n            <rect class=\"node-indigo\" x=\"10\" y=\"84\" width=\"84\" height=\"32\" rx=\"8\"/><text class=\"h\" x=\"52\" y=\"104\" text-anchor=\"middle\">Worker</text><text class=\"muted\" x=\"52\" y=\"128\" text-anchor=\"middle\" font-size=\"9\">writes</text>\n            <path class=\"edge-indigo\" d=\"M 94 100 L 130 100\" marker-end=\"url(#aSi)\"/>\n            <rect class=\"node-emerald\" x=\"130\" y=\"10\" width=\"220\" height=\"84\" rx=\"10\"/>\n            <rect x=\"130\" y=\"10\" width=\"220\" height=\"20\" rx=\"10\" fill=\"#d1fae5\"/><rect x=\"130\" y=\"20\" width=\"220\" height=\"10\" fill=\"#d1fae5\"/>\n            <text class=\"h\" x=\"240\" y=\"24\" text-anchor=\"middle\" fill=\"#047857\" font-size=\"12\">campaign_perf</text>\n            <text class=\"muted\" x=\"142\" y=\"46\" font-size=\"10\">rows</text><text x=\"338\" y=\"46\" text-anchor=\"end\" font-family=\"JetBrains Mono\" font-size=\"10\" fill=\"#334155\">channel \u00b7 spend \u00b7 ROAS</text>\n            <text class=\"muted\" x=\"142\" y=\"62\" font-size=\"10\">written_by</text><text x=\"338\" y=\"62\" text-anchor=\"end\" font-family=\"JetBrains Mono\" font-size=\"10\" fill=\"#334155\">worker.ads</text>\n            <text class=\"muted\" x=\"142\" y=\"78\" font-size=\"10\">audit_id</text><text x=\"338\" y=\"78\" text-anchor=\"end\" font-family=\"JetBrains Mono\" font-size=\"10\" fill=\"#334155\">#8421</text>\n            <text class=\"tag\" x=\"240\" y=\"91\" text-anchor=\"middle\" font-size=\"9.5\">schema-enforced</text>\n            <rect class=\"node-emerald\" x=\"130\" y=\"104\" width=\"220\" height=\"54\" rx=\"10\"/>\n            <rect x=\"130\" y=\"104\" width=\"220\" height=\"20\" rx=\"10\" fill=\"#d1fae5\"/><rect x=\"130\" y=\"114\" width=\"220\" height=\"10\" fill=\"#d1fae5\"/>\n            <text class=\"h\" x=\"240\" y=\"118\" text-anchor=\"middle\" fill=\"#047857\" font-size=\"12\">lead_followups</text>\n            <text class=\"muted\" x=\"142\" y=\"140\" font-size=\"10\">rows</text><text x=\"338\" y=\"140\" text-anchor=\"end\" font-family=\"JetBrains Mono\" font-size=\"10\" fill=\"#334155\">owner \u00b7 stage \u00b7 next</text>\n            <path class=\"edge-violet\" d=\"M 350 52 L 388 74\" marker-end=\"url(#aSv)\"/>\n            <path class=\"edge-violet\" d=\"M 350 130 L 388 110\" marker-end=\"url(#aSv)\" stroke-dasharray=\"3 3\"/>\n            <rect class=\"node-violet\" x=\"388\" y=\"68\" width=\"86\" height=\"56\" rx=\"10\"/><text class=\"h\" x=\"431\" y=\"90\" text-anchor=\"middle\">App</text><text class=\"muted\" x=\"431\" y=\"104\" text-anchor=\"middle\" font-size=\"9\">+ Agents</text><text class=\"muted\" x=\"431\" y=\"117\" text-anchor=\"middle\" font-size=\"9\">read \u00b7 audited</text>\n            <text class=\"muted\" x=\"240\" y=\"200\" text-anchor=\"middle\" font-size=\"10\">same tenant \u00b7 permissions \u00b7 audit on every read + write</text>\n          </svg>"

const BUILD_SVG = "<svg class=\"diagram-svg\" viewBox=\"0 0 540 200\" xmlns=\"http://www.w3.org/2000/svg\">\n            <defs><marker id=\"aP\" markerWidth=\"7\" markerHeight=\"7\" refX=\"5\" refY=\"3.5\" orient=\"auto\"><path d=\"M0 0 L7 3.5 L0 7 z\" fill=\"#6366f1\"/></marker></defs>\n            <rect class=\"node\" x=\"6\" y=\"74\" width=\"78\" height=\"30\" rx=\"8\"/><text class=\"h\" x=\"45\" y=\"93\" text-anchor=\"middle\">commit</text>\n            <path class=\"edge-indigo\" d=\"M 84 89 L 106 89\" marker-end=\"url(#aP)\"/>\n            <rect class=\"node-indigo\" x=\"106\" y=\"74\" width=\"80\" height=\"30\" rx=\"8\"/><text class=\"h\" x=\"146\" y=\"93\" text-anchor=\"middle\">1 \u00b7 Build</text>\n            <path class=\"edge-indigo\" d=\"M 186 89 L 208 89\" marker-end=\"url(#aP)\"/>\n            <rect class=\"node-indigo\" x=\"208\" y=\"74\" width=\"86\" height=\"30\" rx=\"8\"/><text class=\"h\" x=\"251\" y=\"93\" text-anchor=\"middle\">2 \u00b7 Scan</text>\n            <text class=\"muted\" x=\"251\" y=\"120\" text-anchor=\"middle\" font-size=\"9\">access \u00b7 fetch \u00b7 secrets</text>\n            <path d=\"M 251 104 L 251 142\" stroke=\"#ef4444\" stroke-width=\"1.4\" fill=\"none\" stroke-dasharray=\"3 3\"/>\n            <rect class=\"node-red\" x=\"218\" y=\"142\" width=\"66\" height=\"24\" rx=\"6\"/><text x=\"251\" y=\"158\" text-anchor=\"middle\" fill=\"#b91c1c\" font-weight=\"600\" font-size=\"11\">block</text>\n            <path class=\"edge-indigo\" d=\"M 294 89 L 316 89\" marker-end=\"url(#aP)\"/>\n            <rect class=\"node-indigo\" x=\"316\" y=\"74\" width=\"86\" height=\"30\" rx=\"8\"/><text class=\"h\" x=\"359\" y=\"93\" text-anchor=\"middle\">3 \u00b7 Compile</text>\n            <path class=\"edge-indigo\" d=\"M 402 89 L 424 89\" marker-end=\"url(#aP)\"/>\n            <rect class=\"node-emerald\" x=\"424\" y=\"74\" width=\"106\" height=\"30\" rx=\"8\"/><text class=\"h\" x=\"477\" y=\"93\" text-anchor=\"middle\" fill=\"#047857\">4 \u00b7 Sandbox URL</text>\n            <text class=\"muted\" x=\"477\" y=\"120\" text-anchor=\"middle\" font-size=\"9\">egress proxy \u00b7 scoped token</text>\n            <path class=\"edge-indigo\" d=\"M 477 104 L 477 144\" marker-end=\"url(#aP)\"/>\n            <rect class=\"node\" x=\"429\" y=\"144\" width=\"96\" height=\"24\" rx=\"6\"/><text class=\"h\" x=\"477\" y=\"160\" text-anchor=\"middle\" font-size=\"11\">5 \u00b7 Audit row</text>\n            <text class=\"muted\" x=\"270\" y=\"192\" text-anchor=\"middle\" font-size=\"10\">scanned \u00b7 sandboxed \u00b7 audited \u00b7 zero personal deploy</text>\n          </svg>"

const TRACE_HTML = "<span class=\"step\">step 1</span> <span class=\"tool\">brain_search</span>(\"maya\") \u2192 <span class=\"hit\">Customer \u00b7 VIP \u00b7 West</span><br/><span class=\"step\">step 2</span> <span class=\"tool\">graph_traverse</span>(orders, recent=30d) \u2192 <span class=\"hit\">Order#42 SLA breach</span><br/><span class=\"step\">step 3</span> <span class=\"tool\">brain_search</span>(\"delivery ticket maya\") \u2192 <span class=\"hit\">Ticket open</span><br/><span class=\"step\">step 4</span> <span class=\"tool\">brain_search</span>(\"region delivery policy\") \u2192 <span class=\"hit\">apology+reship rule</span><br/><span class=\"step\">\u2192</span> assemble + return pack"

const EDGE_SVG = "<svg viewBox=\"0 0 640 330\" xmlns=\"http://www.w3.org/2000/svg\">\n          <defs>\n            <radialGradient id=\"obEgCore\" cx=\"50%\" cy=\"50%\" r=\"65%\">\n              <stop offset=\"0\" stop-color=\"#c7d2fe\"/><stop offset=\"1\" stop-color=\"#a5b4fc\"/>\n            </radialGradient>\n            <marker id=\"obEgA\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto\"><path d=\"M1 1 L9 5 L1 9 Z\" fill=\"#10b981\"/></marker>\n          </defs>\n          <circle cx=\"240\" cy=\"168\" r=\"150\" fill=\"none\" stroke=\"#7c3aed\" stroke-width=\"1.6\" stroke-dasharray=\"7 6\"/>\n          <circle cx=\"240\" cy=\"168\" r=\"112\" fill=\"#eef2ff\" stroke=\"#c7d2fe\" stroke-width=\"1.4\"/>\n          <circle cx=\"240\" cy=\"168\" r=\"64\" fill=\"url(#obEgCore)\"/>\n          <text x=\"240\" y=\"163\" text-anchor=\"middle\" style=\"font-family:'Plus Jakarta Sans';font-weight:800;font-size:13px;fill:#312e81\">Public internet</text>\n          <text x=\"240\" y=\"180\" text-anchor=\"middle\" style=\"font-family:'Inter';font-size:9.5px;fill:#4338ca\">what every AI knows</text>\n          <text x=\"240\" y=\"80\" text-anchor=\"middle\" style=\"font-family:'Inter';font-size:10px;fill:#4f46e5\">licensed expert data</text>\n          <text x=\"240\" y=\"12\" text-anchor=\"middle\" style=\"font-family:'JetBrains Mono';font-size:8.5px;letter-spacing:.6px;fill:#7c3aed\">GROWS WITH EVERY AI RELEASE</text>\n          <g style=\"font-family:'Inter';font-size:10.5px;font-weight:600;fill:#0f172a\">\n            <text x=\"475\" y=\"96\">your operations</text>\n            <text x=\"490\" y=\"128\">your corrections</text>\n            <text x=\"498\" y=\"160\">your customer history</text>\n            <text x=\"490\" y=\"192\">your judgment calls</text>\n            <text x=\"475\" y=\"224\">your way of working</text>\n          </g>\n          <path d=\"M 392 168 q 22 0 40 0\" fill=\"none\" stroke=\"#10b981\" stroke-width=\"2\" marker-end=\"url(#obEgA)\"/>\n          <rect x=\"404\" y=\"248\" width=\"216\" height=\"58\" rx=\"12\" fill=\"#ecfdf5\" stroke=\"#6ee7b7\" stroke-width=\"1.4\"/>\n          <text x=\"512\" y=\"272\" text-anchor=\"middle\" style=\"font-family:'Plus Jakarta Sans';font-weight:800;font-size:12px;fill:#065f46\">THE EDGE</text>\n          <text x=\"512\" y=\"290\" text-anchor=\"middle\" style=\"font-family:'Inter';font-size:9.5px;fill:#047857\">your people + AI create value here</text>\n          <circle cx=\"418\" cy=\"110\" r=\"4\" fill=\"#10b981\"/><circle cx=\"434\" cy=\"142\" r=\"4\" fill=\"#10b981\"/>\n          <circle cx=\"440\" cy=\"174\" r=\"4\" fill=\"#10b981\"/><circle cx=\"434\" cy=\"206\" r=\"4\" fill=\"#10b981\"/>\n          <circle cx=\"418\" cy=\"238\" r=\"4\" fill=\"#10b981\"/>\n        </svg>"

/*
 * The running order, stated once and enforced.
 *
 * The slides below were written in the order the port worked through them, which is NOT the order
 * the deck runs in — diagram-heavy sections were left for a later pass and appended when they were
 * done. Relying on where a block happens to sit in this file is how a deck ships with its root-cause
 * slide after the appendix divider. The array is the source of truth; a slide missing from it, or
 * an id in it with no slide, fails the build.
 */
const ORDER = [
  'cover',
  'unblock',
  'viewpoint',
  'the-shift',
  'six-walls',
  'root-cause',
  'what-synos-is',
  'ai-builds-it',
  'workflow-from-english',
  'ask-anything',
  'no-migration',
  'honest-question',
  'sme-authoring',
  'templated-brains',
  'two-mondays',
  'why-it-compounds',
  'the-edge',
  'what-teams-get',
  'the-payoff',
  'early-pilots',
  'transformation-arc',
  'graduated-trust',
  'safe-by-design',
  'no-lock-in',
  'how-it-lands',
  'the-outcome',
  'to-the-demo',
  'appendix-divider',
  'operating-layer',
  'six-capabilities',
  'architecture',
  'memory-types',
  'retrieval',
  'governance',
  'compounding-flywheel',
  'data-flywheel',
  'operational-data',
  'safe-to-build',
  'enterprise-readiness',
  'why-synos',
  'closing',
  'apx-horizons',
  'apx-the-moat',
]


export const deck = (K) => {
  const {
    SlideFrame,
    SlideHeader,
    CoverSlide,
    BigTypeSlide,
    Eyebrow,
    Callout,
    Caption,
    Chip,
    ChipRow,
    Tile,
    TileRow,
    UseCaseCard,
    UseCaseGrid,
    WallCard,
    WallGrid,
    PillarCard,
    PillarGrid,
    StepCard,
    StepGrid,
    StatCard,
    StatRow,
    PhaseCard,
    PhaseRow,
    SplitColumns,
    SplitColumn,
    SplitItem,
    Stack,
    Columns,
  } = K

  const slides = [
    /* ── 1 · Cover ────────────────────────────────────────────────────────
     * `.cover` + `.tag-row` of four `.pill`s. CoverSlide takes the pills as children; the source's
     * `.sub` is the lede, because this is a deck that gets SENT as often as it is presented. */
    {
      id: 'cover',
      node: (
        <CoverSlide
          stage={false}
          eyebrow="Synos"
          eyebrowTone="indigo"
          spacedEyebrow={false}
          title={
            <>
              Put your team's AI to work — <span className="sk-a">across your whole company</span>.
            </>
          }
          lede={
            <>
              Your people already use AI on their own laptops. Synos turns that into shared,
              always-on help for Sales, Marketing and Ops — help that knows <em>your</em> business,
              follows your rules, and gets better every week.
            </>
          }
        >
          <ChipRow center className="dk-gap">
            <Chip size="pill">Works with your tools</Chip>
            <Chip size="pill">Nothing goes out without approval</Chip>
            <Chip size="pill">Your data stays yours</Chip>
            <Chip size="pill">Live in weeks</Chip>
          </ChipRow>
        </CoverSlide>
      ),
    },

    /* ── 2 · The one idea ─────────────────────────────────────────────────
     * The unblock diagram. In the source this is `<img src="../blogs/…png">` — a path outside the
     * presentations directory, which resolves on the authoring machine and arrives BROKEN in a
     * buyer's inbox. Here the image is imported, so esbuild embeds it as a data: URI and shipping
     * that mistake is impossible. */
    {
      id: 'unblock',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            className="ob-center"
            eyebrow="The one idea"
            eyebrowTone="indigo"
            title="Unblock your humans, your agents, and your systems — from each other."
          />
          <div className="ob-hero">
            <img src={unblockDiagram} alt="Humans, agents and systems freed from each other, with Synos as the shared layer in the middle" />
          </div>
          <Caption italic>Synos is the shared layer in the middle.</Caption>
        </SlideFrame>
      ),
    },

    /* ── 3 · Our viewpoint ────────────────────────────────────────────────
     * `.belief-cols` is a two-column old-world / new-world contrast, which is exactly what
     * SplitColumns is for — it is the kit's *contrast* component, with its own label vocabulary. */
    {
      id: 'viewpoint',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Our Viewpoint"
            eyebrowTone="indigo"
            title="Every company operates differently. SaaS forced you to operate the same."
            subtitle="The old deal: buy the common 80%, use a fraction of it, and never get the 20% that's actually you."
          />
          <SplitColumns>
            <SplitColumn
              tone="neutral"
              eyebrow="The old world · SaaS"
              title={
                <>
                  80% common features — shipped.
                  <br />
                  20% custom to you — never built.
                </>
              }
            >
              <SplitItem marker="×">
                You bought the platform and bent your operations to fit it. You used a fraction of
                the feature list. The 20% unique to how you run was never the vendor's job to build.
              </SplitItem>
              <Caption mono>CRM SaaS · Marketing SaaS · Ops SaaS · …</Caption>
            </SplitColumn>
            <SplitColumn
              tone="violet"
              eyebrow="The new world · AI-built on your brain"
              title={
                <>
                  Software + AI helpers built for <em>your</em> way of working.
                </>
              }
            >
              <SplitItem marker="✓">
                Your team describes the work in plain English; AI builds it — on top of a shared
                memory that knows your business. The 20% you always needed, finally yours.
              </SplitItem>
              <Caption mono>Claude Code · ChatGPT · Codex · …</Caption>
            </SplitColumn>
          </SplitColumns>
          <Callout tone="indigo" className="dk-gap-sm">
            <strong>The AI itself isn't the advantage.</strong> The shared memory of how{' '}
            <em>your</em> company runs is. Swap the AI whenever a better one arrives — you keep
            everything it has learned about your business.
            <ChipRow className="dk-gap-sm">
              <Chip size="sm">Anthropic</Chip>
              <Chip size="sm">OpenAI</Chip>
              <Chip size="sm">Gemini</Chip>
              <Chip size="sm" tone="indigo">In your control</Chip>
            </ChipRow>
          </Callout>
        </SlideFrame>
      ),
    },

    /* ── 4 · The shift ────────────────────────────────────────────────────
     * `.shift-row` is a badge beside a line of prose, three times. Composed from Chip + text on the
     * kit's column grid rather than given a component: three rows on one slide is not a pattern. */
    {
      id: 'the-shift',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="The Shift"
            eyebrowTone="indigo"
            title="Individuals are already winning with AI. The team isn't compounding."
            subtitle="Great work — but it lives on one laptop, in one account. Nothing shared, nothing building on the last win."
          />
          <Stack gap="snug">
            {[
              [
                'ChatGPT · Claude',
                <>
                  A marketer drafts a full campaign plan and content calendar from a chat window.{' '}
                  <strong>Lives in her account.</strong>
                </>,
              ],
              [
                'Claude Code',
                <>
                  An ops lead pastes a raw warehouse key, asks for last week's anomalies as a
                  report. <strong>Runs on his laptop.</strong>
                </>,
              ],
              [
                'Codex',
                <>
                  An analyst scripts a Slack-to-Sheets bot to chase pending tasks.{' '}
                  <strong>Runs on his machine, alone.</strong>
                </>,
              ],
            ].map(([badge, line]) => (
              <div className="ob-row" key={badge}>
                <Chip mono tone="indigo">{badge}</Chip>
                <p>{line}</p>
              </div>
            ))}
          </Stack>
          <Callout tone="red" className="dk-gap">
            The individual is unblocked.{' '}
            <strong>
              The team is blocked from sharing and compounding the AI transformation — and walled
              off from real company value.
            </strong>
          </Callout>
        </SlideFrame>
      ),
    },

    /* ── 5 · The six walls ────────────────────────────────────────────────
     * WallGrid / WallCard, using the richer four-slot form the buyer decks need. */
    {
      id: 'six-walls',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Why AI Transformation Stalls"
            eyebrowTone="red"
            title="Six walls between a clever demo and real company value."
            subtitle="It's not the model. It's everything the model needs around it to be safe, shared, and worth trusting."
          />
          <WallGrid>
            <WallCard
              num="1"
              title="No shared memory"
              body="AI forgets your business every session; corrections die in chat history."
              quote="“Why do I re-explain our hubs, SLAs and last week's fix every single time?”"
            />
            <WallCard
              num="2"
              title="No safe access to systems"
              body="Reaching real data means raw keys on a laptop — no permissions, no audit."
              quote="“How do I even get to that warehouse table for analytics — safely?”"
            />
            <WallCard
              num="3"
              title="Nowhere safe to put it"
              body="Apps and their data end up in personal accounts. No safe home, no off-switch."
              quote="“Where does this app — and its data — actually live?”"
            />
            <WallCard
              num="4"
              title="Skills don't compound"
              body="No shared library. Everyone rebuilds the same skill or app; nothing is reused or scheduled."
              quote="“Sarah built this skill last month — why am I starting from scratch?”"
            />
            <WallCard
              num="5"
              title="Engineering gets overloaded"
              body="Every access request, guardrail and deploy routes through eng — they become the bottleneck."
              quote="“Why is every team's automation now a ticket in my backlog?”"
            />
            <WallCard
              num="6"
              title="No learning, no visibility"
              body="Outputs lost in Sheets and DMs. Who ran what, what's working — invisible."
              quote="“Did that even help? And is anyone else getting value from it?”"
            />
          </WallGrid>
        </SlideFrame>
      ),
    },

    /* ── 7 · What Synos is ────────────────────────────────────────────────
     * `.three-box` maps to UseCaseGrid: `.tb-kind` is the kicker, `h3` the title, `p` the body.
     * (Section 6, the scattered-context SVG, is deliberately not here yet — see the report.) */
    {
      id: 'what-synos-is',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="What Synos Is"
            eyebrowTone="indigo"
            title="A company brain, safe hands, and a place to build."
            subtitle="One shared foundation underneath every AI tool your teams already use."
          />
          <UseCaseGrid>
            <UseCaseCard
              tone="indigo"
              kicker="A company brain"
              title="Knows how you operate"
              body="Your data, documents and decisions — organised into one living memory every AI tool can draw on. It accumulates and gets better with use."
            />
            <UseCaseCard
              tone="emerald"
              kicker="Safe hands"
              title="Acts in your systems, safely"
              body="AI can look things up and take actions across your tools through one safe, logged door — with permissions and an off-switch. No passwords floating around on laptops."
            />
            <UseCaseCard
              tone="violet"
              kicker="A place to build"
              title="Apps & assistants your team owns"
              body="Turn a task into a shared app or an assistant that runs on its own — built by your team, kept inside your business."
            />
          </UseCaseGrid>
          <Caption italic className="dk-gap-sm">
            Let your people work in their own tools. We handle the hard infrastructure underneath.
          </Caption>
        </SlideFrame>
      ),
    },
    /* ── 8 · AI builds it ─────────────────────────────────────────────────
     * A prompt on the left, an arrow, and a product mock on the right. The mock is an
     * ILLUSTRATION — a picture of a screen — so it is deck-local CSS, the same call the kit made
     * for the SVG diagrams. The keyband and the closing note are local for the same reason: both
     * are full-width tinted bands with a specific gradient this deck uses three times. */
    {
      id: 'ai-builds-it',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="AI Builds It — Not Your Backlog"
            eyebrowTone="indigo"
            title="Describe a full application. AI writes it in minutes."
            subtitle="One plain-English brief — the AI builds the whole thing: screens, logic, charts, and rules — wired to your live data. No engineers, no six-month roadmap."
          />
          <div className="ob-keyband">
            <p>
              <strong>
                AI is already brilliant at building apps and workflows — it just can't safely reach
                your systems or truly understand your business.
              </strong>{' '}
              <em>Synos already has both wired in</em> — so the moment someone describes what they
              want, it just works on your real data.
            </p>
          </div>
          <div className="ob-two-mock dk-gap-sm">
            <div className="ob-prompt">
              <div className="ob-prompt-txt">
                <span className="ob-you">You describe · plain English</span>
                “Build me a <b>store-performance app</b>: daily sales vs target by region, flag any
                store 10%+ below target for 3 days, show top &amp; bottom SKUs, and let managers add
                a note on each flag.”
              </div>
            </div>
            <div className="ob-becomes">→</div>
            <div className="ob-mock">
              <div className="ob-mock-chrome">
                <div className="ob-mock-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="ob-mock-url">synos · store-performance · built by AI</div>
              </div>
              <div className="ob-mock-body">
                <div className="ob-kpi-row">
                  <div className="ob-kpi">
                    <b>₹4.2Cr</b>
                    <span>Today · sales</span>
                  </div>
                  <div className="ob-kpi">
                    <b className="up">+6%</b>
                    <span>vs target</span>
                  </div>
                  <div className="ob-kpi">
                    <b className="down">3</b>
                    <span>stores flagged</span>
                  </div>
                </div>
                <div className="ob-bars">
                  {[
                    ['', 80], ['good', 100], ['', 72], ['hot', 38],
                    ['', 88], ['good', 95], ['hot', 44], ['', 76],
                  ].map(([kind, h], i) => (
                    <i key={i} className={kind} style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="ob-flag">
                  <span className="ob-dot" />
                  <span>
                    <b>Pune Camp</b> — 14% below target for 3 days · manager note: “festival stock
                    delayed”
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="ob-capnote dk-gap-sm">
            The AI wrote the app; <em>Synos gave it the safe access and business context to make it
            real.</em> That's why a non-engineer can do this in minutes.
          </div>
        </SlideFrame>
      ),
    },

    /* ── 9 · Plain English to a workflow ──────────────────────────────────
     * Same shape as slide 8, violet register, and the mock body is a workflow trace rather than a
     * dashboard. Note the source repeats the keyband copy verbatim across both slides — flagged in
     * the report rather than deduplicated here, because that is a content call. */
    {
      id: 'workflow-from-english',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Plain English → an AI Workflow"
            eyebrowTone="violet"
            title="Describe an agentic AI workflow — it runs the steps for you."
            subtitle="One sentence becomes a multi-step AI worker that thinks, acts across your systems, and stops for a human before anything leaves the building."
          />
          <div className="ob-keyband">
            <p>
              <strong>
                AI is already brilliant at building apps and workflows — it just can't safely reach
                your systems or truly understand your business.
              </strong>{' '}
              <em>Synos already has both wired in</em> — so the moment someone describes what they
              want, it just works on your real data.
            </p>
          </div>
          <div className="ob-two-mock dk-gap-sm">
            <div className="ob-prompt ob-prompt--violet">
              <div className="ob-prompt-txt">
                <span className="ob-you">You describe · plain English</span>
                “When a new lead comes in, <b>research the account</b>, draft a personalized reply,
                log it in the CRM, and WhatsApp me to approve before it sends.”
              </div>
            </div>
            <div className="ob-becomes">→</div>
            <div className="ob-mock">
              <div className="ob-mock-chrome">
                <div className="ob-mock-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="ob-mock-url">synos · lead-response-workflow · live</div>
              </div>
              <div className="ob-mock-body">
                <div className="ob-flow">
                  <div className="ob-step">
                    <span className="ob-step-n">1</span>
                    <span>
                      <b>Researches the account</b> — history, past orders, open tickets
                    </span>
                  </div>
                  <div className="ob-step">
                    <span className="ob-step-n">2</span>
                    <span>
                      <b>Drafts a tailored reply</b> in your tone, with the right offer
                    </span>
                  </div>
                  <div className="ob-step">
                    <span className="ob-step-n">3</span>
                    <span>
                      <b>Logs it in the CRM</b> and sets a follow-up
                    </span>
                  </div>
                  <div className="ob-step ob-step--approve">
                    <span className="ob-step-n">✓</span>
                    <span>
                      <b>WhatsApps you to approve</b>{' '}
                      <Chip size="sm" tone="emerald">WhatsApp</Chip> — tap send, or edit first
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ob-capnote dk-gap-sm">
            The AI designed the workflow;{' '}
            <em>Synos gave it safe access to your systems and the context to run it right</em> —
            always with a human check.
          </div>
        </SlideFrame>
      ),
    },

    /* ── 10 · Ask anything ────────────────────────────────────────────────
     * One mock containing two question-and-answer pairs side by side. `Columns` supplies the
     * geometry inside the mock body, which is the point of having it in the kit. */
    {
      id: 'ask-anything',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Ask Anything"
            eyebrowTone="indigo"
            title="Your company can answer — about the business, and about itself."
            subtitle="Everything runs on one connected brain. So anyone can ask in plain English and get a straight answer — whether it's a business question or “how do we do this in Synos?” Like onboarding someone who already knows both."
          />
          <div className="ob-mock">
            <div className="ob-mock-chrome">
              <div className="ob-mock-dots">
                <span />
                <span />
                <span />
              </div>
              <div className="ob-mock-url">synos · ask your company</div>
            </div>
            <div className="ob-mock-body">
              <Columns gap="snug">
                <div>
                  <div className="ob-prompt">
                    <div className="ob-prompt-txt">
                      <span className="ob-you">About the business</span>
                      “How did our Diwali campaign do vs last year, and what drove it?”
                    </div>
                  </div>
                  <div className="ob-ans">
                    <p>
                      Revenue <b>+18%</b> — led by large appliances (<b>+31%</b>) and audio. Two
                      West stores lagged on stock.
                    </p>
                    <div className="ob-src-row">
                      <span className="ob-lbl">From</span>
                      <Chip size="sm" tone="indigo">Warehouse</Chip>
                      <Chip size="sm" tone="indigo">CRM</Chip>
                      <Chip size="sm" tone="indigo">Ad platforms</Chip>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="ob-prompt">
                    <div className="ob-prompt-txt">
                      <span className="ob-you">About running Synos</span>
                      “What assistants run for Sales — and how do I add one for win-backs?”
                    </div>
                  </div>
                  <div className="ob-ans">
                    <p>
                      Three are live: <b>lead-response, quote-follow-up, renewal-nudge</b>. To add
                      win-backs, just describe it — I can set it up now.
                    </p>
                    <div className="ob-src-row">
                      <span className="ob-lbl">From</span>
                      <Chip size="sm" tone="indigo">Your Synos setup</Chip>
                      <Chip size="sm" tone="indigo">Skills library</Chip>
                      <Chip size="sm" tone="indigo">This workspace</Chip>
                    </div>
                  </div>
                </div>
              </Columns>
            </div>
          </div>
          <div className="ob-capnote dk-gap-sm">
            The brain knows your business <em>and</em> how your company runs Synos —{' '}
            <em>so it can answer questions and help you operate it, in the same breath.</em>
          </div>
        </SlideFrame>
      ),
    },
    /* ── 11 · No migration ────────────────────────────────────────────────
     * `.tool-chip` is exactly the kit's `Tile` at `md` — this is the slide the component was
     * measured from. The connector row below it is Eyebrow + ChipRow, unchanged. */
    {
      id: 'no-migration',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="No Migration, No New Habits"
            eyebrowTone="indigo"
            title="Your people keep working in the tools they already love."
            subtitle="Synos sits underneath — making every one of them safe, shared, and always-on."
          />
          <TileRow>
            <Tile name="ChatGPT" kind="marketing · sales" />
            <Tile name="Claude Code" kind="ops · analysts" />
            <Tile name="Codex" kind="analysts · eng" />
            <Tile name="Slack" kind="everyone" />
            <Tile name="WhatsApp" kind="field · ops" />
          </TileRow>
          <Caption className="dk-gap-sm">▼ all run on the same shared foundation ▼</Caption>
          <div className="dk-gap-sm">
            <Eyebrow tone="muted">
              Connected to your existing stack out of the box — not replaced
            </Eyebrow>
            <ChipRow tight className="dk-gap-sm">
              <Chip mono>Warehouse · BigQuery</Chip>
              <Chip mono>CRM · Salesforce · HubSpot</Chip>
              <Chip mono>Sheets · Docs · Notion</Chip>
              <Chip mono>Drive · S3</Chip>
              <Chip mono>Slack · Email · WhatsApp</Chip>
              <Chip mono>Ads · GA</Chip>
              <Chip mono>Tickets · Internal APIs</Chip>
            </ChipRow>
          </div>
        </SlideFrame>
      ),
    },

    /* ── 12 · The honest question ─────────────────────────────────────────
     * `.why-card` is an icon, a heading and a paragraph, three across — UseCaseGrid, with the
     * icons dropped. The kit's UseCaseCard has no icon slot and should not grow one for this: the
     * three glyphs here (a brain, a shield, a person) restate their own headings and carry no
     * information the heading does not. Decision C removed decoration that was doing no work;
     * this is the same call. Recorded in the report as a deliberate loss, not an oversight. */
    {
      id: 'honest-question',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="The Honest Question"
            eyebrowTone="indigo"
            title="“Why not just ChatGPT or Claude Code?”"
            subtitle={
              <>
                Because those are the driver. The hard part is everything the driver needs to run{' '}
                <em>your</em> company — safely, and shared across the team. Keep them; Synos is the
                layer underneath.
              </>
            }
          />
          <UseCaseGrid>
            <UseCaseCard
              tone="indigo"
              title="A chat window forgets your business"
              body="Every session starts blank. What one person teaches it stays in their account — and leaves when they do. Synos gives the whole team one shared memory that sticks."
            />
            <UseCaseCard
              tone="emerald"
              title="To help, it needs your data — safely"
              body="On its own, that means pasting sensitive data or passwords into a chat. Synos is the one safe, logged door to your systems — with permissions and an instant off-switch."
            />
            <UseCaseCard
              tone="violet"
              title="It helps one person, on demand"
              body="Great tools — but still one person, one request at a time. Synos turns them into always-on assistants the whole team shares, running on a schedule with approvals."
            />
          </UseCaseGrid>
          <div className="ob-capnote dk-gap-sm">
            Keep ChatGPT, Claude Code, Copilot — bring any of them.{' '}
            <em>
              Synos is the layer underneath that makes them work on your company — and lets you swap
              the AI anytime without losing what it has learned.
            </em>
          </div>
        </SlideFrame>
      ),
    },
    /* ── 13 · The handoff nobody solves ───────────────────────────────────
     * `.sme-lanes` is IT-owns versus experts-own — a genuine contrast, so SplitColumns rather than
     * two cards side by side. The four `.sme-how` cards are StepCards at 4-up. Only the "today"
     * chain stays local: five states with connector arrows is a picture of a process. */
    {
      id: 'sme-authoring',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="The Handoff Nobody Solves"
            eyebrowTone="violet"
            title="Your experts build the agents. IT just sets the rails."
            subtitle="The rules that make an agent right sit with the people doing the work — your ops leads, analysts, marketers, support veterans. Today those rules only reach a working system through an engineer, and that queue is where AI projects die."
          />
          <div className="ob-chain">
            <span className="ob-chain-k">Today</span>
            <div className="ob-chain-links">
              <span className="s">expert explains the rule</span>
              <span className="a">→</span>
              <span className="s">ticket or doc</span>
              <span className="a">→</span>
              <span className="s">engineer interprets it</span>
              <span className="a">→</span>
              <span className="s">v1 misses the exception</span>
              <span className="a">→</span>
              <span className="s bad">back in the queue</span>
            </div>
            <span className="ob-chain-t">weeks per change · the real rules stay in heads</span>
          </div>
          <SplitColumns className="dk-gap-sm">
            <SplitColumn
              tone="indigo"
              eyebrow="IT / engineering owns · set up once"
              title="The rails"
            >
              <SplitItem>Which systems the AI can see, and which it can't</SplitItem>
              <SplitItem>
                What it's allowed to do on its own, and what needs a human to approve
              </SplitItem>
              <SplitItem>Permissions, full activity log, spend limits, instant off-switch</SplitItem>
              <SplitItem>The check that must pass before anything goes live</SplitItem>
              <Caption>A one-time setup they own — not a new project for every request.</Caption>
            </SplitColumn>
            <SplitColumn tone="violet" eyebrow="Your experts own · every day" title="The know-how">
              <SplitItem>How we do this, written in plain English — no code</SplitItem>
              <SplitItem>
                The rules, the exceptions, the judgment calls, captured as they come up
              </SplitItem>
              <SplitItem>
                Corrections on the AI's drafts — each one teaches it permanently
              </SplitItem>
              <SplitItem>“Here are ten real cases — get them right”</SplitItem>
              <Caption>
                No ticket, no waiting. Inside the rails, there is nothing they can break.
              </Caption>
            </SplitColumn>
          </SplitColumns>
          <StepGrid columns={4} className="dk-gap-sm">
            <StepCard
              bar={false}
              num="1"
              title="Rails set up once"
              body="IT decides what the AI can see and do. Everything your team writes on top of that is safe by design."
            />
            <StepCard
              bar={false}
              num="2"
              title="Your expert writes it in plain English"
              body="In chat or Slack: “Billing escalations from top-tier accounts never go by SMS — email finance first.” Saved as a rule the AI follows."
            />
            <StepCard
              bar={false}
              num="3"
              title="Corrections while working"
              body="Edit the AI's draft the way you'd fix a junior's. The change is remembered — that's how tribal knowledge finally gets written down."
            />
            <StepCard
              bar={false}
              num="4"
              title="Tried out, then trusted"
              body="Run it against past real cases, check the results, then let it go from suggesting → reviewed → running on its own. Reversible at any point."
            />
          </StepGrid>
          <div className="ob-band-violet dk-gap-sm">
            <strong>The handoff disappears.</strong> The person who knows the work is the one who
            teaches the system — and IT moves from writing down other people's rules to owning the
            rails and reviewing what goes live.
          </div>
        </SlideFrame>
      ),
    },
    /* ── 14 · Templated brains ────────────────────────────────────────────
     * Six `.template` cards: an icon, a name, a vertical, and a list. UseCaseGrid holds them —
     * `.t-vertical` is the kicker, and the list goes in the body. The custom-brain card takes
     * Six DIFFERENT hues, deliberately. The first pass dropped the source's per-card icons and
     * left every card the same colour — and the A/B against the source showed that was wrong: six
     * near-identical cards are hard to scan, and each icon's hue was doing real work telling them
     * apart. The distinction is restored through the kit's tones instead of six glyphs, so the
     * information survives and the decoration does not. */
    {
      id: 'templated-brains',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Templated Brains"
            eyebrowTone="indigo"
            title="A starting brain for every operating team."
            subtitle="Pre-built for the functions a lean consumer company runs — live in weeks, then tuned to you."
          />
          <UseCaseGrid>
            <UseCaseCard
              tone="indigo"
              kicker="Revenue · Pipeline"
              title="Sales Brain"
              body={
                <ul className="ob-tpl-list">
                  <li>Lead triage &amp; instant follow-up</li>
                  <li>AI battlecards &amp; objection handling</li>
                  <li>Pipeline hygiene &amp; deal nudges</li>
                  <li>Account &amp; competitor context</li>
                </ul>
              }
            />
            <UseCaseCard
              tone="amber"
              kicker="Growth · Demand"
              title="Marketing Brain"
              body={
                <ul className="ob-tpl-list">
                  <li>Campaign planning &amp; decisioning</li>
                  <li>Content &amp; creative drafting</li>
                  <li>Channel &amp; ROAS performance digests</li>
                  <li>Audience &amp; cohort context</li>
                </ul>
              }
            />
            <UseCaseCard
              tone="emerald"
              kicker="Operations · SOPs"
              title="Internal Ops Brain"
              body={
                <ul className="ob-tpl-list">
                  <li>Weekly ops digests &amp; exceptions</li>
                  <li>SOP capture &amp; playbook lookup</li>
                  <li>Vendor / supply / fleet monitoring</li>
                  <li>Incident &amp; escalation handling</li>
                </ul>
              }
            />
            <UseCaseCard
              tone="red"
              kicker="FP&amp;A · Spend"
              title="Finance Brain"
              body={
                <ul className="ob-tpl-list">
                  <li>Budget &amp; spend pacing</li>
                  <li>Margin &amp; unit-economics watch</li>
                  <li>Anomaly &amp; variance alerts</li>
                </ul>
              }
            />
            <UseCaseCard
              tone="violet"
              kicker="Customer · Retention"
              title="Support / CX Brain"
              body={
                <ul className="ob-tpl-list">
                  <li>Ticket triage &amp; drafted replies</li>
                  <li>Voice-of-customer themes</li>
                  <li>Churn &amp; CSAT signal watch</li>
                </ul>
              }
            />
            <UseCaseCard
              tone="violet"
              kicker="The 20% that's you"
              title="Your custom brain"
              body={
                <ul className="ob-tpl-list">
                  <li>Whatever your business runs on</li>
                  <li>Built on the same rails</li>
                  <li>Owned and extended by your team</li>
                </ul>
              }
            />
          </UseCaseGrid>
          <div className="ob-capnote dk-gap-sm">
            <strong>Templates are the starting point, not the ceiling.</strong> Each ships day-one
            and then <em>compounds on your data and your corrections</em> until it operates the way
            you do.
          </div>
        </SlideFrame>
      ),
    },

    /* ── 15 · A day in the difference ─────────────────────────────────────
     * The same `.belief-cols` contrast as slide 3, so the same SplitColumns. Two slides using one
     * component the same way is the argument for the component. */
    {
      id: 'two-mondays',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="A Day in the Difference"
            eyebrowTone="indigo"
            title="Same lead. Same team. Two very different Mondays."
            subtitle="What changes isn't the people — it's whether the work waited for them."
          />
          <SplitColumns>
            <SplitColumn
              tone="neutral"
              eyebrow="Today · the work waits"
              title="A lead comes in Friday, 6pm."
            >
              <SplitItem marker="×">
                It sits over the weekend. Monday, someone finally notices, pieces the account
                history together across three different tools, then writes a reply.
              </SplitItem>
              <SplitItem marker="×">
                <strong>First contact: ~62 hours later — if it isn't missed entirely.</strong>
              </SplitItem>
            </SplitColumn>
            <SplitColumn
              tone="violet"
              eyebrow="With Synos · the work is ready"
              title="A lead comes in Friday, 6pm."
            >
              <SplitItem marker="✓">
                An assistant pulls the full history, drafts a tailored reply, and queues it. Monday
                9am your rep reads it, adjusts a line, and sends.
              </SplitItem>
              <SplitItem marker="✓">
                <strong>First contact: minutes — every time, even after hours.</strong>
              </SplitItem>
            </SplitColumn>
          </SplitColumns>
          <Callout tone="indigo" className="dk-gap">
            Nobody worked the weekend. The people didn't change —{' '}
            <em>the work simply stopped waiting on them.</em>
          </Callout>
        </SlideFrame>
      ),
    },
    /* ── 16 · Why it compounds ────────────────────────────────────────────
     * The loop diagram, carried across verbatim. Its CSS is in ops-buyer.css, re-pointed at
     * tokens; the source's dash ANIMATION is dropped, because a deck exported to PDF freezes
     * mid-animation and the export has to be deterministic. */
    {
      id: 'why-it-compounds',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="Why It Compounds"
            eyebrowTone="violet"
            title="What compounds is the record of how your company works."
            subtitle="Your people correct. The AI acts. Your systems report what actually happened. Every turn builds something no public AI can ever learn on its own — and it keeps paying off no matter which AI you use next year."
          />
          <div className="ob-loop" dangerouslySetInnerHTML={{ __html: LOOP_SVG }} />
          <Caption className="dk-gap-sm">
            Live today at a martech design partner: every correction an operator makes feeds one
            shared memory their whole platform gets smarter from.{' '}
            <strong>This is knowledge no outside AI can have — and it stays with you.</strong>
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 17 · Where value gets created ────────────────────────────────────
     * Diagram on the left, three points on the right, a quotation underneath. The three points are
     * a bordered list rather than cards — kept local, because a left-ruled point is the source's
     * own shape and the kit's Callout would restate it at a different weight. */
    {
      id: 'the-edge',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Where Value Gets Created Now"
            eyebrowTone="indigo"
            title="New value gets created at the edge of what AI already knows."
            subtitle="Public AI knows the public internet. It doesn't know your customers, your exceptions or your judgment. That's where your people create value — and on Synos, everything they create teaches your AI."
          />
          <div className="ob-edge">
            <div className="ob-edge-svg" dangerouslySetInnerHTML={{ __html: EDGE_SVG }} />
            <div className="ob-edge-side">
              <div className="ob-edge-pt">
                <h3>Your people move faster</h3>
                <p>Work runs at AI speed — on your own context, not generic answers off the internet.</p>
              </div>
              <div className="ob-edge-pt ob-edge-pt--em">
                <h3>The edge is yours alone</h3>
                <p>
                  The decisions, corrections and outcomes created here exist nowhere else — not in
                  any AI, not at any competitor.
                </p>
              </div>
              <div className="ob-edge-pt ob-edge-pt--vi">
                <h3>Doing the work improves the AI</h3>
                <p>
                  Every bit of that work feeds back: your assistants and your shared memory get
                  better as the team simply does its job.
                </p>
              </div>
            </div>
          </div>
          <div className="ob-edge-quote dk-gap-sm">
            “You can offload a task, or even a job — <strong>you can never offload your
            learning.</strong>” As AI makes expertise cheap, the lasting advantage moves from the AI
            to the learning loop you own. — <strong>Satya Nadella, 2026</strong>
          </div>
        </SlideFrame>
      ),
    },

    /* ── 18 · What your teams get ─────────────────────────────────────────
     * Three outcome columns, each a heading, a tag, a list and a result line. UseCaseGrid again,
     * with the result line as a Caption inside the card body — and one hue per column, which is
     * the lesson from slide 14: a set of near-identical cards needs colour to be scannable. */
    {
      id: 'what-teams-get',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="What Your Teams Get"
            eyebrowTone="emerald"
            title="Run leaner and faster — where it shows up on the P&L."
            subtitle="The same team, doing more — because the repetitive work runs itself and the judgement work is better-informed."
          />
          <UseCaseGrid>
            <UseCaseCard
              tone="indigo"
              kicker="Revenue"
              title="Sales Ops"
              body={
                <>
                  <ul className="ob-tpl-list">
                    <li>Leads followed up instantly, not next day</li>
                    <li>Every rep armed with live battlecards</li>
                    <li>Pipeline kept clean without nagging</li>
                  </ul>
                  <div className="ob-result">↑ Higher conversion &amp; revenue per rep</div>
                </>
              }
            />
            <UseCaseCard
              tone="amber"
              kicker="Demand"
              title="Marketing Ops"
              body={
                <>
                  <ul className="ob-tpl-list">
                    <li>Campaigns planned &amp; launched faster</li>
                    <li>More content, on-brand, less manual effort</li>
                    <li>Spend steered by always-on performance reads</li>
                  </ul>
                  <div className="ob-result">↑ More qualified leads &amp; better ROAS</div>
                </>
              }
            />
            <UseCaseCard
              tone="emerald"
              kicker="Efficiency"
              title="Internal Ops"
              body={
                <>
                  <ul className="ob-tpl-list">
                    <li>Manual reporting &amp; monitoring runs itself</li>
                    <li>Issues caught early, fewer fire-drills</li>
                    <li>Institutional knowledge survives churn</li>
                  </ul>
                  <div className="ob-result">↑ Leaner ops, faster cycles, fewer errors</div>
                </>
              }
            />
          </UseCaseGrid>
          <Caption italic className="dk-gap-sm">
            The compounding effect: the brain gets smarter, the assistants do more, and the team's
            leverage grows every quarter — without growing headcount at the same rate.
          </Caption>
        </SlideFrame>
      ),
    },
    /* ── 19 · The payoff ──────────────────────────────────────────────────
     * Four big numbers with a line each. StatCard / StatRow is exactly this and the kit already
     * has it — the source's `.vision-pill` with an inline 26px override is a stat card that had
     * not been recognised as one. */
    {
      id: 'the-payoff',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="The Payoff"
            eyebrowTone="emerald"
            title="What a team tends to feel in the first quarter."
            subtitle="Illustrative targets from early pilots — not a promise, but what we point a first workflow at."
          />
          <StatRow columns={4}>
            <StatCard value="~5 hrs" label="per person, per week, handed back from repetitive work." />
            <StatCard tone="amber" value="Minutes" label="to first follow-up — not the next working day." />
            <StatCard tone="emerald" value="Weeks" label="to go live on the first workflow — not quarters." />
            <StatCard value="Zero" label="of your data leaves your own systems." />
          </StatRow>
          <Caption italic className="dk-gap">
            Same headcount, more output — and the know-how stays with you when people move on.
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 20 · From early pilots ───────────────────────────────────────────
     * Same card shape as slide 14, one hue each for the same reason. */
    {
      id: 'early-pilots',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="From Early Pilots"
            eyebrowTone="indigo"
            title="Real teams, real workflows — already running."
            subtitle="A few of the first workflows live today, kept anonymous by request. Different industries, same pattern."
          />
          <UseCaseGrid>
            <UseCaseCard
              tone="indigo"
              kicker="Reporting"
              title="A retail team"
              body={
                <ul className="ob-tpl-list">
                  <li>Monthly partner-performance deck, once hand-built</li>
                  <li>Now drafted automatically for a human to review</li>
                  <li>Days of manual work → a morning's review</li>
                </ul>
              }
            />
            <UseCaseCard
              tone="amber"
              kicker="Sales response"
              title="A D2C brand"
              body={
                <ul className="ob-tpl-list">
                  <li>After-hours leads used to wait till morning</li>
                  <li>Now get an instant, on-brand first reply</li>
                  <li>A person still approves anything unusual</li>
                </ul>
              }
            />
            <UseCaseCard
              tone="emerald"
              kicker="Weekly digest"
              title="An operations team"
              body={
                <ul className="ob-tpl-list">
                  <li>Exception reports lived in one person's head</li>
                  <li>Now produced and shared every Monday</li>
                  <li>Survives when that person is on leave</li>
                </ul>
              }
            />
          </UseCaseGrid>
          <div className="ob-capnote dk-gap-sm">
            <strong>Same pattern every time:</strong> work that used to wait on a person now runs —{' '}
            <em>with a person still approving.</em>
          </div>
        </SlideFrame>
      ),
    },

    /* ── 21 · Your AI transformation ──────────────────────────────────────
     * A three-step arc with arrows between. PhaseCard/PhaseRow is the kit's horizon component and
     * carries `when` (TODAY / IN WEEKS / WITHIN THE YEAR) as its own slot — the arrows go, because
     * the row already reads left to right and three glyphs between three cards is the kind of
     * connective decoration decision C removed. */
    {
      id: 'transformation-arc',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="Your AI Transformation"
            eyebrowTone="indigo"
            title="From scattered AI experiments to an AI-run company."
            subtitle="Most companies are stuck at step one. Synos is how you move through all three — in weeks, not years."
          />
          <PhaseRow>
            <PhaseCard
              when="Today"
              title="AI on laptops"
              body="A few sharp people get wins in ChatGPT. It lives in their account, isn't shared, and disappears the day they leave."
            />
            <PhaseCard
              position="bridge"
              when="In weeks"
              title="A shared brain + first assistants"
              body="Your business knowledge lives in one place. The first assistants handle real work — follow-ups, reports, digests — with a person approving each step."
            />
            <PhaseCard
              position="far"
              when="Within the year"
              title="Every team compounds"
              body="Sales, Marketing and Ops each run on assistants that get better every week. The same headcount does far more — and the knowledge stays with you."
            />
          </PhaseRow>
          <div className="ob-capnote dk-gap">
            <strong>The gap was never the AI.</strong> It's everything around it — shared memory,
            safe access, approvals. <em>That's what Synos gives you.</em>
          </div>
        </SlideFrame>
      ),
    },

    /* ── 22 · Graduated trust ─────────────────────────────────────────────
     * The same three-step shape as 21, so the same PhaseRow. Two slides on one component again. */
    {
      id: 'graduated-trust',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="Graduated Trust"
            eyebrowTone="indigo"
            title="From a helping hand to work that runs itself — you stay in control."
            subtitle="Start with AI helping one person; grow to always-on help — with a person approving every step, at every stage."
          />
          <PhaseRow>
            <PhaseCard
              badge="01"
              when="Stage one"
              title="Run it yourself"
              body="Your team uses AI in the tools they already have. A person drives every step and approves every action."
            />
            <PhaseCard
              badge="02"
              position="bridge"
              when="Stage two"
              title="Runs on a schedule"
              body="It runs on a schedule and drafts the work. A person reviews and approves before anything goes out — most of the work, a fraction of the time."
            />
            <PhaseCard
              badge="03"
              position="far"
              when="Stage three"
              title="Runs on its own"
              body="It runs continuously, posting to Slack/WhatsApp, and only comes back to a person for the exceptions. You can pause or stop it any time."
            />
          </PhaseRow>
          <div className="ob-capnote dk-gap">
            <strong>Every stage stays under your control.</strong> Permissions, a full activity log,
            human review and an instant off-switch apply at every level — so{' '}
            <em>running on its own never means out of your control</em>.
          </div>
        </SlideFrame>
      ),
    },
    /* ── 23 · Safe by design ──────────────────────────────────────────────
     * Three promises. UseCaseGrid with `.t-eyebrow` as the kicker — the same mapping as every
     * other three-card slide in this deck, which is the point of a kit. */
    {
      id: 'safe-by-design',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="Safe by Design"
            eyebrowTone="emerald"
            title="Your data stays yours. You stay in control."
            subtitle="Three promises that make this safe to roll out — no technical background needed."
          />
          <UseCaseGrid>
            <UseCaseCard
              tone="indigo"
              kicker="Your data"
              title="It stays in your systems."
              body="Synos runs inside your own environment. Your customer and business data isn't copied out to us — it never leaves your walls."
            />
            <UseCaseCard
              tone="amber"
              kicker="Undo"
              title="You can undo anything."
              body="Every change is reversible. A wrong step can be rolled back, and nothing important is ever quietly overwritten."
            />
            <UseCaseCard
              tone="emerald"
              kicker="Visibility"
              title="You see everything."
              body="Who ran what, when, and what it cost — all in one place, with an instant off-switch if you ever want to stop."
            />
          </UseCaseGrid>
        </SlideFrame>
      ),
    },

    /* ── 24 · Neutral by design ───────────────────────────────────────────
     * Three rails, the owned core, four tests, a closing band. The rails and the core are local;
     * the options inside the rails are kit Chips, and the four tests are UseCaseCards. */
    {
      id: 'no-lock-in',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Neutral by Design · No Lock-In"
            eyebrowTone="indigo"
            title="Change any vendor. Keep everything you've taught it."
            subtitle="The AI you pick today won't be the best one in a year — and the tools your teams love will change too. Synos sits underneath all of them, in your own environment, so switching is a choice you can make freely."
          />
          <Stack gap="tight">
            {[
              ['AI providers', ['Anthropic', 'OpenAI', 'Google', "your cloud's AI"], 'open-source models', 'switch anytime'],
              ['AI tools', ['Claude Code', 'ChatGPT', 'Cursor', 'Copilot'], 'open-source tools', 'bring your own'],
              ['Where it runs', ['your cloud account', 'your data centre'], 'fully offline', 'your environment'],
            ].map(([label, items, os, verdict]) => (
              <div className="ob-rail" key={label}>
                <span className="ob-rail-k">{label}</span>
                <ChipRow tight>
                  {items.map((i) => (
                    <Chip size="sm" key={i}>{i}</Chip>
                  ))}
                  <Chip size="sm" tone="emerald">{os}</Chip>
                </ChipRow>
                <span className="ob-rail-sw">{verdict}</span>
              </div>
            ))}
          </Stack>
          <div className="ob-core dk-gap-sm">
            <h3>What never moves — the part you own</h3>
            <p>
              Your Company Brain: what the AI knows about your business, the rules and exceptions
              your team wrote, every correction, and the record of what worked. It lives in{' '}
              <strong>your</strong> environment and carries across every choice above.
            </p>
            <ChipRow tight>
              <Chip size="sm" tone="indigo">any AI provider</Chip>
              <Chip size="sm" tone="indigo">any AI tool</Chip>
              <Chip size="sm" tone="indigo">any cloud</Chip>
              <Chip size="sm" tone="indigo">your data</Chip>
              <Chip size="sm" tone="indigo">your knowledge</Chip>
            </ChipRow>
          </div>
          <UseCaseGrid columns={4} className="dk-gap-sm">
            <UseCaseCard
              tone="indigo"
              title="Change the AI provider"
              body="Point it at a different model and carry on. Cheaper or open-source models can do the routine work; the expensive one only where it's worth it."
            />
            <UseCaseCard
              tone="amber"
              title="Change the tool"
              body="ChatGPT, Claude, Copilot or whatever comes next — all of them reach the same shared memory and the same safe access."
            />
            <UseCaseCard
              tone="emerald"
              title="Change the cloud"
              body="It runs in your environment already. Moving it is an IT task, not a re-do of everything you built."
            />
            <UseCaseCard
              tone="violet"
              title="A vendor disappears"
              body="None of your knowledge was sitting inside them. Your team's work carries on untouched."
            />
          </UseCaseGrid>
          <div className="ob-band-violet dk-gap-sm">
            <strong>The test to hold any AI vendor to:</strong> take them away — does what your
            company has learned survive? Here it does. Nothing leaves your environment and nothing
            is used to train someone else's AI, so what you build is an asset you own rather than
            intelligence you rent.
          </div>
        </SlideFrame>
      ),
    },

    /* ── 25 · How a brand gets there ──────────────────────────────────────
     * The third PhaseRow in this deck. */
    {
      id: 'how-it-lands',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="How a Brand Gets There"
            eyebrowTone="indigo"
            title="Live in weeks — and your team owns it."
            subtitle="Our team works alongside yours to build the 20% that's specific to your business, then hands it over."
          />
          <PhaseRow>
            <PhaseCard
              badge="01"
              when="Discover"
              title="Pair with your team"
              body="We sit with Sales, Marketing & Ops, connect your systems, and pick the highest-leverage workflows to start with."
            />
            <PhaseCard
              badge="02"
              position="bridge"
              when="Build"
              title="Stand up the brains + assistants"
              body="Set up the ready-made brains, tune them to your data, and ship the first assistants and apps — safely."
            />
            <PhaseCard
              badge="03"
              position="far"
              when="Hand over"
              title="Your team carries it forward"
              body="Non-coders author and tweak workflows in plain English. The brain compounds inside your business — not ours."
            />
          </PhaseRow>
          <div className="ob-capnote dk-gap">
            <strong>Platform + people.</strong> The platform stands on its own; our team gets you to{' '}
            <em>outcomes this quarter</em>, not just a tool installed.
          </div>
        </SlideFrame>
      ),
    },

    /* ── 26 · The outcome ─────────────────────────────────────────────────
     * A recap slide: big title, three pills. BigTypeSlide carries the title register; the pills
     * are UseCaseCards so the recap uses the same cards as the argument that preceded it. */
    {
      id: 'the-outcome',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="The Outcome"
            eyebrowTone="violet"
            title={
              <>
                Lean teams running Sales, Marketing &amp; Ops on a{' '}
                <span className="sk-a">brain that compounds</span>.
              </>
            }
          />
          <UseCaseGrid>
            <UseCaseCard
              tone="indigo"
              title="Higher sales"
              body="Faster follow-up, better-armed reps, cleaner pipeline."
            />
            <UseCaseCard
              tone="amber"
              title="More leads"
              body="More campaigns & content, steered by live performance."
            />
            <UseCaseCard
              tone="emerald"
              title="Leaner ops"
              body="Repetitive work automated; knowledge that never leaves."
            />
          </UseCaseGrid>
        </SlideFrame>
      ),
    },

    /* ── 27 · To the demo ─────────────────────────────────────────────────
     * A hinge slide: title, one line, four chips. BigTypeSlide is the kit's component for a slide
     * that is one statement. */
    {
      id: 'to-the-demo',
      node: (
        <BigTypeSlide
          stage={false}
          eyebrow="Let's see it live"
          eyebrowTone="indigo"
          line1="From slides to the"
          line2={<span className="sk-gradient-text">running product.</span>}
          sub="A quick walkthrough of the real platform — the brain, an assistant running, and the governance underneath."
        >
          <ChipRow center className="dk-gap">
            <Chip size="lg">The Company Brain in action</Chip>
            <Chip size="lg">An assistant at work, step by step</Chip>
            <Chip size="lg">Human review + audit trail</Chip>
            <Chip size="lg">Slack / WhatsApp delivery</Chip>
          </ChipRow>
        </BigTypeSlide>
      ),
    },

    /* ── 28 · Appendix divider ────────────────────────────────────────────
     * Note for the report: the source says "a worker running" on slide 27, which the terminology
     * rule retired in favour of "agent"/"assistant". Changed here to "an assistant running",
     * because it is the same word the rest of this deck already uses — flagged rather than assumed. */
    {
      id: 'appendix-divider',
      node: (
        <BigTypeSlide
          stage={false}
          eyebrow="Appendix · For your IT & data team"
          eyebrowTone="muted"
          line1="For your"
          line2={<span className="sk-gradient-text">technical team</span>}
          sub="How it works under the hood — architecture, safe access, and the learning loop. Bring these out only if a technical person is in the room."
        />
      ),
    },
    /* ── 29 · The AI-native operating layer ───────────────────────────────
     * The architecture stack: your tools on top, the layer in the middle, your systems underneath.
     * Tiles for the tools, PillarGrid for the six capabilities, Chips for the systems — the same
     * composition the VC deck's architecture slides use, which is the strongest evidence yet that
     * the two families really do share a vocabulary.
     *
     * TERMINOLOGY: the source says "The brain and the workers improve themselves". The project's
     * terminology rule retired "worker" for "agent", and the rest of this deck already says agent
     * or assistant, so this reads "agents". Flagged in the report, not buried. */
    {
      id: 'operating-layer',
      node: (
        <SlideFrame stage={false} variant="arch">
          <SlideHeader
            eyebrow="The AI-Native Operating Layer"
            eyebrowTone="indigo"
            title="More than a brain — a full operating layer."
            subtitle="Six capabilities working as one. The Company Brain is just one of them — and the whole thing compounds with every use."
          />
          <Stack gap="tight">
            <div className="ob-band">
              <Eyebrow tone="muted">Your teams work in their own tools</Eyebrow>
              <TileRow className="dk-gap-sm">
                <Tile size="sm" mono name="ChatGPT" kind="marketing · sales" />
                <Tile size="sm" mono name="Claude Code" kind="ops · analysts" />
                <Tile size="sm" mono name="Codex" kind="analysts · eng" />
                <Tile size="sm" mono name="Slack" kind="everyone" />
                <Tile size="sm" mono name="WhatsApp" kind="field · ops" />
                <Tile size="sm" mono name="Apps" kind="shared" />
              </TileRow>
            </div>

            <div className="ob-band ob-band--core">
              <div className="ob-band-head">
                <span className="ob-band-title">The Operating Layer</span>
                <Chip size="sm" tone="indigo">Self-hosted · governed · model- &amp; tool-agnostic</Chip>
              </div>
              <PillarGrid columns={3}>
                <PillarCard
                  brain
                  name="Context Brain"
                  desc="Knowledge that compounds across every source — batch + streaming, continuously curated."
                />
                <PillarCard
                  name="Skills Marketplace"
                  desc="Shared, reusable workflows. Install once, run anywhere, fork across teams."
                />
                <PillarCard
                  name="Safe Data Access"
                  desc="One governed door to your systems. Gated by role, audited on every call."
                />
                <PillarCard
                  name="Safe App Deploy"
                  desc="Sandboxed apps + their data your team can share — scanned, never on personal accounts."
                />
                <PillarCard
                  name="Self-Learning Loop"
                  desc="Every correction reviewed + promoted. The brain and the agents improve themselves."
                />
                <PillarCard
                  name="Observability"
                  desc="Who ran what, what's working, what it costs — and an instant kill-switch."
                />
              </PillarGrid>
            </div>

            <div className="ob-band">
              <Eyebrow tone="muted">Connected to your existing systems — not replaced</Eyebrow>
              <ChipRow tight className="dk-gap-sm">
                <Chip mono>Warehouse · BigQuery</Chip>
                <Chip mono>CRM · Marketing SaaS</Chip>
                <Chip mono>Sheets · Docs · Notion</Chip>
                <Chip mono>Drive · S3</Chip>
                <Chip mono>Slack · Email · WhatsApp</Chip>
                <Chip mono>Ads · GA · Tickets</Chip>
              </ChipRow>
            </div>
          </Stack>
          <Caption className="dk-gap-sm">
            <strong>The Company Brain is one pillar of six.</strong> Together they're the operating
            layer — and <em>every use makes it smarter</em>.
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 30 · Six capabilities ────────────────────────────────────────────
     * Six cards then the self-learning exchange. UseCaseGrid holds the six; the exchange is local,
     * because a chat bubble becoming a rule is an illustration of a mechanism, not a card. */
    {
      id: 'six-capabilities',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="The Operating Layer"
            eyebrowTone="indigo"
            title="Six capabilities most teams ship one of — as one governed platform."
            subtitle="Engineering sets the rails once; the whole org self-serves on top — non-coders included. Build agents, build apps, all on the real brain."
          />
          <UseCaseGrid>
            <UseCaseCard
              tone="indigo"
              title="Self-learning brain / context layer"
              body="Every source → one graph that corrects itself from every run. Not static RAG."
            />
            <UseCaseCard
              tone="violet"
              title="Skills marketplace"
              body="Company know-how as reusable, versioned skills. Build once, share across teams."
            />
            <UseCaseCard
              tone="emerald"
              title="Agent builder"
              body="Describe an agent in plain English — assembled from skills, live in minutes."
            />
            <UseCaseCard
              tone="amber"
              title="AI app builder"
              body="SMEs ship internal apps + live dashboards on the real brain — sandboxed, governed."
            />
            <UseCaseCard
              tone="indigo"
              title="Bring your own harness + tools"
              body="Point Claude Code, Codex or Cursor at the brain — they operate on top. One MCP door, plus warehouse, object store, SaaS & internal APIs."
            />
            <UseCaseCard
              tone="emerald"
              title="Self-hosted & governed"
              body="On-prem-capable, RBAC, audited, egress-controlled. Your data and your moat stay yours."
            />
          </UseCaseGrid>
          <div className="dk-gap-sm">
            <Eyebrow tone="muted">
              Self-learning in practice — the agent surfaces, a human approves, the brain compounds
            </Eyebrow>
            <div className="ob-sl dk-gap-sm">
              <div className="ob-sl-card">
                <div className="ob-sl-head">Agent → human</div>
                <div className="ob-sl-bubble">
                  Found a new entity <strong>“Gift Recipient”</strong> across 3 tables — add it to
                  the ontology?
                </div>
                <ChipRow tight className="dk-gap-sm">
                  <Chip size="sm" tone="emerald">✓ Approve</Chip>
                  <Chip size="sm" tone="red">Reject</Chip>
                </ChipRow>
              </div>
              <div className="ob-sl-card">
                <div className="ob-sl-head">Human → brain · doctrine</div>
                <div className="ob-sl-bubble">Correction: treat tracked CVR as directional.</div>
                <div className="ob-sl-rule">
                  → becomes <strong>a rule every future run inherits.</strong>
                </div>
              </div>
            </div>
          </div>
        </SlideFrame>
      ),
    },

    /* ── 31 · Architecture ────────────────────────────────────────────────
     * The same stack as 29 with the guardrail strip and the two-actor footer. Fourth slide on the
     * band composition. */
    {
      id: 'architecture',
      node: (
        <SlideFrame stage={false} variant="arch">
          <SlideHeader
            eyebrow="Architecture"
            eyebrowTone="indigo"
            title="One substrate. Any tool, any model."
            subtitle="Engineering sets the rails once. Non-engineers ship safely on top."
          />
          <Stack gap="tight">
            <div className="ob-band">
              <Eyebrow tone="muted">Bring Your Own Tool — all speak one interface (MCP)</Eyebrow>
              <TileRow className="dk-gap-sm">
                <Tile size="sm" mono name="ChatGPT" kind="teams" />
                <Tile size="sm" mono name="Claude Code" kind="power users" />
                <Tile size="sm" mono name="Cursor" kind="IDE" />
                <Tile size="sm" mono name="In-house agents" kind="custom" />
                <Tile size="sm" mono name="Synos Apps" kind="sandboxed" />
                <Tile size="sm" mono name="Synos Agents" kind="managed" />
              </TileRow>
            </div>
            <Caption mono>One interface · any model · swap for price or capability</Caption>
            <div className="ob-band ob-band--core">
              <div className="ob-band-head">
                <span className="ob-band-title">Synos Core</span>
                <Chip size="sm" tone="indigo">
                  Self-hosted · multi-tenant · model-agnostic · tool-agnostic
                </Chip>
              </div>
              <PillarGrid columns={4}>
                <PillarCard
                  brain
                  name="Context Brain"
                  desc="Knowledge graph across sources. Entities, relationships, citations."
                />
                <PillarCard
                  name="Skills Library"
                  desc="Workflows authored in plain English. Shared & versioned."
                />
                <PillarCard
                  name="System of Record"
                  desc="Schema-enforced operational data. Agents write, apps read."
                />
                <PillarCard
                  name="Self-Learning Loop"
                  desc="Every correction reviewed & promoted. Improves without rewrites."
                />
              </PillarGrid>
              <ChipRow tight className="dk-gap-sm">
                <Chip size="sm" tone="indigo">Guardrails</Chip>
                <Chip size="sm">RBAC · role · tenant</Chip>
                <Chip size="sm">Audit on every action</Chip>
                <Chip size="sm">Build scan on every app</Chip>
                <Chip size="sm">Egress proxy</Chip>
                <Chip size="sm">Kill-switch · approvals</Chip>
              </ChipRow>
            </div>
            <div className="ob-band">
              <Eyebrow tone="muted">Your existing systems — connected, not replaced</Eyebrow>
              <ChipRow tight className="dk-gap-sm">
                <Chip mono>Warehouse · BigQuery</Chip>
                <Chip mono>CRM · Salesforce · HubSpot</Chip>
                <Chip mono>Sheets · Docs · Notion</Chip>
                <Chip mono>Drive · S3</Chip>
                <Chip mono>Slack · Email · WhatsApp</Chip>
                <Chip mono>Ads · GA · Tickets</Chip>
              </ChipRow>
            </div>
            <div className="ob-actors">
              <Callout tone="indigo" label="Engineering — sets rails once">
                Connects systems · defines tools + permissions · picks models. Stops being the
                workflow bottleneck.
              </Callout>
              <Callout tone="violet" label="Non-engineering — ships daily">
                Sales · Marketing · Ops author workflows in plain English. Safely. With analytics.
              </Callout>
            </div>
          </Stack>
        </SlideFrame>
      ),
    },
    /* ── 32 · What lives in the brain ─────────────────────────────────────
     * Eight memory types, four across, two rows — UseCaseGrid at `columns={4}`, which is the
     * column count added earlier in this port. `.t-store` is the kicker, `.t-ex` a mono example
     * line, and the hue groups the types: knowledge indigo, rules red, outcome emerald, learning
     * violet. */
    {
      id: 'memory-types',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="What Lives In The Brain"
            eyebrowTone="indigo"
            title="Eight kinds of memory — every shape an agent needs."
            subtitle="Schema-less and extensible, each mapped to a concrete store so the brain stays queryable, auditable, and rollback-safe."
          />
          <UseCaseGrid columns={4}>
            <UseCaseCard
              tone="indigo"
              kicker="Knowledge graph"
              title="Semantic"
              body={
                <>
                  Stable facts about entities — customer, product, cohort, region.
                  <div className="ob-example">“Acme Corp · T2 · Mumbai · WhatsApp-preferred”</div>
                </>
              }
            />
            <UseCaseCard
              tone="indigo"
              kicker="Operational store"
              title="Episodic"
              body={
                <>
                  Time-stamped events — orders, messages, sessions, tickets.
                  <div className="ob-example">“Order #4821 placed · 19:42”</div>
                </>
              }
            />
            <UseCaseCard
              tone="violet"
              kicker="Skill library"
              title="Procedural"
              body={
                <>
                  How-to recipes — the workflows and playbooks agents follow.
                  <div className="ob-example">“Win-back campaign workflow”</div>
                </>
              }
            />
            <UseCaseCard
              tone="red"
              kicker="Policy graph"
              title="Policy / Rules"
              body={
                <>
                  Brand-mandated constraints — frequency caps, channel + consent rules.
                  <div className="ob-example">“Never message before 9am local”</div>
                </>
              }
            />
            <UseCaseCard
              tone="indigo"
              kicker="Knowledge graph"
              title="Preferences"
              body={
                <>
                  Per-entity modifiers learned from behaviour.
                  <div className="ob-example">“Prefers WhatsApp · evenings”</div>
                </>
              }
            />
            <UseCaseCard
              tone="amber"
              kicker="Decision log"
              title="Decision Trace"
              body={
                <>
                  Input-state → action → outcome. Every agent call recorded.
                  <div className="ob-example">“Win-back dispatch · WA · 10% offer”</div>
                </>
              }
            />
            <UseCaseCard
              tone="emerald"
              kicker="Outcome log"
              title="Reward / Outcome"
              body={
                <>
                  Did the action move the baseline? Measured uplift per action.
                  <div className="ob-example">“10% offer · conv +3.2% vs baseline”</div>
                </>
              }
            />
            <UseCaseCard
              tone="violet"
              kicker="Review queue"
              title="Reflective"
              body={
                <>
                  Human + agent corrections compounded back. One-line corrections become rules.
                  <div className="ob-example">“Exception: skip VIP tier on discount blasts”</div>
                </>
              }
            />
          </UseCaseGrid>
          <Caption className="dk-gap-sm">
            <strong>Open list, not closed.</strong> Adding a new kind of memory is configuration,
            not a migration.
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 36 · The data flywheel ───────────────────────────────────────────
     * A five-stage pipeline, three payoffs, an honesty band. The cards are kit StepCards; only the
     * five-track geometry is local, because StepGrid stops at four and a fifth column is this
     * slide's problem rather than the kit's. */
    {
      id: 'data-flywheel',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="The Data Flywheel"
            eyebrowTone="violet"
            title="Every run is recorded. Every record is future training data."
            subtitle="The tracing that ships today is quietly building your own training dataset — the raw material for models trained on how your company works. Built data-first, on purpose."
          />
          <div className="ob-pipe">
            <StepCard
              bar={false}
              num="01"
              title="Every run captured"
              body={
                <>
                  Inputs, tool calls, decisions, outcome — full lineage on every agent run.
                  <div className="ob-stage-state">● LIVE TODAY</div>
                </>
              }
            />
            <StepCard
              bar={false}
              num="02"
              title="Corrections = labels"
              body={
                <>
                  Every human correction and approval becomes a labelled example — for free, in the flow of work.
                  <div className="ob-stage-state">● LIVE TODAY</div>
                </>
              }
            />
            <StepCard
              bar={false}
              num="03"
              title="Your own scoring"
              body={
                <>
                  Agents scored against your outcomes, not public benchmarks — ground truth only you own.
                  <div className="ob-stage-state ob-stage-state--build">◐ IN BUILD</div>
                </>
              }
            />
            <StepCard
              bar={false}
              num="04"
              title="Outcome-verified data"
              body={
                <>
                  Curated for you: the runs that worked, the corrections that fixed them, the scores that prove it.
                  <div className="ob-stage-state">● ACCUMULATING NOW</div>
                </>
              }
            />
            <StepCard
              bar={false}
              num="05"
              title="Your own models"
              body={
                <>
                  Custom and smaller models tuned to your workflows — trained on the loop, run on your infrastructure.
                  <div className="ob-stage-state ob-stage-state--next">◆ ROADMAP</div>
                </>
              }
            />
          </div>
          <UseCaseGrid className="dk-gap-sm">
            <UseCaseCard
              tone="emerald"
              kicker="Cost"
              title="Small models carry the routine"
              body="Cheaper models handle the ~80% of routine work at a fraction of the token cost — the open-source future, powered by your data."
            />
            <UseCaseCard
              tone="indigo"
              kicker="Control"
              title="Your data, your models, your infra"
              body="Nothing trains a public model. Your models live in your environment — switch providers freely without losing what you've learned."
            />
            <UseCaseCard
              tone="violet"
              kicker="Advantage"
              title="A dataset nobody can buy"
              body="Minted from your own operations and corrections — the one asset a competitor can't replicate."
            />
          </UseCaseGrid>
          <div className="ob-band-violet dk-gap-sm">
            <strong>Where we honestly are:</strong> the data layer — tracing, corrections,
            agent-native storage — is live and accumulating in every deployment. The scoring and
            training layers are still being built — deliberately data-first, because{' '}
            <strong>capture is the scarce part</strong>; training stacks on top, with no rebuild.
          </div>
        </SlideFrame>
      ),
    },
    /* ── 6 · The root cause ───────────────────────────────────────────────
     * The scattered-context graph. Carried verbatim; the kit has no diagram vocabulary. This is the
     * section skipped on the first pass through this deck, filled in here. */
    {
      id: 'root-cause',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="The Root Cause"
            eyebrowTone="red"
            title="Your context is scattered across every system — and no AI can see it whole."
            subtitle="Warehouse rows, CRM fields, Slack threads, docs, tickets, sheets. Same customer, six names. No shared meaning, and no idea what's current — so AI can't give you one straight answer."
          />
          <div className="ob-scatter diagram-svg" dangerouslySetInnerHTML={{ __html: SCATTER_SVG }} />
          <Caption className="dk-gap-sm">
            AI assistants don't fail because the model is weak — they fail because{' '}
            <em>your information is scattered and never joined up</em>. The fix is one shared memory
            that ties it together, so every answer is consistent.
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 33 · Retrieval ───────────────────────────────────────────────────
     * Two modes side by side: a deterministic five-step ladder, and an agentic traversal with its
     * trace. Both local — a numbered ladder inside a panel is this slide's shape, and the trace is
     * a transcript. */
    {
      id: 'retrieval',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Retrieval"
            eyebrowTone="indigo"
            title="Every agent gets the right slice — deterministic or agentic."
            subtitle="Job-specific context packs assembled per query. Hybrid retrieval, authority-ranked, freshness-aware, policy-redacted. MCP-native envelope."
          />
          <div className="ob-retrieval">
            <div>
              <div className="ob-ret-head">
                <Chip size="sm" tone="indigo">Mode A</Chip>
                <span className="ob-ret-name">Deterministic pack assembly</span>
                <span className="ob-ret-when">~300ms · single call</span>
              </div>
              <div className="ob-ret-flow">
                {[
                  ['Query · scoped by agent role + intent', '“Next-best action for Maya” + agent capabilities + project_id'],
                  ['Hybrid retrieval · vec + graph + keyword', 'ChromaDB embeddings · Neo4j multi-hop · Postgres FTS — fused'],
                  ['Authority + freshness rank', 'AgentPromoted > Document > SOR row · staleness penalty'],
                  ['Policy redact + token budget', 'RBAC filter · PII redaction · 4K/16K/32K envelope per agent'],
                  ['Context Pack → MCP response', 'Typed JSON · citation IDs · authority score · staleness ts'],
                ].map(([name, desc], i) => (
                  <div className="ob-ret-step" key={name}>
                    <div className="ob-ret-num">{i + 1}</div>
                    <div>
                      <div className="ob-ret-name">{name}</div>
                      <div className="ob-ret-desc">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="ob-ret-head">
                <Chip size="sm" tone="violet">Mode B</Chip>
                <span className="ob-ret-name">Agentic retrieval — multi-step graph traversal</span>
                <span className="ob-ret-when">3–6 hops · adaptive</span>
              </div>
              <div className="ob-agentic diagram-svg">
                <div dangerouslySetInnerHTML={{ __html: RETRIEVAL_SVG }} />
                <div className="ob-trace" dangerouslySetInnerHTML={{ __html: TRACE_HTML }} />
              </div>
            </div>
          </div>
        </SlideFrame>
      ),
    },

    /* ── governance · without / with the layer ─────────────────────────────
     * The pair: today's failure on the left, the governed path on the right with its diagram. */
    {
      id: 'governance',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="Governance · Safe Access"
            eyebrowTone="indigo"
            title="Every action gated. Every action audited."
          />
          <div className="ob-pair">
            <div className="ob-pair-col">
              <div className="ob-pair-label">Without the layer</div>
              <h3>Raw keys in chat history. No permissions. No audit. No boundary.</h3>
              <p>The moment someone pastes a CRM key into a chat window, the blast radius is unbounded.</p>
              <ul>
                  <li>Keys on personal laptops.</li>
                  <li>No “this role can’t do that” gate.</li>
                  <li>No log of who did what, when.</li>
              </ul>
            </div>
            <div className="ob-pair-col ob-pair-col--with">
              <div className="ob-pair-label">With Synos — one governed door</div>
              <h3>UI, AI tool, or agent — every call goes through the same gate.</h3>
              <div className="ob-pair-diagram diagram-svg" dangerouslySetInnerHTML={{ __html: GOV_SVG }} />
            </div>
          </div>
        </SlideFrame>
      ),
    },

    /* ── 35 · The compounding flywheel ────────────────────────────────────
     * Diagram left, three compounding signals right, the moat line underneath. */
    {
      id: 'compounding-flywheel',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="The Compounding Flywheel"
            eyebrowTone="indigo"
            title="Every action becomes a labelled example."
            subtitle="The brain holds the input. Decision traces hold the action + outcome. Human review calibrates it back. The moat is the traces, not the model."
          />
          <div className="ob-flywheel">
            <div className="diagram-svg" dangerouslySetInnerHTML={{ __html: FLYWHEEL_SVG }} />
            <div>
              <Eyebrow tone="muted">Three signals compound — with a human in the loop</Eyebrow>
              <ul className="ob-fw-list dk-gap-sm">
                <li>
                  <strong>The best examples</strong> — strong decision traces become labelled
                  examples of how your company should operate.
                </li>
                <li>
                  <strong>The outcome signal</strong> — actions that moved the needle get
                  reinforced; the ones that didn't get down-weighted.
                </li>
                <li>
                  <strong>Human review</strong> — a person reviews a sample each week;
                  disagreements become new rules in the brain.
                </li>
              </ul>
              <div className="ob-band-violet dk-gap-sm">
                <strong>The moat is the traces, not the model.</strong> Years of real decisions
                across your customers and your business can't be replicated by a competitor
                starting today.
              </div>
            </div>
          </div>
        </SlideFrame>
      ),
    },

    /* ── operational-data · without / with the layer ─────────────────────────────
     * The pair: today's failure on the left, the governed path on the right with its diagram. */
    {
      id: 'operational-data',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="Operational Data"
            eyebrowTone="indigo"
            title="A shared, governed store agents write to and read from."
            subtitle="Agents write structured rows; apps and agents read them back. Schema-enforced, tenant-scoped, audited."
          />
          <div className="ob-pair">
            <div className="ob-pair-col">
              <div className="ob-pair-label">Without the layer</div>
              <h3>Agent outputs land in Sheets, Slack DMs, local files.</h3>
              <p>Agents have nowhere structured to write. The next run can’t read the last one.</p>
              <ul>
                  <li>No shared table for outputs.</li>
                  <li>Scattered, lost, un-reusable.</li>
                  <li>No schema, no audit.</li>
              </ul>
            </div>
            <div className="ob-pair-col ob-pair-col--with">
              <div className="ob-pair-label">With Synos — System of Record</div>
              <h3>Project-scoped collections. Agents write, apps + agents read.</h3>
              <div className="ob-pair-diagram diagram-svg" dangerouslySetInnerHTML={{ __html: SOR_SVG }} />
            </div>
          </div>
        </SlideFrame>
      ),
    },
    /* ── safe-to-build · without / with the layer ─────────────────────────────
     * The pair: today's failure on the left, the governed path on the right with its diagram. */
    {
      id: 'safe-to-build',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="Safe to Build"
            eyebrowTone="indigo"
            title="Apps ship through a sandbox — a scanner gates every build."
            subtitle="Code is scanned for unsafe access and secrets, then deployed to a sandboxed URL behind the egress proxy."
          />
          <div className="ob-pair">
            <div className="ob-pair-col">
              <div className="ob-pair-label">Without the layer</div>
              <h3>Apps ship straight to personal accounts.</h3>
              <p>No sandbox, no scan, no proxy, no kill-switch. Secrets leak into client code.</p>
              <ul>
                  <li>Secrets in shipped code.</li>
                  <li>Calls to anywhere.</li>
                  <li>Personal deploy = no control.</li>
              </ul>
            </div>
            <div className="ob-pair-col ob-pair-col--with">
              <div className="ob-pair-label">With Synos — gated build pipeline</div>
              <h3>Build → scan → compile → sandbox URL → audit row.</h3>
              <div className="ob-pair-diagram diagram-svg" dangerouslySetInnerHTML={{ __html: BUILD_SVG }} />
            </div>
          </div>
        </SlideFrame>
      ),
    },

    /* ── 39 · Enterprise readiness ────────────────────────────────────────
     * Three trust cards with lists. UseCaseGrid, same as every other three-card slide here. */
    {
      id: 'enterprise-readiness',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Enterprise Readiness"
            eyebrowTone="indigo"
            title="Enterprise readiness and trust."
            subtitle="Data residency, predictable cost per decision, and reversible failure handling — built in, not bolted on."
          />
          <UseCaseGrid>
            <UseCaseCard
              tone="indigo"
              kicker="Data · Residency"
              title="Your brain never leaves your tenant."
              body={
                <>
                  Every store filters on your tenant ID. Self-hosted in your own cloud, or a
                  Synos-managed isolated tenant.
                  <ul className="ob-tpl-list">
                    <li>Self-hosted in your VPC or isolated managed tenant</li>
                    <li>Bring your own AI provider keys</li>
                    <li>PII redaction on every retrieval</li>
                    <li>Tenant-isolation tests in CI</li>
                  </ul>
                </>
              }
            />
            <UseCaseCard
              tone="amber"
              kicker="Cost · Per-decision"
              title="Cached and budgeted. Predictable at scale."
              body={
                <>
                  Most context lookups are cached; every agent runs under a token budget. Cost is
                  surfaced per run.
                  <ul className="ob-tpl-list">
                    <li>High cache-hit on hot entities</li>
                    <li>Daily token cap per project and per app</li>
                    <li>Embedding refresh batched, not per-request</li>
                    <li>Cost visible per run in the dashboard</li>
                  </ul>
                </>
              }
            />
            <UseCaseCard
              tone="emerald"
              kicker="Rollback · Control"
              title="Every correction reversible. Every change auditable."
              body={
                <>
                  Wrong learning? Reject it from the queue. Wrong rule promoted? Supersede it. Wrong
                  action? Trace, audit, roll back.
                  <ul className="ob-tpl-list">
                    <li>Review queue before anything is promoted</li>
                    <li>Contradiction detector flags conflicting rules</li>
                    <li>History preserved — nothing silently overwritten</li>
                    <li>Per-project snapshot &amp; restore</li>
                  </ul>
                </>
              }
            />
          </UseCaseGrid>
        </SlideFrame>
      ),
    },

    /* ── 40 · Why Synos, why now ──────────────────────────────────────────
     * Six reasons, three across, two rows. Hues group them: the moat violet, neutrality indigo,
     * sovereignty emerald. */
    {
      id: 'why-synos',
      node: (
        <SlideFrame stage={false} density="compact">
          <SlideHeader
            eyebrow="Why Synos · Why Now"
            eyebrowTone="indigo"
            title="Own the layer that compounds your AI transformation."
            subtitle={
              <>
                Models are commodities. Tools are commodities. The brain that learns how{' '}
                <em>your</em> company operates isn't.
              </>
            }
          />
          <UseCaseGrid>
            <UseCaseCard
              tone="violet"
              title="The brain is the moat"
              body="Operational knowledge that defines your edge can't be rented. It compounds inside your tenant — or not at all."
            />
            <UseCaseCard
              tone="indigo"
              title="Model + tool agnostic"
              body="Switch Anthropic ↔ OpenAI ↔ Gemini; move ChatGPT → Claude Code. Models change quarterly; the substrate shouldn't."
            />
            <UseCaseCard
              tone="emerald"
              title="Sovereignty by default"
              body="Self-hosted. Your tenant, your audit trail, your kill-switch. The opposite of vendor dependency."
            />
            <UseCaseCard
              tone="violet"
              title="Self-learning compounds"
              body="Every run and correction accumulates in your tenant. Year-2 leverage builds; it doesn't reset with the next model."
            />
            <UseCaseCard
              tone="amber"
              title="Custom is finally cheap"
              body="The 20% that defines you was never going to ship from a SaaS vendor. AI-built custom now costs less than the seats you rent."
            />
            <UseCaseCard
              tone="indigo"
              title="The post-SaaS substrate"
              body="SaaS sold seats for the common 80%. The agent era ships your custom 20% — if you own the substrate it learns on."
            />
          </UseCaseGrid>
          <Caption italic className="dk-gap-sm">
            Own the layer. Swap the engine. Compound the transformation.
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 41 · Closing ─────────────────────────────────────────────────────
     * The wordmark. Instrument Serif at 76px, which is the one place in this deck the display face
     * runs at cover scale. */
    {
      id: 'closing',
      node: (
        <SlideFrame stage={false} variant="bigType">
          <div>
            <div className="ob-wordmark">
              Synos<span className="sk-a">.</span>
            </div>
            <div className="ob-wordmark-sub">The AI Operating Layer</div>
          </div>
        </SlideFrame>
      ),
    },

    /* ── 42 · Appendix · where this goes ──────────────────────────────────
     * Three horizons. PhaseRow again — fifth slide on it in this deck. */
    {
      id: 'apx-horizons',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="Appendix · where this goes"
            eyebrowTone="emerald"
            title="Today you install the layer. Then it compounds into something bigger."
            subtitle="The layer you deploy now sits between your people, agents and systems — it becomes your data moat and, in time, an operation that largely runs itself."
          />
          <PhaseRow>
            <PhaseCard
              badge="H1"
              when="Now"
              title="Install the layer"
              body="Engineering sets the rails once; your teams build and run agents safely on a shared brain. The work you're starting today."
            />
            <PhaseCard
              badge="H2"
              position="bridge"
              when="Compounds"
              title="Your data moat"
              body="Every correction and trace becomes your data and training fuel — the compounding layer no generic vendor can hand you."
            />
            <PhaseCard
              badge="H3"
              position="far"
              when="Where it leads"
              title="Operations that run themselves"
              body="The repetitive work runs itself; your people operate at a higher level, on top of a company brain that keeps learning."
            />
          </PhaseRow>
          <Caption className="dk-gap">
            Build horizontal, deploy vertical — each team (Sales, Marketing, Ops, FinOps) is its own
            curve on the same layer.
          </Caption>
        </SlideFrame>
      ),
    },

    /* ── 43 · Appendix · the moat is yours ────────────────────────────────
     * The closing argument: one lead paragraph, four points. */
    {
      id: 'apx-the-moat',
      node: (
        <SlideFrame stage={false}>
          <SlideHeader
            eyebrow="Appendix · the moat is yours"
            eyebrowTone="emerald"
            title="Own the layer that compounds your AI transformation."
            subtitle="Models are commodities. The brain that learns how your company works is not."
          />
          <Callout tone="violet">
            Your moat is the <strong>feedback loop</strong> between your people, agents and systems —
            captured in your own cloud, accumulating with every run, tied to how <strong>you</strong>{' '}
            operate. Not a dataset a competitor can buy — a loop embedded in your workflow.
          </Callout>
          <UseCaseGrid columns={4} className="dk-gap">
            <UseCaseCard
              tone="indigo"
              title="Model & harness sovereignty"
              body="Swap Claude → Codex → open-source without losing your company's learned expertise. No lock-in."
            />
            <UseCaseCard
              tone="amber"
              title="Private evals on your outcomes"
              body="Measured against your business results, not public benchmarks — ground truth only you own."
            />
            <UseCaseCard
              tone="emerald"
              title="Self-hosted, your data"
              body="Runs inside your account. The compounding IP stays yours, on your infra."
            />
            <UseCaseCard
              tone="violet"
              title="You become the model-maker"
              body="Only you have this data — so your domain models can beat generic ones over time."
            />
          </UseCaseGrid>
        </SlideFrame>
      ),
    },
  ]

  const byId = new Map(slides.map((s) => [s.id, s]))
  const missing = ORDER.filter((id) => !byId.has(id))
  const stray = slides.map((s) => s.id).filter((id) => !ORDER.includes(id))
  if (missing.length) throw new Error(`ORDER names slides that do not exist: ${missing.join(', ')}`)
  if (stray.length) throw new Error(`slides missing from ORDER: ${stray.join(', ')}`)
  return ORDER.map((id) => byId.get(id))
}
