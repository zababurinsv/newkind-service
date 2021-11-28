require('dotenv').config()
let wstun = require("./tunnel/wstun/index.js");
let reverse_client = new wstun.client_reverse();
let wstunHost = 'ws://localhost:5000'
reverse_client.start('5005', wstunHost, '127.0.0.1:8800');