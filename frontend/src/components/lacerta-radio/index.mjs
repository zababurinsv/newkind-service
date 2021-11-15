import modules from './modules/radio/index.mjs'
import preset from './template/index.mjs'

const template = (self) => {
  return new Promise(async (resolve, reject) => {
    let component = {}
    component.this = self
    component.template = (component.this.dataset.preset)
        ? await preset(component.this.dataset.preset)
        : await preset('default')
    component.this.style.width = '100%'
    component.this.attachShadow({mode: 'open'})
    let style = document.createElement('style')
    style.textContent = `${component.template.css}`
    let parser = new DOMParser()
    let body = parser.parseFromString(component.template.html, 'text/html')
    component.this.style.width = "100%"
    component.this.shadowRoot.appendChild(style)
    component.this.shadowRoot.appendChild(body.getElementsByTagName('template')[0].content.cloneNode(true))
    component.this.classList.remove('skeleton-box')
    component.this.innerHTML = ''
    resolve(component)
  })
}

const lacertaRadio =  class extends HTMLElement {
  constructor () {
    super()
    template(this)
      .then(async component => {
        new (await modules())(component)
      })
      .catch(error => {
        console.warn('error', error)
      })
  }
}

try {
  customElements.define('lacerta-radio', lacertaRadio );
} catch (e) {
  console.error('error',e)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for(let registration of registrations) {
        console.log('terminate', registration)
        registration.unregister()
      } })
  }
}


export { lacertaRadio }
