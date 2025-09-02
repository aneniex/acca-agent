// Service Worker for ACCA Agent PWA
const CACHE_NAME = 'acca-agent-v2';
const urlsToCache = [
  './',
  './index.html',
  './assets/images/favicon.ico',
  './assets/css/variables.css',
  './assets/css/base.css',
  './assets/css/header.css',
  './assets/css/messages.css',
  './assets/css/input.css',
  './assets/css/components.css',
  './assets/css/responsive.css',
  './assets/css/animations.css',
  './assets/js/config.js',
  './assets/js/utils.js',
  './assets/js/storage.js',
  './assets/js/api.js',
  './assets/js/ui.js',
  './assets/js/messages.js',
  './assets/js/canned.js',
  './assets/js/chat.js',
  './assets/js/search.js',
  './assets/js/pinned.js',
  './assets/js/speech.js',
  './assets/js/export.js',
  './assets/js/events.js',
  './assets/js/app.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.1/font/bootstrap-icons.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// Install event - cache resources and activate new SW immediately
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch event
// - Network-first for JS files to avoid stale code
// - Cache-first for everything else
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.destination === 'script' || url.pathname.endsWith('.js')) {
    // Network-first for scripts
    event.respondWith(
      fetch(request)
        .then(networkResponse => {
          // Update cache with fresh script
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, responseClone));
          return networkResponse;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Default: cache-first
  event.respondWith(
    caches.match(request)
      .then(response => response || fetch(request))
  );
});

// Activate event - clean up old caches and take control
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});
