"""Turn dist/ into a self-contained copy for hosting under any path:
relative links, inlined scripts, and an index page without its own
document wrapper. Usage: python3 scripts/make-hosted.py dist hosted"""
import re, sys, shutil, pathlib
src, out = map(pathlib.Path, sys.argv[1:3])
shutil.rmtree(out, ignore_errors=True); out.mkdir(parents=True)

def inline_scripts(html):
    def resolve(js, base):
        # Fold shared chunks (import{t as e}from"./chunk.js") into the script.
        def imp(m):
            chunk = resolve((base / m.group(2)).read_text(), base)
            exp = re.search(r'export\{([^}]*)\};?\s*$', chunk)
            assert exp, 'unsupported chunk export'
            pairs = [p.strip().split(' as ') for p in exp.group(1).split(',')]
            ns = '{' + ','.join(f'{(p[1] if len(p) > 1 else p[0])}:{p[0]}' for p in pairs) + '}'
            wanted = [p.strip().split(' as ') for p in m.group(1).split(',')]
            binds = ','.join(f'{(w[1] if len(w) > 1 else w[0])}=__m.{w[0]}' for w in wanted)
            return f'const __m=(()=>{{{chunk[:exp.start()]};return {ns};}})();const {binds};'
        return re.sub(r'import\{([^}]*)\}from"\./([^"]+)";', imp, js)
    def rep(m):
        path = src / m.group(1).lstrip('/')
        js = resolve(path.read_text(), path.parent)
        assert 'import' not in js.split(';', 1)[0], 'unresolved import'
        return f'<script type="module">{js}</script>'
    return re.sub(r'<script type="module" src="([^"]+)"></script>', rep, html)

FONT = ('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..700&display=swap">')
PIN = ('<style>:root,:root[data-theme]{color-scheme:light;'
       '--font:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;'
       '--font-display:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif}'
       'body{font-optical-sizing:auto;background:var(--paper)}</style>')

def drop_block(css_html, opener):
    """Remove every `opener{...}` block, matching nested braces."""
    out, i = [], 0
    while True:
        j = css_html.find(opener, i)
        if j < 0: out.append(css_html[i:]); return ''.join(out)
        out.append(css_html[i:j]); k = j + len(opener); depth = 1
        while depth:
            depth += {'{': 1, '}': -1}.get(css_html[k], 0); k += 1
        i = k

def light_only(html):
    # Keep the light design the previews showed, whatever theme the viewer uses.
    for opener in ['@media (prefers-color-scheme:dark){', ':root[data-theme=dark]{']:
        html = drop_block(html, opener)
    html = html.replace('<meta name="color-scheme" content="light dark">', '<meta name="color-scheme" content="light">')
    html = html.replace('color-scheme:light dark', 'color-scheme:light')
    return html

def relink(html, page):
    html = re.sub(r'<link rel="(?:manifest|sitemap|alternate)"[^>]*>', '', html)
    html = re.sub(r'<link rel="canonical"[^>]*>', '', html)
    html = html.replace('content="index, follow, max-image-preview:large, max-snippet:-1"', 'content="noindex, nofollow"')
    join = '#join' if page == 'index.html' else 'index.html#join'
    for a, b in [('href="/#join"', f'href="{join}"'), ('href="/methodology#', 'href="methodology.html#'),
                 ('href="/methodology"', 'href="methodology.html"'), ('href="/privacy"', 'href="privacy.html"'), ('href="/invite"', 'href="invite.html"'),
                 ('href="/"', 'href="index.html"'), ('href="/favicon', 'href="favicon'), ('href="/apple-touch', 'href="apple-touch')]:
        html = html.replace(a, b)
    return html

for page in ['index.html', 'privacy.html', 'invite.html']:
    html = light_only(relink(inline_scripts((src / page).read_text()), page))
    html = re.sub(r'(</style>)(?![\s\S]*</style>)', r'\1' + FONT.replace('\\', '\\\\') + PIN, html, count=1)
    if page == 'index.html':
        html = re.sub(r'<title>[^<]*</title>', '<title>Agent Maturity Index</title>', html, count=1)
        m = re.match(r'\s*<!DOCTYPE html>\s*<html[^>]*>\s*<head>(.*)</head>\s*<body>(.*?)(?:</body>\s*)?(?:</html>\s*)?$', html, re.S | re.I)
        assert m, 'unexpected index shape'
        title = re.search(r'<title>.*?</title>', m.group(1)).group(0)
        head = m.group(1).replace(title, '')
        head = re.sub(r'<meta (charset|name="viewport")[^>]*>', '', head)
        html = title + head + m.group(2)
    (out / page).write_text(html)
for f in ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png', 'og.png']:
    shutil.copy(src / f, out / f)
print('ok', sorted(p.name for p in out.iterdir()))
