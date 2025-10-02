const CACHE_NAME = 'psmp-cache-v3';
const urlsToCache = [
  './',
  './index.html',
  './chi-siamo.html',
  './come-funziona.html',
  './contatti.html',
  './faq.html',
  './css/all.min.css',
  './Logo1.png',
  './Logo2.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache aperta per PSMP');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});