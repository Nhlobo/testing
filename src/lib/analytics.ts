import { getConsent } from './consent';

export interface AnalyticsEvent {
  type: 'pageview' | 'cta_click' | 'section_view' | 'scroll_depth' | 'form_submit';
  label?: string;
  path: string;
  timestamp: number;
  sessionId: string;
}

const EVENTS_KEY = 'mi_analytics_events';
const SESSION_KEY = 'mi_session_id';

export function getSessionId(): string {
  if (typeof sessionStorage === 'undefined') return 'ssr';
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function getEvents(): AnalyticsEvent[] {
  if (typeof localStorage === 'undefined') return [];
  const raw = localStorage.getItem(EVENTS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as AnalyticsEvent[];
  } catch {
    return [];
  }
}

export function track(event: Omit<AnalyticsEvent, 'timestamp' | 'sessionId'>): void {
  if (typeof localStorage === 'undefined') return;
  const consent = getConsent();
  if (!consent?.analytics) return;

  const fullEvent: AnalyticsEvent = {
    ...event,
    timestamp: Date.now(),
    sessionId: getSessionId(),
  };

  const events = getEvents();
  events.push(fullEvent);
  // Keep last 500 events
  const trimmed = events.slice(-500);
  localStorage.setItem(EVENTS_KEY, JSON.stringify(trimmed));
}

export function flush(): void {
  // Post to analytics endpoint when available
  const events = getEvents();
  if (events.length === 0) return;
  // Placeholder: post to endpoint
  // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(events) });
  localStorage.removeItem(EVENTS_KEY);
}
