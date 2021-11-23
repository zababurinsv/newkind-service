import modules from './modules/index.mjs'
import {Index} from "../lacerta-radio/index.mjs";



const template = async (self, props = {}) => {
  return new Promise(async (resolve, reject) => {
    let component = {}
    component.this = self
    component.this.style.width = '100%'
    component.this.attachShadow({mode: 'open'})
    component.props = await modules(component.this.shadowRoot, props)
    component.this.classList.remove('skeleton-box')
    component.this.innerHTML = ''
    resolve(component)
  })
}

const newkindAlarm =  class extends HTMLElement {
  constructor () {
    super()
    template(this)
      .then(component => {
        console.log('component', component)
      })
      .catch(error => {
        console.warn('error', error)
      })
  }
}

try {
  customElements.define('newkind-alarm', newkindAlarm );
} catch (e) {
  console.error('error',e)
  /*
   if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for(let registration of registrations) {
        console.log('terminate', registration)
        registration.unregister()
      } })
  }
   */
}

export default newkindAlarm
