
'use strict';

const CACHE_NAME = "@newkind/cache@0.1.1";
const FILES_TO_CACHE = [
    '/newkind-service/tests/proxy/index.html',
];

const precacheSite = () => {
    return caches.open(CACHE_NAME)
        .then((openCache) => {
            return openCache.addAll(FILES_TO_CACHE);
        });
};

export default {
    cacheName: CACHE_NAME,
    filesToCache: FILES_TO_CACHE,
    precacheSite: precacheSite
};