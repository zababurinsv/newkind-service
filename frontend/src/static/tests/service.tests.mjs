let utils = {}
describe('First SW Test Suite', () => {
    beforeEach(async function(){
        this.timeout(10000);
        utils = (await import('/newkind-service/tests/modules/index.mjs')).default
        return utils.__testCleanup().catch(e => {console.log('%%%%%%%%%%%%%%%%%%%%% !!!!')})
    });

    after(function() {
        // utils = null
        // return utils.__testCleanup();
    });

    it('should test something', () => {
        return new Promise(async (resolve, reject) => {
            resolve()
            // let url = new URL('./proxy/sw.mjs', import.meta.url)
            // navigator.serviceWorker.register(url, { type: "module", scope: '/newkind-service/tests/proxy/'})
            // .then((reg) => {
            //    utils.__waitForSWState(reg, 'installed')
            //        .then(data => {resolve()})
            //        .catch(e => reject(e));
            // })
            // .then(() => {
            // return caches.match('/__test/example')
            //     .then((response) => {
            //         if (!response) {
            //             throw new Error('Eek, no response was found in the cache.');
            //         }
            //
            //         return response.text();
            //     })
            //     .then((responseText) => {
            //         if (responseText !== 'Hello, World!') {
            //             throw new Error(`The response text was wrong!: '${responseText}'`);
            //         }
            //     });
            // })
        })
    });
});


