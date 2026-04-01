/**
 * Mapengo Innovations — intelligence.js
 * Session awareness, dynamic content switching, smart recommendations,
 * and adaptive CTAs — all client-side, no login required.
 */
(function (root) {
  'use strict';

  var SESSION_KEY = 'mi_intelligence';

  function defaultSession() {
    return {
      visits: 0,
      pageViews: [],
      ctaClicks: [],
      industryInterests: [],
      scrollDepth: 0,
      timeOnSite: 0,
      lastVisit: Date.now(),
      intent: 'new',
    };
  }

  function loadSession() {
    try {
      var raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return defaultSession();
      return JSON.parse(raw);
    } catch (e) {
      return defaultSession();
    }
  }

  function saveSession(data) {
    var consent = root.MIConsent && root.MIConsent.get();
    if (!consent || !consent.personalization) return;
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function computeIntent(data) {
    if (data.visits >= 4 || data.scrollDepth > 70 || data.ctaClicks.length > 2) {
      return 'high-intent';
    }
    if (data.visits >= 2) return 'returning';
    return 'new';
  }

  function initSession() {
    var data = loadSession();
    data.visits += 1;
    data.lastVisit = Date.now();
    data.intent = computeIntent(data);
    saveSession(data);
    return data;
  }

  function trackPageView(path) {
    var data = loadSession();
    if (data.pageViews.indexOf(path) === -1) data.pageViews.push(path);
    data.intent = computeIntent(data);
    saveSession(data);
  }

  function trackCTAClick(label) {
    var data = loadSession();
    data.ctaClicks.push(label);
    data.intent = computeIntent(data);
    saveSession(data);
  }

  function trackIndustryInterest(industry) {
    var data = loadSession();
    if (data.industryInterests.indexOf(industry) === -1) {
      data.industryInterests.push(industry);
    }
    saveSession(data);
  }

  function updateScrollDepth(depth) {
    var data = loadSession();
    if (depth > data.scrollDepth) {
      data.scrollDepth = depth;
      data.intent = computeIntent(data);
      saveSession(data);
    }
  }

  function getIntent() {
    return computeIntent(loadSession());
  }

  function getPersonalizedCTA() {
    var intent = getIntent();
    if (intent === 'high-intent') return 'Start Your Project Today';
    if (intent === 'returning') return 'Get a Custom Quote';
    return 'Explore Our Solutions';
  }

  function getPersonalizedCTALink(base) {
    base = base || './';
    var intent = getIntent();
    if (intent === 'high-intent') return base + 'contact/?ref=hi';
    if (intent === 'returning') return base + 'contact/';
    return base + 'services/';
  }

  function getRecommendations() {
    var data = loadSession();
    var recs = [];
    if (data.industryInterests.indexOf('retail') !== -1) recs.push('ecommerce');
    if (data.industryInterests.indexOf('healthcare') !== -1) recs.push('mobile-apps');
    if (data.pageViews.some(function (p) { return p.indexOf('services') !== -1; })) recs.push('systems-integration');
    if (data.ctaClicks.length > 0) recs.push('web-development');
    return recs.length > 0 ? recs : ['web-development', 'ecommerce', 'mobile-apps'];
  }

  /** Apply adaptive CTAs on the current page */
  function applyAdaptiveCTAs(base) {
    var label = getPersonalizedCTA();
    var link  = getPersonalizedCTALink(base);

    document.querySelectorAll('[data-smart-cta]').forEach(function (el) {
      el.textContent = label;
      el.setAttribute('href', link);
    });
  }

  /** Track industry interest when user visits an industry page */
  function autoDetectIndustry() {
    var path = window.location.pathname;
    var industries = ['retail', 'taxi', 'education', 'healthcare', 'construction', 'sme'];
    industries.forEach(function (ind) {
      if (path.indexOf(ind) !== -1) trackIndustryInterest(ind);
    });
  }

  /** Track scroll depth continuously */
  function initScrollTracking() {
    var tracked = {};
    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY + window.innerHeight;
      var total = document.documentElement.scrollHeight;
      var pct = Math.round((scrolled / total) * 100);
      if (!tracked[pct] && pct % 25 === 0) {
        tracked[pct] = true;
        updateScrollDepth(pct);
        if (root.MIAnalytics) root.MIAnalytics.track({ type: 'scroll_depth', label: pct + '%', path: window.location.pathname });
      }
    }, { passive: true });
  }

  root.MIIntelligence = {
    init: initSession,
    trackPageView: trackPageView,
    trackCTAClick: trackCTAClick,
    trackIndustryInterest: trackIndustryInterest,
    updateScrollDepth: updateScrollDepth,
    getIntent: getIntent,
    getPersonalizedCTA: getPersonalizedCTA,
    getPersonalizedCTALink: getPersonalizedCTALink,
    getRecommendations: getRecommendations,
    applyAdaptiveCTAs: applyAdaptiveCTAs,
    autoDetectIndustry: autoDetectIndustry,
    initScrollTracking: initScrollTracking,
  };

}(window));
