const CACHE_NAME = 'mapengo-v2';
const OFFLINE_URL = 'offline.html';

const CORE_ASSETS = [
  './',
  './index.html',
  './offline.html',
  './404.html',
  './assets/css/main.css',
  './assets/css/pages.css',
  './assets/js/main.js',
  './assets/js/components.js',
  './assets/img/logo.png',
  './assets/img/favicon-32.png',
  './assets/img/favicon-16.png',
  './about/',
  './services/',
  './work/',
  './contact/',
  './pricing/',
  './blog/',
  './careers/',
  './technologies/',
  './products/',
  './legal/privacy.html',
  './legal/terms.html',
  './legal/cookies.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then(cached => {
        if (cached) return cached;
        if (event.request.mode === 'navigate') return caches.match(OFFLINE_URL);
        return Promise.reject(new Error('Offline and no cache match'));
      }))
  );
});
