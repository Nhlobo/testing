export interface ConsentPreferences {
  analytics: boolean;
  personalization: boolean;
  marketing: boolean;
}

const CONSENT_KEY = 'mi_consent';
const CONSENT_CHANGE_EVENT = 'mi:consent-change';

export function getConsent(): ConsentPreferences | null {
  if (typeof localStorage === 'undefined') return null;
  const raw = localStorage.getItem(CONSENT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ConsentPreferences;
  } catch {
    return null;
  }
}

export function setConsent(prefs: ConsentPreferences): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(CONSENT_KEY, JSON.stringify(prefs));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: prefs }));
  }
}

export function hasConsented(): boolean {
  return getConsent() !== null;
}

export function onConsentChange(
  callback: (prefs: ConsentPreferences) => void
): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = (e: Event) => {
    callback((e as CustomEvent<ConsentPreferences>).detail);
  };
  window.addEventListener(CONSENT_CHANGE_EVENT, handler);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, handler);
}
