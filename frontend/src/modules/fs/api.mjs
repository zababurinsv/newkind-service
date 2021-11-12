import * as Comlink from "comlink";
import { IDBFS } from './index.mjs'
export default () => {
    return new Promise( async (resolve, reject) => {
        const idbfs = await IDBFS();
        resolve({
            is: {
                file: idbfs.file,
                dir: idbfs.dir
            },
            file: {
                read: idbfs.file.read,
                remove: idbfs.file.remove
            },
            fs: {
                load: idbfs.fs.load,
                save: idbfs.fs.save
            },
            cwd: idbfs.cwd,
            readdir: idbfs.readdir
        })
    })
}