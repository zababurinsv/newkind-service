import * as Comlink from "comlink";
let CACHE_NAME = '"@newkind/cache@0.1.0"';
let urlsToCache = [
    '/newkind-service'
];
//1s
let CONFIG = {
    CACHE: CACHE_NAME,
    URLS: urlsToCache,
    AllowList: [CACHE_NAME, 'blog-posts-cache-v1'],
    timeout: 0,
    memory: {},
    progressIndicatorUrls: "/\?requestId=/i;",
    strategy: {
        NetworkOrCache: false,
        CacheOnly: false,
        CacheAndUpdate: false,
        CacheUpdateAndRefresh: false,
        EmbeddedFallback: false
    },
    contentType: (destination) => {
        switch (destination) {
            case'audio':
                return 'audio/mpeg'
                break
            default:
                return false
                break
        }
    }
}

self.addEventListener("install", (event) => {

    event.waitUntil(self.skipWaiting())
    event.waitUntil(
        caches.open(CONFIG.CACHE)
            .then(function(cache) {

                return cache.addAll(CONFIG.URLS);
            })
    );

    console.log('🖤 service install')
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim())
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (CONFIG.AllowList.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    console.log('🖤 service activate')
});

self.addEventListener('notificationclick', function(event) {
    console.log('🖤 service notificationclick', event)
    // event.notification.close();

    // var promise = new Promise(function(resolve) {
    //     setTimeout(resolve, 1000);
    // }).then(function() {
    //     return clients.openWindow(event.data.locator);
    // });
    //
    // event.waitUntil(promise);
});

self.addEventListener('push', function(event) {
    console.log('🖤 service push', event)
    // console.log('Received a push message', event);
    // let title = 'Yay a message.';
    // let body = 'We have received a push message.';
    // let icon = '/images/icon-192x192.png';
    // let tag = 'simple-push-demo-notification-tag';
    // event.waitUntil(
    //     self.registration.showNotification(title, {
    //         body: body,
    //         icon: icon,
    //         tag: tag
    //     })
    // );
});

self.addEventListener('sync', (event) => {
    console.log('🖤 service sync', event)
    // console.log('event sync', event)
    // if (event.tag == 'event1') {
    //     event.waitUntil(doSomething())
    // }вввпарапsssssssssss
})

self.addEventListener('fetch', event => {
    console.log('🖤 service fetch')
    if(CONFIG.strategy.NetworkOrCache) {
        event.respondWith(fromNetwork(event.request, CONFIG.timeout)
            .catch((err) => {
                //console.log(`Error: ${err.message()}`);
                fromCache(event.request);
                // .catch(() => return useFallback()));
            }));
    } else if(CONFIG.strategy.CacheOnly) {
        event.respondWith(fromCache(event.request));
    } else if(CONFIG.strategy.CacheAndUpdate) {
        event.respondWith(fromCache(event.request));
        event.waitUntil(update(event.request));
    } else if(CONFIG.strategy.CacheUpdateAndRefresh) {
        // Как и в предыдущем примере, сначала `respondWith()` потом `waitUntil()`
        event.respondWith(fromCache(event.request));
        event.waitUntil(
            update(event.request)
                // В конце, после получения "свежих" данных от сервера уведомляем всех клиентов.
                .then(refresh)
        );
    } else {
        event.respondWith(fetch(new Request(event.request,{ headers: {
                'Content-Type': CONFIG.contentType(event.request.destination)
            }}))
            .then(response => {
                //console.log('*** service response ***')
                    if(!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    return response;
                }
            ).catch(() => useFallback() )
        );
    }
})

self.addEventListener("message", async (event) => {
    if (event.data && event.data.state && event.data.state.isConnected && event.data.state.type === "proxy-memory") {
        console.log('🌼 🎫 service message', event.data.state)
        for(let port in event.data.state.to) {
            CONFIG.memory = Comlink.wrap(event.data.state.to[port])
        }
       event.source.postMessage({
            state: {
                'proxy-memory': true
            }
        })
    } else {
        if(event.data.test) {
            await CONFIG.memory.fs.list.dir()
            event.source.postMessage({
                state: {
                    '~~~~~ test ~~~~~': true
                }
            })
        }
    }
});

function fromNetwork(request, timeout) {
    return new Promise((fulfill, reject) => {
        let timeoutId = setTimeout(reject, timeout);
        fetch(request).then((response) => {
            clearTimeout(timeoutId);
            fulfill(response);
        }, reject);
    });
}

function fromCache(request) {
    return caches.open(CONFIG.CACHE).then((cache) =>
        cache.match(request).then((matching) =>
            matching || Promise.reject('no-match')
        ));
}

function update(request) {
    return caches.open(CONFIG.CACHE).then((cache) =>
        fetch(request).then((response) =>
            // cache.put(request, response)
            cache.put(request, response.clone()).then(() => response)
        )
    );
}

// Шлём сообщения об обновлении данных всем клиентам.
function refresh(response) {
    return self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
            // Подробнее про ETag можно прочитать тут
            // https://en.wikipedia.org/wiki/HTTP_ETag
            const message = {
                type: 'refresh',
                url: response.url,
                eTag: response.headers.get('ETag')
            };
            // Уведомляем клиент об обновлении данных.
            client.postMessage(JSON.stringify(message));
        });
    });
}
const FALLBACK =
    '<div>\n' +
    '    <div>App Title</div>\n' +
    '    <div>you are offline</div>\n' +
    '    <img src="/svg/or/base64/of/your/dinosaur" alt="newkind"/>\n' +
    '</div>';

function useFallback() {
    return Promise.resolve(new Response(FALLBACK, { headers: {
            'Content-Type': 'text/html; charset=utf-8'
    }}));
}