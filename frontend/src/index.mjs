import * as Comlink from "comlink";
import isEmpty from './modules/isEmpty/isEmpty.mjs'
let index = {};
let worker = {};

let init = {
  install: {
    service: false,
    web: false
  },
  activate: {
    service: false,
    web: false,
    memory: false
  }
}

const installVerify = async (type, obj) => {
  return new Promise(resolve => {
    try {
      switch (type) {
        case 'service':
          init.install.service = obj
          break
        case 'worker':
          init.install.web = obj
          break
        default:
          console.warn('неизвестное событие', event.data)
          break
      }
      resolve(true)
    } catch (e) {
      console.log('error', e)
      resolve(false)
    }
  })
}

const activateVerify = async (type, obj) => {
  return new Promise(resolve => {
    try {
      switch (type) {
        case 'service':
          init.activate.service = obj
          break
        case 'worker':
          init.activate.web = obj
          break
        case 'memory':
          init.activate.memory = obj
          break
        default:
          console.warn('неизвестное событие', event.data)
          break
      }
      resolve(true)
    } catch (e) {
      console.log('error', e)
      resolve(false)
    }
  })
}

const verifyServiceWorker = () => {
  return new Promise(async resolve => {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      console.log('🎭 registration service worker', registrations);
      if(isEmpty(registrations)) {
        resolve(false)
      } else {
        for(let registration of registrations) {
          console.log('🎯 service registrations update', registration)
          await registration.update();
        }
        resolve(true)
      }
    } catch (e) {
      console.log('error', e)
      resolve(false)
    }
  })
}

export default (service = true) => {
  return new Promise(async (resolve, reject) => {
    if ('serviceWorker' in navigator && service) {
      const install = async (type, obj) => {
        await installVerify(type, obj)
        if(init.install.web && init.install.service) {
          await port()
        }
      }

      const activate = async (type, obj) => {
        await activateVerify(type, obj)
        if(init.activate.web && init.activate.service && init.activate.memory) {
          let memory = init.activate.memory
          init = {}
          resolve(memory)
        }
      }

      navigator.serviceWorker.addEventListener("controllerchange", async event => {
        console.log('+++ service worker controllerchange +++', event);
        await install('service', true)
      });

      navigator.serviceWorker.addEventListener('message',async event => {
        console.log('+++ service worker message +++', event.data);
        if(event.data.service === 'activate') {
          await activate('service', true)
        }
      });

      const port = () => {
        return new Promise(async (resolve, reject) => {
          try {
            const serviceWorkerChannel = new MessageChannel();
            const mainWorkerChannel = new MessageChannel();

            const workerService = {
              activate: true,
              service: serviceWorkerChannel.port1,
              main: mainWorkerChannel.port1,
            };

            const serviceWorker = {
              activate: true,
              worker: serviceWorkerChannel.port2,
            };

            console.log('🎸 message from port', {
              'worker.postMessage': worker.postMessage,
              'navigator.serviceWorker.controller.postMessage': navigator.serviceWorker.controller.postMessage,
              'navigator.serviceWorker.controller': navigator.serviceWorker.controller
            })
            worker.postMessage(workerService, [serviceWorkerChannel.port1, mainWorkerChannel.port1]);
            navigator.serviceWorker.controller.postMessage(serviceWorker, [serviceWorkerChannel.port2]);
            const memory = Comlink.wrap(mainWorkerChannel.port2)
            await activate('memory', memory)
            resolve(true);
          } catch (e) {
            resolve(false);
          }
        })
      }

      console.log('🎤 init start')
      let serviceWorker = await verifyServiceWorker()
      console.log('👾 service worker state', serviceWorker)
      if(serviceWorker) {
        await install('service', true)
      } else {
        let serviceUrl = new URL('./PROXY.mjs', import.meta.url)
        navigator.serviceWorker.register(serviceUrl, { type: "module" });
      }
      let workerUrl = new URL('./WORKER.mjs', import.meta.url)
      worker = new Worker(workerUrl, { type: "module" });

      worker.onmessage = async event => {
        //console.log('worker incoming 1', event.data.worker)
        switch (event.data.worker) {
          case 'install':
            await install('worker', true)
            break
          case 'activate':
            await activate('worker', true)
            break
          default:
            //console.warn('неизвестное событие', event.data)
            break
        }
      }
    } else {
      //console.log("service worker not installed", 'serviceWorker' in navigator)
      // if ('serviceWorker' in navigator) {
      //   navigator.serviceWorker.getRegistrations().then(function(registrations) {
      //     for(let registration of registrations) {
      //       console.log('terminate', registration)
            // registration.unregister()
          // } })
      // }

      let workerUrl = new URL('./WORKER.mjs', import.meta.url)
      worker = new Worker(workerUrl, { type: "module" });
      let memory = {}
      const port = () => {
        return new Promise(async (resolve, reject) => {
          const mainWorkerChannel = new MessageChannel();
          const mainWorker = {
            main: true,
            port: mainWorkerChannel.port1,
          };
          memory = Comlink.wrap(mainWorkerChannel.port2)
          worker.postMessage(mainWorker, [mainWorkerChannel.port1]);
        })
      }

      worker.onmessage = async event => {
        //console.log('worker incoming 2', event.data.worker)
        switch (event.data.worker) {
          case 'install':
            await port()
            break
          case 'activate':
            resolve(memory)
            break
          default:
            console.warn('неизвестное событие', event.data)
            break
        }
      }
    }
  })
}