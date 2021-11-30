require('dotenv').config()
let wstun = require("../wstun/index.js");
let reverse_client = new wstun.client_reverse();
// let wstunHost = 'ws://localhost:5000'
let wstunHost = 'wss://tunnel-reverse.herokuapp.com'
let portTunnel = 5005
let address = 8008
let remoteAddr = `127.0.0.1:` + address

console.log({
    wstunHost: wstunHost,
    portTunnel: portTunnel,
    remoteAddr: remoteAddr
})
reverse_client.start(portTunnel, wstunHost, remoteAddr);