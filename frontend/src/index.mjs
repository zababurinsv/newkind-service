import * as Comlink from "comlink";

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
  return true
}

const activateVerify = async (type, obj) => {
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
}

export default () => {
  return new Promise(async (resolve, reject) => {
    if ('serviceWorker' in navigator) {
      const install = async (type, obj) => {
        installVerify(type, obj)
        if(init.install.web && init.install.service) {
          await port()
        }
      }

      const activate = async (type, obj) => {
        activateVerify(type, obj)
        if(init.activate.web && init.activate.service && init.activate.memory) {
          let memory = init.activate.memory
          init = {}
          resolve(memory)
        }
      }

      const port = () => {
        return new Promise(async (resolve, reject) => {
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

          worker.postMessage(workerService, [serviceWorkerChannel.port1, mainWorkerChannel.port1]);
          navigator.serviceWorker.controller.postMessage(serviceWorker, [serviceWorkerChannel.port2]);
          const memory = Comlink.wrap(mainWorkerChannel.port2)
          await activate('memory', memory)
          resolve(true);
        })
      }

      let serviceUrl = new URL('./PROXY.mjs', import.meta.url)
      let workerUrl = new URL('./WORKER.mjs', import.meta.url)

      worker = new Worker(workerUrl, { type: "module" });
      navigator.serviceWorker.register(serviceUrl, { type: "module" });

      navigator.serviceWorker.addEventListener("controllerchange", async event => await install('service', true));

      navigator.serviceWorker.addEventListener('message',async event => {
        console.log('service incoming', event.data.service);
        switch (event.data.service) {
          case 'activate':
            await activate('service', true)
            break
          default:
            console.warn('неизвестное событие', event.data)
            break
        }
      });

      worker.onmessage = async event => {
        console.log('event worker', event.data.worker)
        switch (event.data.worker) {
          case 'install':
            await install('worker', true)
            break
          case 'activate':
            await activate('worker', true)
            break
          default:
            console.warn('неизвестное событие', event.data)
            break
        }
      }
    } else {
      console.error('serviceWorker not work')
      let workerUrl = new URL('./WORKER.mjs', import.meta.url)
      worker = new Worker(workerUrl, { type: "module" });
      let memory = Comlink.wrap(worker);
      resolve(memory)
    }
  })
}