const CACHE_NAME = 'psmp-v1';
const urlsToCache = [
    './',
    './index.html',
    './Logo1.png',
    './Logo2.png'
];

// Installazione e caching iniziale
self.addEventListener('install', event => {
    console.log('Service Worker installato');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

// Attivazione
self.addEventListener('activate', event => {
    console.log('Service Worker attivato');
});

// Gestione richieste (offline support)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});