const sendMessage = (serviceWorker, message) => {
    return new Promise(function(resolve, reject) {
        const messageChannel = new MessageChannel();
        messageChannel.port1.onmessage = function(event) {
            if (event.data.error) {
                reject(event.data.error);
            } else {
                resolve(event.data);
            }
        };

        serviceWorker.postMessage(message, [messageChannel.port2]);
    });
}

const __testCleanup = () => {
    const unregisterSW = () => {
        return navigator.serviceWorker.getRegistrations()
            .then((registrations) => {
                const unregisterPromise = registrations.map((registration) => {
                    return registration.unregister();
                });
                return Promise.all(unregisterPromise);
            });
    };

    const clearCaches = () => {
        return window.caches.keys()
            .then((cacheNames) => {
                return Promise.all(cacheNames.map((cacheName) => {
                    return window.caches.delete(cacheName);
                }));
            });
    };

    return Promise.all([
        unregisterSW(),
        clearCaches(),
    ]);
}


const __waitForSWState = (registration, desiredState) => {
    return new Promise((resolve, reject) => {
        let serviceWorker = registration.installing;

        if (!serviceWorker) {
            return reject(new Error('The service worker is not installing. ' +
                'Is the test environment clean?'));
        }

        const stateListener = (evt) => {
            if (evt.target.state === desiredState) {
                serviceWorker.removeEventListener('statechange', stateListener);
                return resolve();
            }

            if (evt.target.state === 'redundant') {
                serviceWorker.removeEventListener('statechange', stateListener);

                return reject(new Error('Installing service worker became redundant'));
            }
        };

        serviceWorker.addEventListener('statechange', stateListener);
    });
}

export default {
    sendMessage: sendMessage,
    __testCleanup: __testCleanup,
    __waitForSWState: __waitForSWState
}