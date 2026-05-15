/**
 * Mapengo Innovations — components.js
 * Injects shared header and footer into every page.
 */

(function () {
  'use strict';

  /* ── Base path detection ────────────────────────────────── */
  function getBasePath() {
    const path = window.location.pathname;
    const parts = path.replace(/\/$/, '').split('/').filter(Boolean);

    const repoName = 'testing';
    const repoIdx = parts.indexOf(repoName);
    let subParts;

    if (repoIdx !== -1) {
      subParts = parts.slice(repoIdx + 1);
    } else {
      subParts = parts;
    }

    const lastPart = subParts[subParts.length - 1] || '';
    if (lastPart.includes('.')) {
      subParts = subParts.slice(0, -1);
    }

    const depth = subParts.length;
    if (depth === 0) return './';
    return '../'.repeat(depth);
  }

  const BASE = getBasePath();

  /* ── Navigation data ────────────────────────────────────── */
  const navLinks = [
    { label: 'Home',         href: '' },
    { label: 'About',        href: 'about/' },
    { label: 'Services',     href: 'services/' },
    { label: 'Work',         href: 'work/' },
    { label: 'Technologies', href: 'technologies/' },
    { label: 'Pricing',      href: 'pricing/' },
    { label: 'Blog',         href: 'blog/' },
    { label: 'Careers',      href: 'careers/' },
    { label: 'Contact',      href: 'contact/' },
  ];

  /* ── Active link detection ──────────────────────────────── */
  function isActiveLink(href) {
    const path = window.location.pathname;
    if (href === '') {
      return path === '/' || path.endsWith('/testing/') || path.endsWith('/testing/index.html');
    }
    return path.includes('/' + href.replace(/\/$/, ''));
  }

  /* ── Header HTML ────────────────────────────────────────── */
  function buildHeader() {
    const navItems = navLinks.map(link => {
      const active = isActiveLink(link.href) ? ' active' : '';
      return `<a href="${BASE}${link.href}" class="nav-link${active}">${link.label}</a>`;
    }).join('');

    const mobileItems = navLinks.map(link => {
      const active = isActiveLink(link.href) ? ' active' : '';
      return `<a href="${BASE}${link.href}" class="mobile-nav-link${active}">${link.label}</a>`;
    }).join('');

    return `
<div class="header-inner">
  <a href="${BASE}" class="header-logo" aria-label="Mapengo Innovations — Home">
    <img src="${BASE}assets/img/logo.png" alt="Mapengo Innovations" width="180" height="52">
  </a>

  <nav class="header-nav" aria-label="Main navigation">
    ${navItems}
  </nav>

  <div class="header-cta">
    <a href="${BASE}contact/" class="btn btn-primary btn-sm">Request a Quote</a>
    <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobile-nav" aria-haspopup="true">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</div>

<!-- Mobile nav overlay -->
<div class="mobile-nav-overlay" id="mobile-nav-overlay" aria-hidden="true"></div>

<!-- Mobile navigation -->
<nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" aria-hidden="true">
  <button class="mobile-nav-close" id="mobile-nav-close" type="button" aria-label="Close navigation">
    <span aria-hidden="true">&times;</span>
    <span>Close</span>
  </button>
  ${mobileItems}
  <div class="mobile-nav-footer">
    <a href="${BASE}contact/" class="btn btn-primary" style="width:100%;justify-content:center;">Request a Quote &rarr;</a>
  </div>
</nav>`;
  }

  /* ── Footer HTML ────────────────────────────────────────── */
  function buildFooter() {
    return `
<div class="footer-main">
  <div class="container">
    <div class="footer-grid">
      <!-- Brand column -->
      <div class="footer-brand">
        <a href="${BASE}" class="footer-logo" aria-label="Mapengo Innovations">
          <img src="${BASE}assets/img/logo.png" alt="Mapengo Innovations" width="160" height="52">
        </a>
        <p>Mapengo Innovations is a South African software company focused on practical outcomes. We design and build fast websites, secure web applications, and mobile apps for startups, SMEs, and established teams.</p>
        <div class="footer-social">
          <a href="https://linkedin.com/company/mapengo-innovations" class="social-link" aria-label="LinkedIn" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2" fill="currentColor"/></svg>
          </a>
          <a href="https://facebook.com/" class="social-link" aria-label="Facebook" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V8a2 2 0 012-2h2V2h-3a6 6 0 00-6 6v2H5v4h3v8z"/></svg>
          </a>
          <a href="https://instagram.com/" class="social-link" aria-label="Instagram" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
          </a>
          <a href="https://tiktok.com/" class="social-link" aria-label="TikTok" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 3v8.3a4.7 4.7 0 11-3.5-4.5V10a1.3 1.3 0 00-1.3 1.3 1.3 1.3 0 101.3 1.3V3h3.5a4.5 4.5 0 004.5 4.5V11a8 8 0 01-4.5-1.4V3z"/></svg>
          </a>
        </div>
      </div>

      <!-- Services column -->
      <div class="footer-col">
        <h4>Services</h4>
        <ul class="footer-links">
          <li><a href="${BASE}services/#web-development" class="footer-link">Web Development</a></li>
          <li><a href="${BASE}services/#mobile-apps" class="footer-link">Mobile Apps</a></li>
          <li><a href="${BASE}services/#ui-ux-design" class="footer-link">UI/UX Design</a></li>
          <li><a href="${BASE}services/#ecommerce" class="footer-link">E-Commerce</a></li>
          <li><a href="${BASE}services/#cloud-hosting" class="footer-link">Deployment &amp; Launch</a></li>
          <li><a href="${BASE}services/#maintenance-support" class="footer-link">Maintenance &amp; Support</a></li>
        </ul>
      </div>

      <!-- Company column -->
      <div class="footer-col">
        <h4>Company</h4>
        <ul class="footer-links">
          <li><a href="${BASE}about/" class="footer-link">About Us</a></li>
          <li><a href="${BASE}work/" class="footer-link">Our Work</a></li>
          <li><a href="${BASE}technologies/" class="footer-link">Technologies</a></li>
          <li><a href="${BASE}pricing/" class="footer-link">Pricing</a></li>
          <li><a href="${BASE}blog/" class="footer-link">Blog</a></li>
          <li><a href="${BASE}careers/" class="footer-link">Collaboration</a></li>
        </ul>
      </div>

      <!-- Contact column -->
      <div class="footer-col">
        <h4>Contact</h4>
        <div class="footer-contact-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <a href="mailto:info@MapengoInnovations.co.za">info@MapengoInnovations.co.za</a>
        </div>
        <div class="footer-contact-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.86 9.56 19.79 19.79 0 01.81 3.18 2 2 0 012.8 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l.96-.96a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          <span>+27 66 552 0197</span>
        </div>
        <div class="footer-contact-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          <span>South Africa &mdash; Online &amp; Remote</span>
        </div>
        <a href="${BASE}contact/" class="btn btn-outline-accent btn-sm" style="margin-top:var(--space-4)">
          Get in Touch &rarr;
        </a>
      </div>
    </div>
  </div>
</div>

<!-- Footer bottom bar -->
<div class="container">
  <div class="footer-bottom">
    <p>&copy; ${new Date().getFullYear()} Mapengo Innovations &middot; Johannesburg, South Africa &middot; All rights reserved.</p>
    <nav class="footer-legal" aria-label="Legal">
      <a href="${BASE}legal/privacy.html">Privacy Policy</a>
      <a href="${BASE}legal/terms.html">Terms of Service</a>
      <a href="${BASE}legal/cookies.html">Cookie Policy</a>
    </nav>
    <button class="back-to-top" id="back-to-top" aria-label="Back to top">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
    </button>
  </div>
</div>`;
  }

  /* ── WhatsApp FAB ───────────────────────────────────────── */
  var WHATSAPP_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.558 4.122 1.532 5.855L.057 23.491a.75.75 0 0 0 .918.919l5.744-1.506A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 0 1-5.13-1.42l-.368-.215-3.41.894.911-3.318-.237-.385A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>';

  function buildWhatsAppButton() {
    return '<a'
      + ' id="whatsapp-icon"'
      + ' href="https://wa.me/27665520197"'
      + ' target="_blank"'
      + ' rel="noopener noreferrer"'
      + ' aria-label="Chat on WhatsApp"'
      + ' title="Chat on WhatsApp"'
      + '>' + WHATSAPP_SVG + '</a>';
  }

  /* ── Cookie Banner ──────────────────────────────────────── */
  function buildCookieBanner() {
    return `
<div class="cookie-banner" id="cookie-banner" role="dialog" aria-label="Cookie consent">
  <p class="cookie-text">
    We use cookies to enhance your experience. By continuing, you agree to our
    <a href="${BASE}legal/cookies.html">Cookie Policy</a>.
  </p>
  <div class="cookie-actions">
    <button class="btn btn-ghost btn-sm" id="cookie-decline">Decline</button>
    <button class="btn btn-primary btn-sm" id="cookie-accept">Accept</button>
  </div>
</div>`;
  }

  /* ── Skip link ──────────────────────────────────────────── */
  function injectSkipLink() {
    const skip = document.createElement('a');
    skip.href = '#main-content';
    skip.className = 'skip-link';
    skip.textContent = 'Skip to main content';
    document.body.insertBefore(skip, document.body.firstChild);
  }

  /* ── Mobile nav overlay styles (injected once) ──────────── */
  function injectOverlayStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .mobile-nav-overlay {
        display: none;
        position: fixed;
        inset: 0;
        background: transparent;
        z-index: 2999;
        opacity: 0;
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
  }

  /* ── Inject into DOM ────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    const headerEl = document.getElementById('site-header');
    const footerEl = document.getElementById('site-footer');
    const mainEl   = document.querySelector('main');

    if (headerEl) {
      headerEl.classList.add('header-transparent');
      headerEl.innerHTML = buildHeader();
    }

    if (footerEl) {
      footerEl.innerHTML = buildFooter();
    }

    if (mainEl && !mainEl.id) {
      mainEl.id = 'main-content';
    }

    injectSkipLink();
    injectOverlayStyles();

    const bannerWrapper = document.createElement('div');
    bannerWrapper.innerHTML = buildCookieBanner();
    document.body.appendChild(bannerWrapper.firstElementChild);

    const waWrapper = document.createElement('div');
    waWrapper.innerHTML = buildWhatsAppButton();
    document.body.appendChild(waWrapper.firstElementChild);
  });
})();
