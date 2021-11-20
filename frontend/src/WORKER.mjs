import { WORKERFS, IDBFS} from './modules/fs/index.mjs'
import * as Comlink from "comlink";
(async () => {
    let workerfs = await WORKERFS()
    const idbfs = await IDBFS();
    let list = async (dir) => await workerfs.list.dir(dir)
    let files = async () => await workerfs.list.files()
    let readdir = async (readdir) => await workerfs.readdir(readdir)
    let readFile = async (object) =>  await workerfs.readFile(object.file, object.type)
    let mount = async (files) =>  await workerfs.mount(files)
    let read = async (files, call, highWaterMark = 200, isRelation = true) =>  await workerfs.read(files, call, highWaterMark, isRelation)
    let obj = {
         db:{
             is: {
                 file: idbfs.file,
                 dir: idbfs.dir
             },
             file: {
                 read: idbfs.file.read,
                 remove: idbfs.file.remove
             },
             load: idbfs.fs.load,
             save: idbfs.fs.save,
         },
         fs:{
            list: {
                dir: list,
                files: files
            },
            read: {
                dir: readdir,
                file: readFile,
            },
            write: {
                files: mount,
            },
            stream: {
                img: read
            }
         }
    }
    onmessage = function(event) {
        if (event.data.state.isConnected && event.data.state.type === 'main-memory') {
            console.log('🌷 🎫 main-memory message', event.data.state)
            for(let port in event.data.state.from) {
                Comlink.expose(obj, event.data.state.from[port])
            }
            self.postMessage({
                state: {
                    "main-memory": true
                }
            })
        } else if(event.data.state.isConnected && event.data.state.type === 'proxy-memory') {
            console.log('🌷 🎫 proxy-memory message', event.data.state)
            for(let port in event.data.state.from) {
                Comlink.expose(obj, event.data.state.from[port])
            }
            self.postMessage({
                state: {
                    "proxy-memory": true
                }
            })
        }
    }
    self.postMessage({
        state: {
           install: true
        }
    })
})()