var CACHE_NAME = `leaf-website-${process.env.RELEASE_TIMESTAMP}`
var urlsToCache = [
  '/',
  '/styles/main.css'
]

self.addEventListener('install', function(event) {
  const cacheOpened = caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache)
    })
  event.waitUntil(cacheOpened)
})

self.addEventListener('fetch', function(event) {
  var matchedCaches = caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        return caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, response.clone())
          return response
        })
      })
    })
  event.respondWith(matchedCaches)
})

self.addEventListener('activate', function(event) {
  const otherCachesDeleted = caches.keys()
    .then(function(cacheKeys) {
      const promisedCacheDeletions = cacheKeys.map(function(cacheKey) {
        if (CACHE_NAME !== cacheKey) {
          return caches.delete(cacheKey)
        }
      })
      return Promise.all(promisedCacheDeletions)
    })
  event.waitUntil(otherCachesDeleted)
})