import * as Comlink from "comlink";
import isEmpty from './modules/isEmpty/isEmpty.mjs'

let memory = (config) => {
    return new Promise(async resolve  => {
        let api = {}
        const url = new URL('./MEMORY.mjs', import.meta.url)
        let memory
        memory = new Worker(url, { type: "module" });

        memory.onmessageerror = async event => {
            console.log('🌷 web worker onmessageerror', event.data)
        }

        memory.oncontrollerchange = async event => {
            console.log('🌷 web worker controllerchange', event.data)
        }

        memory.onmessage = async event => {
            console.log('🌷 web worker onmessage', event.data.state)
            if(event.data.state.install) {
                console.log('🌷 🎫')
                const mainMemoryChannel = new MessageChannel();
                const mainWorker = {
                    state: {
                        isConnected: true,
                        type: 'main-memory',
                        from: {"0": mainMemoryChannel.port1}
                    }
                };
                memory.postMessage(mainWorker, [mainMemoryChannel.port1]);
                api = Comlink.wrap(mainMemoryChannel.port2)
            } else if(event.data.state['main-memory']) {
                console.log('🌷 🎫', event.data.state['main-memory'])
                resolve(api)
            }
        }
    })
}

/**
 * If updatefound is fired, it means that there's
 * a new service worker being installed.
 * You can listen for changes to the installing service worker's
 * state via installingWorker.onstatechange
 * reg.installing; // the installing worker, or undefined
 * reg.waiting; // the waiting worker, or undefined
 * reg.active; // the active worker, or undefined
 * "installing" - the install event has fired, but not yet complete
 * "installed"  - install complete
 * "activating" - the activate event has fired, but not yet complete
 * "activated"  - fully active
 * "redundant"  - discarded. Either failed install, or it's been
 *  replaced by a newer version
 */
let proxy = (config) => {
      return new Promise(async resolve  => {
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
          /**
           * init service worker
           * @returns {Promise<boolean>}
           */
            let init = () => {
                return new Promise(resolve => {
                    try {
                        let url = new URL('./PROXY.mjs', import.meta.url)
                        navigator.serviceWorker.register(url, { type: "module", scope: config.scope})
                            .then(registration => {
                                console.log('💚 Registration succeeded. Scope is ' + registration.scope);
                                registration.addEventListener('updatefound', function() {
                                    console.log('🎈 A new service worker is being installed:');
                                    navigator.serviceWorker.ready.then(async reg => {
                                        resolve(true)
                                    }).catch(e => { console.log('🔼 error', e) })
                                })
                                resolve(true)
                            }).catch(e => { console.log('🔼 error', e) })
                    } catch (e) {
                        console.log('~~~~~~~~~!!!!!!!!!!~~~~~~~~~~', e)
                    }
                })
            }

            if(navigator.serviceWorker.controller) {
                console.log('🎈 controller true')
                    init().then(()=> {
                        resolve(true)
                    }).catch(e => { console.log('🔼 error', e) })
            } else {
                console.log('🎈 controller false')
                navigator.serviceWorker.getRegistrations()
                .then(async Registrations => {
                    if(isEmpty(Registrations[0])) {
                        console.log('🎈 Registration false')
                        init().then(()=> {
                            resolve(true)
                        }).catch(e => { console.log('🔼 error', e) })
                    } else {
                        console.log('🎈 Registration true')
                        let serviceWorker = state(Registrations[0])
                        if(isEmpty(serviceWorker)) {
                           console.log('🎈 неизвестная ошибка', serviceWorker, navigator.serviceWorker)
                            resolve(false)
                        } else {
                            console.log('🎈 serviceWorker', serviceWorker)
                            await navigator.serviceWorker.register(serviceWorker.scriptURL)
                            navigator.serviceWorker.ready.then(async serviceWorkerRegistration => {
                                console.log('🎈 ready true')
                                let serviceWorker = state(serviceWorkerRegistration)
                                await navigator.serviceWorker.register(serviceWorker.scriptURL)
                                resolve(true)
                            })
                        }
                    }
                }).catch(e => { console.log('🔼 error', e) })
            }
      })
}

export default (config, PROXY = () => {}, MEMORY = () => {}, PORT = () => {}) => {
    return new Promise(async resolve => {
        memory(config).then(memory => {
            MEMORY(memory)
            memory = null
        })
        // proxy(config).then(proxy => {
        //     PROXY(proxy)
        //     proxy = null
        // })
    })
}