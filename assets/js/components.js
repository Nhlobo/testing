/**
 * Mapengo Innovations — components.js
 * Injects shared header and footer into every page.
 * Handles base path detection for nested page routes.
 */

(function () {
  'use strict';

  /* ── Base path detection ────────────────────────────────── */
  function getBasePath() {
    const path = window.location.pathname;
    // GitHub Pages / static hosting support
    // Strip trailing slash, split, filter empties
    const parts = path.replace(/\/$/, '').split('/').filter(Boolean);

    // Legacy GitHub Pages project folder fallback.
    const repoName = 'testing';
    const repoIdx = parts.indexOf(repoName);
    let subParts;

    if (repoIdx !== -1) {
      // parts after the repo name are the sub-path segments
      subParts = parts.slice(repoIdx + 1);
    } else {
      // Local dev / custom domain at root
      subParts = parts;
    }

    // If the last segment is a file (has an extension, e.g. "terms.html"),
    // exclude it from the depth count — only directories count.
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
    <img src="${BASE}assets/img/logo.png" alt="Mapengo Innovations" width="180" height="60">
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

<!-- Mobile navigation -->
<nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" aria-hidden="true">
  <button class="mobile-nav-close" id="mobile-nav-close" type="button" aria-label="Close navigation">
    <span aria-hidden="true">×</span>
    <span>Close</span>
  </button>
  ${mobileItems}
  <div class="mobile-nav-footer">
    <a href="${BASE}contact/" class="btn btn-primary" style="width:100%;justify-content:center;">Request a Quote →</a>
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
          <img src="${BASE}assets/img/logo.png" alt="Mapengo Innovations" width="160" height="60">
        </a>
        <p>Mapengo Innovations is a South African software company focused on practical outcomes. We design and build fast websites, secure web applications, and mobile apps for startups, SMEs, and established teams.</p>
        <div class="footer-social">
          <a href="https://linkedin.com/company/mapengo-innovations" class="social-link" aria-label="LinkedIn" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2" fill="currentColor"/></svg>
          </a>
          <a href="https://github.com/Nhlobo/frontend-ecommerce" class="social-link" aria-label="GitHub" target="_blank" rel="noopener">
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
          <li><a href="${BASE}services/#cloud-hosting" class="footer-link">Deployment & Launch</a></li>
          <li><a href="${BASE}services/#maintenance-support" class="footer-link">Maintenance & Support</a></li>
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
          <span>South Africa — Online &amp; Remote<br><span style="color:rgba(255,255,255,0.45);font-size:0.8rem;">Focused on South African businesses</span></span>
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
    <p>&copy; ${new Date().getFullYear()} Mapengo Innovations &middot; Johannesburg, South Africa &middot; All rights reserved.</p>
    <nav class="footer-legal" aria-label="Legal">
      <a href="${BASE}legal/privacy/">Privacy Policy</a>
      <a href="${BASE}legal/terms/">Terms of Service</a>
      <a href="${BASE}legal/popia/">Cookie Policy</a>
    </nav>
    <button class="back-to-top" id="back-to-top" aria-label="Back to top">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
    </button>
  </div>
</div>`;
  }

  /* ── WhatsApp Floating Button HTML ─────────────────────── */
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

  /* ── Cookie Banner HTML ─────────────────────────────────── */
  function buildCookieBanner() {
    return `
<div class="cookie-banner" id="cookie-banner" role="dialog" aria-label="Cookie consent">
  <div class="cookie-inner">
    <p class="cookie-title">We value your privacy</p>
    <p class="cookie-text">
      We use cookies to enhance your browsing experience, serve personalised ads or content, and
      analyse our traffic. By clicking "Accept All", you consent to our use of cookies.
      See our <a href="${BASE}legal/cookies.html" style="color:inherit;text-decoration:underline;">Cookie Policy</a> for more information.
    </p>
    <div class="cookie-prefs">
      <div class="cookie-pref">
        <label><input type="checkbox" id="cookie-pref-necessary" checked disabled> Necessary</label>
      </div>
      <div class="cookie-pref">
        <label><input type="checkbox" id="cookie-pref-analytics"> Analytics</label>
      </div>
      <div class="cookie-pref">
        <label><input type="checkbox" id="cookie-pref-marketing"> Marketing</label>
      </div>
    </div>
    <div class="cookie-actions">
      <button class="btn-cookie btn-cookie-accept" id="cookie-accept">Accept All</button>
      <button class="btn-cookie btn-cookie-reject" id="cookie-decline">Reject All</button>
    </div>
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

    // Cookie banner show/hide logic
    var cookieBanner = document.getElementById('cookie-banner');
    if (cookieBanner) {
      if (!localStorage.getItem('mi_consent')) {
        cookieBanner.classList.add('show');
      }
      var acceptBtn = cookieBanner.querySelector('.btn-cookie-accept');
      var rejectBtn = cookieBanner.querySelector('.btn-cookie-reject');
      if (acceptBtn) {
        acceptBtn.addEventListener('click', function () {
          localStorage.setItem('mi_consent', JSON.stringify({ analytics: true, marketing: true, ts: Date.now() }));
          cookieBanner.classList.remove('show');
        });
      }
      if (rejectBtn) {
        rejectBtn.addEventListener('click', function () {
          localStorage.setItem('mi_consent', JSON.stringify({ analytics: false, marketing: false, ts: Date.now() }));
          cookieBanner.classList.remove('show');
        });
      }
    }

    // Inject sticky CTA bar
    var ctaBar = document.createElement('div');
    ctaBar.id = 'sticky-cta-bar';
    ctaBar.className = 'sticky-cta-bar';
    ctaBar.style.display = 'none';
    ctaBar.innerHTML = '<span class="sticky-cta-text">Ready to transform your business?</span>'
      + '<a href="' + BASE + 'contact/" class="btn btn-primary btn-sm">Get Started</a>'
      + '<button id="sticky-cta-close" class="sticky-cta-close" aria-label="Close">\u2715</button>';
    document.body.appendChild(ctaBar);

    // Show sticky CTA after scrolling past 40% of page height
    window.addEventListener('scroll', function () {
      var bar = document.getElementById('sticky-cta-bar');
      if (!bar || bar._closed) return;
      if (window.scrollY > document.body.scrollHeight * 0.4) {
        bar.style.display = 'flex';
      }
    });

    // Close button dismisses sticky CTA
    var ctaClose = document.getElementById('sticky-cta-close');
    if (ctaClose) {
      ctaClose.addEventListener('click', function () {
        var bar = document.getElementById('sticky-cta-bar');
        if (bar) { bar.style.display = 'none'; bar._closed = true; }
      });
    }

    // Inject WhatsApp floating button
    const waWrapper = document.createElement('div');
    waWrapper.innerHTML = buildWhatsAppButton();
    document.body.appendChild(waWrapper.firstElementChild);
  });
})();
