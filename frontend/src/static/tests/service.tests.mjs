import utils from '/tests/modules/index.mjs'
describe('First SW Test Suite', () => {
    it('should test something', () => {
        return new Promise(async (resolve, reject) => {
            console.log('utils~~~~~~~~~~~',utils )
            // let url = new URL('./test/proxy/sw.mjs', import.meta.url)
            // navigator.serviceWorker.register(url, { type: "module", scope: '/newkind-service'})
            resolve(true)
        })
    });
});


