// Importing specific functions and classes from Workbox packages
const { offlineFallback, warmStrategyCache } = require('workbox-recipes'); // Importing offlineFallback and warmStrategyCache functions from workbox-recipes package
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies'); // Importing CacheFirst and StaleWhileRevalidate strategies from workbox-strategies package
const { registerRoute } = require('workbox-routing'); // Importing registerRoute function from workbox-routing package
const { CacheableResponsePlugin } = require('workbox-cacheable-response'); // Importing CacheableResponsePlugin class from workbox-cacheable-response package
const { ExpirationPlugin } = require('workbox-expiration'); // Importing ExpirationPlugin class from workbox-expiration package
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute'); // Importing precacheAndRoute function from workbox-precaching package

// Precaching and routing all assets specified in the service worker manifest
precacheAndRoute(self.__WB_MANIFEST);

// Creating a CacheFirst strategy for caching pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache', // Name for the cache
  plugins: [ // Array of plugins for the strategy
    new CacheableResponsePlugin({ // Plugin for handling cacheable responses
      statuses: [0, 200], // HTTP statuses to consider as cacheable
    }),
    new ExpirationPlugin({ // Plugin for expiration settings
      maxAgeSeconds: 30 * 24 * 60 * 60, // Maximum age of cached entries in seconds (30 days)
    }),
  ],
});

// Warming up the page cache with specific URLs
warmStrategyCache({
  urls: ['/index.html', '/'], // URLs to warm up in the cache
  strategy: pageCache, // Strategy to use for caching
});

// Registering a route for navigation requests to use the pageCache strategy
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Registering a route for caching assets with a StaleWhileRevalidate strategy
registerRoute(
  ({ request }) => ['style', 'script', 'worker', 'image'].includes(request.destination), // Matching requests with certain destination types
  new StaleWhileRevalidate({ // Using StaleWhileRevalidate strategy for caching assets
    cacheName: 'asset-cache', // Name for the cache
    plugins: [ // Array of plugins for the strategy
      new CacheableResponsePlugin({ // Plugin for handling cacheable responses
        statuses: [0, 200], // HTTP statuses to consider as cacheable
      }),
      new ExpirationPlugin({ // Plugin for expiration settings
        maxAgeSeconds: 30 * 24 * 60 * 60, // Maximum age of cached entries in seconds (30 days)
      }),
    ],
  })
);
