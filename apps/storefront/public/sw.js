const CACHE_NAME = 'commercex-cache-v1';
const OFFLINE_URL = '/offline';

const URLS_TO_CACHE = [
  '/',
  OFFLINE_URL,
  '/manifest.json',
  // Cache some critical UI elements (simulated)
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(URLS_TO_CACHE);
      })
  );
  // Force the waiting service worker to become the active service worker.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Let the browser do its default thing for non-HTML requests
  if (event.request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        // If the network request fails, serve the offline page from the cache
        return caches.match(OFFLINE_URL);
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

// Simulate Background Sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-cart') {
    event.waitUntil(
      // In a real app, we would read from IndexedDB and push to the server here
      console.log('[Service Worker] Background Sync: Syncing offline cart to server.')
    );
  }
});

// Simulate Push Notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'A new offer is available!',
    icon: 'https://img.icons8.com/?size=192&id=113063&format=png',
    badge: 'https://img.icons8.com/?size=192&id=113063&format=png'
  };

  event.waitUntil(
    self.registration.showNotification('CommerceX Update', options)
  );
});
