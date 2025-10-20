const CACHE_NAME = 'pantry-chef-ai-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx',
  '/manifest.json',
  '/vite.svg',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
];

// Install service worker and cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Serve content from cache when offline
self.addEventListener('fetch', (event) => {
    // Only handle GET requests.
    if (event.request.method !== 'GET') {
        return;
    }

    // For API calls to Google GenAI, always go to the network.
    if (event.request.url.includes('generativelanguage.googleapis.com')) {
        event.respondWith(fetch(event.request));
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            // If the request is in the cache, return it
            if (response) {
            return response;
            }

            // Otherwise, fetch the request from the network
            return fetch(event.request).then(
            (response) => {
                // If the request is successful, clone the response and cache it
                // We only cache basic, successful, cross-origin responses
                if(!response || response.status !== 200 || (response.type !== 'basic' && response.type !== 'cors')) {
                    return response;
                }

                const responseToCache = response.clone();

                caches.open(CACHE_NAME)
                    .then((cache) => {
                        cache.put(event.request, responseToCache);
                    });

                return response;
            }
            );
        })
    );
});

// Optional: Clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
