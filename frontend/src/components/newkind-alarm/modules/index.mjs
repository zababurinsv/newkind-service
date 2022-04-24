import alarm from "./alarm/index.mjs";
import isEmpty from './isEmpty/isEmpty.mjs'
export default (mount= document.body, props = {}) => {
    return new Promise(async (resolve, reject) => {
        let config = {
            onClick: () => { console.log('dddddddddddddddddddd') },
            change: "default",
            req: {
                status: false,
                init: (call) => {
                    config.req.call = call
                    config.req.status = true
                },
                call: () => {}
            }
        };
        let CONFIG = new Proxy(Object.assign(config, props), {
                get: (obj, prop) => {
                    console.log((obj[prop]) ? prop : "process")
                    return obj[prop];
                },
                set: (obj, prop, value) => {
                    console.log(prop, (obj[prop]) ? value : "process")
                    if(isEmpty(obj[prop])){
                        obj[prop] = []
                    }
                    obj[prop] = value;
                    return true
                }
            }
        )
        alarm(CONFIG, mount)
        resolve(CONFIG)
    })
}