/**
 * Mapengo Innovations — components.js
 * Injects shared header and footer into every page.
 * Handles base path detection for GitHub Pages subdirectory.
 */

(function () {
  'use strict';

  /* ── Base path detection ────────────────────────────────── */
  function getBasePath() {
    const path = window.location.pathname;
    // Count directory depth from the repo root
    // GitHub Pages: https://nhlobo.github.io/testing/...
    // Strip trailing slash, split, filter empties
    const parts = path.replace(/\/$/, '').split('/').filter(Boolean);

    // Determine how deep we are relative to the site root.
    // The site root is the "testing" directory on GitHub Pages.
    const repoName = 'testing';
    const repoIdx = parts.indexOf(repoName);
    let depth = 0;

    if (repoIdx !== -1) {
      // parts after the repo name are the sub-path segments
      const subParts = parts.slice(repoIdx + 1);
      // depth = number of directories below root (not counting the file itself)
      depth = subParts.length;
      // If we're at a directory index.html, subParts has one element (dir name)
      // blog/posts/slug/index.html → depth 3
    } else {
      // Local dev / custom domain at root
      depth = parts.length;
    }

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
    { label: 'Products',     href: 'products/' },
    { label: 'Technologies', href: 'technologies/' },
    { label: 'Blog',         href: 'blog/' },
    { label: 'Careers',      href: 'careers/' },
    { label: 'Contact',      href: 'contact/' },
  ];

  /* ── Active link detection ──────────────────────────────── */
  function isActiveLink(href) {
    const path = window.location.pathname;
    if (href === '') {
      // Home — active only on exact root
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
    <img src="${BASE}images/logo.png" alt="Mapengo Innovations" width="180" height="40">
  </a>

  <nav class="header-nav" aria-label="Main navigation">
    ${navItems}
  </nav>

  <div class="header-cta">
    <a href="${BASE}contact/" class="btn btn-primary btn-sm">Get Started</a>
    <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobile-nav">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</div>

<!-- Mobile navigation -->
<nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
  ${mobileItems}
  <div class="mobile-nav-footer">
    <a href="${BASE}contact/" class="btn btn-primary" style="width:100%;justify-content:center;">Get Started →</a>
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
          <img src="${BASE}images/logo.png" alt="Mapengo Innovations" width="160" height="36">
        </a>
        <p>We specialise in crafting high-performance websites and powerful mobile and web apps that empower businesses. From idea to deployment — built with purpose, passion, and precision.</p>
        <div class="footer-social">
          <a href="https://linkedin.com/company/mapengo-innovations" class="social-link" aria-label="LinkedIn" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2" fill="currentColor"/></svg>
          </a>
          <a href="https://github.com/Nhlobo" class="social-link" aria-label="GitHub" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
          </a>
          <a href="https://twitter.com/mapengotech" class="social-link" aria-label="Twitter / X" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
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
          <li><a href="${BASE}services/#cloud-hosting" class="footer-link">Cloud & Hosting</a></li>
          <li><a href="${BASE}services/#maintenance-support" class="footer-link">Maintenance & Support</a></li>
        </ul>
      </div>

      <!-- Company column -->
      <div class="footer-col">
        <h4>Company</h4>
        <ul class="footer-links">
          <li><a href="${BASE}about/" class="footer-link">About Us</a></li>
          <li><a href="${BASE}work/" class="footer-link">Our Work</a></li>
          <li><a href="${BASE}products/" class="footer-link">Products</a></li>
          <li><a href="${BASE}technologies/" class="footer-link">Technologies</a></li>
          <li><a href="${BASE}blog/" class="footer-link">Blog</a></li>
          <li><a href="${BASE}careers/" class="footer-link">Careers</a></li>
        </ul>
      </div>

      <!-- Contact column -->
      <div class="footer-col">
        <h4>Contact</h4>
        <div class="footer-contact-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <a href="mailto:mapengoinnovations@gmail.com">mapengoinnovations@gmail.com</a>
        </div>
        <div class="footer-contact-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.86 9.56 19.79 19.79 0 01.81 3.18 2 2 0 012.8 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l.96-.96a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          <span>+27 66 552 0197</span>
        </div>
        <div class="footer-contact-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          <span>South Africa — Online &amp; Remote<br><span style="color:rgba(255,255,255,0.45);font-size:0.8rem;">Serving clients globally</span></span>
        </div>
        <a href="${BASE}contact/" class="btn btn-outline-accent btn-sm" style="margin-top:var(--space-4)">
          Get in Touch →
        </a>
      </div>
    </div>
  </div>
</div>

<!-- Footer bottom bar -->
<div class="container">
  <div class="footer-bottom">
    <p>&copy; ${new Date().getFullYear()} Mapengo Innovations &middot; Founded by Novice Nhlovo Mathebula &middot; Johannesburg, South Africa &middot; All rights reserved.</p>
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

  /* ── Cookie Banner HTML ─────────────────────────────────── */
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

  /* ── Skip navigation link ───────────────────────────────── */
  function injectSkipLink() {
    const skip = document.createElement('a');
    skip.href = '#main-content';
    skip.className = 'skip-link';
    skip.textContent = 'Skip to main content';
    document.body.insertBefore(skip, document.body.firstChild);
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

    // Add id="main-content" to <main> for skip link target
    if (mainEl && !mainEl.id) {
      mainEl.id = 'main-content';
    }

    injectSkipLink();

    // Inject cookie banner into body
    const bannerWrapper = document.createElement('div');
    bannerWrapper.innerHTML = buildCookieBanner();
    document.body.appendChild(bannerWrapper.firstElementChild);
  });
})();
