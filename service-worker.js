// service-worker_v5-v8.js
// Service worker pentru pachetul consolidat v5–v8 (cerc, spațiu, probleme combinate, simulări)

const CACHE_NAME = 'geo-proiect-v5-v8';
const ASSETS = [
  './',
  './index_v5-v8.html',
  './index.html'
];

// Instalare: cache-uiere resurse de bazÄŁ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activare: curÄŁțare cache-uri vechi
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME)
          .map((k) => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

// Fetch: strategie cache-first pentru asset-uri, network-first pentru alte cereri
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Doar pentru origine proprie
  if (url.origin !== location.origin) {
    return;
  }

  // Asset-uri statice (HTML, CSS, JS, imagini locale)
  if (
    request.method === 'GET' &&
    (
      url.pathname.endsWith('.html') ||
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.js') ||
      url.pathname.endsWith('.png') ||
      url.pathname.endsWith('.jpg') ||
      url.pathname.endsWith('.svg') ||
      url.pathname === '/' ||
      url.pathname === ''
    )
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          // ReturneazÄŁ din cache, dar încearcÄŁ sÄŁ actualizezi în fundal
          fetch(request).then((response) => {
            if (response && response.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, response);
              });
            }
          }).catch(() => {
            // IgnorÄŁ erori de rețea pentru actualizare
          });
          return cached;
        }

        // Nu e în cache -> ia de pe rețea
        return fetch(request).then((response) => {
          if (!response || response.status !== 200 || request.method !== 'GET') {
            return response;
          }
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clone);
          });
          return response;
        }).catch(() => {
          // Fallback la index pentru navigare
          if (request.mode === 'navigate') {
            return caches.match('./index_v5-v8.html').then((r) => r || caches.match('./index.html'));
          }
        });
      })
    );
    return;
  }

  // Alte cereri (API, etc.) — network-first
  if (request.method === 'GET') {
    event.respondWith(
      fetch(request).then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, clone);
        });
        return response;
      }).catch(() => {
        return caches.match(request);
      })
    );
  }
});

// Mesaje de la client (ex: forțare refresh cache)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((keys) => {
        return Promise.all(keys.map((k) => caches.delete(k)));
      }).then(() => {
        return caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS));
      })
    );
  }
});