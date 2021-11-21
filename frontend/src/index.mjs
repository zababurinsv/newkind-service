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
let state = {
    memory: false,
    proxy: () => {
        return new Promise(async resolve  => {
            navigator.serviceWorker.oncontrollerchange = async (event) => {
                console.log('🌼 service worker oncontrollerchange');
                if( event.currentTarget.controller.state === 'activate') {
                    console.log('🌼 activate', event)
                } else {
                    event.currentTarget.controller.addEventListener('statechange', (event) => {
                        console.log('🌼 statechange',  event.currentTarget.state)
                        if(event.currentTarget.state === 'activated') {
                            console.log('🌼 activate', event)
                        }
                    });
                }
            };
        })
    },
    connect: () => {


    }
}

let memory = (config) => {
    return new Promise(async resolve  => {
        let api = {}
        const url = new URL('./MEMORY.mjs', import.meta.url)
        state.memory = new Worker(url, { type: "module" });

        state.memory.onmessageerror = async event => {
            console.log('🌷 web worker onmessageerror', event.data)
        }

        state.memory.oncontrollerchange = async event => {
            console.log('🌷 web worker controllerchange', event.data)
        }

        state.memory.onmessage = async event => {
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
                state.memory.postMessage(mainWorker, [mainMemoryChannel.port1]);
                api = Comlink.wrap(mainMemoryChannel.port2)
            } else if(event.data.state['main-memory']) {
                console.log('🌷 🎫', event.data.state['main-memory'])
                resolve(api)
            }
        }
    })
}

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
            let init = () => {
                return new Promise(resolve => {
                    try {
                        let url = new URL('./PROXY.mjs', import.meta.url)
                        navigator.serviceWorker.register(url, { type: "module", scope: '/newkind-service/'})
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
                    }catch (e) {
                        console.log('~~~~~~~~~!!!!!!!!!!~~~~~~~~~~', e)
                    }
                })
            }
            if(navigator.serviceWorker.controller) {
                console.log('🎈 service worker is run')
                    init().then(()=> {
                        resolve(true)
                    }).catch(e => { console.log('🔼 error', e) })
            } else {
                console.log('🎈 controller false')
                navigator.serviceWorker.getRegistration().then(async reg => {
                    if(isEmpty(reg)) {
                        init().then(()=> {
                            resolve(true)
                        }).catch(e => { console.log('🔼 error', e) })
                    } else {
                        let serviceWorker = state(reg)
                        if(isEmpty(serviceWorker)) {
                           console.log('🎈 неизвестная ошибка', serviceWorker, navigator.serviceWorker)
                            resolve(false)
                        } else {
                            navigator.serviceWorker.ready.then(async serviceWorkerRegistration => {
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
        let initProxy = async () => {
                if(config.isProxy) {
                    state.proxy().then(state => { }).catch(e => console.log('error', e))
                    PROXY(await proxy({ scope: config.scope }))
                    proxy = null
                    return true
                } else {
                    return true
                }
        }
        let initMemory = async () => {
            MEMORY(await memory(config))
            memory = null
            return true
        }
        initProxy().then(status => { initProxy = null })
        initMemory().then(status => { initMemory = null })
        // resolve(true)
    })
}