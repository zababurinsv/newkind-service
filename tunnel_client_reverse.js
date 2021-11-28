require('dotenv').config()
let wstun = require("./tunnel/wstun/index.js");
let reverse_client = new wstun.client_reverse();
let wstunHost = 'ws://tunnel-reverse.herokuapp.com'
reverse_client.start('5005', wstunHost, 'localhost:4518');