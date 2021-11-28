import wstun from "./docs/static/html/components/component_modules/client_reverse/client_reverse_server.mjs"

let system = {
    port: process.env.PORT || 5000,
    pid:  process.pid
}


// console.log('__tunnel_server__', system)

// let reverse_server = new wstun.server_reverse();
// reverse_server.start(system.port);