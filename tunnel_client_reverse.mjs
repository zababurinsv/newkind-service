import dotenv from "dotenv"
import client from './docs/static/html/components/component_modules/client_reverse/client_reverse_server.mjs'
dotenv.config()
client.system().then((system)=>{
  let sys = {
    pid: process.pid,
    port: process.env.PORT || 9876,
    localhost: `localhost:${process.env.PORT || 9876}`,
    wstunHost: process.env.wstunHost_zb || 'ws://tunnel-reverse.herokuapp.com'
  }
  system.start('5005', sys.wstunHost, sys.localhost);
})