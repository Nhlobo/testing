/**
 * Mapengo Innovations — main.js
 * Core site interactions: nav, scroll, animations, counters, cookies.
 */

(function () {
  'use strict';

  /* ── Utility: throttle ──────────────────────────────────── */
  function throttle(fn, ms) {
    let last = 0;
    return function (...args) {
      const now = Date.now();
      if (now - last >= ms) { last = now; fn.apply(this, args); }
    };
  }

  /* ── Sticky header on scroll ────────────────────────────── */
  function initStickyHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    function updateHeader() {
      if (window.scrollY > 60) {
        header.classList.remove('header-transparent');
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
        header.classList.add('header-transparent');
      }
    }

    window.addEventListener('scroll', throttle(updateHeader, 50), { passive: true });
    updateHeader(); // run on load
  }

  /* ── Mobile hamburger nav ───────────────────────────────── */
  function initMobileNav() {
    // Elements are injected by components.js; wait for them
    function setup() {
      const hamburger = document.getElementById('hamburger');
      const mobileNav  = document.getElementById('mobile-nav');
      if (!hamburger || !mobileNav) return;

      function openMenu() {
        hamburger.classList.add('open');
        mobileNav.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }

      function closeMenu() {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }

      hamburger.addEventListener('click', function () {
        if (mobileNav.classList.contains('open')) closeMenu();
        else openMenu();
      });

      // Close on nav link click
      mobileNav.querySelectorAll('.mobile-nav-link, .btn').forEach(link => {
        link.addEventListener('click', closeMenu);
      });

      // Close on Escape key
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
      });

      // Close when clicking outside
      document.addEventListener('click', function (e) {
        if (
          mobileNav.classList.contains('open') &&
          !mobileNav.contains(e.target) &&
          !hamburger.contains(e.target)
        ) {
          closeMenu();
        }
      });
    }

    // Components are injected via DOMContentLoaded; bind after
    document.addEventListener('DOMContentLoaded', setup);
  }

  /* ── Smooth scroll for anchor links ────────────────────── */
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const headerH = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  }

  /* ── Intersection Observer — reveal (no-op, elements visible by default) ── */
  function initReveal() {
    // Animations removed per design requirements — all elements visible immediately
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  /* ── Counter display (no animation) ────────────────────── */
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    counters.forEach(function (el) {
      el.textContent = (el.dataset.prefix || '') + el.dataset.counter + (el.dataset.suffix || '');
    });
  }

  /* ── Portfolio filter tabs ──────────────────────────────── */
  function initPortfolioFilter() {
    const tabContainer = document.querySelector('.filter-tabs');
    const cards = document.querySelectorAll('.portfolio-card[data-category]');
    if (!tabContainer || !cards.length) return;

    tabContainer.addEventListener('click', function (e) {
      const tab = e.target.closest('.filter-tab');
      if (!tab) return;

      // Update active tab
      tabContainer.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      cards.forEach(function (card) {
        if (filter === 'all' || card.dataset.category === filter) {
          card.removeAttribute('data-hidden');
          card.style.display = '';
        } else {
          card.setAttribute('data-hidden', 'true');
          card.style.display = 'none';
        }
      });
    });
  }

  /* ── Back to top button ─────────────────────────────────── */
  function initBackToTop() {
    document.addEventListener('DOMContentLoaded', function () {
      const btn = document.getElementById('back-to-top');
      if (!btn) return;

      btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  /* ── Cookie consent banner ──────────────────────────────── */
  function initCookieBanner() {
    const STORAGE_KEY = 'mapengo_cookie_consent';

    function showBanner() {
      const banner = document.getElementById('cookie-banner');
      if (!banner) return;
      // Slight delay so it doesn't flash immediately
      setTimeout(() => banner.classList.add('show'), 1500);

      const acceptBtn = document.getElementById('cookie-accept');
      const declineBtn = document.getElementById('cookie-decline');

      function dismiss(accepted) {
        banner.classList.remove('show');
        banner.classList.add('hide');
        localStorage.setItem(STORAGE_KEY, accepted ? 'accepted' : 'declined');
      }

      if (acceptBtn)  acceptBtn.addEventListener('click',  () => dismiss(true));
      if (declineBtn) declineBtn.addEventListener('click', () => dismiss(false));
    }

    document.addEventListener('DOMContentLoaded', function () {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) showBanner();
    });
  }

  /* ── Testimonial slider (removed — no auto-play) ────────── */
  function initTestimonialSlider() {
    // Slider removed per design requirements (no animations)
  }

  /* ── Active nav link highlight ──────────────────────────── */
  function initActiveNav() {
    // components.js sets active on inject; this handles dynamic cases
    const path = window.location.pathname;
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(function (link) {
      const href = link.getAttribute('href') || '';
      // Simple substring match for sub-pages
      const cleanHref = href.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '');
      if (href && href !== './' && href !== '../' && cleanHref && path.includes(cleanHref)) {
        link.classList.add('active');
      }
    });
  }

  /* ── Init all ───────────────────────────────────────────── */
  /* ── Contact form → mailto fallback ────────────────────── */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const get = function (id) {
        const el = document.getElementById(id);
        return el ? (el.value || '').trim() : '';
      };

      const name        = get('contact-name');
      const email       = get('contact-email');
      const phone       = get('contact-phone');
      const company     = get('contact-company');
      const service     = get('contact-service');
      const description = get('contact-description');
      const budget      = get('contact-budget');

      const subject = encodeURIComponent('Project Enquiry from ' + (name || 'Website Visitor'));
      const body = encodeURIComponent(
        'Name: '        + name        + '\n' +
        'Email: '       + email       + '\n' +
        'Phone: '       + (phone   || 'Not provided') + '\n' +
        'Company: '     + (company || 'Not provided') + '\n' +
        'Service: '     + (service || 'Not specified') + '\n' +
        'Budget: '      + (budget  || 'Not specified') + '\n\n' +
        'Message:\n'    + description
      );

      window.location.href = 'mailto:mapengoinnovations@gmail.com?subject=' + subject + '&body=' + body;
    });
  }

  initStickyHeader();
  initMobileNav();
  initSmoothScroll();
  initBackToTop();
  initCookieBanner();

  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initCounters();
    initPortfolioFilter();
    initTestimonialSlider();
    initActiveNav();
    initContactForm();
  });
})();
