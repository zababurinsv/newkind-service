import * as Comlink from "comlink";
import isEmpty from './modules/isEmpty/isEmpty.mjs'

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
  PROXY: {
    worker: {
      memory: false,
      proxy: false
    },
    isWorkerMemory: false,
    isWorkerProxy: false,
    init: {
      memory: {
        install: false,
      },
      proxy: {
        install: false,
      },
      port: {
        proxy: false,
        memory: false
      }
    }
  }
}

let service = {
  state: new Proxy(DEFAULT.PROXY, {
    get: (obj, prop) => {
      return obj[prop];
    },
    set: (obj, prop, value) => {
      console.log('🎙 service >>>', prop, value)
        switch (prop) {
          case 'isWorkerMemory':
            if(value)
              service.memory.activate().catch(e => console.log('error memory', e))
            break
          case'isWorkerProxy':
              service.proxy.activate().catch(e => console.log('error proxy', e))
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
    proxy: () => {
      return new Promise(async resolve  => {
        try {
          console.log('🥉 service => memory')
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
          console.log('<< |~~~~~~~~~~~~| >>',{
            'controller': navigator.serviceWorker.controller
          })
          // if(isEmpty(navigator.serviceWorker.controller)) {
          //   navigator.serviceWorker.getRegistrations()
          //     .then(async registrations => {
          //       for(let registration of registrations) {
          //         navigator.serviceWorker.controller = registration.activate
          //         object.memory.self.postMessage(workerService, [serviceWorkerChannel.port1]);
          //         navigator.serviceWorker.controller.postMessage(serviceWorker, [serviceWorkerChannel.port2]);
          //         resolve(true)
          //       }
          //     })
          // } else {
            object.memory.self.postMessage(workerService, [serviceWorkerChannel.port1]);
            navigator.serviceWorker.controller.postMessage(serviceWorker, [serviceWorkerChannel.port2]);
            resolve(true)
          // }

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
        const url = new URL('./WORKER.mjs', import.meta.url)
        object.memory.self = new Worker(url, { type: "module" });
        await service.listener.memory()
        service.state.init.memory = new Proxy({},{
          set: (obj, prop, value) => {
            console.log('🎙 memory >>>', prop, value)
            if(prop === 'install') {
              if(value) {
                if(!isEmpty(service.state.init.proxy.install)) {
                  service.state.init.proxy.memory = true
                }
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
    install: () => {
      return new Promise(async resolve  => {
        if ('serviceWorker' in navigator) {
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
          // navigator.serviceWorker.getRegistrations()
          // .then(async registrations => {
          //   if(isEmpty(registrations)) {
              console.log('📩 service worker will be install')
              let url = new URL('./PROXY.mjs', import.meta.url)
              navigator.serviceWorker.register(url, { type: "module",  scope: './' })
                  .then(registration => {
                    registration.addEventListener('updatefound', function() {
                      // If updatefound is fired, it means that there's
                      // a new service worker being installed.
                      let installingWorker = registration.installing;
                      console.log('A new service worker is being installed:',
                          installingWorker);
                      // You can listen for changes to the installing service worker's
                      // state via installingWorker.onstatechange
                    })
                    let serviceWorker = state(registration)
                    serviceWorker.addEventListener('statechange', () => {
                      console.log('📍 statechange', serviceWorker.state)
                      if( serviceWorker.state === 'activated') {
                        service.state.isWorkerProxy = true
                      }
                    });
                  }).catch(e => console.log('error register', e))
            // } else {
            //   console.log('📩 service worker installed')
            //   for(let registration of registrations) {
            //     let serviceWorker = state(registration)
            //     if(serviceWorker.state === 'activated') {
            //       console.log('📍 init', serviceWorker.state)
            //       service.state.isWorkerProxy = true
            //     } else {
            //       console.log('📍 state', serviceWorker.state)
            //     }
            //     serviceWorker.addEventListener('statechange', () => {
            //       console.log('📍 statechange', serviceWorker, navigator.serviceWorker)
            //       if( serviceWorker.state === 'activated') {
            //         service.state.isWorkerProxy = true
            //       }
            //     });
            //   }
            // }
          // }).catch(e => console.log('error', e))

          service.state.init.port = new Proxy({},{
            set: (obj, prop, value) => {
              console.log('🎙 memory  >>>', prop, value)
              if(prop === 'proxy') {
                if(value) {
                  if(service.state.init.port.memory) {
                    resolve(true)
                  }
                }
              }
              if(prop === 'memory') {
                if(value) {
                  if(service.state.init.port.proxy) {
                    resolve(true)
                  }
                }
              }
              if(isEmpty(obj[prop])){
                obj[prop] = []
              }
              obj[prop] = value;
              return true
            }
          })
        } else {
          console.log('🎈 service worker not found')
          resolve(false)
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
                    service.port.proxy().then(state => {}).catch(e => console.log('error port',e))
                  }
                }
                obj[prop] = value;
                return true
              }
            })
            service.state.init.proxy.install = true
          } else {
            console.log('📐 memory is install', service.state.init.memory.install)
            service.port.proxy().then(state => {}).catch(e => console.log('error port',e))
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
            console.log('📍 activate', event)
            service.state.isWorkerProxy = true
          } else {
            object.controller = event.currentTarget.controller
            event.currentTarget.controller.addEventListener('statechange', (event) => {
              console.log('📍 statechange',  event.currentTarget.state)
              if(event.currentTarget.state === 'activated') {
                service.state.isWorkerProxy = true
              }
            });
          }
        };

        navigator.serviceWorker.onmessageerror = async (event) => {
          console.log('🌼 service worker onmessageerror', event.data);
        };

        navigator.serviceWorker.addEventListener('message', function(event) {
          console.log('🌼 service worker onmessage', event.data);
          if(event.data.state['proxy-memory']) {
            service.state.init.port.proxy = true
          }
        });

        navigator.serviceWorker.ready
        .then(async function(registration) {
          console.log('ready 🎈', registration.active.state)
          service.state.isWorkerProxy = true
        })
        resolve(true)
      })
    }
  }
}


export default (PROXY = () => {}, MEMORY = () => {}) => {
  return new Promise(async resolve => {

    let CONFIG = new Proxy({},{
      set: (obj, prop, value) => {
        console.log('🎙 init >>>', prop, value)
        if(prop === 'isMemory') {
          if(value) {
            if(CONFIG.isProxy) {
              resolve(true)
            }
          }
        }
        if(prop === 'isProxy') {
          if(value) {
            if(CONFIG.isMemory) {
              resolve(true)
            }
          }
        }
        if(isEmpty(obj[prop])){
          obj[prop] = []
        }
        obj[prop] = value;
        return true
      }
    })
    service.memory.install()
        .then(memory => {MEMORY(memory).catch(e => console.log('error', e)); CONFIG.isMemory = true})
        .catch(e => {console.log('memory error', e)})
    service.proxy.install()
        .then(async proxy => {PROXY(proxy).catch(e => console.log('error', e)); CONFIG.isProxy = true})
        .catch(e => {console.log('proxy error', e)})
  })
}