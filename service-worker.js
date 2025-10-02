const CACHE_NAME = 'psmp-cache-v2';
const urlsToCache = [
    '/piusiamomenopaghiamo/',
    '/piusiamomenopaghiamo/index.html',
    '/piusiamomenopaghiamo/chi-siamo.html',
    '/piusiamomenopaghiamo/come-funziona.html',
    '/piusiamomenopaghiamo/contatti.html',
    '/piusiamomenopaghiamo/faq.html',
    '/piusiamomenopaghiamo/css/all.min.css',
    '/piusiamomenopaghiamo/Logo1.png',
    '/piusiamomenopaghiamo/Logo2.png'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Cache aperta per PSMP');
            return cache.addAll(urlsToCache);
        })
    ); // AGGIUNTA PARENTESI CHIUDENTE QUI
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            return response || fetch(event.request);
        })
    ); // AGGIUNTA PARENTESI CHIUDENTE QUI
});