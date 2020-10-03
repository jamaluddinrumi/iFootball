const CACHE_NAME = "genose_rev_1";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/pages/product.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/app.js",
  "/manifest.json",
  "/images/genose_about.jpg",
  "/images/genose_cara_kerja_detail.jpg",
  "/images/genose_cara_kerja.jpg",
  "/images/genose_customer_service.jpg",
  "/images/icons-192.png",
  "/images/icons-512.png",
  "/favicon/apple-icon-57x57.png",
  "/favicon/apple-icon-60x60.png",
  "/favicon/apple-icon-72x72.png",
  "/favicon/apple-icon-76x76.png",
  "/favicon/apple-icon-114x114.png",
  "/favicon/apple-icon-120x120.png",
  "/favicon/apple-icon-144x144.png",
  "/favicon/apple-icon-152x152.png",
  "/favicon/apple-icon-180x180.png",
  "/favicon/android-icon-192x192.png",
  "/favicon/favicon-32x32.png",
  "/favicon/favicon-96x96.png",
  "/favicon/favicon-16x16.png",
  "/favicon/ms-icon-144x144.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function (response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }

        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});