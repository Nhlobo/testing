import { getConsent } from './consent';

export interface SessionData {
  visits: number;
  pageViews: string[];
  ctaClicks: string[];
  industryInterests: string[];
  scrollDepth: number;
  timeOnSite: number;
  lastVisit: number;
  intent: 'new' | 'returning' | 'high-intent';
}

const SESSION_KEY = 'mi_intelligence';

function defaultSession(): SessionData {
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

function loadSession(): SessionData {
  if (typeof localStorage === 'undefined') return defaultSession();
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return defaultSession();
  try {
    return JSON.parse(raw) as SessionData;
  } catch {
    return defaultSession();
  }
}

function saveSession(data: SessionData): void {
  if (typeof localStorage === 'undefined') return;
  const consent = getConsent();
  if (!consent?.personalization) return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

export function initSession(): void {
  if (typeof localStorage === 'undefined') return;
  const consent = getConsent();
  if (!consent?.personalization) return;

  const data = loadSession();
  data.visits += 1;
  data.lastVisit = Date.now();
  data.intent = computeIntent(data);
  saveSession(data);
}

export function trackPageView(path: string): void {
  const data = loadSession();
  if (!data.pageViews.includes(path)) {
    data.pageViews.push(path);
  }
  data.intent = computeIntent(data);
  saveSession(data);
}

export function trackCTAClick(label: string): void {
  const data = loadSession();
  data.ctaClicks.push(label);
  data.intent = computeIntent(data);
  saveSession(data);
}

export function trackIndustryInterest(industry: string): void {
  const data = loadSession();
  if (!data.industryInterests.includes(industry)) {
    data.industryInterests.push(industry);
  }
  saveSession(data);
}

export function updateScrollDepth(depth: number): void {
  const data = loadSession();
  if (depth > data.scrollDepth) {
    data.scrollDepth = depth;
    data.intent = computeIntent(data);
    saveSession(data);
  }
}

function computeIntent(data: SessionData): 'new' | 'returning' | 'high-intent' {
  if (data.visits >= 4 || data.scrollDepth > 70 || data.ctaClicks.length > 2) {
    return 'high-intent';
  }
  if (data.visits >= 2) {
    return 'returning';
  }
  return 'new';
}

export function getIntent(): 'new' | 'returning' | 'high-intent' {
  const data = loadSession();
  return computeIntent(data);
}

export function getPersonalizedCTA(): string {
  const intent = getIntent();
  switch (intent) {
    case 'high-intent':
      return 'Start Your Project Today';
    case 'returning':
      return 'Get a Custom Quote';
    default:
      return 'Explore Our Solutions';
  }
}

export function getPersonalizedCTALink(): string {
  const intent = getIntent();
  switch (intent) {
    case 'high-intent':
      return '/contact/#form';
    case 'returning':
      return '/contact/';
    default:
      return '/services/';
  }
}

export function getRecommendations(): string[] {
  const data = loadSession();
  const recs: string[] = [];

  if (data.industryInterests.includes('retail')) recs.push('ecommerce');
  if (data.industryInterests.includes('healthcare')) recs.push('mobile-apps');
  if (data.pageViews.some(p => p.includes('services'))) recs.push('systems-integration');
  if (data.ctaClicks.length > 0) recs.push('web-development');

  return recs.length > 0 ? recs : ['web-development', 'ecommerce', 'mobile-apps'];
}
