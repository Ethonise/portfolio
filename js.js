/* =========================================================
   Eldar — Portfolio
   Vanilla JS. No dependencies.
   ========================================================= */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------------------------------------------------------
     1. Header — add a border once the page is scrolled
     ------------------------------------------------------- */
  var header = document.getElementById('site-header');

  function updateHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  /* -------------------------------------------------------
     2. Mobile navigation
     ------------------------------------------------------- */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.getElementById('nav-links');

  function closeNav() {
    if (!navMenu || !navToggle) return;
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close after choosing a link
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    // Close when clicking outside
    document.addEventListener('click', function (event) {
      if (!navMenu.classList.contains('is-open')) return;
      if (navMenu.contains(event.target) || navToggle.contains(event.target)) return;
      closeNav();
    });

    // Close on Escape
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeNav();
    });

    // Reset when resizing back to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 780) closeNav();
    });
  }

  /* -------------------------------------------------------
     3. Reveal elements on scroll
     ------------------------------------------------------- */
  var revealElements = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, {
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.08
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* -------------------------------------------------------
     4. Highlight the active navigation link
     ------------------------------------------------------- */
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav a[href^="#"]');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var linkMap = {};

    navLinks.forEach(function (link) {
      linkMap[link.getAttribute('href').slice(1)] = link;
    });

    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        navLinks.forEach(function (link) {
          link.classList.remove('is-active');
        });

        var activeLink = linkMap[entry.target.id];
        if (activeLink) activeLink.classList.add('is-active');
      });
    }, {
      rootMargin: '-45% 0px -50% 0px',
      threshold: 0
    });

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* -------------------------------------------------------
     5. Placeholder links (replace href later, no jump to top)
     ------------------------------------------------------- */
  

})();