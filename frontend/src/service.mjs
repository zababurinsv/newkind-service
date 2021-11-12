import * as Comlink from "comlink";

const initWorker = (worker) => {
  return new Promise(async (resolve, reject) => {
    const { port1, port2 } = new MessageChannel();
    const msg = {
      worker: true,
      port: port1,
    };
    worker.postMessage(msg, [port1]);
    const memory = Comlink.wrap(port2)
    resolve(memory);
  })
}

const initService = () => {
  return new Promise(async (resolve, reject) => {
    const { port1, port2 } = new MessageChannel();
    const msg = {
      service: true,
      port: port1,
    };
    navigator.serviceWorker.controller.postMessage(msg, [port1]);
    let service = Comlink.wrap(port2)
    resolve(service);
  })
}

export default () => {
  return new Promise(async (resolve, reject) => {
    let init = {
      db: false,
      fs: false
    }

    const verify = async (type, obj) => {

      (type === 'service')
          ? init.db = obj
          : init.fs = obj
    }

    const activation = async (type, obj) => {
      verify(type, obj)
      if(init.fs && init.db) {
        resolve({db: init.db, fs: init.fs})
      }
    }

    if ('serviceWorker' in navigator) {
      let serviceUrl = new URL('./index.mjs', import.meta.url)
      let workerUrl = new URL('./WORKERFS.mjs', import.meta.url)
      let worker = new Worker(workerUrl, { type: "module" });
      navigator.serviceWorker.register(serviceUrl, { type: "module" });
      navigator.serviceWorker.addEventListener("controllerchange", async (event) => {
        console.log('service init',event)
        const service =  await initService()
        await activation('service', service)
      });
      worker.onmessage = async () => {
        console.log('worker init')
        const memory =  await initWorker(worker)
        await activation('worker', memory)
      }
    } else {
      console.error('serviceWorker not work')
      resolve(false)
    }
  })
}