const staticCacheName = 'crypto-static-v6';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(staticCacheName)
      .then(async cache => {
        const manifestData = await fetch('/asset-manifest.json');
        const manifest = await manifestData.json();
        console.log(manifest);
        return cache.addAll([
          manifest['main.js'],
          manifest['main.css'],
          '/iziToast.min.css',
          '/favicon.ico',
          '/index.html',
        ]);
      }
      ),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames
            .filter(cacheName => cacheName.startsWith('crypto-') && cacheName != staticCacheName)
            .map(cacheName => caches.delete(cacheName)),
        ),
      ),
  );
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === '/') {
      event.respondWith(caches.match('/index.html'));
      return;
    }
  }

  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});

self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
