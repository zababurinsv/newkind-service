import templateDefaultCss from './default/index.css.mjs'
import templateDefaultHtml from './default/index.html.mjs'
export default (type) => {
    let template = {}
    template.default = {
        shadow: templateDefaultCss(),
        light: templateDefaultHtml()
    }
    return (template[`${type}`]) ? template[`${type}`] : (console.warn('type not found: ',`${type}`,'Set default'), template[`default`])
}