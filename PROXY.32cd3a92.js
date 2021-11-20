var $53f2f5b49ef73547$exports = {};
/**
 * Copyright 2019 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const $ce3a3801e6b1c02c$export$be5234c0b764b6e0 = Symbol("Comlink.proxy");
const $ce3a3801e6b1c02c$export$39fb953702b7fcd7 = Symbol("Comlink.endpoint");
const $ce3a3801e6b1c02c$export$89981d4b8d9f48aa = Symbol("Comlink.releaseProxy");
const $ce3a3801e6b1c02c$var$throwMarker = Symbol("Comlink.thrown");
const $ce3a3801e6b1c02c$var$isObject = (val)=>typeof val === "object" && val !== null || typeof val === "function"
;
/**
 * Internal transfer handle to handle objects marked to proxy.
 */ const $ce3a3801e6b1c02c$var$proxyTransferHandler = {
    canHandle: (val)=>$ce3a3801e6b1c02c$var$isObject(val) && val[$ce3a3801e6b1c02c$export$be5234c0b764b6e0]
    ,
    serialize (obj) {
        const { port1: port1 , port2: port2  } = new MessageChannel();
        $ce3a3801e6b1c02c$export$9b7f6e342a8cbd38(obj, port1);
        return [
            port2,
            [
                port2
            ]
        ];
    },
    deserialize (port) {
        port.start();
        return $ce3a3801e6b1c02c$export$4997ffc0176396a6(port);
    }
};
/**
 * Internal transfer handler to handle thrown exceptions.
 */ const $ce3a3801e6b1c02c$var$throwTransferHandler = {
    canHandle: (value)=>$ce3a3801e6b1c02c$var$isObject(value) && $ce3a3801e6b1c02c$var$throwMarker in value
    ,
    serialize ({ value: value  }) {
        let serialized;
        if (value instanceof Error) serialized = {
            isError: true,
            value: {
                message: value.message,
                name: value.name,
                stack: value.stack
            }
        };
        else serialized = {
            isError: false,
            value: value
        };
        return [
            serialized,
            []
        ];
    },
    deserialize (serialized) {
        if (serialized.isError) throw Object.assign(new Error(serialized.value.message), serialized.value);
        throw serialized.value;
    }
};
/**
 * Allows customizing the serialization of certain values.
 */ const $ce3a3801e6b1c02c$export$ab8f1c00731ee83e = new Map([
    [
        "proxy",
        $ce3a3801e6b1c02c$var$proxyTransferHandler
    ],
    [
        "throw",
        $ce3a3801e6b1c02c$var$throwTransferHandler
    ], 
]);
function $ce3a3801e6b1c02c$export$9b7f6e342a8cbd38(obj1, ep = self) {
    ep.addEventListener("message", function callback(ev) {
        if (!ev || !ev.data) return;
        const { id: id , type: type , path: path  } = Object.assign({
            path: []
        }, ev.data);
        const argumentList = (ev.data.argumentList || []).map($ce3a3801e6b1c02c$var$fromWireValue);
        let returnValue1;
        try {
            const parent = path.slice(0, -1).reduce((obj, prop)=>obj[prop]
            , obj1);
            const rawValue = path.reduce((obj, prop)=>obj[prop]
            , obj1);
            switch(type){
                case "GET" /* GET */ :
                    returnValue1 = rawValue;
                    break;
                case "SET" /* SET */ :
                    parent[path.slice(-1)[0]] = $ce3a3801e6b1c02c$var$fromWireValue(ev.data.value);
                    returnValue1 = true;
                    break;
                case "APPLY" /* APPLY */ :
                    returnValue1 = rawValue.apply(parent, argumentList);
                    break;
                case "CONSTRUCT" /* CONSTRUCT */ :
                    {
                        const value = new rawValue(...argumentList);
                        returnValue1 = $ce3a3801e6b1c02c$export$923f96dd5afa9ce6(value);
                    }
                    break;
                case "ENDPOINT" /* ENDPOINT */ :
                    {
                        const { port1: port1 , port2: port2  } = new MessageChannel();
                        $ce3a3801e6b1c02c$export$9b7f6e342a8cbd38(obj1, port2);
                        returnValue1 = $ce3a3801e6b1c02c$export$c9b234447cf4ef7c(port1, [
                            port1
                        ]);
                    }
                    break;
                case "RELEASE" /* RELEASE */ :
                    returnValue1 = undefined;
                    break;
                default:
                    return;
            }
        } catch (value1) {
            returnValue1 = {
                value: value1,
                [$ce3a3801e6b1c02c$var$throwMarker]: 0
            };
        }
        Promise.resolve(returnValue1).catch((value)=>{
            return {
                value: value,
                [$ce3a3801e6b1c02c$var$throwMarker]: 0
            };
        }).then((returnValue)=>{
            const [wireValue, transferables] = $ce3a3801e6b1c02c$var$toWireValue(returnValue);
            ep.postMessage(Object.assign(Object.assign({
            }, wireValue), {
                id: id
            }), transferables);
            if (type === "RELEASE" /* RELEASE */ ) {
                // detach and deactive after sending release response above.
                ep.removeEventListener("message", callback);
                $ce3a3801e6b1c02c$var$closeEndPoint(ep);
            }
        });
    });
    if (ep.start) ep.start();
}
function $ce3a3801e6b1c02c$var$isMessagePort(endpoint) {
    return endpoint.constructor.name === "MessagePort";
}
function $ce3a3801e6b1c02c$var$closeEndPoint(endpoint) {
    if ($ce3a3801e6b1c02c$var$isMessagePort(endpoint)) endpoint.close();
}
function $ce3a3801e6b1c02c$export$4997ffc0176396a6(ep, target) {
    return $ce3a3801e6b1c02c$var$createProxy(ep, [], target);
}
function $ce3a3801e6b1c02c$var$throwIfProxyReleased(isReleased) {
    if (isReleased) throw new Error("Proxy has been released and is not useable");
}
function $ce3a3801e6b1c02c$var$createProxy(ep, path = [], target = function() {
}) {
    let isProxyReleased = false;
    const proxy = new Proxy(target, {
        get (_target, prop) {
            $ce3a3801e6b1c02c$var$throwIfProxyReleased(isProxyReleased);
            if (prop === $ce3a3801e6b1c02c$export$89981d4b8d9f48aa) return ()=>{
                return $ce3a3801e6b1c02c$var$requestResponseMessage(ep, {
                    type: "RELEASE" /* RELEASE */ ,
                    path: path.map((p)=>p.toString()
                    )
                }).then(()=>{
                    $ce3a3801e6b1c02c$var$closeEndPoint(ep);
                    isProxyReleased = true;
                });
            };
            if (prop === "then") {
                if (path.length === 0) return {
                    then: ()=>proxy
                };
                const r = $ce3a3801e6b1c02c$var$requestResponseMessage(ep, {
                    type: "GET" /* GET */ ,
                    path: path.map((p)=>p.toString()
                    )
                }).then($ce3a3801e6b1c02c$var$fromWireValue);
                return r.then.bind(r);
            }
            return $ce3a3801e6b1c02c$var$createProxy(ep, [
                ...path,
                prop
            ]);
        },
        set (_target, prop, rawValue) {
            $ce3a3801e6b1c02c$var$throwIfProxyReleased(isProxyReleased);
            // FIXME: ES6 Proxy Handler `set` methods are supposed to return a
            // boolean. To show good will, we return true asynchronously ¯\_(ツ)_/¯
            const [value, transferables] = $ce3a3801e6b1c02c$var$toWireValue(rawValue);
            return $ce3a3801e6b1c02c$var$requestResponseMessage(ep, {
                type: "SET" /* SET */ ,
                path: [
                    ...path,
                    prop
                ].map((p)=>p.toString()
                ),
                value: value
            }, transferables).then($ce3a3801e6b1c02c$var$fromWireValue);
        },
        apply (_target, _thisArg, rawArgumentList) {
            $ce3a3801e6b1c02c$var$throwIfProxyReleased(isProxyReleased);
            const last = path[path.length - 1];
            if (last === $ce3a3801e6b1c02c$export$39fb953702b7fcd7) return $ce3a3801e6b1c02c$var$requestResponseMessage(ep, {
                type: "ENDPOINT" /* ENDPOINT */ 
            }).then($ce3a3801e6b1c02c$var$fromWireValue);
            // We just pretend that `bind()` didn’t happen.
            if (last === "bind") return $ce3a3801e6b1c02c$var$createProxy(ep, path.slice(0, -1));
            const [argumentList, transferables] = $ce3a3801e6b1c02c$var$processArguments(rawArgumentList);
            return $ce3a3801e6b1c02c$var$requestResponseMessage(ep, {
                type: "APPLY" /* APPLY */ ,
                path: path.map((p)=>p.toString()
                ),
                argumentList: argumentList
            }, transferables).then($ce3a3801e6b1c02c$var$fromWireValue);
        },
        construct (_target, rawArgumentList) {
            $ce3a3801e6b1c02c$var$throwIfProxyReleased(isProxyReleased);
            const [argumentList, transferables] = $ce3a3801e6b1c02c$var$processArguments(rawArgumentList);
            return $ce3a3801e6b1c02c$var$requestResponseMessage(ep, {
                type: "CONSTRUCT" /* CONSTRUCT */ ,
                path: path.map((p)=>p.toString()
                ),
                argumentList: argumentList
            }, transferables).then($ce3a3801e6b1c02c$var$fromWireValue);
        }
    });
    return proxy;
}
function $ce3a3801e6b1c02c$var$myFlat(arr) {
    return Array.prototype.concat.apply([], arr);
}
function $ce3a3801e6b1c02c$var$processArguments(argumentList) {
    const processed = argumentList.map($ce3a3801e6b1c02c$var$toWireValue);
    return [
        processed.map((v)=>v[0]
        ),
        $ce3a3801e6b1c02c$var$myFlat(processed.map((v)=>v[1]
        ))
    ];
}
const $ce3a3801e6b1c02c$var$transferCache = new WeakMap();
function $ce3a3801e6b1c02c$export$c9b234447cf4ef7c(obj, transfers) {
    $ce3a3801e6b1c02c$var$transferCache.set(obj, transfers);
    return obj;
}
function $ce3a3801e6b1c02c$export$923f96dd5afa9ce6(obj) {
    return Object.assign(obj, {
        [$ce3a3801e6b1c02c$export$be5234c0b764b6e0]: true
    });
}
function $ce3a3801e6b1c02c$export$f2c03fb5a6c19546(w, context = self, targetOrigin = "*") {
    return {
        postMessage: (msg, transferables)=>w.postMessage(msg, targetOrigin, transferables)
        ,
        addEventListener: context.addEventListener.bind(context),
        removeEventListener: context.removeEventListener.bind(context)
    };
}
function $ce3a3801e6b1c02c$var$toWireValue(value) {
    for (const [name, handler] of $ce3a3801e6b1c02c$export$ab8f1c00731ee83e)if (handler.canHandle(value)) {
        const [serializedValue, transferables] = handler.serialize(value);
        return [
            {
                type: "HANDLER" /* HANDLER */ ,
                name: name,
                value: serializedValue
            },
            transferables, 
        ];
    }
    return [
        {
            type: "RAW" /* RAW */ ,
            value: value
        },
        $ce3a3801e6b1c02c$var$transferCache.get(value) || [], 
    ];
}
function $ce3a3801e6b1c02c$var$fromWireValue(value) {
    switch(value.type){
        case "HANDLER" /* HANDLER */ :
            return $ce3a3801e6b1c02c$export$ab8f1c00731ee83e.get(value.name).deserialize(value.value);
        case "RAW" /* RAW */ :
            return value.value;
    }
}
function $ce3a3801e6b1c02c$var$requestResponseMessage(ep, msg, transfers) {
    return new Promise((resolve)=>{
        const id = $ce3a3801e6b1c02c$var$generateUUID();
        ep.addEventListener("message", function l(ev) {
            if (!ev.data || !ev.data.id || ev.data.id !== id) return;
            ep.removeEventListener("message", l);
            resolve(ev.data);
        });
        if (ep.start) ep.start();
        ep.postMessage(Object.assign({
            id: id
        }, msg), transfers);
    });
}
function $ce3a3801e6b1c02c$var$generateUUID() {
    return new Array(4).fill(0).map(()=>Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)
    ).join("-");
}


let $53f2f5b49ef73547$var$CACHE_NAME = '"@newkind/cache@0.1.0"';
let $53f2f5b49ef73547$var$urlsToCache = [
    '/'
];
//1s
let $53f2f5b49ef73547$var$CONFIG = {
    CACHE: $53f2f5b49ef73547$var$CACHE_NAME,
    URLS: $53f2f5b49ef73547$var$urlsToCache,
    AllowList: [
        $53f2f5b49ef73547$var$CACHE_NAME,
        'blog-posts-cache-v1'
    ],
    timeout: 0,
    memory: {
    },
    progressIndicatorUrls: "/\?requestId=/i;",
    strategy: {
        NetworkOrCache: false,
        CacheOnly: false,
        CacheAndUpdate: false,
        CacheUpdateAndRefresh: false,
        EmbeddedFallback: false
    },
    contentType: (destination)=>{
        switch(destination){
            case 'audio':
                return 'audio/mpeg';
            default:
                return false;
        }
    }
};
self.addEventListener("install", (event)=>{
    event.waitUntil(self.skipWaiting());
    event.waitUntil(caches.open($53f2f5b49ef73547$var$CONFIG.CACHE).then(function(cache) {
        return cache.addAll($53f2f5b49ef73547$var$CONFIG.URLS);
    }));
    console.log('🖤 service install');
});
self.addEventListener("activate", (event)=>{
    event.waitUntil(self.clients.claim());
    event.waitUntil(caches.keys().then(function(cacheNames) {
        return Promise.all(cacheNames.map(function(cacheName) {
            if ($53f2f5b49ef73547$var$CONFIG.AllowList.indexOf(cacheName) === -1) return caches.delete(cacheName);
        }));
    }));
    console.log('🖤 service activate');
});
self.addEventListener('notificationclick', function(event) {
    console.log('🖤 service notificationclick', event);
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
    console.log('🖤 service push', event);
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
self.addEventListener('sync', (event)=>{
    console.log('🖤 service sync', event);
// console.log('event sync', event)
// if (event.tag == 'event1') {
//     event.waitUntil(doSomething())
// }вввпарапsssssssssss
});
self.addEventListener('fetch', (event)=>{
    console.log('🖤 service fetch');
    if ($53f2f5b49ef73547$var$CONFIG.strategy.NetworkOrCache) event.respondWith($53f2f5b49ef73547$var$fromNetwork(event.request, $53f2f5b49ef73547$var$CONFIG.timeout).catch((err)=>{
        //console.log(`Error: ${err.message()}`);
        $53f2f5b49ef73547$var$fromCache(event.request);
    // .catch(() => return useFallback()));
    }));
    else if ($53f2f5b49ef73547$var$CONFIG.strategy.CacheOnly) event.respondWith($53f2f5b49ef73547$var$fromCache(event.request));
    else if ($53f2f5b49ef73547$var$CONFIG.strategy.CacheAndUpdate) {
        event.respondWith($53f2f5b49ef73547$var$fromCache(event.request));
        event.waitUntil($53f2f5b49ef73547$var$update(event.request));
    } else if ($53f2f5b49ef73547$var$CONFIG.strategy.CacheUpdateAndRefresh) {
        // Как и в предыдущем примере, сначала `respondWith()` потом `waitUntil()`
        event.respondWith($53f2f5b49ef73547$var$fromCache(event.request));
        event.waitUntil($53f2f5b49ef73547$var$update(event.request)// В конце, после получения "свежих" данных от сервера уведомляем всех клиентов.
        .then($53f2f5b49ef73547$var$refresh));
    } else event.respondWith(fetch(new Request(event.request, {
        headers: {
            'Content-Type': $53f2f5b49ef73547$var$CONFIG.contentType(event.request.destination)
        }
    })).then((response)=>{
        //console.log('*** service response ***')
        if (!response || response.status !== 200 || response.type !== 'basic') return response;
        return response;
    }).catch(()=>$53f2f5b49ef73547$var$useFallback()
    ));
});
self.addEventListener("message", async (event)=>{
    if (event.data && event.data.state && event.data.state.isConnected && event.data.state.type === "proxy-memory") {
        console.log('🌼 🎫 service message', event.data.state);
        for(let port in event.data.state.to)$53f2f5b49ef73547$var$CONFIG.memory = $ce3a3801e6b1c02c$export$4997ffc0176396a6(event.data.state.to[port]);
        event.source.postMessage({
            state: {
                'proxy-memory': true
            }
        });
    } else if (event.data.test) {
        await $53f2f5b49ef73547$var$CONFIG.memory.fs.list.dir();
        event.source.postMessage({
            state: {
                '~~~~~ test ~~~~~': true
            }
        });
    }
});
function $53f2f5b49ef73547$var$fromNetwork(request, timeout) {
    return new Promise((fulfill, reject)=>{
        let timeoutId = setTimeout(reject, timeout);
        fetch(request).then((response)=>{
            clearTimeout(timeoutId);
            fulfill(response);
        }, reject);
    });
}
function $53f2f5b49ef73547$var$fromCache(request) {
    return caches.open($53f2f5b49ef73547$var$CONFIG.CACHE).then((cache)=>cache.match(request).then((matching)=>matching || Promise.reject('no-match')
        )
    );
}
function $53f2f5b49ef73547$var$update(request) {
    return caches.open($53f2f5b49ef73547$var$CONFIG.CACHE).then((cache)=>fetch(request).then((response)=>// cache.put(request, response)
            cache.put(request, response.clone()).then(()=>response
            )
        )
    );
}
// Шлём сообщения об обновлении данных всем клиентам.
function $53f2f5b49ef73547$var$refresh(response) {
    return self.clients.matchAll().then((clients)=>{
        clients.forEach((client)=>{
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
const $53f2f5b49ef73547$var$FALLBACK = "<div>\n    <div>App Title</div>\n    <div>you are offline</div>\n    <img src=\"/svg/or/base64/of/your/dinosaur\" alt=\"newkind\"/>\n</div>";
function $53f2f5b49ef73547$var$useFallback() {
    return Promise.resolve(new Response($53f2f5b49ef73547$var$FALLBACK, {
        headers: {
            'Content-Type': 'text/html; charset=utf-8'
        }
    }));
}


//# sourceMappingURL=PROXY.32cd3a92.js.map
