import matcher from '/static/html/components/component_modules/matcher/matcher.mjs'
import colorLog from '/static/html/components/component_modules/colorLog/colorLog.mjs'
import isEmpty from '/static/html/components/component_modules/isEmpty/isEmpty.mjs'

let upload = {}
const init = (obj) => {
  return new Promise( async resolve => {

    if (obj['this'].querySelector('#drop-area')) {
      upload['dropArea'] = obj['this'].querySelector('#drop-area')
    } else {
      if (!obj['this'].shadowRoot.querySelector('#drop-area')) {
        console.assert(false, 'нет элемента #drop-area', obj['this'])
      } else {
        upload['dropArea'] = obj['this'].shadowRoot.querySelector('#drop-area')
      }
    }

    if (obj['this'].querySelector('progress')) {
      upload['progress'] = obj['this'].querySelector('progress')
    } else {
      if (!obj['this'].shadowRoot.querySelector('progress')) {
        console.assert(false, 'нет элемента #progress', obj['this'])
      } else {
        upload['progress'] = obj['this'].shadowRoot.querySelector('progress')
      }
    }
    if (obj['this'].querySelector('#fileElem')) {
      upload['handleFiles'] = obj['this'].querySelector('#fileElem')
    } else {
      if (!obj['this'].shadowRoot.querySelector('#fileElem')) {
        console.assert(false, 'нет элемента .upload', obj['this'])
      } else {
        upload['handleFiles'] = obj['this'].shadowRoot.querySelector('#fileElem')
      }
    }
    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      upload['dropArea'].addEventListener(eventName, preventDefaults, false)
      upload['dropArea'].addEventListener(eventName, preventDefaults, false)
    })
    ;['dragenter', 'dragover'].forEach(eventName => {
      upload['dropArea'].addEventListener(eventName, highlight, false)
    })
    ;['dragleave', 'drop'].forEach(eventName => {
      upload['dropArea'].addEventListener(eventName, unhighlight, false)
    })
    upload['dropArea'].addEventListener('drop', handleDrop, false)

    upload['staticProperty'][`${obj['slot']}`] = upload
    function preventDefaults (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    function highlight (e) {
      upload['dropArea'].classList.add('highlight')
    }

    function unhighlight (e) {
      upload['dropArea'].classList.remove('active')
    }
    function handleDrop (e) {
      console.log('~~~handleDrop~~~')
      // var dt = e.dataTransfer
      // var files = dt.files
      // upload['func']['handleFiles'](files)
    }
    upload['handleFiles'].onchange = function (files) {
      uploadFile(files['target']['files'][0], obj)
      // files = [...files['target']['files']]
      //   console.log('333333333333333333', files)
      // initializeProgress(files.length)
      // files.forEach(uploadFile)
      // files.forEach(previewFile)
    }

    function uploadFile (file, obj) {
      let name = {}
      if (!obj['this'].hasAttribute('parent')) {
        name = obj['this'].slot
      } else {
        name = obj['this'].getAttribute('parent')
      }
      let uploadEvent = new CustomEvent('uploadEvent', {
        detail: {
          obj: name,
          file: file,
          from: 'varan-upload'
        }
      })
      colorLog('[()]   uploadEvent','blue',uploadEvent)
      document.dispatchEvent(uploadEvent)
    }
    resolve(obj)
  })
}

const crop = () => {
  return new Promise( async resolve => {
    matcher['database']['request']['functions']['getObject'](obj)
      .then((obj) => {
        if (!obj['get']) {
          resolve(obj)
        } else {
          colorLog(`~~~~~~~~a.upload['getObject']  ${obj}`, 'tomato', obj)
          resolve(obj)
          // pagination['init'](obj)
          // pagination['action'](obj)
        }
      })
  })
}

export default  {
  init: init,
  crop: crop
}

