const e=Symbol("Comlink.proxy"),t=Symbol("Comlink.endpoint"),r=Symbol("Comlink.releaseProxy"),o=Symbol("Comlink.thrown"),n=e=>"object"==typeof e&&null!==e||"function"==typeof e,a=new Map([["proxy",{canHandle:t=>n(t)&&t[e],serialize(e){const{port1:t,port2:r}=new MessageChannel;return s(e,t),[r,[r]]},deserialize:e=>(e.start(),c(e))}],["throw",{canHandle:e=>n(e)&&o in e,serialize({value:e}){let t;return t=e instanceof Error?{isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:{isError:!1,value:e},[t,[]]},deserialize(e){if(e.isError)throw Object.assign(new Error(e.value.message),e.value);throw e.value}}]]);function s(t,r=self){r.addEventListener("message",(function n(a){if(!a||!a.data)return;const{id:c,type:l,path:m}=Object.assign({path:[]},a.data),y=(a.data.argumentList||[]).map(u);let v;try{const r=m.slice(0,-1).reduce(((e,t)=>e[t]),t),o=m.reduce(((e,t)=>e[t]),t);switch(l){case"GET":v=o;break;case"SET":r[m.slice(-1)[0]]=u(a.data.value),v=!0;break;case"APPLY":v=o.apply(r,y);break;case"CONSTRUCT":{const t=new o(...y);d=t,v=Object.assign(d,{[e]:!0})}break;case"ENDPOINT":{const{port1:e,port2:r}=new MessageChannel;s(t,r),v=function(e,t){return p.set(e,t),e}(e,[e])}break;case"RELEASE":v=void 0;break;default:return}}catch(e){v={value:e,[o]:0}}var d;Promise.resolve(v).catch((e=>({value:e,[o]:0}))).then((e=>{const[t,o]=g(e);r.postMessage(Object.assign(Object.assign({},t),{id:c}),o),"RELEASE"===l&&(r.removeEventListener("message",n),i(r))}))})),r.start&&r.start()}function i(e){(function(e){return"MessagePort"===e.constructor.name})(e)&&e.close()}function c(e,t){return m(e,[],t)}function l(e){if(e)throw new Error("Proxy has been released and is not useable")}function m(e,o=[],n=function(){}){let a=!1;const s=new Proxy(n,{get(t,n){if(l(a),n===r)return()=>v(e,{type:"RELEASE",path:o.map((e=>e.toString()))}).then((()=>{i(e),a=!0}));if("then"===n){if(0===o.length)return{then:()=>s};const t=v(e,{type:"GET",path:o.map((e=>e.toString()))}).then(u);return t.then.bind(t)}return m(e,[...o,n])},set(t,r,n){l(a);const[s,i]=g(n);return v(e,{type:"SET",path:[...o,r].map((e=>e.toString())),value:s},i).then(u)},apply(r,n,s){l(a);const i=o[o.length-1];if(i===t)return v(e,{type:"ENDPOINT"}).then(u);if("bind"===i)return m(e,o.slice(0,-1));const[c,p]=y(s);return v(e,{type:"APPLY",path:o.map((e=>e.toString())),argumentList:c},p).then(u)},construct(t,r){l(a);const[n,s]=y(r);return v(e,{type:"CONSTRUCT",path:o.map((e=>e.toString())),argumentList:n},s).then(u)}});return s}function y(e){const t=e.map(g);return[t.map((e=>e[0])),(r=t.map((e=>e[1])),Array.prototype.concat.apply([],r))];var r}const p=new WeakMap;function g(e){for(const[t,r]of a)if(r.canHandle(e)){const[o,n]=r.serialize(e);return[{type:"HANDLER",name:t,value:o},n]}return[{type:"RAW",value:e},p.get(e)||[]]}function u(e){switch(e.type){case"HANDLER":return a.get(e.name).deserialize(e.value);case"RAW":return e.value}}function v(e,t,r){return new Promise((o=>{const n=new Array(4).fill(0).map((()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16))).join("-");e.addEventListener("message",(function t(r){r.data&&r.data.id&&r.data.id===n&&(e.removeEventListener("message",t),o(r.data))})),e.start&&e.start(),e.postMessage(Object.assign({id:n},t),r)}))}let d=Object.prototype.hasOwnProperty,f=Object.prototype.toString;var h=function(e){if(null==e)return!0;if("boolean"==typeof e)return!1;if("number"==typeof e)return 0===e;if("string"==typeof e)return 0===e.length;if("function"==typeof e)return 0===e.length;if(Array.isArray(e)){return e instanceof Object?0===Object.keys(e).length:0===e.length}if(e instanceof Error)return""===e.message;if(e.toString==f)switch(e.toString()){case"[object File]":case"[object Map]":case"[object Set]":return 0===e.size;case"[object Object]":for(var t in e)if(d.call(e,t))return!1;return!0}return!1};let w={memory:{self:{},port:{}},proxy:{}},x={state:new Proxy({memory:!1,worker:{memory:!1,proxy:!1},isWorkerMemory:!1,isWorkerProxy:!1,isPort:!1,init:{memory:{install:!1},proxy:{install:!1,activated:!1},port:{proxy:!1,memory:!1}}},{get:(e,t)=>e[t],set:(e,t,r)=>{switch(console.log(`🎙 service:${t}`,r),t){case"isWorkerMemory":r&&x.memory.activate().catch((e=>console.log("error memory",e)));break;case"isWorkerProxy":x.proxy.activate().catch((e=>console.log("error proxy",e)))}return h(e[t])&&(e[t]=[]),e[t]=r,!0}}),port:{install:()=>new Promise((async e=>{try{if(x.state.memory){console.log("🥉 service <=> memory 🥉");let t=new MessageChannel,r={state:{isConnected:!0,type:"proxy-memory",from:{0:t.port1}}},o={state:{isConnected:!0,type:"proxy-memory",to:{0:t.port2}}};w.memory.self.postMessage(r,[t.port1]),navigator.serviceWorker.ready.then((function(e){e.active.postMessage(o,[t.port2])})),e(!0)}else console.log("🥉 not found <= memory 🥉"),e(!0)}catch(t){console.log("port error",t),e(!1)}}))},memory:{install:()=>new Promise((async e=>{const t=new URL("WORKER.ca30691b.js",import.meta.url);w.memory.self=new Worker(t,{type:"module"}),await x.listener.memory(),x.state.init.memory=new Proxy({},{set:(t,r,o)=>{if(console.log(`🎙 memory:${r}-`,o),"install"===r&&o){h(x.state.init.proxy.install)||(x.state.init.proxy.memory=!0),x.state.memory=!0;const t=w.memory.port;e(t)}return t[r]=o,!0}})})),activate:()=>new Promise((async e=>{const t=new MessageChannel,r={state:{isConnected:!0,type:"main-memory",from:{0:t.port1}}};w.memory.port=c(t.port2),w.memory.self.postMessage(r,[t.port1]),e(!0)}))},proxy:{install:()=>new Promise((async e=>{if("serviceWorker"in navigator){x.state.init.proxy=new Proxy({},{set:(t,r,o)=>(console.log(`🎙 proxy:${r}-`,o),"activated"===r&&o&&e(!0),t[r]=o,!0)});const t=e=>{let t;return e.installing?t=e.installing:e.waiting?t=e.waiting:e.active&&(t=e.active),t};await x.listener.proxy(),console.log("📩 service worker will be install");let r=new URL("PROXY.bea300b3.js",import.meta.url);navigator.serviceWorker.register(r,{type:"module",scope:"."}).then((e=>{console.log("Registration succeeded. Scope is "+e.scope),e.addEventListener("updatefound",(function(){t(e);console.log("🎈 A new service worker is being installed:")}))})).catch((e=>console.log("error register",e)))}else console.log("🎈 service worker not found"),x.state.init.proxy.activated||(x.state.init.proxy.activated=!0)})),activate:()=>new Promise((async(e,t)=>{try{x.state.init.memory.install?console.log("📐 memory is install",x.state.init.memory.install):(console.log("📐 memory install",x.state.init.memory.install),x.state.init.proxy=new Proxy({},{set:(e,t,r)=>(console.log("🎙 proxy >>>",t,r),e[t]=r,!0)}),x.state.init.proxy.install=!0),e(!0)}catch(e){console.log("activate proxy",e)}}))},listener:{memory:()=>new Promise((async e=>{console.log("🚘 activate memory Listener"),w.memory.self.onmessageerror=async e=>{console.log("🌷 web worker onmessageerror",e.data)},w.memory.self.oncontrollerchange=async e=>{console.log("🌷 web worker controllerchange",e.data)},w.memory.self.onmessage=async e=>{console.log("🌷 web worker onmessage",e.data.state),e.data.state.install&&(x.state.isWorkerMemory=!0),e.data.state["main-memory"]&&(x.state.init.memory.install=!0),e.data.state["proxy-memory"]&&(x.state.init.port.memory=!0)},e(!0)})),proxy:e=>new Promise((async e=>{console.log("🚘 activate proxy Listener"),navigator.serviceWorker.oncontrollerchange=async t=>{console.log("🌼 service worker oncontrollerchange"),"activate"===t.currentTarget.controller.state?(console.log("🌼 activate",t),x.state.isWorkerProxy=!0):(w.controller=t.currentTarget.controller,t.currentTarget.controller.addEventListener("statechange",(t=>{console.log("🌼 statechange",t.currentTarget.state),"activated"===t.currentTarget.state&&(x.state.isPort=!0,e(!0))})))},navigator.serviceWorker.onmessageerror=async e=>{console.log("🌼 service worker onmessageerror",e.data)},navigator.serviceWorker.onmessage=async e=>{console.log("🌼 service worker onmessage",e.data),e.data.state["proxy-memory"]&&(x.state.init.port.proxy=!0)},navigator.serviceWorker.ready.then((async function(e){console.log("ready 🎈",e.active.state),x.state.init.proxy.activated||(x.state.init.proxy.activated=!0),x.state.isPort=!0})),e(!0)}))}};var b=(e=(()=>{}),t=(()=>{}),r=(()=>{}))=>new Promise((async o=>{let n=new Proxy({resolve:!1,isPort:!1,isProxy:!1,isMemory:!1,activated:{status:!1},proxy:e,memory:t,port:r},{set:(e,t,r)=>(e[t]=r,console.log(`🎙 main:${t}`,r),"isMemory"!==t&&"isProxy"!==t||n.isProxy&&n.isMemory&&(n.isPort=!0),"isPort"===t&&x.port.install().then((e=>{n.port(!0),n.activated=!!e})),"activated"===t&&(n.resolve||(n.resolve=!0,o(r))),!0)});x.memory.install().then((e=>{n.memory(e).catch((e=>console.log("error",e))),n.isMemory=!0})).catch((e=>{console.log("memory error",e)})),x.proxy.install().then((async e=>{n.proxy(e).catch((e=>console.log("error",e))),n.isProxy=!0})).catch((e=>{console.log("proxy error",e)}))}));export{b as default};