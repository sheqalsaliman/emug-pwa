const CACHE_NAME = 'emug-v6';
const ASSETS = ['/', '/index.html', '/styles.css', '/app.js', '/staff', '/admin'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // Delete ALL old caches, not just the previous version
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Network first — only fall back to cache when offline
  e.respondWith(
    fetch(e.request)
      .then(response => {
        // Cache a fresh copy of successful GET responses
        if(e.request.method === 'GET' && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(e.request).then(cached => cached || caches.match('/index.html')))
  );
});
