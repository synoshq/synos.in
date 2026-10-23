"""Build public/vertical-saas.html from the homepage shell (head, tokens, components, nav, footer,
cookie notice, scripts) plus the vertical SaaS sections. Run from the repo root."""
import re

idx = open('public/index.html').read()

# ---- shell pieces taken from the homepage ----
head_end = idx.index('</style>')
head = idx[:head_end]
body_start = idx.index('<body>')
sticky = re.search(r'<div class="stickynav".*?</div></div></div>', idx, re.S).group(0)
nav = re.search(r'<nav aria-label="Main" class="top">.*?</nav>', idx, re.S).group(0)
footer = re.search(r'<footer class="band">.*?</footer>', idx, re.S).group(0)
tail = idx[idx.index('</footer>') + len('</footer>'):]          # closing div, scripts, cookie notice

TITLE = 'SynOS for Vertical SaaS | AI features and models your customers will love'
DESC = ('Release new AI agents in weeks, inside your own product. SynOS turns your domain data and expertise '
        'into AI features your customers can build on, and domain-trained, open-weight models you own.')
head = re.sub(r'<title>.*?</title>', f'<title>{TITLE}</title>', head, count=1)
for prop in ['og:title', 'twitter:title']:
    head = re.sub(rf'(<meta property="{prop}" content=")[^"]*', r'\g<1>' + TITLE, head, count=1)
for sel in [r'<meta name="description" content="', r'<meta property="og:description" content="',
            r'<meta property="twitter:description" content="']:
    head = re.sub('(' + re.escape(sel) + ')[^"]*', r'\g<1>' + DESC, head, count=1)
head = re.sub(r'(<meta property="og:url" content=")[^"]*', r'\g<1>https://www.getsynos.ai/vertical-saas', head, count=1)
head = head.replace('<link rel="canonical" href="https://www.getsynos.ai/">',
                    '<link rel="canonical" href="https://www.getsynos.ai/vertical-saas">')

sticky = sticky.replace('>Bring one workflow</a>', '>Bring one use case</a>').replace(
    'data-cta="cta-early-access-nav"', 'data-cta="cta-early-access-nav"')

CSS = r'''
/* ===================== /vertical-saas (2026-10-23) ===================== */
.vs-hero{padding-bottom:clamp(64px,9vw,120px)}
.vs-hero h1{max-width:12em;margin-inline:auto;text-wrap:balance}
.vs-hero .sub{max-width:30em}
.sec .sub.lead{margin-top:22px}
.vs-h{max-width:14em;margin-inline:auto;text-wrap:balance}

/* case study: two timelines on one scale of five months */
.cs{margin:clamp(48px,6vw,72px) auto 0;max-width:960px;text-align:left}
.cs-who{font-size:15px;color:var(--dim);margin:0 0 28px}
.cs-who b{color:var(--ink);font-weight:600}
.cs-axis{display:grid;grid-template-columns:repeat(5,1fr);margin-left:var(--cs-lbl);font:500 12.5px/1 var(--mono);color:var(--dim);border-bottom:1px solid var(--line);padding-bottom:10px}
.cs{--cs-lbl:220px}
.cs-row{display:grid;grid-template-columns:var(--cs-lbl) minmax(0,1fr);align-items:center;gap:0;padding:22px 0;border-bottom:1px solid var(--line)}
.cs-row h3{font-size:16px;font-weight:600;letter-spacing:-.01em;line-height:1.35;padding-right:20px}
.cs-row h3 small{display:block;font-weight:400;color:var(--dim);font-size:14px;margin-top:2px}
.cs-track{position:relative;height:44px}
.cs-bar{position:absolute;left:0;top:6px;height:32px;border-radius:999px;display:flex;align-items:center;justify-content:flex-end;padding:0 14px;font:600 14px/1 var(--font);white-space:nowrap}
.cs-bar.no{width:100%;background:color-mix(in srgb,var(--warn) 22%,transparent);color:var(--ink);box-shadow:inset 0 0 0 1.5px color-mix(in srgb,var(--warn) 70%,transparent)}
.cs-bar.yes{width:18.5%;background:var(--ok)}
.cs-lab{position:absolute;left:calc(18.5% + 14px);top:50%;transform:translateY(-50%);font:600 14px/1 var(--font);color:var(--ok);white-space:nowrap}
.cs-out{display:grid;grid-template-columns:var(--cs-lbl) minmax(0,1fr);margin-top:26px}
.cs-out p{grid-column:2;font-size:clamp(1.05rem,1.6vw,1.25rem);line-height:1.5;color:var(--dim);max-width:34em}
.cs-out p b{color:var(--ink);font-weight:600}
@media (max-width:720px){
  .cs-axis{display:none}
  .cs-row,.cs-out{grid-template-columns:1fr}
  .cs-row h3{padding:0 0 12px}
  .cs-out p{grid-column:1}
}

/* inside your product: nested boundaries */
.box{margin:clamp(48px,6vw,72px) auto 0;max-width:820px;text-align:left}
.bnd{position:relative;border:1.5px dashed var(--dim);border-radius:calc(var(--r) + 14px);padding:clamp(34px,4vw,48px) clamp(16px,3vw,36px) clamp(18px,3vw,32px)}
.bnd-tag{position:absolute;top:0;left:clamp(20px,3vw,36px);transform:translateY(-50%);padding:0 10px;background:var(--paper);font:500 13.5px/1 var(--mono);color:var(--dim)}
.prod{border-radius:var(--r);background:var(--mist);padding:clamp(20px,3vw,32px)}
.prod-top{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.prod-name{display:flex;align-items:center;gap:10px;font-weight:700;letter-spacing:-.02em;font-size:clamp(1.1rem,1.8vw,1.35rem)}
.prod-name i{width:26px;height:26px;border-radius:8px;background:var(--ink);display:inline-block}
.prod-tag{font-size:13.5px;color:var(--dim)}
.feats{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}
.feats span{font-size:14px;font-weight:600;padding:9px 14px;border-radius:999px;background:var(--paper);border:1px solid var(--line)}
.engine{margin-top:16px;border-radius:12px;padding:14px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;
  background:color-mix(in srgb,var(--accent) 10%,var(--paper));border:1px solid color-mix(in srgb,var(--accent) 30%,transparent);font-size:14.5px}
.engine b{font-weight:650;color:var(--a-ink)}
.engine span{color:var(--dim)}
.stay{display:flex;align-items:center;gap:10px;margin-top:18px;font:500 13.5px/1.3 var(--mono);color:var(--ok)}
.stay svg{flex:none}

/* customer agents: one brain per customer, any harness on top */
.custs{margin:clamp(48px,6vw,72px) auto 0;max-width:1000px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;text-align:left}
.cust{background:var(--paper);border-radius:var(--r);padding:clamp(20px,2.4vw,28px);display:flex;flex-direction:column;gap:14px;border:1px solid var(--line)}
.cust h3{font-size:16px;font-weight:600;letter-spacing:-.01em}
.cust .brain{display:flex;align-items:center;gap:10px;border-radius:12px;padding:12px 14px;background:color-mix(in srgb,var(--accent) 10%,var(--paper));border:1px solid color-mix(in srgb,var(--accent) 28%,transparent)}
.cust .brain i{width:10px;height:10px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 5px color-mix(in srgb,var(--accent) 18%,transparent);flex:none}
.cust .brain b{font-size:14.5px;font-weight:650;color:var(--a-ink)}
.cust .brain small{display:block;font-size:12.5px;color:var(--dim);font-weight:400}
.cust ul{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.cust li{font:500 13px/1.3 var(--mono);color:var(--ink);padding:9px 12px;border-radius:10px;background:var(--mist)}
.harn{margin:20px auto 0;max-width:1000px;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px 10px;font-size:14.5px;color:var(--dim)}
.harn b{font-weight:600;color:var(--ink);padding:8px 14px;border-radius:999px;background:var(--paper);border:1px solid var(--line)}
@media (max-width:860px){.custs{grid-template-columns:1fr;max-width:520px}}

/* agent runtime: four controls */
.ctl{margin:clamp(48px,6vw,72px) auto 0;max-width:1040px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;text-align:left}
.ctl article{border-radius:var(--r);padding:clamp(22px,2.8vw,32px);background:color-mix(in srgb,var(--n-fg) 6%,var(--n-bg));border:1px solid var(--n-line);display:flex;flex-direction:column;gap:16px}
.ctl h3{font-size:clamp(1.15rem,1.7vw,1.35rem);font-weight:650;letter-spacing:-.02em}
.ctl .mono{font:500 13px/1.6 var(--mono);color:var(--dim);border-radius:12px;padding:14px 16px;background:var(--n-bg);border:1px solid var(--n-line);overflow:hidden}
.ctl .mono b{color:var(--ink);font-weight:500}
.ctl .mono .ok{color:var(--ok)}
.ctl .mono .ac{color:var(--a-ink)}
.meter{height:8px;border-radius:999px;background:var(--n-line);overflow:hidden;margin:10px 0 6px}
.meter i{display:block;height:100%;width:61%;background:var(--accent);border-radius:inherit}
.split{display:flex;height:8px;border-radius:999px;overflow:hidden;margin:10px 0 6px;gap:3px}
.split i{display:block;height:100%;border-radius:999px}
.split i:nth-child(1){width:71%;background:var(--accent)}
.split i:nth-child(2){width:29%;background:var(--ok)}
.illus-note{margin-top:18px;font-size:13px;color:var(--dim)}
@media (max-width:760px){.ctl{grid-template-columns:1fr;max-width:560px}}

/* post-training lab: reuse the loop frame */
.soon{display:inline-block;margin-left:6px;vertical-align:middle;font:600 11.5px/1 var(--font);letter-spacing:.02em;padding:5px 9px;border-radius:999px;color:var(--a-ink);background:color-mix(in srgb,var(--accent) 14%,transparent)}

/* bring three people */
.trio{margin:clamp(48px,6vw,72px) auto 0;max-width:1040px;display:flex;align-items:center;justify-content:center;gap:clamp(14px,2vw,28px)}
.ppl{display:flex;gap:clamp(12px,2vw,24px)}
.pp{display:flex;flex-direction:column;align-items:center;gap:12px;width:clamp(92px,11vw,132px)}
.av{position:relative;width:clamp(76px,9vw,112px);aspect-ratio:1;border-radius:50%;background:var(--paper);border:1.5px solid color-mix(in srgb,var(--accent) 22%,var(--line));display:grid;place-items:center;overflow:hidden}
.av svg.who{width:62%;height:62%;color:var(--ink);margin-top:16%}
.av .badge{position:absolute;right:2%;bottom:6%;width:34%;aspect-ratio:1;border-radius:50%;background:var(--accent);color:var(--on-accent);display:grid;place-items:center;box-shadow:0 0 0 3px var(--paper)}
.av .badge svg{width:52%;height:52%}
.pp span{font-size:15px;font-weight:600;text-align:center;line-height:1.25}
.arr{flex:none;width:clamp(36px,5vw,64px);height:14px;color:var(--accent)}
.clock{flex:none;width:clamp(120px,13vw,168px);aspect-ratio:1;border-radius:50%;border:3px solid var(--accent);display:grid;place-content:center;text-align:center;background:var(--paper)}
.clock b{font-weight:700;letter-spacing:-.04em;line-height:1;font-size:clamp(2.6rem,4.6vw,3.6rem);color:var(--a-ink)}
.clock span{font:500 13px/1 var(--mono);color:var(--a-ink);margin-top:6px}
.outs{list-style:none;margin:0;padding:0;display:grid;gap:10px;min-width:clamp(180px,20vw,260px)}
.outs li{border-radius:999px;background:var(--accent);color:var(--on-accent);font-weight:650;font-size:clamp(15px,1.4vw,17px);text-align:center;padding:14px 22px}
.fwd{margin:clamp(40px,5vw,56px) auto 0;max-width:1040px;text-align:left;border-radius:calc(var(--r) + 6px);padding:clamp(22px,3vw,32px) clamp(22px,3vw,36px);
  background:color-mix(in srgb,var(--accent) 7%,var(--paper));display:grid;grid-template-columns:auto minmax(0,1fr);gap:4px 18px}
.fwd .q{grid-row:span 2;font-weight:800;font-size:56px;line-height:.8;color:var(--accent)}
.fwd .lbl{font:500 12.5px/1.4 var(--mono);letter-spacing:.16em;text-transform:uppercase;color:var(--a-ink)}
.fwd p{font-size:clamp(1.05rem,1.7vw,1.3rem);line-height:1.5;font-style:italic;color:var(--ink);max-width:44em}
.end-ctas{margin-top:clamp(36px,4.6vw,52px)}
@media (max-width:900px){
  .trio{flex-direction:column}
  .arr{transform:rotate(90deg)}
  .outs{width:min(100%,340px)}
}
@media (max-width:420px){.ppl{gap:8px}.pp{width:96px}.pp span{font-size:13.5px}}
'''

def svg_person():
    return ('<svg class="who" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="13" r="8" fill="currentColor"/>'
            '<path d="M3 40c0-10 7.6-16 17-16s17 6 17 16z" fill="currentColor"/></svg>')

BADGES = {
    'stack': '<svg viewBox="0 0 20 20" aria-hidden="true"><g fill="currentColor"><rect x="4" y="4" width="12" height="3" rx="1.2"/><rect x="4" y="8.5" width="12" height="3" rx="1.2"/><rect x="4" y="13" width="12" height="3" rx="1.2"/></g></svg>',
    'star': '<svg viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M10 2.6l2.2 4.6 5 .6-3.7 3.4 1 5-4.5-2.5-4.5 2.5 1-5L2.8 7.8l5-.6z"/></svg>',
    'flag': '<svg viewBox="0 0 20 20" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M6 17V3"/><path fill="currentColor" d="M6 3.5h8.5l-2 3 2 3H6z"/></svg>',
}
ARROW = '<svg class="arr" viewBox="0 0 64 14" aria-hidden="true"><path d="M0 7h56" stroke="currentColor" stroke-width="3"/><path d="M52 1l10 6-10 6z" fill="currentColor"/></svg>'
CHECK = '<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M5.5 9.2l2.3 2.3 4.7-4.9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'

def person(label, badge):
    return f'<div class="pp"><div class="av">{svg_person()}<span class="badge">{BADGES[badge]}</span></div><span>{label}</span></div>'

CAL = 'https://calendar.app.google/5TydwUfWCfrxn5tj7'

BODY = f'''<body>
<div id="page">
{sticky}

<!-- ============ HERO ============ -->
<section data-section="hero" class="band"><div class="wrap">
{nav}
<div class="hero vs-hero">
<h1 class="mega">Delight your customers with an AI Native SaaS.</h1>
<p class="sub">Don't lose your turf to new AI-age challengers. SynOS converts your domain data and expertise into winning AI features and <span class="nw">domain-trained</span>, <span class="nw">open-weight</span> AI models.</p>
<div class="ctas"><a data-cta="cta-early-access-hero" class="btn solid" href="/early-access">Bring one use case</a><a data-cta="cta-book-demo-hero" class="more" href="{CAL}" target="_blank" rel="noopener">Book 60 minutes&nbsp;<i aria-hidden="true">›</i></a></div>
</div>
</div></section>

<!-- ============ CASE STUDY ============ -->
<section data-section="case-study" class="band sec noir"><div class="wrap c">
<h2 class="big">Release new AI Agents<br><span class="then">in weeks.</span></h2>
<div class="cs" role="img" aria-label="A marketing automation SaaS product with 6K customers spent five months on two large data and cloud platforms without launching a production-ready agent. With SynOS it built the agent in under four weeks.">
<p class="cs-who"><b>A marketing automation SaaS product</b> with 6K customers</p>
<div class="cs-axis" aria-hidden="true"><span>Month 1</span><span>Month 2</span><span>Month 3</span><span>Month 4</span><span>Month 5</span></div>
<div class="cs-row"><h3>Before<small>Two large data and cloud platforms</small></h3><div class="cs-track"><span class="cs-bar no">No production-ready agent</span></div></div>
<div class="cs-row"><h3>With SynOS<small>Minimal engineering effort</small></h3><div class="cs-track"><span class="cs-bar yes"></span><span class="cs-lab">Built in under 4 weeks</span></div></div>
<div class="cs-out"><p>After <b>five months</b> of trying, the team had no agent ready for production. With SynOS they <b>built it in less than four weeks</b>, with minimal engineering effort.</p></div>
</div>
</div></section>

<!-- ============ INSIDE YOUR PRODUCT ============ -->
<section data-section="inside-your-product" class="band sec"><div class="wrap c">
<h2 class="big">SynOS runs<br><span class="then">inside your product.</span></h2>
<div class="box" aria-hidden="true">
<div class="bnd"><span class="bnd-tag">Your system boundary</span>
<div class="prod">
<div class="prod-top"><span class="prod-name"><i></i>Your product</span><span class="prod-tag">Your brand, your customers</span></div>
<div class="feats"><span>AI assistant</span><span>Insights agent</span><span>Custom agents</span></div>
<div class="engine"><b>Powered by SynOS</b><span>White-labelled, so your customers only see you</span></div>
</div>
<p class="stay">{CHECK}Data, traces and models stay inside</p>
</div>
</div>
<ul class="gets">
<li><b>Inside your product.</b><span>SynOS installs in your cloud and powers the AI features you ship.</span></li>
<li><b>No data leaves your system boundary.</b><span>Customer data, traces and models stay where they are today.</span></li>
<li><b>White-labelled.</b><span>Your name on every screen your customers see.</span></li>
</ul>
</div></section>

<!-- ============ CUSTOMER AGENTS ============ -->
<section data-section="customer-agents" class="band sec mist"><div class="wrap c">
<h2 class="big vs-h">Let your customers build custom agents inside your SaaS product.</h2>
<p class="sub lead">SynOS builds a Brain for each customer. Their business users build and launch new agents with the SynOS agent builder harness, or with any other harness like Claude or ChatGPT.</p>
<div class="custs" aria-hidden="true">
<div class="cust"><h3>Customer A</h3><div class="brain"><i></i><div><b>Brain</b><small>Their data, their procedures</small></div></div><ul><li>renewal-risk agent</li><li>weekly-brief agent</li></ul></div>
<div class="cust"><h3>Customer B</h3><div class="brain"><i></i><div><b>Brain</b><small>Their data, their procedures</small></div></div><ul><li>campaign-planner agent</li><li>audience-builder agent</li></ul></div>
<div class="cust"><h3>Customer C</h3><div class="brain"><i></i><div><b>Brain</b><small>Their data, their procedures</small></div></div><ul><li>diagnostics agent</li><li>reporting agent</li></ul></div>
</div>
<p class="harn" aria-label="Build with the SynOS agent builder, Claude, ChatGPT or any other harness"><span>Build with</span><b>SynOS agent builder</b><b>Claude</b><b>ChatGPT</b><b>Any harness</b></p>
</div></section>

<!-- ============ AGENT RUNTIME ============ -->
<section data-section="agent-runtime" class="band sec noir"><div class="wrap c">
<h2 class="big vs-h">Full control for your customers with SynOS Agent Runtime.</h2>
<div class="ctl">
<article><h3>Logs and traces for every agent run.</h3><div class="mono" aria-hidden="true"><b>run 4821</b> · campaign-planner<br>14 steps · 38.2s · <span class="ok">scored 0.92</span><br>trace › tools › writes recorded</div></article>
<article><h3>Agent identity management.</h3><div class="mono" aria-hidden="true">agent <b>renewal-risk</b><br>acts as <span class="ac">j.doe@customer-a</span><br>role analyst · revocable</div></article>
<article><h3>Token budgeting.</h3><div class="mono" aria-hidden="true"><b>Customer A</b> · this month<div class="meter"><i></i></div>612k of 1M tokens</div></article>
<article><h3>Cost reporting.</h3><div class="mono" aria-hidden="true"><b>$0.42</b> per run · per model, per provider<div class="split"><i></i><i></i></div><span class="ac">hosted model 71%</span> · <span class="ok">open-weight 29%</span></div></article>
</div>
<p class="illus-note">Illustrative values.</p>
</div></section>

<!-- ============ POST-TRAINING LAB ============ -->
<section data-section="post-training-lab" class="band sec"><div class="wrap c">
<h2 class="big vs-h">Your own <span class="nw">post-training</span> lab, without the research overhead.</h2>
<div class="org">
<span class="org-tag">SynOS inside your product</span>
<div class="spotwrap" aria-hidden="true"><i class="spot"></i></div>
<ol class="jobs loop">
<li><span class="n">01</span><h3>Improves with each run.</h3><p>Your agents keep improving as SynOS auto-evaluates and auto-optimises their prompts.</p></li>
<li><span class="n">02</span><h3>Generates training data.</h3><p>Training datasets are generated automatically from its own corrections.</p></li>
<li><span class="n">03</span><h3>SFT from your experts.</h3><p>Corrections made by your domain experts become datasets for supervised fine-tuning.</p></li>
<li><span class="n">04</span><h3>Domain-trained models.<span class="soon">Coming soon</span></h3><p>Get your own domain-trained, open-weight models with the SynOS RLVR bench.</p></li>
</ol>
</div>
</div></section>

<!-- ============ BOTTOM CTA ============ -->
<section data-section="bottom-cta" class="band sec mist"><div class="wrap c">
<h2 class="big vs-h">Bring three people. Leave with a plan.</h2>
<p class="sub lead">Bring one use case. In 60 minutes you leave with the feature, the test and a start date.</p>
<div class="trio" role="img" aria-label="Three people, from platform, a domain expert and the AI roadmap owner, spend 60 minutes with SynOS and leave with the feature, the test and a start date.">
<div class="ppl">{person('Platform','stack')}{person('Domain expert','star')}{person('AI roadmap','flag')}</div>
{ARROW}
<div class="clock"><b>60</b><span>minutes</span></div>
{ARROW}
<ul class="outs"><li>The feature</li><li>The test</li><li>A start date</li></ul>
</div>
<blockquote class="fwd"><span class="q" aria-hidden="true">“</span><span class="lbl">Forward this internally</span><p>SynOS can show our top requested agent feature working on our own systems in weeks. They need 60 minutes with platform, a domain expert and the AI roadmap owner.</p></blockquote>
<div class="ctas end-ctas"><a data-cta="cta-book-demo-bottom" class="btn solid" href="{CAL}" target="_blank" rel="noopener">Book the 60 minutes</a><a data-cta="cta-early-access-bottom" class="more" href="/early-access">Or request early access&nbsp;<i aria-hidden="true">›</i></a></div>
</div></section>

{footer}'''

out = head + CSS + '</style>\n</head>\n' + BODY + tail
# the closing band is light here, so the sticky-bar fade and the spotlight still apply unchanged
open('public/vertical-saas.html', 'w').write(out)
print('ok', len(out))
