/**
 * Mapengo Innovations — consent.js
 * Cookie consent management: get, set, check, and notify on change.
 */
(function (root) {
  'use strict';

  var CONSENT_KEY = 'mi_consent';
  var CONSENT_EVENT = 'mi:consent-change';

  function getConsent() {
    try {
      var raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function setConsent(prefs) {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(prefs));
      window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: prefs }));
    } catch (e) {}
  }

  function hasConsented() {
    return getConsent() !== null;
  }

  function acceptAll() {
    setConsent({ analytics: true, personalization: true, marketing: true });
  }

  function rejectAll() {
    setConsent({ analytics: false, personalization: false, marketing: false });
  }

  function onConsentChange(callback) {
    var handler = function (e) { callback(e.detail); };
    window.addEventListener(CONSENT_EVENT, handler);
    return function () { window.removeEventListener(CONSENT_EVENT, handler); };
  }

  root.MIConsent = {
    get: getConsent,
    set: setConsent,
    has: hasConsented,
    acceptAll: acceptAll,
    rejectAll: rejectAll,
    onChange: onConsentChange,
  };

}(window));
