// Service Worker for ACCA Agent PWA
const CACHE_NAME = 'acca-agent-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/images/favicon.ico',
  '/assets/css/variables.css',
  '/assets/css/base.css',
  '/assets/css/header.css',
  '/assets/css/messages.css',
  '/assets/css/input.css',
  '/assets/css/components.css',
  '/assets/css/responsive.css',
  '/assets/css/animations.css',
  '/assets/js/config.js',
  '/assets/js/utils.js',
  '/assets/js/storage.js',
  '/assets/js/api.js',
  '/assets/js/ui.js',
  '/assets/js/messages.js',
  '/assets/js/chat.js',
  '/assets/js/search.js',
  '/assets/js/pinned.js',
  '/assets/js/speech.js',
  '/assets/js/export.js',
  '/assets/js/events.js',
  '/assets/js/app.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.1/font/bootstrap-icons.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
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
    })
  );
});
