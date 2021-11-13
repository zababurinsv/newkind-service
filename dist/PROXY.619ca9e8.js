const e=Symbol("Comlink.proxy"),t=Symbol("Comlink.endpoint"),n=Symbol("Comlink.releaseProxy"),a=Symbol("Comlink.thrown"),r=e=>"object"==typeof e&&null!==e||"function"==typeof e,s=new Map([["proxy",{canHandle:t=>r(t)&&t[e],serialize(e){const{port1:t,port2:n}=new MessageChannel;return o(e,t),[n,[n]]},deserialize:e=>(e.start(),c(e))}],["throw",{canHandle:e=>r(e)&&a in e,serialize({value:e}){let t;return t=e instanceof Error?{isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:{isError:!1,value:e},[t,[]]},deserialize(e){if(e.isError)throw Object.assign(new Error(e.value.message),e.value);throw e.value}}]]);function o(t,n=self){n.addEventListener("message",(function r(s){if(!s||!s.data)return;const{id:c,type:l,path:u}=Object.assign({path:[]},s.data),h=(s.data.argumentList||[]).map(m);let f;try{const n=u.slice(0,-1).reduce(((e,t)=>e[t]),t),a=u.reduce(((e,t)=>e[t]),t);switch(l){case"GET":f=a;break;case"SET":n[u.slice(-1)[0]]=m(s.data.value),f=!0;break;case"APPLY":f=a.apply(n,h);break;case"CONSTRUCT":{const t=new a(...h);g=t,f=Object.assign(g,{[e]:!0})}break;case"ENDPOINT":{const{port1:e,port2:n}=new MessageChannel;o(t,n),f=function(e,t){return p.set(e,t),e}(e,[e])}break;case"RELEASE":f=void 0;break;default:return}}catch(e){f={value:e,[a]:0}}var g;Promise.resolve(f).catch((e=>({value:e,[a]:0}))).then((e=>{const[t,a]=d(e);n.postMessage(Object.assign(Object.assign({},t),{id:c}),a),"RELEASE"===l&&(n.removeEventListener("message",r),i(n))}))})),n.start&&n.start()}function i(e){(function(e){return"MessagePort"===e.constructor.name})(e)&&e.close()}function c(e,t){return u(e,[],t)}function l(e){if(e)throw new Error("Proxy has been released and is not useable")}function u(e,a=[],r=function(){}){let s=!1;const o=new Proxy(r,{get(t,r){if(l(s),r===n)return()=>f(e,{type:"RELEASE",path:a.map((e=>e.toString()))}).then((()=>{i(e),s=!0}));if("then"===r){if(0===a.length)return{then:()=>o};const t=f(e,{type:"GET",path:a.map((e=>e.toString()))}).then(m);return t.then.bind(t)}return u(e,[...a,r])},set(t,n,r){l(s);const[o,i]=d(r);return f(e,{type:"SET",path:[...a,n].map((e=>e.toString())),value:o},i).then(m)},apply(n,r,o){l(s);const i=a[a.length-1];if(i===t)return f(e,{type:"ENDPOINT"}).then(m);if("bind"===i)return u(e,a.slice(0,-1));const[c,p]=h(o);return f(e,{type:"APPLY",path:a.map((e=>e.toString())),argumentList:c},p).then(m)},construct(t,n){l(s);const[r,o]=h(n);return f(e,{type:"CONSTRUCT",path:a.map((e=>e.toString())),argumentList:r},o).then(m)}});return o}function h(e){const t=e.map(d);return[t.map((e=>e[0])),(n=t.map((e=>e[1])),Array.prototype.concat.apply([],n))];var n}const p=new WeakMap;function d(e){for(const[t,n]of s)if(n.canHandle(e)){const[a,r]=n.serialize(e);return[{type:"HANDLER",name:t,value:a},r]}return[{type:"RAW",value:e},p.get(e)||[]]}function m(e){switch(e.type){case"HANDLER":return s.get(e.name).deserialize(e.value);case"RAW":return e.value}}function f(e,t,n){return new Promise((a=>{const r=new Array(4).fill(0).map((()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16))).join("-");e.addEventListener("message",(function t(n){n.data&&n.data.id&&n.data.id===r&&(e.removeEventListener("message",t),a(n.data))})),e.start&&e.start(),e.postMessage(Object.assign({id:r},t),n)}))}const g={CACHE:"@newkind/cache@0.1.0",timeout:0,memory:{},progressIndicatorUrls:"/?requestId=/i;",strategy:{NetworkOrCache:!1,CacheOnly:!1,CacheAndUpdate:!1,CacheUpdateAndRefresh:!1,EmbeddedFallback:!1},contentType:e=>"audio"===e&&"audio/mpeg"};function y(e){return caches.open(g.CACHE).then((t=>t.match(e).then((e=>e||Promise.reject("no-match")))))}function E(e){return caches.open(g.CACHE).then((t=>fetch(e).then((n=>t.put(e,n.clone()).then((()=>n))))))}function v(e){return self.clients.matchAll().then((t=>{t.forEach((t=>{const n={type:"refresh",url:e.url,eTag:e.headers.get("ETag")};t.postMessage(JSON.stringify(n))}))}))}self.addEventListener("install",(e=>{e.waitUntil((async()=>{await caches.open(g.CACHE);console.log("install in worker"),self.skipWaiting()})())})),self.addEventListener("activate",(e=>{e.waitUntil(self.clients.claim())})),self.addEventListener("fetch",(e=>{new URL(e.request.url),self.registration.scope;var t,n;g.strategy.NetworkOrCache?e.respondWith((t=e.request,n=g.timeout,new Promise(((e,a)=>{let r=setTimeout(a,n);fetch(t).then((t=>{clearTimeout(r),e(t)}),a)}))).catch((t=>{console.log(`Error: ${t.message()}`),y(e.request)}))):g.strategy.CacheOnly?e.respondWith(y(e.request)):g.strategy.CacheAndUpdate?(e.respondWith(y(e.request)),e.waitUntil(E(e.request))):g.strategy.CacheUpdateAndRefresh?(e.respondWith(y(e.request)),e.waitUntil(E(e.request).then(v))):e.respondWith(fetch(new Request(e.request,{headers:{"Content-Type":g.contentType(e.request.destination)}})).then((e=>(console.log(),e&&200===e.status&&e.type,e))))})),self.addEventListener("message",(async e=>{e.data.activate&&(g.memory=c(e.data.worker),e.source.postMessage({service:"activate"})),e.data.test&&g.memory.fs.list.dir()}));