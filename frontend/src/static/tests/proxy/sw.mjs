'use strict';
import precache from './precache.mjs'
self.addEventListener('install', (event) => {

    const promiseChain = caches.open('test-cache')
        .then((openCache) => {
            return openCache.put(
                new Request('/__test/example'),
                new Response('Hello, World!')
            );
        });
    event.waitUntil(promiseChain);

    // event.waitUntil(precache.precacheSite());
});