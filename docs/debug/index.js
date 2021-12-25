const isEmpty = require('./isEmpty/isEmpty.js')
const c = require('./template-colors-web/index.js')
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
          console.log(c`${stack[pathToFile][id].count} ${pathToFile}.rgb(0,133,255) ${id}.rgbBG(255,255,255)`, isEmpty(args) ? '' :args)
        }

        if(stack[pathToFile][id].self.isAssert) {
          console.assert(false, pathToFile, stack)
        }

        stack[pathToFile][id].init = true

      } else {
        if(stack[pathToFile][id].self.isConsole) {
          console.log(c`${stack[pathToFile][id].count} ${pathToFile}.rgb(0,133,255) ${id}.rgbBG(255,255,255)`, isEmpty(args) ? '' :args)
        }
      }
    } else {
      stack[pathToFile][id].count = stack[pathToFile][id].count + 1
      if(stack[pathToFile][id].count >= stack[pathToFile][id].maxCount) {
        if(stack[pathToFile][id].self.isConsole) {
          console.log(c`${stack[pathToFile][id].count} ${pathToFile}.rgb(0,133,255) ${id}.rgbBG(255,255,255)`, isEmpty(args) ? '' :args)
        }

        if(stack[pathToFile][id].self.isAssert) {
          console.assert(false, pathToFile, stack)
        }
        stack[pathToFile][id].init = true
      } else {

        if(stack[pathToFile][id].self.isConsole) {
          console.log(c`${stack[pathToFile][id].count} ${pathToFile}.rgb(0,133,255) ${id}.rgbBG(255,255,255)`, isEmpty(args) ? '' :args)
        }
      }
    }
    return true
  }
}

module.exports = assert