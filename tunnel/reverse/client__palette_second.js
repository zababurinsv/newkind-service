require('dotenv').config()
let wstun = require("../wstun/index.js");
let pkg = require("../../package.json");
let reverse_client = new wstun.client_reverse();
let wstunHost = pkg.palette.zb.wstunHost
let portTunnel = 5007
let address = 4518
let remoteAddr = `127.0.0.1:` + address

console.log({
    wstunHost: wstunHost,
    portTunnel: portTunnel,
    remoteAddr: remoteAddr
})
reverse_client.start(portTunnel, wstunHost, remoteAddr);