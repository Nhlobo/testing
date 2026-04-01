/**
 * Mapengo Innovations — analytics.js
 * Lightweight event tracking hooks (no external SDK required).
 * Events stored in localStorage; hooks ready for GA4 / custom endpoint.
 */
(function (root) {
  'use strict';

  var EVENTS_KEY = 'mi_analytics_events';
  var SESSION_KEY = 'mi_session_id';

  function getSessionId() {
    try {
      var id = sessionStorage.getItem(SESSION_KEY);
      if (!id) {
        // Use crypto.getRandomValues for a cryptographically secure random ID
        if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
          var arr = new Uint32Array(2);
          crypto.getRandomValues(arr);
          id = Date.now() + '-' + arr[0].toString(36) + arr[1].toString(36);
        } else {
          // Fallback for very old environments — this value is non-security-sensitive
          id = Date.now() + '-' + (Date.now() ^ (Date.now() >>> 9)).toString(36);
        }
        sessionStorage.setItem(SESSION_KEY, id);
      }
      return id;
    } catch (e) {
      return 'nostorage';
    }
  }

  function getEvents() {
    try {
      var raw = localStorage.getItem(EVENTS_KEY);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  }

  function track(event) {
    var consent = root.MIConsent && root.MIConsent.get();
    if (!consent || !consent.analytics) return;

    var full = Object.assign({}, event, {
      timestamp: Date.now(),
      sessionId: getSessionId(),
    });

    // Forward to GA4 if present
    if (typeof root.gtag === 'function') {
      root.gtag('event', full.type, { event_label: full.label || '', page_path: full.path });
    }

    // Store locally (keep last 500)
    try {
      var events = getEvents();
      events.push(full);
      localStorage.setItem(EVENTS_KEY, JSON.stringify(events.slice(-500)));
    } catch (e) {}
  }

  function trackPageview(path) {
    track({ type: 'pageview', path: path || window.location.pathname });
  }

  function trackCTA(label, path) {
    track({ type: 'cta_click', label: label, path: path || window.location.pathname });
    if (root.MIIntelligence) root.MIIntelligence.trackCTAClick(label);
  }

  function trackFormSubmit(formId, path) {
    track({ type: 'form_submit', label: formId, path: path || window.location.pathname });
  }

  /** Auto-attach analytics to all [data-analytics-cta] elements */
  function attachCTATracking() {
    document.querySelectorAll('[data-analytics-cta]').forEach(function (el) {
      el.addEventListener('click', function () {
        trackCTA(el.getAttribute('data-analytics-cta'), window.location.pathname);
      });
    });
  }

  /** Observe sections entering viewport for section_view events */
  function initSectionTracking() {
    if (!('IntersectionObserver' in root)) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id || entry.target.dataset.section;
          if (id) track({ type: 'section_view', label: id, path: window.location.pathname });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('[data-section]').forEach(function (el) {
      observer.observe(el);
    });
  }

  root.MIAnalytics = {
    track: track,
    trackPageview: trackPageview,
    trackCTA: trackCTA,
    trackFormSubmit: trackFormSubmit,
    attachCTATracking: attachCTATracking,
    initSectionTracking: initSectionTracking,
    getEvents: getEvents,
  };

}(window));
