// Loaded by every page in /figures/. Reports its own height to the parent so the frame can be
// sized to the content instead of the host guessing a number that is wrong at every other width.
//
// Same-origin only: figures are served from this site, never embedded from anywhere else, so the
// message is scoped to location.origin rather than '*'.
(function () {
  'use strict'
  if (window.parent === window) return   // opened directly, not embedded

  var last = 0
  function report() {
    // MUST measure <body>, not <html>. documentElement never reports less than the frame's own
    // viewport, so once the parent grows the frame the next measurement returns the larger number,
    // which grows it again. That loop took the homepage to 24,570px before it was caught.
    var b = document.body
    var cs = window.getComputedStyle(b)
    var h = Math.ceil(
      b.getBoundingClientRect().height + parseFloat(cs.marginTop) + parseFloat(cs.marginBottom)
    )
    if (Math.abs(h - last) < 2) return   // ignore sub-pixel churn, or the observer never settles
    last = h
    window.parent.postMessage({ type: 'synos:figure-height', height: h, src: location.pathname }, location.origin)
  }

  window.addEventListener('load', report)
  window.addEventListener('resize', report)

  // Fonts land after first paint and change the height, which is the usual cause of a frame that
  // is correct on reload and short on first view.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(report)

  if (window.ResizeObserver) new ResizeObserver(report).observe(document.documentElement)
  report()
})()
