import * as Comlink from "comlink";
import isEmpty from './modules/isEmpty/isEmpty.mjs'

let service = {
  state: new Proxy({
    memory: false,
    proxy: false,
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
  }, {
    get: (obj, prop) => {
      // console.log((obj[prop]) ? prop : "process")
      return obj[prop];
    },
    set: (obj, prop, value) => {
      console.log('🎙 >>>', prop, value)
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
        if(isEmpty(obj[prop])){
          obj[prop] = []
        }
        obj[prop] = value;
        return true
      }
    }
  ),
  memory: {
    install: () => {
      return new Promise(async resolve  => {
        const url = new URL('./WORKER.mjs', import.meta.url)
        service.state.worker.memory = new Worker(url, { type: "module" });
        await service.listener.memory()
        service.state.init.memory = new Proxy({},{
          set: (obj, prop, value) => {
            console.log('🎙 >>>', prop, value)
            if(prop === 'install') {
              if(value) {
                if(!isEmpty(service.state.init.proxy.install)) {
                  service.state.init.proxy.memory = true
                }
                const memory = service.memory
                resolve(memory)
              }
            }
            if(isEmpty(obj[prop])){
              obj[prop] = []
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
        service.memory = Comlink.wrap(mainMemoryChannel.port2)
        service.state.worker.memory.postMessage(mainWorker, [mainMemoryChannel.port1]);
        resolve(true)
      })
    }
  },
  proxy: {
    install: () => {
      return new Promise(async resolve  => {
        if ('serviceWorker' in navigator) {
          await service.listener.proxy()
          console.log('📩 service worker will be install')
          let serviceUrl = new URL('./PROXY.mjs', import.meta.url)
          let serviceWorker = await navigator.serviceWorker.register(serviceUrl, { type: "module" })
              .then(function(registration) {
                let serviceWorker;
                if (registration.installing) {
                  serviceWorker = registration.installing;
                } else if (registration.waiting) {
                  serviceWorker = registration.waiting;
                } else if (registration.active) {
                  serviceWorker = registration.active;
                }

                if (serviceWorker) {
                  serviceWorker.addEventListener('statechange', function(e) {
                    if(e.target.state === 'activated') {
                      service.state.isWorkerProxy = true
                    }
                  });
                }
              })

          service.state.init.port = new Proxy({},{
            set: (obj, prop, value) => {
              console.log('🎙 >>>', prop, value)
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
          const port = () => {
            return new Promise(async resolve  => {
              console.log('🥉 service => memory')
              const serviceWorkerChannel = new MessageChannel();
              const workerService = {
                state: {
                  isConnected: true,
                  type: 'proxy-memory',
                  from: {"0": serviceWorkerChannel.port1}
                }
              };
              const serviceWorker = {
                state: {
                  isConnected: true,
                  type: 'proxy-memory',
                  to: {"0": serviceWorkerChannel.port2}
                }
              };
              service.state.worker.memory.postMessage(workerService, [serviceWorkerChannel.port1]);
              navigator.serviceWorker.controller.postMessage(serviceWorker, [serviceWorkerChannel.port2]);
            })
          }

          if(isEmpty(service.state.init.memory.install)) {
            service.state.init.proxy = new Proxy({},{
              set: (obj, prop, value) => {
                console.log('🎙 >>>', prop, value)
                if(prop === 'memory') {
                  if(value) {
                    port().then(port => {})
                  }
                }
                if(isEmpty(obj[prop])){
                  obj[prop] = []
                }
                obj[prop] = value;
                return true
              }
            })
            service.state.init.proxy.install = true
          } else {
            port().then(port => {})
          }
        } catch (e) {
          resolve(false);
        }
      })
    }
  },
  listener: {
    memory: () => {
      return new Promise(async resolve => {
        console.log('🚘 activate memory Listener');

        service.state.worker.memory.onmessageerror = async event => {
          console.log('🌷 web worker onmessageerror', event.data)
        }

        service.state.worker.memory.oncontrollerchange = async event => {
          console.log('🌷 web worker controllerchange', event.data)
        }

        service.state.worker.memory.onmessage = async event => {
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
        console.log('🚘 activate service Listener');

        navigator.serviceWorker.oncontrollerchange = async (event) => {
          console.log('🌼 service worker oncontrollerchange', event);
        };

        navigator.serviceWorker.onmessageerror = async (event) => {
          console.log('🌼 service worker onmessageerror +++', event.data);
        };

        navigator.serviceWorker.onmessage = async (event) => {
          console.log('🌼 service worker onmessage', event.data);
          if(event.data.state['proxy-memory']) {
            service.state.init.port.proxy = true
          }
        };
        navigator.serviceWorker.ready
        .then(async function(registration) {

          // registration.update().then(e => ).catch(e => console.log('error', e));
        })
        resolve(true)
      })
    }
  }
}


export default (PROXY = async () => {},MEMORY = async () => {},  install) => {
  return new Promise(async resolve => {
    let CONFIG = {
      proxy: true,
      memory: true,
      isProxy: false,
      isMemory: false,
    }
    let config = Object.assign(CONFIG, install)
    CONFIG = new Proxy({},{
      set: (obj, prop, value) => {
        console.log('🎙 >>>', prop, value)
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
    if(config.memory) {
      service.memory.install()
          .then(async memory => {MEMORY(memory).catch(e => console.log('error', e)); CONFIG.isMemory = true})
          .catch(e => {console.log('memory error', e)})
    } else {
      MEMORY(true).catch(e => console.log('error', e))
    }
    if(config.proxy) {
      service.proxy.install()
          .then(async proxy => {PROXY(proxy).catch(e => console.log('error', e)); CONFIG.isProxy = true})
          .catch(e => {console.log('proxy error', e)})
    } else {
      PROXY(true).catch(e => console.log('error', e))
    }
  })
}