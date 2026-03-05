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

  /* ── Intersection Observer — reveal animations ──────────── */
  function initReveal() {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!els.length || !('IntersectionObserver' in window)) {
      // Fallback: show all
      els.forEach(el => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    els.forEach(el => observer.observe(el));
  }

  /* ── Counter animation ──────────────────────────────────── */
  function animateCounter(el, target, duration) {
    const start = performance.now();
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';

    function frame(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = prefix + current + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) {
      counters.forEach(el => {
        el.textContent = (el.dataset.prefix || '') + el.dataset.counter + (el.dataset.suffix || '');
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const el = entry.target;
            animateCounter(el, parseInt(el.dataset.counter, 10), 1800);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(el => observer.observe(el));
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

  /* ── Testimonial simple auto-play (CSS fallback) ────────── */
  function initTestimonialSlider() {
    // Simple fade-through slider if .testimonials-slider present
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.testimonial-slide');
    if (slides.length < 2) return;

    let current = 0;
    slides[0].classList.add('active');

    setInterval(function () {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 4500);
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
  });
})();
