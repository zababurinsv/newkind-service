import { crc32 } from './crc/crc32.mjs'
function concat(arrays) {
    return new Promise((resolve, reject) => {
        let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);
        if (!arrays.length) return null;
        let result = new Uint8Array(totalLength);
        let length = 0;
        for(let array of arrays) {
            result.set(array, length);
            length += array.length;
        }
        return resolve(result);
    })
}

export default () => {
    return {
        concat: concat,
        crc32: crc32
    }
}