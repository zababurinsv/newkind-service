const e=Symbol("Comlink.proxy"),t=Symbol("Comlink.endpoint"),n=Symbol("Comlink.releaseProxy"),a=Symbol("Comlink.thrown"),s=e=>"object"==typeof e&&null!==e||"function"==typeof e,r=new Map([["proxy",{canHandle:t=>s(t)&&t[e],serialize(e){const{port1:t,port2:n}=new MessageChannel;return o(e,t),[n,[n]]},deserialize:e=>(e.start(),c(e))}],["throw",{canHandle:e=>s(e)&&a in e,serialize({value:e}){let t;return t=e instanceof Error?{isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:{isError:!1,value:e},[t,[]]},deserialize(e){if(e.isError)throw Object.assign(new Error(e.value.message),e.value);throw e.value}}]]);function o(t,n=self){n.addEventListener("message",(function s(r){if(!r||!r.data)return;const{id:c,type:l,path:u}=Object.assign({path:[]},r.data),d=(r.data.argumentList||[]).map(f);let m;try{const n=u.slice(0,-1).reduce(((e,t)=>e[t]),t),a=u.reduce(((e,t)=>e[t]),t);switch(l){case"GET":m=a;break;case"SET":n[u.slice(-1)[0]]=f(r.data.value),m=!0;break;case"APPLY":m=a.apply(n,d);break;case"CONSTRUCT":{const t=new a(...d);g=t,m=Object.assign(g,{[e]:!0})}break;case"ENDPOINT":{const{port1:e,port2:n}=new MessageChannel;o(t,n),m=function(e,t){return h.set(e,t),e}(e,[e])}break;case"RELEASE":m=void 0;break;default:return}}catch(e){m={value:e,[a]:0}}var g;Promise.resolve(m).catch((e=>({value:e,[a]:0}))).then((e=>{const[t,a]=p(e);n.postMessage(Object.assign(Object.assign({},t),{id:c}),a),"RELEASE"===l&&(n.removeEventListener("message",s),i(n))}))})),n.start&&n.start()}function i(e){(function(e){return"MessagePort"===e.constructor.name})(e)&&e.close()}function c(e,t){return u(e,[],t)}function l(e){if(e)throw new Error("Proxy has been released and is not useable")}function u(e,a=[],s=function(){}){let r=!1;const o=new Proxy(s,{get(t,s){if(l(r),s===n)return()=>m(e,{type:"RELEASE",path:a.map((e=>e.toString()))}).then((()=>{i(e),r=!0}));if("then"===s){if(0===a.length)return{then:()=>o};const t=m(e,{type:"GET",path:a.map((e=>e.toString()))}).then(f);return t.then.bind(t)}return u(e,[...a,s])},set(t,n,s){l(r);const[o,i]=p(s);return m(e,{type:"SET",path:[...a,n].map((e=>e.toString())),value:o},i).then(f)},apply(n,s,o){l(r);const i=a[a.length-1];if(i===t)return m(e,{type:"ENDPOINT"}).then(f);if("bind"===i)return u(e,a.slice(0,-1));const[c,h]=d(o);return m(e,{type:"APPLY",path:a.map((e=>e.toString())),argumentList:c},h).then(f)},construct(t,n){l(r);const[s,o]=d(n);return m(e,{type:"CONSTRUCT",path:a.map((e=>e.toString())),argumentList:s},o).then(f)}});return o}function d(e){const t=e.map(p);return[t.map((e=>e[0])),(n=t.map((e=>e[1])),Array.prototype.concat.apply([],n))];var n}const h=new WeakMap;function p(e){for(const[t,n]of r)if(n.canHandle(e)){const[a,s]=n.serialize(e);return[{type:"HANDLER",name:t,value:a},s]}return[{type:"RAW",value:e},h.get(e)||[]]}function f(e){switch(e.type){case"HANDLER":return r.get(e.name).deserialize(e.value);case"RAW":return e.value}}function m(e,t,n){return new Promise((a=>{const s=new Array(4).fill(0).map((()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16))).join("-");e.addEventListener("message",(function t(n){n.data&&n.data.id&&n.data.id===s&&(e.removeEventListener("message",t),a(n.data))})),e.start&&e.start(),e.postMessage(Object.assign({id:s},t),n)}))}let g={CACHE:'"@newkind/cache@0.1.0"',URLS:["/"],AllowList:['"@newkind/cache@0.1.0"',"blog-posts-cache-v1"],timeout:0,memory:{},progressIndicatorUrls:"/?requestId=/i;",strategy:{NetworkOrCache:!1,CacheOnly:!1,CacheAndUpdate:!1,CacheUpdateAndRefresh:!1,EmbeddedFallback:!1},contentType:e=>"audio"===e&&"audio/mpeg"};function y(e){return caches.open(g.CACHE).then((t=>t.match(e).then((e=>e||Promise.reject("no-match")))))}function v(e){return caches.open(g.CACHE).then((t=>fetch(e).then((n=>t.put(e,n.clone()).then((()=>n))))))}function E(e){return self.clients.matchAll().then((t=>{t.forEach((t=>{const n={type:"refresh",url:e.url,eTag:e.headers.get("ETag")};t.postMessage(JSON.stringify(n))}))}))}self.addEventListener("install",(e=>{e.waitUntil(self.skipWaiting()),e.waitUntil(caches.open(g.CACHE).then((function(e){return e.addAll(g.URLS)}))),console.log("🖤 service install")})),self.addEventListener("activate",(e=>{e.waitUntil(self.clients.claim()),e.waitUntil(caches.keys().then((function(e){return Promise.all(e.map((function(e){if(-1===g.AllowList.indexOf(e))return caches.delete(e)})))}))),console.log("🖤 service activate")})),self.addEventListener("notificationclick",(function(e){console.log("🖤 service notificationclick",e)})),self.addEventListener("push",(function(e){console.log("🖤 service push",e)})),self.addEventListener("sync",(e=>{console.log("🖤 service sync",e)})),self.addEventListener("fetch",(e=>{var t,n;console.log("🖤 service fetch"),g.strategy.NetworkOrCache?e.respondWith((t=e.request,n=g.timeout,new Promise(((e,a)=>{let s=setTimeout(a,n);fetch(t).then((t=>{clearTimeout(s),e(t)}),a)}))).catch((t=>{y(e.request)}))):g.strategy.CacheOnly?e.respondWith(y(e.request)):g.strategy.CacheAndUpdate?(e.respondWith(y(e.request)),e.waitUntil(v(e.request))):g.strategy.CacheUpdateAndRefresh?(e.respondWith(y(e.request)),e.waitUntil(v(e.request).then(E))):e.respondWith(fetch(new Request(e.request,{headers:{"Content-Type":g.contentType(e.request.destination)}})).then((e=>(e&&200===e.status&&e.type,e))).catch((()=>Promise.resolve(new Response(w,{headers:{"Content-Type":"text/html; charset=utf-8"}})))))})),self.addEventListener("message",(async e=>{if(e.data&&e.data.state&&e.data.state.isConnected&&"proxy-memory"===e.data.state.type){console.log("🌼 🎫 service message",e.data.state);for(let t in e.data.state.to)g.memory=c(e.data.state.to[t]);e.source.postMessage({state:{"proxy-memory":!0}})}else e.data.test&&(await g.memory.fs.list.dir(),e.source.postMessage({state:{"~~~~~ test ~~~~~":!0}}))}));const w='<div>\n    <div>App Title</div>\n    <div>you are offline</div>\n    <img src="/svg/or/base64/of/your/dinosaur" alt="newkind"/>\n</div>';
//# sourceMappingURL=PROXY.df9251d6.js.map
