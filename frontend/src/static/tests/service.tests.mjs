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
};

window.__testCleanup = () => {
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
};

window.__waitForSWState = (registration, desiredState) => {
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

describe('First SW Test Suite', function() {
    it('should test something', function() {

    });
});

describe('Service Worker Suite', function() {

    beforeEach(function() {
        return window.__testCleanup();
    });

    after(function() {
        return window.__testCleanup();
    });

    it('should run PROXY.mjs unit tests', function() {
        return navigator.serviceWorker.register('/test/sw/sw-unit-tests.js')
            .then((reg) => {
                return window.__waitForSWState(reg, 'activated');
            });
    });

    it('should register a service worker and cache file on install', function() {
        // Mocha can handle promises, so as long as the promise doesn’t reject
        // this test will pass.
        return navigator.serviceWorker.register('/test/static/my-first-sw.js')
            .then((reg) => {
                return window.__waitForSWState(reg, 'installed');
            })
            .then(() => {
                return caches.match('/__test/example')
                    .then((response) => {
                        if (!response) {
                            throw new Error('Eek, no response was found in the cache.');
                        }

                        return response.text();
                    })
                    .then((responseText) => {
                        if (responseText !== 'Hello, World!') {
                            throw new Error(`The response text was wrong!: '${responseText}'`);
                        }
                    });
            });
    });


});