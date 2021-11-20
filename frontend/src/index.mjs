import * as Comlink from "comlink";
import isEmpty from './modules/isEmpty/isEmpty.mjs'

// If updatefound is fired, it means that there's
// a new service worker being installed.
// You can listen for changes to the installing service worker's
// state via installingWorker.onstatechange
// reg.installing; // the installing worker, or undefined
// reg.waiting; // the waiting worker, or undefined
// reg.active; // the active worker, or undefined
// "installing" - the install event has fired, but not yet complete
// "installed"  - install complete
// "activating" - the activate event has fired, but not yet complete
// "activated"  - fully active
// "redundant"  - discarded. Either failed install, or it's been
//                replaced by a newer version

const unregistered = () => {
  window.onbeforeunload = function () {
     if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
          for(let registration of registrations) {
              console.log('terminate', registration)
              registration.unregister()
          } })
      }
  };
}

let object = {
  memory: {
    self: {},
    port: {}
  },
  proxy: {},
}

let DEFAULT = {
  SERVICE: {
    memory: false,
    worker: {
      memory: false,
      proxy: false
    },
    isWorkerMemory: false,
    isWorkerProxy: false,
    isPort: false,
    init: {
      memory: {
        install: false,
      },
      proxy: {
        install: false,
        activated: false
      },
      port: {
        proxy: false,
        memory: false
      }
    }
  }
}

let service = {
  state: new Proxy(DEFAULT.SERVICE, {
    get: (obj, prop) => {
      return obj[prop];
    },
    set: (obj, prop, value) => {
      console.log(`🎙 service:${prop}`, value)
        switch (prop) {
          case 'isWorkerMemory':
            if(value)
              service.memory.activate().catch(e => console.log('error memory', e))
            break
          case'isWorkerProxy':
              service.proxy.activate().catch(e => console.log('error proxy', e))
            break
          case 'isPort':
              // service.port.install().catch(e => console.log('error proxy', e))
            break
          default:
            break
        }
        if(isEmpty(obj[prop])) {
          obj[prop] = []
        }
        obj[prop] = value;
        return true
      }
    }
  ),
  port:{
    install: () => {
      return new Promise(async resolve  => {
        try {
          if(service.state.memory) {
            console.log('🥉 service <=> memory 🥉')

            let serviceWorkerChannel = new MessageChannel();
            let workerService = {
              state: {
                isConnected: true,
                type: 'proxy-memory',
                from: {"0": serviceWorkerChannel.port1}
              }
            };
            let serviceWorker = {
              state: {
                isConnected: true,
                type: 'proxy-memory',
                to: {"0": serviceWorkerChannel.port2}
              }
            };
            object.memory.self.postMessage(workerService, [serviceWorkerChannel.port1]);
            navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
              serviceWorkerRegistration.active.postMessage(serviceWorker, [serviceWorkerChannel.port2]);
            })

            resolve(true)
          } else {
            console.log('🥉 not found <= memory 🥉')
            resolve(true)
          }
        } catch (e) {
          console.log('port error', e)
          resolve(false)
        }
      })
    }
  },
  memory: {
    install: () => {
      return new Promise(async resolve  => {
        const url = new URL('./MEMORY.mjs', import.meta.url)
        object.memory.self = new Worker(url, { type: "module" });
        await service.listener.memory()
        service.state.init.memory = new Proxy({},{
          set: (obj, prop, value) => {
            console.log(`🎙 memory:${prop}`, value)
            if(prop === 'install') {
              if(value) {
                if(!isEmpty(service.state.init.proxy.install)) {
                  service.state.init.proxy.memory = true
                }
                service.state.memory = true
                const memory = object.memory.port
                resolve(memory)
              }
            }
            obj[prop] = value;
            return true
          }
        })
      })
    },
    activate: () => {
      return new Promise(async resolve  => {
        const mainMemoryChannel = new MessageChannel();
        const mainWorker = {
          state: {
            isConnected: true,
            type: 'main-memory',
            from: {"0": mainMemoryChannel.port1}
          }
        };
        object.memory.port = Comlink.wrap(mainMemoryChannel.port2)
        object.memory.self.postMessage(mainWorker, [mainMemoryChannel.port1]);
        resolve(true)
      })
    }
  },
  proxy: {
    install: (config = {}) => {
      return new Promise(async resolve  => {
        if ('serviceWorker' in navigator) {
          service.state.init.proxy = new Proxy({},{
            set: (obj, prop, value) => {
              console.log(`🎙 proxy:${prop}-`,  value)
              if(prop === 'activated') {
                if(value) {
                  resolve(true)
                }
              }
              obj[prop] = value;
              return true
            }
          })
          const state = (registration) => {
              let serviceWorker;
              if (registration.installing) {
                serviceWorker = registration.installing;
              } else if (registration.waiting) {
                serviceWorker = registration.waiting;
              } else if (registration.active) {
                serviceWorker = registration.active;
              }
              return serviceWorker
          }
          await service.listener.proxy()
            console.log('📩 service worker will be install')
            let url = new URL('./PROXY.mjs', import.meta.url)
            navigator.serviceWorker.register(url, { type: "module"})
              .then(registration => {
                console.log('Registration succeeded. Scope is ' + registration.scope);
                registration.addEventListener('updatefound', function() {
                  let serviceWorker = state(registration)
                  console.log('🎈 A new service worker is being installed:');
                })
              }).catch(e => console.log('error register', e))
        } else {
          console.log('🎈 service worker not found')
          if(!service.state.init.proxy.activated) {
            service.state.init.proxy.activated = true
          }
        }
      })
    },
    activate: () => {
      return new Promise(async (resolve, reject) => {
        try {
          if(!service.state.init.memory.install) {
            console.log('📐 memory install', service.state.init.memory.install)
            service.state.init.proxy = new Proxy({},{
              set: (obj, prop, value) => {
                console.log('🎙 proxy >>>', prop, value)
                if(prop === 'memory') {
                  if(value) {
                    // service.port.proxy().then(state => {}).catch(e => console.log('error port',e))
                  }
                }
                obj[prop] = value;
                return true
              }
            })
            service.state.init.proxy.install = true
          } else {
            console.log('📐 memory is install', service.state.init.memory.install)
            // service.port.proxy().then(state => {}).catch(e => console.log('error port',e))
          }
          resolve(true)
        } catch (e) {
          console.log('activate proxy', e)
        }
      })
    }
  },
  listener: {
    memory: () => {
      return new Promise(async resolve => {
        console.log('🚘 activate memory Listener');

        object.memory.self.onmessageerror = async event => {
          console.log('🌷 web worker onmessageerror', event.data)
        }

        object.memory.self.oncontrollerchange = async event => {
          console.log('🌷 web worker controllerchange', event.data)
        }

        object.memory.self.onmessage = async event => {
          console.log('🌷 web worker onmessage', event.data.state)
          if(event.data.state.install) {
            service.state.isWorkerMemory = true
          }
          if(event.data.state['main-memory']) {
            service.state.init.memory.install = true
          }
          if(event.data.state['proxy-memory']) {
            service.state.init.port.memory = true
          }
        }
        resolve(true)
      })
    },
    proxy: (ServiceWorker) => {
      return new Promise(async resolve => {
        console.log('🚘 activate proxy Listener');
        navigator.serviceWorker.oncontrollerchange = async (event) => {
          console.log('🌼 service worker oncontrollerchange', );
          if( event.currentTarget.controller.state === 'activate') {
            console.log('🌼 activate', event)
            service.state.isWorkerProxy = true
          } else {
            object.controller = event.currentTarget.controller
            event.currentTarget.controller.addEventListener('statechange', (event) => {
              console.log('🌼 statechange',  event.currentTarget.state)
              if(event.currentTarget.state === 'activated') {
                service.state.isPort = true
                resolve(true)
                // service.state.isWorkerProxy = true
              }

            });
          }
        };

        navigator.serviceWorker.onmessageerror = async (event) => {
          console.log('🌼 service worker onmessageerror', event.data);
        };

        navigator.serviceWorker.onmessage = async (event) => {
          console.log('🌼 service worker onmessage', event.data);
          if(event.data.state['proxy-memory']) {
            service.state.init.port.proxy = true
          }
        };

        navigator.serviceWorker.ready
          .then(async function(registration) {
            console.log('ready 🎈', registration.active.state)
            if(!service.state.init.proxy.activated) {
              service.state.init.proxy.activated = true
            }
            service.state.isPort = true
            // service.state.isWorkerProxy = true
          })
        resolve(true)
      })
    }
  }
}

export default (config, PROXY = () => {}, MEMORY = () => {}, PORT = () => {}) => {
  return new Promise(async resolve => {
    let MAIN = new Proxy({
      resolve: false,
      isPort: false,
      isProxy: false,
      isMemory: false,
      activated: {
        status: false
      },
      proxy: PROXY,
      memory: MEMORY,
      port: PORT
    },{
      set: (obj, prop, value) => {
        obj[prop] = value;
        console.log(`🎙 main:${prop}`, value)
        if(prop === 'isMemory' || prop === 'isProxy') {
          if(MAIN.isProxy && MAIN.isMemory) {
            MAIN.isPort = true
          }
        }

        if(prop === 'isPort') {
          service.port.install()
            .then(status => { MAIN.port(true); (status)? MAIN.activated = true: MAIN.activated = false })
        }
        if(prop === 'activated') {
          if(!MAIN.resolve) {
            MAIN.resolve = true
            resolve(value)
          }
        }
        return true
      }
    })
    service.memory.install()
        .then(memory => {MAIN.memory(memory).catch(e => console.log('error', e)); MAIN.isMemory = true})
        .catch(e => {console.log('memory error', e)})
    service.proxy.install({
      scope: MAIN.scope
    })
    .then(async proxy => {MAIN.proxy(proxy).catch(e => console.log('error', e)); MAIN.isProxy = true})
    .catch(e => {console.log('proxy error', e)})
  })
}