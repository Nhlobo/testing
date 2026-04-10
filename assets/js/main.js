/**
 * Mapengo Innovations — main.js
 * Core interactions: sticky header, mobile nav, scroll reveal,
 * counters, cookie banner, form validation, back-to-top.
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

  /* ── Sticky header ──────────────────────────────────────── */
  function initStickyHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    // On pages with a .hero, start transparent then go white on scroll.
    // On inner pages (no hero), always show the white header.
    const hasHero = !!document.querySelector('.hero');

    function updateHeader() {
      const scrolled = window.scrollY > 20;
      if (scrolled) {
        header.classList.remove('header-transparent');
        header.classList.add('header-scrolled');
      } else {
        if (hasHero) {
          header.classList.add('header-transparent');
          header.classList.remove('header-scrolled');
        } else {
          // Non-hero pages: always show the solid white header
          header.classList.remove('header-transparent');
          header.classList.add('header-scrolled');
        }
      }
    }

    window.addEventListener('scroll', throttle(updateHeader, 50), { passive: true });
    updateHeader();
  }

  /* ── Mobile hamburger nav ───────────────────────────────── */
  function initMobileNav() {
    function setup() {
      const hamburger  = document.getElementById('hamburger');
      const mobileNav  = document.getElementById('mobile-nav');
      const overlay    = document.getElementById('mobile-nav-overlay');
      const header     = document.getElementById('site-header');
      const mobileClose = document.getElementById('mobile-nav-close');
      if (!hamburger || !mobileNav) return;

      const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

      function openMenu() {
        hamburger.classList.add('open');
        mobileNav.classList.add('open');
        if (overlay) {
          overlay.style.display = 'block';
          requestAnimationFrame(() => overlay.classList.add('open'));
        }
        if (header) header.classList.add('nav-open');
        document.body.classList.add('menu-open');
        document.body.style.overflow = 'hidden';
        hamburger.setAttribute('aria-expanded', 'true');
        mobileNav.setAttribute('aria-hidden', 'false');
        const firstLink = mobileNav.querySelector(focusableSelector);
        if (firstLink) firstLink.focus();
      }

      function closeMenu() {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        if (overlay) {
          overlay.classList.remove('open');
          setTimeout(() => { overlay.style.display = 'none'; }, 300);
        }
        if (header) header.classList.remove('nav-open');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        hamburger.focus();
      }

      hamburger.addEventListener('click', function () {
        mobileNav.classList.contains('open') ? closeMenu() : openMenu();
      });

      mobileNav.querySelectorAll('.mobile-nav-link, .btn').forEach(link => {
        link.addEventListener('click', closeMenu);
      });

      if (mobileClose) mobileClose.addEventListener('click', closeMenu);
      if (overlay) overlay.addEventListener('click', closeMenu);

      document.addEventListener('keydown', function (e) {
        if (!mobileNav.classList.contains('open')) return;
        if (e.key === 'Escape') { closeMenu(); return; }
        if (e.key !== 'Tab') return;

        const focusable = Array.from(mobileNav.querySelectorAll(focusableSelector));
        if (!focusable.length) return;
        const first = focusable[0];
        const last  = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      });

      /* Sync tabindex when closed */
      function syncTabState() {
        const isOpen = mobileNav.classList.contains('open');
        mobileNav.querySelectorAll(focusableSelector).forEach(el => {
          el.tabIndex = isOpen ? 0 : -1;
        });
      }
      const mutObs = new MutationObserver(syncTabState);
      mutObs.observe(mobileNav, { attributes: true, attributeFilter: ['class'] });
      syncTabState();

      window.addEventListener('resize', function () {
        if (window.innerWidth > 1024 && mobileNav.classList.contains('open')) closeMenu();
      });
    }

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

  /* ── Scroll reveal (IntersectionObserver) ───────────────── */
  function initReveal() {
    // Reveal individual elements
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-up');
    // Reveal stagger containers
    const staggerEls = document.querySelectorAll('.stagger');

    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('revealed'));
      staggerEls.forEach(el => el.classList.add('revealed'));
      return;
    }

    const revealObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach(el => revealObs.observe(el));
    staggerEls.forEach(el => revealObs.observe(el));
  }

  /* ── Counter animation ──────────────────────────────────── */
  function animateCounter(el, target, duration) {
    const start  = performance.now();
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';

    function frame(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + Math.round(eased * target) + suffix;
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

    const obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const el = entry.target;
            animateCounter(el, parseInt(el.dataset.counter, 10), 1800);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(el => obs.observe(el));
  }

  /* ── Portfolio filter tabs ──────────────────────────────── */
  function initPortfolioFilter() {
    const tabContainer = document.querySelector('.filter-tabs');
    const cards = document.querySelectorAll('.portfolio-card[data-category]');
    if (!tabContainer || !cards.length) return;

    tabContainer.addEventListener('click', function (e) {
      const tab = e.target.closest('.filter-tab');
      if (!tab) return;
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

  /* ── Back to top ────────────────────────────────────────── */
  function initBackToTop() {
    document.addEventListener('DOMContentLoaded', function () {
      const btn = document.getElementById('back-to-top');
      if (!btn) return;
      btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  /* ── Cookie banner ──────────────────────────────────────── */
  function initCookieBanner() {
    const STORAGE_KEY = 'mapengo_cookie_consent';

    function showBanner() {
      const banner    = document.getElementById('cookie-banner');
      if (!banner) return;
      setTimeout(() => banner.classList.add('show'), 1500);

      const acceptBtn  = document.getElementById('cookie-accept');
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
      if (!localStorage.getItem(STORAGE_KEY)) showBanner();
    });
  }

  /* ── Active nav highlight ───────────────────────────────── */
  function initActiveNav() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(function (link) {
      const href = link.getAttribute('href') || '';
      const cleanHref = href.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '');
      if (href && href !== './' && href !== '../' && cleanHref && path.includes(cleanHref)) {
        link.classList.add('active');
      }
    });
  }

  /* ── Testimonial auto-cycle ─────────────────────────────── */
  function initTestimonialSlider() {
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

  /* ── Image error fallback ───────────────────────────────── */
  function initImageFallbacks() {
    document.addEventListener('error', function (e) {
      if (e.target.tagName === 'IMG') {
        e.target.style.opacity = '0';
      }
    }, true);
  }

  /* ── Smooth page transitions ────────────────────────────── */
  function initPageTransitions() {
    // Fade out on navigation to internal link
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:')
        || href.startsWith('tel:') || link.target === '_blank') return;

      const isInternal = !href.startsWith('http') || href.includes(window.location.hostname);
      if (!isInternal) return;

      // Only trigger if it's a real navigation (not modified click)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      e.preventDefault();
      document.body.style.transition = 'opacity 150ms ease';
      document.body.style.opacity = '0';
      setTimeout(() => { window.location.href = href; }, 150);
    });

    // Fade in on load
    document.addEventListener('DOMContentLoaded', function () {
      document.body.style.opacity = '0';
      requestAnimationFrame(function () {
        document.body.style.transition = 'opacity 200ms ease';
        document.body.style.opacity = '1';
      });
    });
  }

  /* ── Contact form → Formspree ───────────────────────────── */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn   = document.getElementById('contact-submit');
    const submitLabel = submitBtn ? submitBtn.querySelector('.submit-btn-label') : null;
    const statusEl    = document.getElementById('contact-form-status');

    const requiredFields = [
      { id: 'contact-name',    message: 'Please enter your full name.' },
      { id: 'contact-email',   message: 'Please enter a valid email address.' },
      { id: 'contact-service', message: 'Please choose the service you need.' },
      { id: 'contact-message', message: 'Please provide a project description (minimum 20 characters).' },
    ];

    function setError(id, message) {
      const el = document.getElementById(id + '-error');
      if (el) el.textContent = message || '';
    }

    function clearErrors() {
      ['contact-name', 'contact-email', 'contact-phone', 'contact-service', 'contact-message']
        .forEach(id => setError(id, ''));
    }

    function setStatus(message, type) {
      if (!statusEl) return;
      statusEl.textContent = message || '';
      statusEl.className   = 'form-status' + (type ? ' ' + type : '');
    }

    function setLoading(loading) {
      if (!submitBtn) return;
      submitBtn.disabled = loading;
      submitBtn.classList.toggle('is-loading', loading);
      submitBtn.setAttribute('aria-busy', loading ? 'true' : 'false');
      if (submitLabel) submitLabel.textContent = loading ? 'Sending enquiry...' : 'Send Secure Enquiry';
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      clearErrors();
      setStatus('');

      let hasError = false;
      requiredFields.forEach(function (field) {
        const input = document.getElementById(field.id);
        if (input && !input.checkValidity()) {
          setError(field.id, field.message);
          hasError = true;
        }
      });

      const phoneInput = document.getElementById('contact-phone');
      if (phoneInput && phoneInput.value.trim() && !/^[+()\d\s-]{7,30}$/.test(phoneInput.value.trim())) {
        setError('contact-phone', 'Please enter a valid phone number.');
        hasError = true;
      }

      if (hasError) {
        setStatus('Please correct the highlighted fields and try again.', 'error');
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form),
        });

        if (!response.ok) throw new Error('Submission failed');

        form.reset();

        const redirectPath = form.getAttribute('data-success-redirect');
        if (redirectPath) {
          window.location.assign(new URL(redirectPath, window.location.href).toString());
          return;
        }

        setStatus('Thank you. Your enquiry was sent. We will reply within 24 hours.', 'success');
      } catch (err) {
        setStatus('Submission failed. Please try again or email info@MapengoInnovations.co.za.', 'error');
      } finally {
        setLoading(false);
      }
    });
  }

  /* ── Service worker ─────────────────────────────────────── */
  function initServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    window.addEventListener('load', function () {
      const path  = window.location.pathname;
      const parts = path.replace(/\/$/, '').split('/').filter(Boolean);
      const repoName = 'testing';
      const repoIdx  = parts.indexOf(repoName);
      const scopeBase = repoIdx !== -1
        ? `/${parts.slice(0, repoIdx + 1).join('/')}/`
        : '/';
      navigator.serviceWorker
        .register(`${scopeBase}sw.js`, { scope: scopeBase })
        .catch(function () { /* non-critical, fail silently */ });
    });
  }

  /* ── Bootstrap ──────────────────────────────────────────── */
  initStickyHeader();
  initMobileNav();
  initSmoothScroll();
  initBackToTop();
  initCookieBanner();
  initImageFallbacks();
  initPageTransitions();
  initServiceWorker();

  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initCounters();
    initPortfolioFilter();
    initTestimonialSlider();
    initActiveNav();
    initContactForm();
  });
})();
