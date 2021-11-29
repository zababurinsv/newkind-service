let utils = {}
describe('Service Worker Test Suite', async function() {
    this.timeout(10000);
    beforeEach(async () => {
        utils = (await import('/newkind-service/tests/modules/index.mjs')).default
        await utils.__testCleanup().catch(e => {console.log('%%%%%%%%%%%%%%%%%%%%% !!!!')})
        return true
    });

    after(async () => {
        await utils.__testCleanup();
        utils = null
        return true
    });

    it('should test something', () => {
        return new Promise(async (resolve, reject) => {
            let url = new URL('./proxy/sw.mjs', import.meta.url)
            navigator.serviceWorker.register(url, { type: "module", scope: '/newkind-service/tests/proxy/'})
            .then((reg) => {
               utils.__waitForSWState(reg, 'installed')
                   .then(data => {resolve()})
                   .catch(e => reject(e));
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
                }).catch(e => {reject(e)});
            }).catch(e => {reject(e)})
        })
    });
});


