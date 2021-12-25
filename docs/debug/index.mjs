import isEmpty from './isEmpty/isEmpty.mjs'
import c from './template-colors-web/index.mjs';
let stack = {}
let props = {
  self: {
    isAssert: true,
    isConsole: true
  },
  init: true,
  count: 0,
  maxCount: 0
}


let color = {
  default: {
    pathToFile: {
      color:"rgb(0,133,255)",
      background: 'rgbBG(255,255,255)',
      test: 'rgb(234,188,188)'
    },
    id: {
      color:"rgb(63,146,63)",
      background: 'rgbBG(255,255,255)',
      test: 'rgb(236,188,231)'
    }
  },
  worker: {
    pathToFile: {
      color:"rgb(25,119,241)",
      background: 'rgbBG(184,203,184)',
      test: 'rgb(184,203,184)'
    },
    id: {
      color:"rgb(63,146,63)",
      background: 'rgbBG(255,255,255)',
      test: 'rgb(255,255,255)'
    }
  },
  blockchain: {
    pathToFile: {
      color:"rgb(144,69,169)",
      background: 'rgbBG(232,228,245)',
      test: 'rgb(232,228,245)'
    },
    id: {
      color:"rgb(63,146,63)",
      background: 'rgbBG(255,255,255)',
      test: 'rgb(255,255,255)'
    }
  },
  orbitDb: {
    pathToFile: {
      color:"rgb(144,69,169)",
      background: 'rgbBG(107,164,250)'
    },
    id: {
      color:"rgb(63,146,63)",
      background: 'rgbBG(215,194,255)'
    }
  },
  service: {
    pathToFile: {
      color:"rgb(144,69,169)",
      background: 'rgbBG(107,164,250)'
    },
    id: {
      color:"rgb(63,146,63)",
      background: 'rgbBG(215,194,255)'
    }
  },
}

c.define('control-defaultPathToFile', [color.default.pathToFile.color, color.default.pathToFile.background, 'bold', 'italic']);
c.define('control-defaultId', [color.default.id.color, color.default.id.background, 'bold', 'italic']);
c.define('control-blockchainPathToFile', [color.blockchain.pathToFile.color, color.blockchain.pathToFile.background, 'bold', 'italic']);
c.define('control-blockchainId', [color.blockchain.id.color, color.blockchain.id.background, 'bold', 'italic']);
c.define('control-workerPathToFile', [color.worker.pathToFile.color, color.worker.pathToFile.background, 'bold', 'italic']);
c.define('control-workerId', [color.worker.id.color, color.worker.id.background, 'bold', 'italic']);
c.define('control-orbitDbPathToFile', [color.worker.pathToFile.color, color.worker.pathToFile.background, 'bold', 'italic']);
c.define('control-orbitDbId', [color.worker.id.color, color.worker.id.background, 'bold', 'italic']);
c.define('control-servicePathToFile', [color.worker.pathToFile.color, color.worker.pathToFile.background, 'bold', 'italic']);
c.define('control-serviceId', [color.worker.id.color, color.worker.id.background, 'bold', 'italic']);


let preset = (type, pathToFile,id) => {
  switch (type) {
    case -5:
      stack[`${pathToFile}`][`${id}`].maxCount = 100
      stack[`${pathToFile}`][`${id}`].self.isAssert = false
      break
    case -4:
      stack[`${pathToFile}`][`${id}`].maxCount = 100
      stack[`${pathToFile}`][`${id}`].self.isAssert = false
      break
    case -3:
      stack[`${pathToFile}`][`${id}`].maxCount = 100
      stack[`${pathToFile}`][`${id}`].self.isAssert = false
      break
    case -2:
      stack[`${pathToFile}`][`${id}`].maxCount = 100
      stack[`${pathToFile}`][`${id}`].self.isAssert = false
      break
    case -1:
      stack[`${pathToFile}`][`${id}`].maxCount = 100
      stack[`${pathToFile}`][`${id}`].self.isAssert = false
      break
    default:
      break
  }
  return true
}

const print = (type, count, pathToFile, id, args) => {
  switch (type) {
    case -5:
      console.log(c`${count} ${pathToFile}.blockchainPathToFile ${id}.blockchainId`, isEmpty(args) ? '' :args)
      break
    case -4:
      console.log(c`${count} ${pathToFile}.blockchainPathToFile ${id}.blockchainId`, isEmpty(args) ? '' :args)
      break
    case -3:
      console.log(c`${count} ${pathToFile}.blockchainPathToFile ${id}.blockchainId`, isEmpty(args) ? '':args)
      break
    case -2:
      console.log(c`${count} ${pathToFile}.workerPathToFile ${id}.workerId`, isEmpty(args) ? '' :args)
      break
    case -1:
      console.log(c`${count} ${pathToFile}.defaultPathToFile ${id}.defaultId`, isEmpty(args) ? '' :args)
      break
    default:
      break
  }
  return true
}

let assert = {
  assert: (maxCount,  pathToFile = "", id = "default", args) => {
    if(isEmpty(stack[`${pathToFile}`])) {
      stack[`${pathToFile}`] = {}
      if(isEmpty(stack[pathToFile][id])) {
        stack[pathToFile][id] = Object.assign({}, props)
      }
    } else {
      if(isEmpty(stack[pathToFile][id])) {
        stack[pathToFile][id] = Object.assign({}, props)
      }
    }
    if(stack[pathToFile][id].init) {
      stack[pathToFile][id].maxCount = maxCount
      stack[pathToFile][id].count = 1
      stack[pathToFile][id].init = false
      preset(maxCount, pathToFile, id)
      if(stack[pathToFile][id].maxCount === 0){
        if(stack[pathToFile][id].self.isConsole) {
          print(maxCount, stack[pathToFile][id].count, pathToFile, id, args)
        }

        if(stack[pathToFile][id].self.isAssert) {
          console.assert(false, pathToFile, stack)
        }

        stack[pathToFile][id].init = true

      } else {
        if(stack[pathToFile][id].self.isConsole) {
          print(maxCount, stack[pathToFile][id].count, pathToFile, id, args)
        }
      }
    } else {
      stack[pathToFile][id].count = stack[pathToFile][id].count + 1
      if(stack[pathToFile][id].count >= stack[pathToFile][id].maxCount) {
        if(stack[pathToFile][id].self.isConsole) {
          print(maxCount, stack[pathToFile][id].count, pathToFile, id, args)
        }

        if(stack[pathToFile][id].self.isAssert) {
          console.assert(false, pathToFile, stack)
        }
        stack[pathToFile][id].init = true
      } else {

        if(stack[pathToFile][id].self.isConsole) {
          print(maxCount, stack[pathToFile][id].count, pathToFile, id, args)
        }
      }
    }
    return true
  }
}
export default assert