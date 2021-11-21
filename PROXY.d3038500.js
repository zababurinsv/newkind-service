var $4883c1c8e3d2f5bf$exports = {};
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
 */ const $0b1a5804b8fde326$export$be5234c0b764b6e0 = Symbol("Comlink.proxy");
const $0b1a5804b8fde326$export$39fb953702b7fcd7 = Symbol("Comlink.endpoint");
const $0b1a5804b8fde326$export$89981d4b8d9f48aa = Symbol("Comlink.releaseProxy");
const $0b1a5804b8fde326$var$throwMarker = Symbol("Comlink.thrown");
const $0b1a5804b8fde326$var$isObject = (val)=>typeof val === "object" && val !== null || typeof val === "function"
;
/**
 * Internal transfer handle to handle objects marked to proxy.
 */ const $0b1a5804b8fde326$var$proxyTransferHandler = {
    canHandle: (val)=>$0b1a5804b8fde326$var$isObject(val) && val[$0b1a5804b8fde326$export$be5234c0b764b6e0]
    ,
    serialize (obj) {
        const { port1: port1 , port2: port2  } = new MessageChannel();
        $0b1a5804b8fde326$export$9b7f6e342a8cbd38(obj, port1);
        return [
            port2,
            [
                port2
            ]
        ];
    },
    deserialize (port) {
        port.start();
        return $0b1a5804b8fde326$export$4997ffc0176396a6(port);
    }
};
/**
 * Internal transfer handler to handle thrown exceptions.
 */ const $0b1a5804b8fde326$var$throwTransferHandler = {
    canHandle: (value)=>$0b1a5804b8fde326$var$isObject(value) && $0b1a5804b8fde326$var$throwMarker in value
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
 */ const $0b1a5804b8fde326$export$ab8f1c00731ee83e = new Map([
    [
        "proxy",
        $0b1a5804b8fde326$var$proxyTransferHandler
    ],
    [
        "throw",
        $0b1a5804b8fde326$var$throwTransferHandler
    ], 
]);
function $0b1a5804b8fde326$export$9b7f6e342a8cbd38(obj1, ep = self) {
    ep.addEventListener("message", function callback(ev) {
        if (!ev || !ev.data) return;
        const { id: id , type: type , path: path  } = Object.assign({
            path: []
        }, ev.data);
        const argumentList = (ev.data.argumentList || []).map($0b1a5804b8fde326$var$fromWireValue);
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
                    parent[path.slice(-1)[0]] = $0b1a5804b8fde326$var$fromWireValue(ev.data.value);
                    returnValue1 = true;
                    break;
                case "APPLY" /* APPLY */ :
                    returnValue1 = rawValue.apply(parent, argumentList);
                    break;
                case "CONSTRUCT" /* CONSTRUCT */ :
                    {
                        const value = new rawValue(...argumentList);
                        returnValue1 = $0b1a5804b8fde326$export$923f96dd5afa9ce6(value);
                    }
                    break;
                case "ENDPOINT" /* ENDPOINT */ :
                    {
                        const { port1: port1 , port2: port2  } = new MessageChannel();
                        $0b1a5804b8fde326$export$9b7f6e342a8cbd38(obj1, port2);
                        returnValue1 = $0b1a5804b8fde326$export$c9b234447cf4ef7c(port1, [
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
                [$0b1a5804b8fde326$var$throwMarker]: 0
            };
        }
        Promise.resolve(returnValue1).catch((value)=>{
            return {
                value: value,
                [$0b1a5804b8fde326$var$throwMarker]: 0
            };
        }).then((returnValue)=>{
            const [wireValue, transferables] = $0b1a5804b8fde326$var$toWireValue(returnValue);
            ep.postMessage(Object.assign(Object.assign({
            }, wireValue), {
                id: id
            }), transferables);
            if (type === "RELEASE" /* RELEASE */ ) {
                // detach and deactive after sending release response above.
                ep.removeEventListener("message", callback);
                $0b1a5804b8fde326$var$closeEndPoint(ep);
            }
        });
    });
    if (ep.start) ep.start();
}
function $0b1a5804b8fde326$var$isMessagePort(endpoint) {
    return endpoint.constructor.name === "MessagePort";
}
function $0b1a5804b8fde326$var$closeEndPoint(endpoint) {
    if ($0b1a5804b8fde326$var$isMessagePort(endpoint)) endpoint.close();
}
function $0b1a5804b8fde326$export$4997ffc0176396a6(ep, target) {
    return $0b1a5804b8fde326$var$createProxy(ep, [], target);
}
function $0b1a5804b8fde326$var$throwIfProxyReleased(isReleased) {
    if (isReleased) throw new Error("Proxy has been released and is not useable");
}
function $0b1a5804b8fde326$var$createProxy(ep, path = [], target = function() {
}) {
    let isProxyReleased = false;
    const proxy = new Proxy(target, {
        get (_target, prop) {
            $0b1a5804b8fde326$var$throwIfProxyReleased(isProxyReleased);
            if (prop === $0b1a5804b8fde326$export$89981d4b8d9f48aa) return ()=>{
                return $0b1a5804b8fde326$var$requestResponseMessage(ep, {
                    type: "RELEASE" /* RELEASE */ ,
                    path: path.map((p)=>p.toString()
                    )
                }).then(()=>{
                    $0b1a5804b8fde326$var$closeEndPoint(ep);
                    isProxyReleased = true;
                });
            };
            if (prop === "then") {
                if (path.length === 0) return {
                    then: ()=>proxy
                };
                const r = $0b1a5804b8fde326$var$requestResponseMessage(ep, {
                    type: "GET" /* GET */ ,
                    path: path.map((p)=>p.toString()
                    )
                }).then($0b1a5804b8fde326$var$fromWireValue);
                return r.then.bind(r);
            }
            return $0b1a5804b8fde326$var$createProxy(ep, [
                ...path,
                prop
            ]);
        },
        set (_target, prop, rawValue) {
            $0b1a5804b8fde326$var$throwIfProxyReleased(isProxyReleased);
            // FIXME: ES6 Proxy Handler `set` methods are supposed to return a
            // boolean. To show good will, we return true asynchronously ¯\_(ツ)_/¯
            const [value, transferables] = $0b1a5804b8fde326$var$toWireValue(rawValue);
            return $0b1a5804b8fde326$var$requestResponseMessage(ep, {
                type: "SET" /* SET */ ,
                path: [
                    ...path,
                    prop
                ].map((p)=>p.toString()
                ),
                value: value
            }, transferables).then($0b1a5804b8fde326$var$fromWireValue);
        },
        apply (_target, _thisArg, rawArgumentList) {
            $0b1a5804b8fde326$var$throwIfProxyReleased(isProxyReleased);
            const last = path[path.length - 1];
            if (last === $0b1a5804b8fde326$export$39fb953702b7fcd7) return $0b1a5804b8fde326$var$requestResponseMessage(ep, {
                type: "ENDPOINT" /* ENDPOINT */ 
            }).then($0b1a5804b8fde326$var$fromWireValue);
            // We just pretend that `bind()` didn’t happen.
            if (last === "bind") return $0b1a5804b8fde326$var$createProxy(ep, path.slice(0, -1));
            const [argumentList, transferables] = $0b1a5804b8fde326$var$processArguments(rawArgumentList);
            return $0b1a5804b8fde326$var$requestResponseMessage(ep, {
                type: "APPLY" /* APPLY */ ,
                path: path.map((p)=>p.toString()
                ),
                argumentList: argumentList
            }, transferables).then($0b1a5804b8fde326$var$fromWireValue);
        },
        construct (_target, rawArgumentList) {
            $0b1a5804b8fde326$var$throwIfProxyReleased(isProxyReleased);
            const [argumentList, transferables] = $0b1a5804b8fde326$var$processArguments(rawArgumentList);
            return $0b1a5804b8fde326$var$requestResponseMessage(ep, {
                type: "CONSTRUCT" /* CONSTRUCT */ ,
                path: path.map((p)=>p.toString()
                ),
                argumentList: argumentList
            }, transferables).then($0b1a5804b8fde326$var$fromWireValue);
        }
    });
    return proxy;
}
function $0b1a5804b8fde326$var$myFlat(arr) {
    return Array.prototype.concat.apply([], arr);
}
function $0b1a5804b8fde326$var$processArguments(argumentList) {
    const processed = argumentList.map($0b1a5804b8fde326$var$toWireValue);
    return [
        processed.map((v)=>v[0]
        ),
        $0b1a5804b8fde326$var$myFlat(processed.map((v)=>v[1]
        ))
    ];
}
const $0b1a5804b8fde326$var$transferCache = new WeakMap();
function $0b1a5804b8fde326$export$c9b234447cf4ef7c(obj, transfers) {
    $0b1a5804b8fde326$var$transferCache.set(obj, transfers);
    return obj;
}
function $0b1a5804b8fde326$export$923f96dd5afa9ce6(obj) {
    return Object.assign(obj, {
        [$0b1a5804b8fde326$export$be5234c0b764b6e0]: true
    });
}
function $0b1a5804b8fde326$export$f2c03fb5a6c19546(w, context = self, targetOrigin = "*") {
    return {
        postMessage: (msg, transferables)=>w.postMessage(msg, targetOrigin, transferables)
        ,
        addEventListener: context.addEventListener.bind(context),
        removeEventListener: context.removeEventListener.bind(context)
    };
}
function $0b1a5804b8fde326$var$toWireValue(value) {
    for (const [name, handler] of $0b1a5804b8fde326$export$ab8f1c00731ee83e)if (handler.canHandle(value)) {
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
        $0b1a5804b8fde326$var$transferCache.get(value) || [], 
    ];
}
function $0b1a5804b8fde326$var$fromWireValue(value) {
    switch(value.type){
        case "HANDLER" /* HANDLER */ :
            return $0b1a5804b8fde326$export$ab8f1c00731ee83e.get(value.name).deserialize(value.value);
        case "RAW" /* RAW */ :
            return value.value;
    }
}
function $0b1a5804b8fde326$var$requestResponseMessage(ep, msg, transfers) {
    return new Promise((resolve)=>{
        const id = $0b1a5804b8fde326$var$generateUUID();
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
function $0b1a5804b8fde326$var$generateUUID() {
    return new Array(4).fill(0).map(()=>Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)
    ).join("-");
}


let $4883c1c8e3d2f5bf$var$CACHE_NAME = "@newkind/cache@0.1.1";
let $4883c1c8e3d2f5bf$var$urlsToCache = [
    '/newkind-service/'
];
//1s
let $4883c1c8e3d2f5bf$var$CONFIG = {
    CACHE: $4883c1c8e3d2f5bf$var$CACHE_NAME,
    URLS: $4883c1c8e3d2f5bf$var$urlsToCache,
    AllowList: [
        $4883c1c8e3d2f5bf$var$CACHE_NAME
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
    event.waitUntil(caches.open($4883c1c8e3d2f5bf$var$CONFIG.CACHE).then(function(cache) {
        console.log('💖 addAll', $4883c1c8e3d2f5bf$var$CONFIG.URLS);
        return cache.addAll($4883c1c8e3d2f5bf$var$CONFIG.URLS);
    }));
    console.log('🖤 service install');
});
self.addEventListener("activate", (event)=>{
    event.waitUntil(self.clients.claim());
    event.waitUntil(caches.keys().then(function(cacheNames) {
        return Promise.all(cacheNames.map(function(cacheName) {
            if ($4883c1c8e3d2f5bf$var$CONFIG.AllowList.indexOf(cacheName) === -1) return caches.delete(cacheName);
        }));
    }));
    console.log('🖤 service activate');
});
self.addEventListener('notificationclick', function(event) {
    console.log('🖤 service notificationclick', event);
// event.notification.close();df
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
// if (event.tag == 'event1') {f
//     event.waitUntil(doSomething())
// }вввпарапsssssssssss
});
self.addEventListener('fetch', (event)=>{
    console.log('🖤 service fetch', event.request.url);
    if ($4883c1c8e3d2f5bf$var$CONFIG.strategy.NetworkOrCache) event.respondWith($4883c1c8e3d2f5bf$var$fromNetwork(event.request, $4883c1c8e3d2f5bf$var$CONFIG.timeout).catch((err)=>{
        //console.log(`Error: ${err.message()}`);
        $4883c1c8e3d2f5bf$var$fromCache(event.request);
    // .catch(() => return useFallback()));
    }));
    else if ($4883c1c8e3d2f5bf$var$CONFIG.strategy.CacheOnly) event.respondWith($4883c1c8e3d2f5bf$var$fromCache(event.request));
    else if ($4883c1c8e3d2f5bf$var$CONFIG.strategy.CacheAndUpdate) {
        event.respondWith($4883c1c8e3d2f5bf$var$fromCache(event.request));
        event.waitUntil($4883c1c8e3d2f5bf$var$update(event.request));
    } else if ($4883c1c8e3d2f5bf$var$CONFIG.strategy.CacheUpdateAndRefresh) {
        // Как и в предыдущем примере, сначала `respondWith()` потом `waitUntil()`
        event.respondWith($4883c1c8e3d2f5bf$var$fromCache(event.request));
        event.waitUntil($4883c1c8e3d2f5bf$var$update(event.request)// В конце, после получения "свежих" данных от сервера уведомляем всех клиентов.
        .then($4883c1c8e3d2f5bf$var$refresh));
    } else event.respondWith(fetch(new Request(event.request, {
        headers: {
            'Content-Type': $4883c1c8e3d2f5bf$var$CONFIG.contentType(event.request.destination)
        }
    })).then((response)=>{
        //console.log('*** service response ***')
        if (!response || response.status !== 200 || response.type !== 'basic') return response;
        return response;
    }).catch(()=>$4883c1c8e3d2f5bf$var$useFallback()
    ));
});
self.addEventListener("message", async (event)=>{
    console.log('🖤 🌼 service message', event.data);
    if (event.data && event.data.state && event.data.state.isConnected && event.data.state.type === "proxy-memory") {
        console.log('🖤 🌼 service message', event.data.state);
        for(let port in event.data.state.to)$4883c1c8e3d2f5bf$var$CONFIG.memory = $0b1a5804b8fde326$export$4997ffc0176396a6(event.data.state.to[port]);
        console.log('🖤 🌼 🎫 service message', event.data.state);
        event.source.postMessage({
            state: {
                'proxy-memory': true
            }
        });
    } else if (event.data.test) {
        // await CONFIG.memory.fs.list.dir()
        console.log('🖤 🌼 🎫 service message', event.data.state);
        event.source.postMessage({
            state: {
                '~~~~~ test ~~~~~': true
            }
        });
    }
});
function $4883c1c8e3d2f5bf$var$fromNetwork(request, timeout) {
    return new Promise((fulfill, reject)=>{
        let timeoutId = setTimeout(reject, timeout);
        fetch(request).then((response)=>{
            clearTimeout(timeoutId);
            fulfill(response);
        }, reject);
    });
}
function $4883c1c8e3d2f5bf$var$fromCache(request) {
    return caches.open($4883c1c8e3d2f5bf$var$CONFIG.CACHE).then((cache)=>cache.match(request).then((matching)=>matching || Promise.reject('no-match')
        )
    );
}
function $4883c1c8e3d2f5bf$var$update(request) {
    return caches.open($4883c1c8e3d2f5bf$var$CONFIG.CACHE).then((cache)=>fetch(request).then((response)=>// cache.put(request, response)
            cache.put(request, response.clone()).then(()=>response
            )
        )
    );
}
// Шлём сообщения об обновлении данных всем клиентам. dd
function $4883c1c8e3d2f5bf$var$refresh(response) {
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
const $4883c1c8e3d2f5bf$var$FALLBACK = `
<html>
<head>
<title>Elite</title>
<style>
body {
  padding: 3em 0em;
  background: #eeeeee;
}
hr {
  color: lightgray;
  width: 100%;
}
img {
  float: left;
  opacity: .8;
}
#box {
  background: white;
  border: 1px solid lightgray;
  width: 600px;
  padding: 60px;
  margin: auto;
}
h1 {
  font-size: 130%;
  font-weight: bold;
  border-bottom: 1px solid lightgray;
  margin-left: 48px;
}
h2 {
  font-size: 100%;
  font-weight: normal;
  border-bottom: 1px solid lightgray;
  margin-left: 48px;
}
ul {
  font-size: 80%;
  padding-left: 48px;
  margin: 0;
}
#reloadButton {
  padding-left: 48px;
}
</style>
</head>
<body>
  <div id="box">
    <img src="data:image/png;base64, AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbbv+DGW3/mRlt/5kZbf+ZGq6/hIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGa3/ohkt/7/Zbj//2S3/v9lt/6WAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGm5/iRlt/74Zbj//2W4//9luP//Zbf++mi4/i4gIPciGhr24hsb9uwbG/bsGhr24CEh9xoAAAAAAAAAAAAAAABnuP5mZLf+/2W4//9luP//Zbj//2S3/v9muP5yGBj2rhMT9v8TE/b/ExP2/xMT9f8YGPWkAAAAAAAAAAAAAAAAb7z/BGW3/tZluP//Zbj//2W4//9lt/7gJzH3ShMT9f8TE/b/ExP2/xMT9v8TE/b/ExP1/CAg9joAAAAAAAAAAAAAAABmuP5GZLf+6GS3/uhkt/7oZbf+UhgY9YQSEvX/ExP2/xMT9v8TE/b/ExP2/xIS9f8aGvZ8AAAAAD4++gQgIPZ6IiL2hiIi9oYgIPZ8KCj5BAAAAAAtLfgUFBT17BMT9v8TE/b/ExP2/xMT9v8VFfXoLCz4DgAAAAAaGvZqEhL1/xMT9v8TE/b/EhL1/xsb9nIAAAAAAAAAABwc9m4SEvX/ExP2/xMT9v8SEvX/HR32ZAAAAAAnJ/gSFRX16hMT9v8TE/b/ExP2/xMT9v8UFPXuJyf4Fp2xlAKNnqUYLC/mfhYW83ATE/VuFxf1aDc3+gIAAAAAGBj1fhIS9f8TE/b/ExP2/xMT9v8TE/b/ExP1/xkZ9YaGn3yIhZ57/4Wee/+Gn3yKAAAAAAAAAAAAAAAAAAAAACMj9zYTE/X8ExP2/xMT9v8TE/b/ExP2/xMT9f9JUshihZ57+IaffP+Gn3z/hZ579oigfiYAAAAAAAAAAAAAAAAAAAAAGBj1oBIS9f8TE/b/ExP2/xMT9f8YGPWmiKB+PIWee/+Gn3z/hp98/4Wee/+HoH06AAAAAAAAAAAAAAAAAAAAACUl9xgVFfXOExP11BMT9dQUFPXQJib3HgAAAACGn3ymhp98/4affP+Gn3ymAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiKB+EIihf0CIoX9AiKB+EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAP//AADg/wAA4MMAAOCBAADggQAA8QEAAOeBAADDwwAAgf8AAIAPAACBDwAAgQ8AAMMPAAD//wAA//8AAA==" width="32" height="32"/>
    <h1>Elite</h1>
    <h2>When connecting to: https://zababurinsv.github.io/newkind-service/</h2>
    <ul>
      <li>Check the address for errors such as <b>ww</b>.example.com
      instead of <b>www</b>.example.com</li>
      <li>If the address is correct, try checking the network
      connection.</li>
      <li>If your computer or network is protected by a firewall or
      proxy, make sure that the browser demo is permitted to access
      the network.</li>
    </ul>
    <br/><br/>
  </div>
</body>
</html>
`;
function $4883c1c8e3d2f5bf$var$useFallback() {
    return Promise.resolve(new Response($4883c1c8e3d2f5bf$var$FALLBACK, {
        headers: {
            'Content-Type': 'text/html; charset=utf-8'
        }
    }));
}


