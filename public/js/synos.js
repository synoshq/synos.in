// Shared page behaviour: nav scroll state, mobile nav, scroll reveal, GA section and CTA tracking.
// Loaded with `defer` from the head partial, so the DOM is ready and no page repeats this.
(function () {
  'use strict'

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Nav gains a background once the page has scrolled off the top.
  var nav = document.getElementById('nav')
  if (nav) {
    var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 50) }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
  }

  // Mobile nav.
  var toggle = document.getElementById('nav-toggle')
  var links = document.getElementById('nav-links')
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open')
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false')
    })
  }

  // Scroll reveal. Under reduced motion the CSS already shows everything, so skip the observer
  // rather than animating to the same place.
  var reveals = document.querySelectorAll('.sk-reveal')
  if (reveals.length && !reduceMotion && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('is-visible') })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    reveals.forEach(function (el) { revealObserver.observe(el) })
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible') })
  }

  // GA: one section_view per named section, once.
  var sections = document.querySelectorAll('[data-section]')
  if (sections.length && 'IntersectionObserver' in window) {
    var seen = {}
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return
        var name = e.target.getAttribute('data-section')
        if (seen[name]) return
        seen[name] = true
        if (typeof gtag === 'function') gtag('event', 'section_view', { section_name: name })
      })
    }, { threshold: 0.3 })
    sections.forEach(function (el) { sectionObserver.observe(el) })
  }

  // GA: CTA clicks.
  document.querySelectorAll('[data-cta]').forEach(function (el) {
    el.addEventListener('click', function () {
      if (typeof gtag === 'function') {
        gtag('event', 'cta_click', { cta_location: el.getAttribute('data-cta') || 'unknown' })
      }
    })
  })
})()
