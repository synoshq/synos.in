/**
 * The three bespoke SVG diagrams the source deck draws by hand, on five of its 35 slides.
 *
 * These are NOT kit components and must not become kit components. The inventory
 * (`docs/plans/2026-08-13-slide-inventory.md` §2) put every hand-drawn diagram — `seam-wrap`,
 * `loop-wrap`, `flywheel-svg`, `scatter-diagram`, `edge-svg` — explicitly out of scope, because each
 * occurs in exactly one file and a component that exists for one slide is drift.
 *
 * So they live here, in the deck, as deck content. The geometry is copied from
 * `~/ws/synos-gtm/presentations/synos-vc-deck-v6.html` unchanged; only two things moved:
 *
 *   - class names are `dk-*` and their rules are in `deck.css`, pointed at `--sk-*` tokens
 *   - every 'Plus Jakarta Sans' label became Inter, because decision A retired that face
 *
 * Every instance needs its own gradient / marker ids: three seams render into one document and
 * SVG ids are global, so a shared id makes the second and third instance take the first's fill.
 */

/** The humans / agents / systems triangle with SynOS at the seam. Slides 1, 4 and 22. */
export function Seam({ uid, variant, agentsLabel = 'Agents', subs = false }) {
  const g = `${uid}Grad`
  const c = `${uid}Core`
  const f = `${uid}Glow`
  const a = `${uid}Arrow`
  return (
    <div className={`dk-seam${variant ? ` dk-seam--${variant}` : ''}`}>
      <svg viewBox="0 0 1080 430" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#6366F1" />
            <stop offset="1" stopColor="#4C1D95" />
          </linearGradient>
          <radialGradient id={c} cx="50%" cy="36%" r="72%">
            <stop offset="0" stopColor="#8B8DF7" />
            <stop offset="0.55" stopColor="#6366F1" />
            <stop offset="1" stopColor="#4C1D95" />
          </radialGradient>
          <filter id={f} x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="#6366F1" floodOpacity="0.30" />
          </filter>
          <marker id={a} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M1 1 L9 5 L1 9 Z" fill="#6366F1" />
          </marker>
        </defs>
        <g className="dk-u-blocked">
          <line x1="540" y1="78" x2="215" y2="330" />
          <line x1="215" y1="330" x2="865" y2="330" />
          <line x1="865" y1="330" x2="540" y2="78" />
        </g>
        <g
          fill="none"
          stroke={`url(#${g})`}
          strokeWidth="2.4"
          strokeLinecap="round"
          markerStart={`url(#${a})`}
          markerEnd={`url(#${a})`}
        >
          <line className="dk-u-flow" x1="540" y1="132" x2="540" y2="158" />
          <line className="dk-u-flow" x1="292" y1="308" x2="472" y2="264" />
          <line className="dk-u-flow" x1="788" y1="308" x2="608" y2="264" />
        </g>
        <text className="dk-u-nlabel" x="540" y="24" textAnchor="middle">Humans</text>
        {subs ? (
          <text className="dk-u-nsub" x="540" y="42" textAnchor="middle">
            your people & SMEs · decisions · corrections · judgment
          </text>
        ) : null}
        <circle className="dk-u-ring" cx="540" cy="92" r="40" />
        <g className="dk-u-icon" transform="translate(540,92)">
          <circle cx="0" cy="-7" r="7" />
          <path d="M-13 14 C -13 2, 13 2, 13 14" />
        </g>
        <circle className="dk-u-ring" cx="248" cy="330" r="40" />
        <g className="dk-u-icon" transform="translate(248,330)">
          <rect x="-11" y="-9" width="22" height="17" rx="4" />
          <circle cx="-5" cy="-1" r="1.6" fill="#6366F1" stroke="none" />
          <circle cx="5" cy="-1" r="1.6" fill="#6366F1" stroke="none" />
          <path d="M0 -9 V -15" />
          <circle cx="0" cy="-16.5" r="1.8" />
        </g>
        <text className="dk-u-nlabel" x="248" y="399" textAnchor="middle">{agentsLabel}</text>
        {subs ? (
          <text className="dk-u-nsub" x="248" y="417" textAnchor="middle">
            Claude Code · Codex · any AI stack
          </text>
        ) : null}
        <circle className="dk-u-ring" cx="832" cy="330" r="40" />
        <g className="dk-u-icon" transform="translate(832,330)">
          <ellipse cx="0" cy="-9" rx="12" ry="4.5" />
          <path d="M-12 -9 V 1 c 0 2.5 5.4 4.5 12 4.5 s 12 -2 12 -4.5 V -9 M -12 1 v 8 c 0 2.5 5.4 4.5 12 4.5 s 12 -2 12 -4.5 V 1" />
        </g>
        <text className="dk-u-nlabel" x="832" y="399" textAnchor="middle">Systems</text>
        {subs ? (
          <text className="dk-u-nsub" x="832" y="417" textAnchor="middle">
            warehouse · CRM · SaaS · docs · APIs
          </text>
        ) : null}
        <circle cx="540" cy="238" r="72" fill={`url(#${c})`} filter={`url(#${f})`} />
        <circle cx="540" cy="238" r="72" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.5" />
        <text className="dk-u-ctitle" x="540" y="236" textAnchor="middle">SynOS</text>
        <text className="dk-u-csub" x="540" y="258" textAnchor="middle">THE OPERATING LAYER</text>
      </svg>
    </div>
  )
}

/** The learning loop: humans correct, agents act, systems return the outcome. Slide 12. */
export function Loop() {
  return (
    <div className="dk-loop">
      <svg viewBox="0 0 1080 320" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="lpCore" cx="50%" cy="36%" r="72%">
            <stop offset="0" stopColor="#8B8DF7" />
            <stop offset="0.55" stopColor="#6366F1" />
            <stop offset="1" stopColor="#4C1D95" />
          </radialGradient>
          <filter id="lpGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#6366F1" floodOpacity="0.28" />
          </filter>
          <marker id="lpA" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M1 1 L9 5 L1 9 Z" fill="#6366F1" />
          </marker>
          <marker id="lpAv" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M1 1 L9 5 L1 9 Z" fill="#7C3AED" />
          </marker>
        </defs>
        <circle cx="300" cy="160" r="64" fill="url(#lpCore)" filter="url(#lpGlow)" />
        <circle cx="300" cy="160" r="64" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="1.4" />
        <text className="dk-u-ctitle" x="300" y="156" textAnchor="middle" style={{ fontSize: 19 }}>SynOS</text>
        <text className="dk-u-csub" x="300" y="177" textAnchor="middle" style={{ fontSize: 8.5, letterSpacing: '1.4px' }}>THE LOOP</text>
        <rect className="dk-lp-node" x="196" y="16" width="208" height="52" rx="12" />
        <circle className="dk-lp-badge" cx="216" cy="42" r="10" />
        <text className="dk-lp-badge-t" x="216" y="46" textAnchor="middle">1</text>
        <text className="dk-lp-h" x="234" y="38">Humans correct & label</text>
        <text className="dk-lp-m" x="234" y="56">"don't SMS T3, email only"</text>
        <rect className="dk-lp-node" x="452" y="134" width="160" height="52" rx="12" />
        <circle className="dk-lp-badge" cx="472" cy="160" r="10" />
        <text className="dk-lp-badge-t" x="472" y="164" textAnchor="middle">2</text>
        <text className="dk-lp-h" x="490" y="156">Agents act</text>
        <text className="dk-lp-m" x="490" y="174">in any AI tool</text>
        <rect className="dk-lp-node-plain" x="196" y="252" width="208" height="52" rx="12" />
        <circle className="dk-lp-badge" cx="216" cy="278" r="10" />
        <text className="dk-lp-badge-t" x="216" y="282" textAnchor="middle">3</text>
        <text className="dk-lp-h" x="234" y="274">Systems return outcome</text>
        <text className="dk-lp-m" x="234" y="292">measured, not guessed</text>
        <path className="dk-lp-edge dk-lp-flow" d="M 350 72 C 396 92, 428 112, 452 142" markerEnd="url(#lpA)" />
        <path className="dk-lp-edge dk-lp-flow" d="M 456 186 C 424 226, 396 244, 360 258" markerEnd="url(#lpA)" />
        <path className="dk-lp-edge dk-lp-flow" d="M 208 252 C 178 220, 178 100, 210 66" markerEnd="url(#lpA)" />
        <path className="dk-lp-edge-v dk-lp-flow" d="M 366 178 C 500 236, 620 216, 686 178" markerEnd="url(#lpAv)" />
        <rect className="dk-lp-panel" x="692" y="62" width="230" height="196" rx="15" />
        <text className="dk-lp-ph" x="807" y="92" textAnchor="middle">What compounds</text>
        <text className="dk-lp-pr" x="807" y="122" textAnchor="middle">Outcome-verified data</text>
        <text className="dk-lp-pr" x="807" y="152" textAnchor="middle">Self-improving skills & SOPs</text>
        <text className="dk-lp-pr" x="807" y="182" textAnchor="middle">The Company Brain itself</text>
        <text className="dk-lp-tag" x="807" y="216" textAnchor="middle">sharper every week</text>
        <path className="dk-lp-edge-v" d="M 922 122 H 946" markerEnd="url(#lpAv)" />
        <path className="dk-lp-edge-v" d="M 922 196 H 946" markerEnd="url(#lpAv)" />
        <rect className="dk-lp-pay" x="950" y="96" width="122" height="50" rx="11" />
        <text className="dk-lp-pay-h" x="1011" y="117" textAnchor="middle">Better agents now</text>
        <text className="dk-lp-pay-s" x="1011" y="133" textAnchor="middle">frontier models, today</text>
        <rect className="dk-lp-pay" x="950" y="170" width="122" height="50" rx="11" />
        <text className="dk-lp-pay-h" x="1011" y="191" textAnchor="middle">Your own models</text>
        <text className="dk-lp-pay-s" x="1011" y="207" textAnchor="middle">fine-tuned on your loop</text>
      </svg>
    </div>
  )
}

/** What every model knows, and the edge outside it where new value is created. Slide 26. */
export function EdgeDiagram() {
  return (
    <div className="dk-edge-svg">
      <svg viewBox="0 0 640 330" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="egCore" cx="50%" cy="50%" r="65%">
            <stop offset="0" stopColor="#c7d2fe" />
            <stop offset="1" stopColor="#a5b4fc" />
          </radialGradient>
          <marker id="egA" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M1 1 L9 5 L1 9 Z" fill="#047857" />
          </marker>
        </defs>
        <circle cx="240" cy="168" r="150" fill="none" stroke="#7c3aed" strokeWidth="1.6" strokeDasharray="7 6" />
        <circle cx="240" cy="168" r="112" fill="#eef2ff" stroke="#c7d2fe" strokeWidth="1.4" />
        <circle cx="240" cy="168" r="64" fill="url(#egCore)" />
        <text className="dk-eg-core" x="240" y="163" textAnchor="middle">Public internet</text>
        <text className="dk-eg-sub" x="240" y="180" textAnchor="middle">what every model knows</text>
        <text className="dk-eg-ring" x="240" y="80" textAnchor="middle">licensed expert data</text>
        <text className="dk-eg-frontier" x="240" y="34" textAnchor="middle">FRONTIER · EXPANDS EVERY RELEASE</text>
        <g className="dk-eg-yours">
          <text x="475" y="96">your operations</text>
          <text x="490" y="128">your corrections</text>
          <text x="498" y="160">your customer history</text>
          <text x="490" y="192">your tacit judgment</text>
          <text x="475" y="224">your way of operating</text>
        </g>
        <path d="M 392 168 q 22 0 40 0" fill="none" stroke="#047857" strokeWidth="2" markerEnd="url(#egA)" />
        <rect x="404" y="248" width="216" height="58" rx="12" fill="#ecfdf5" stroke="#6ee7b7" strokeWidth="1.4" />
        <text className="dk-eg-edge-h" x="512" y="272" textAnchor="middle">THE EDGE</text>
        <text className="dk-eg-edge-s" x="512" y="290" textAnchor="middle">humans + agents create new value here</text>
        <circle cx="418" cy="110" r="4" fill="#047857" />
        <circle cx="434" cy="142" r="4" fill="#047857" />
        <circle cx="440" cy="174" r="4" fill="#047857" />
        <circle cx="434" cy="206" r="4" fill="#047857" />
        <circle cx="418" cy="238" r="4" fill="#047857" />
      </svg>
    </div>
  )
}
