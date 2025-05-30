// Service Worker for caching and offline support
const CACHE_NAME = 'saran-portfolio-v1';
const STATIC_CACHE_NAME = 'saran-portfolio-static-v1';
const DYNAMIC_CACHE_NAME = 'saran-portfolio-dynamic-v1';

// Determine base path based on environment
const BASE_PATH = self.location.pathname.includes('/web/') ? '/web' : '';

// Assets to cache immediately
const STATIC_ASSETS = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/favicon.ico`,
  `${BASE_PATH}/manifest.json`
];

// Assets to cache on first request
const DYNAMIC_ASSETS = [
  'https://fonts.googleapis.com/',
  'https://fonts.gstatic.com/',
  'https://upload.wikimedia.org/'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');

  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS.filter(url => url !== '/web/_next/static/css/' && url !== '/web/_next/static/js/'));
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache static assets', error);
      })
  );

  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  // Ensure the service worker takes control immediately
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external API calls (like Formspree)
  if (url.origin !== self.location.origin && !DYNAMIC_ASSETS.some(asset => url.href.startsWith(asset))) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('Service Worker: Serving from cache', request.url);
          return cachedResponse;
        }

        // Otherwise fetch from network
        return fetch(request)
          .then((networkResponse) => {
            // Don't cache if not a valid response
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Clone the response
            const responseToCache = networkResponse.clone();

            // Determine which cache to use
            const cacheName = isStaticAsset(request.url) ? STATIC_CACHE_NAME : DYNAMIC_CACHE_NAME;

            // Cache the response
            caches.open(cacheName)
              .then((cache) => {
                console.log('Service Worker: Caching new resource', request.url);
                cache.put(request, responseToCache);
              });

            return networkResponse;
          })
          .catch((error) => {
            console.error('Service Worker: Fetch failed', error);

            // Return offline fallback for navigation requests
            if (request.destination === 'document') {
              return caches.match(`${BASE_PATH}/offline.html`) ||
                     caches.match(`${BASE_PATH}/`) ||
                     new Response('Offline - Please check your internet connection', {
                       status: 503,
                       statusText: 'Service Unavailable',
                       headers: { 'Content-Type': 'text/plain' }
                     });
            }

            // Return a fallback response for other requests
            return new Response('Resource not available offline', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});

// Helper function to determine if an asset is static
function isStaticAsset(url) {
  return url.includes('/_next/static/') ||
         url.includes('/favicon.ico') ||
         url.includes('/manifest.json') ||
         url.includes('.css') ||
         url.includes('.js') ||
         url.includes('.woff') ||
         url.includes('.woff2');
}

// Background sync for form submissions (if supported)
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  try {
    // Get pending form submissions from IndexedDB
    const pendingSubmissions = await getPendingSubmissions();

    for (const submission of pendingSubmissions) {
      try {
        const response = await fetch('https://formspree.io/f/mwpognoa', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submission.data),
        });

        if (response.ok) {
          // Remove from pending submissions
          await removePendingSubmission(submission.id);
          console.log('Service Worker: Synced form submission', submission.id);
        }
      } catch (error) {
        console.error('Service Worker: Failed to sync form submission', error);
      }
    }
  } catch (error) {
    console.error('Service Worker: Background sync failed', error);
  }
}

// IndexedDB helpers for offline form submissions
async function getPendingSubmissions() {
  // Simplified - in a real implementation, you'd use IndexedDB
  return [];
}

async function removePendingSubmission(id) {
  // Simplified - in a real implementation, you'd remove from IndexedDB
  console.log('Removing pending submission:', id);
}

// Push notification handler (for future use)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/web/icon-192x192.png',
      badge: '/web/icon-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey
      },
      actions: [
        {
          action: 'explore',
          title: 'View Portfolio',
          icon: '/web/icon-192x192.png'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/web/icon-192x192.png'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow(`${BASE_PATH}/`)
    );
  }
});

console.log('Service Worker: Loaded successfully');
