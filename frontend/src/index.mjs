import * as Comlink from "comlink";
import api from './modules/fs/api.mjs'

const CONFIG = {
    CACHE: "@newkind/cache@0.1.0",
    timeout: 0,
    db: {},
    progressIndicatorUrls: "/\?requestId=/i;",
    strategy: {
        NetworkOrCache: false,
        CacheOnly: false,
        CacheAndUpdate: false,
        CacheUpdateAndRefresh: false,
        EmbeddedFallback: false
    }

}

self.addEventListener("install", (event) => {
    event.waitUntil((async () => {
        CONFIG.db = await api()
        const cache = await caches.open(CONFIG.CACHE)
        // cache.addAll([
        //     '/img/background'
        // ])
        console.log('install in worker')
        self.skipWaiting()
    })())
});

self.addEventListener("activate", (event) => {
    // `self.clients.claim()` позволяет SW начать перехватывать запросы с самого начала,
    // это работает вместе с `skipWaiting()`, позволяя использовать `fallback` с самых первых запросов.
    event.waitUntil(self.clients.claim());
    console.log('activate in worker')
    // clients.claim()
});

function customHeaderRequestFetch(event) {
    var myRequest = new Request(event.request.url);
    var myHeaders = new Headers();
    // let request = new Request(event.request);
    // let headers = request.headers;
    // headers.append('Content-Type', 'audio/mpeg');
    // headers.append('Cache-Control', 'no-cache, no-store');
    // headers.append('Access-Control-Allow-Origin', 'http://localhost:4517');
    // headers.append('Access-Control-Allow-Credentials', 'true');
    // headers.append('Access-Control-Allow-Headers', 'Origin, Accept, X-Requested-With, Content-Type, Icy-MetaData');
    // headers.append('Access-Control-Allow-Methods', 'GET, OPTIONS, SOURCE, PUT, HEAD, STATS');
    // return request
}

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    const scope = self.registration.scope;
    if(CONFIG.strategy.NetworkOrCache) {
        event.respondWith(fromNetwork(event.request, CONFIG.timeout)
            .catch((err) => {
                console.log(`Error: ${err.message()}`);
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
        event.respondWith((async () => {
            console.log("🏉", event.request.url)
            if(event.request.url ==="https://hermitage.hostingradio.ru/hermitage128.mp3") {
                const response = await fetch(event.request);
                return response;

                // let request = customHeaderRequestFetch(event)
                // console.log('~~~request~~~', request)
                // fetch(request).then(response => {
                //     console.log('response', response)
                //     return response
                // })
            } else {
                const response = await fetch(event.request);
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                return response;
            }
        })());
    }
})

self.addEventListener("message", async (event) => {
    if (event.data.service) {
        Comlink.expose(CONFIG.db, event.data.port)
        return;
    }
});

// Временно-ограниченный запрос.
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
    '    <img src="/svg/or/base64/of/your/dinosaur" alt="dinosaur"/>\n' +
    '</div>';

// Он никогда не упадет, т.к мы всегда отдаем заранее подготовленные данные.
function useFallback() {
    return Promise.resolve(new Response(FALLBACK, { headers: {
            'Content-Type': 'text/html; charset=utf-8'
    }}));
}
