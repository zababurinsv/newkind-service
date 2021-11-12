import { WORKERFS } from './modules/fs/index.mjs'
import * as Comlink from "comlink";
(async () => {
    let workerfs = await WORKERFS()
    let list = async (dir) => await workerfs.list.dir(dir)
    let files = async () => await workerfs.list.files()
    let readdir = async (readdir) => await workerfs.readdir(readdir)
    let readFile = async (object) =>  await workerfs.readFile(object.file, object.type)
    let mount = async (files) =>  await workerfs.mount(files)
    let read = async (files, call, highWaterMark = 200, isRelation = true) =>  await workerfs.read(files, call, highWaterMark, isRelation)
    let obj = {
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

    self.postMessage({worker: "install"})
    onmessage = function(event) {
        if (event.data.worker) {
            Comlink.expose(obj, event.data.port)
            return;
        }
    }
})()