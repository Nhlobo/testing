/**
 * Mapengo Innovations — main.js
 * Premium Digital Agency · Johannesburg, South Africa
 * Vanilla JS — no external dependencies
 */

'use strict';

/* ============================================================
   REDUCED MOTION CHECK
   ============================================================ */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================================================
   1. INIT HEADER — sticky with scrolled class
   ============================================================ */
function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const SCROLL_THRESHOLD = 60;

  function onScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Set initial state
  onScroll();

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ============================================================
   2. INIT MOBILE NAV — hamburger, ARIA, focus trap, Escape
   ============================================================ */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const body = document.body;

  if (!hamburger || !mobileNav) return;

  // All focusable elements within the mobile nav
  function getFocusableElements() {
    return Array.from(
      mobileNav.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);
  }

  function openNav() {
    mobileNav.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden', 'false');
    body.classList.add('nav-open');

    // Focus first focusable element in nav
    const focusables = getFocusableElements();
    if (focusables.length > 0) {
      setTimeout(() => focusables[0].focus(), 50);
    }
  }

  function closeNav() {
    mobileNav.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    body.classList.remove('nav-open');
    hamburger.focus();
  }

  function isNavOpen() {
    return mobileNav.classList.contains('is-open');
  }

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    if (isNavOpen()) {
      closeNav();
    } else {
      openNav();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isNavOpen()) {
      closeNav();
    }
  });

  // Focus trap within mobile nav
  mobileNav.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    const focusables = getFocusableElements();
    if (focusables.length === 0) return;

    const firstFocusable = focusables[0];
    const lastFocusable = focusables[focusables.length - 1];

    if (e.shiftKey) {
      // Shift+Tab: if on first element, wrap to last
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      // Tab: if on last element, wrap to first
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  });

  // Close nav when a mobile nav link is clicked
  const mobileNavLinks = mobileNav.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeNav();
    });
  });

  // Close nav when clicking the backdrop (outside nav inner content)
  mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) {
      closeNav();
    }
  });

  // Set initial ARIA state
  hamburger.setAttribute('aria-expanded', 'false');
  mobileNav.setAttribute('aria-hidden', 'true');
}

/* ============================================================
   3. INIT SMOOTH SCROLL — for anchor links
   ============================================================ */
function initSmoothScroll() {
  if (prefersReducedMotion) return;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const headerHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height') || '72',
        10
      );

      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });

      // Update focus for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });
}

/* ============================================================
   4. INIT REVEAL — IntersectionObserver for .reveal elements
   ============================================================ */
function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length === 0) return;

  // If reduced motion, just show all elements immediately
  if (prefersReducedMotion) {
    revealEls.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealEls.forEach(el => observer.observe(el));
}

/* ============================================================
   5. INIT CONTACT FORM — validation, submit, success/error
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('[data-submit-btn]');
  const successEl = document.getElementById('form-success');

  // Email regex — RFC 5322 simplified
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /**
   * Validate a single field
   * @param {HTMLInputElement|HTMLTextAreaElement} field
   * @returns {string} Error message or empty string
   */
  function validateField(field) {
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');
    const type = field.type;
    const name = field.name;

    if (isRequired && value === '') {
      return getRequiredMessage(name);
    }

    if (type === 'email' && value !== '' && !emailRegex.test(value)) {
      return 'Please enter a valid email address.';
    }

    if (name === 'message' && value.length > 0 && value.length < 10) {
      return 'Message must be at least 10 characters.';
    }

    return '';
  }

  function getRequiredMessage(fieldName) {
    const messages = {
      name: 'Your name is required.',
      email: 'Your email address is required.',
      message: 'A message is required.',
    };
    return messages[fieldName] || 'This field is required.';
  }

  /**
   * Show or clear an error on a field
   */
  function setFieldError(field, errorMessage) {
    const errorEl = document.getElementById(`${field.name}-error`);

    if (errorMessage) {
      field.classList.add('is-error');
      field.setAttribute('aria-invalid', 'true');
      if (errorEl) {
        errorEl.textContent = errorMessage;
        errorEl.setAttribute('role', 'alert');
      }
    } else {
      field.classList.remove('is-error');
      field.setAttribute('aria-invalid', 'false');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.removeAttribute('role');
      }
    }
  }

  /**
   * Validate all required/email fields in the form
   * @returns {boolean} Whether form is valid
   */
  function validateForm() {
    const fields = form.querySelectorAll('input, textarea');
    let isValid = true;
    let firstErrorField = null;

    fields.forEach(field => {
      const error = validateField(field);
      setFieldError(field, error);
      if (error && !firstErrorField) {
        firstErrorField = field;
        isValid = false;
      }
    });

    // Focus first error field for accessibility
    if (firstErrorField) {
      firstErrorField.focus();
    }

    return isValid;
  }

  // Live validation: validate on blur (after user leaves field)
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', () => {
      const error = validateField(field);
      setFieldError(field, error);
    });

    // Clear error on input after it was shown
    field.addEventListener('input', () => {
      if (field.classList.contains('is-error')) {
        const error = validateField(field);
        setFieldError(field, error);
      }
    });
  });

  // Form submit handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    // Set loading state
    if (submitBtn) {
      submitBtn.classList.add('btn--loading');
      submitBtn.setAttribute('disabled', 'true');
      submitBtn.textContent = 'Sending…';
    }

    // Simulate async submission (replace with real fetch in production)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Show success state
    if (submitBtn) {
      submitBtn.classList.remove('btn--loading');
      submitBtn.removeAttribute('disabled');
      submitBtn.textContent = 'Send Message →';
    }

    if (successEl) {
      successEl.classList.add('is-visible');
      successEl.setAttribute('role', 'status');
      successEl.setAttribute('aria-live', 'polite');
      // Scroll to success message
      successEl.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'nearest' });
    }

    // Reset the form
    form.reset();

    // Clear all error states
    form.querySelectorAll('input, textarea').forEach(field => {
      setFieldError(field, '');
    });
  });
}

/* ============================================================
   6. HERO SCROLL INDICATOR — fade on scroll
   ============================================================ */
function initHeroScroll() {
  const scrollIndicator = document.querySelector('.hero-scroll');
  if (!scrollIndicator || prefersReducedMotion) return;

  window.addEventListener('scroll', () => {
    const opacity = Math.max(0, 1 - window.scrollY / 200);
    scrollIndicator.style.opacity = opacity;
  }, { passive: true });
}

/* ============================================================
   7. ACTIVE NAV LINK HIGHLIGHTING
   ============================================================ */
function initActiveNav() {
  // Set aria-current="page" based on current URL
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const linkPath = href.split('/').pop();

    const isHome = (linkPath === '' || linkPath === 'index.html' || linkPath === './') &&
                   (currentPath === '' || currentPath === 'index.html' || currentPath === 'testing');
    const isMatch = linkPath === currentPath;

    if (isHome || isMatch) {
      link.setAttribute('aria-current', 'page');
      link.classList.add('is-active');
    }
  });
}

/* ============================================================
   8. STAGGERED HERO ANIMATION
   ============================================================ */
function initHeroAnimation() {
  if (prefersReducedMotion) return;

  const heroEls = document.querySelectorAll('[data-hero-animate]');
  heroEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`;

    // Trigger after paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  });
}

/* ============================================================
   INIT ALL — DOMContentLoaded
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initSmoothScroll();
  initReveal();
  initContactForm();
  initHeroScroll();
  initActiveNav();
  initHeroAnimation();
});
