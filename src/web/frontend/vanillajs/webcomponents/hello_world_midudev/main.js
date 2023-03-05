/* 
Ejemplo de un Custom Element --------------------------------------------------
*/
class KlinCard extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        const title = this.getAttribute('title')
        const button = this.getAttribute('button')
        shadow.innerHTML += `
        <h1>${title}</h1>
        <button>${button}</button>
        `
    }
    
    connectedCallback() {
        console.log('componente montado')
    }

    disconnectedCallback() {
        console.log('componente desmontado')
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
        console.log('componente atributo cambiado')
        console.log({ attributeName, oldValue, newValue})
    }
}

window.customElements.define('klin-card', KlinCard)

const SIZES = {
    small: '24px',
    medium: '48px',
    large: '96px',
}
/*
Custom Element con renderizado cuando se monta --------------------------------
*/
class KikobeatsUnavatar extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: 'open'})
    }
    
    connectedCallback() {
        const username = this.getAttribute('username') ?? 'crisconru'
        const social = this.getAttribute('social') ?? 'github'
        const parts = [social, username].filter(Boolean).join('/')
        console.log(parts)
        const size = this.getAttribute('size') ?? 'medium'
        const cssSize = SIZES[size] ?? SIZES.medium
        this.shadowRoot.innerHTML = `
        <style>
            img {
                border-radius: 9999px;
                aspect-ratio: 1/1;
                width: ${cssSize};
            }
        </style>
        <img src="https://unavatar.io/${parts}" />
        `
    }
}
/*
Custom Element interactivo  ---------------------------------------------------
*/
const defineElement = (tag, element) => {
    if (window.customElements.get(tag)) {
        console.warn(`Ya estaba definido el custom element ${tag}`)
        return
    }
    window.customElements.define(tag, element)
}
window.customElements.define('kikobeats-unavatar', KikobeatsUnavatar)

class KlinAvatar extends HTMLElement {
    static get observedAttributes() {
        return ['social','username', 'size']
    }
    
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.render()
    }

    render() {
        const username = this.getAttribute('username') ?? 'crisconru'
        const social = this.getAttribute('social') ?? 'github'
        const parts = [social, username].filter(Boolean).join('/')
        console.log(parts)
        const size = this.getAttribute('size') ?? 'medium'
        const cssSize = SIZES[size] ?? SIZES.medium
        this.shadowRoot.innerHTML = `
        <style>
            img {
                border-radius: 9999px;
                aspect-ratio: 1/1;
                width: ${cssSize};
            }
        </style>
        <img src="https://unavatar.io/${parts}" />
        `
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
        console.log('componente atributo cambiado')
        if (oldValue !== newValue) {
            console.log({ attributeName, oldValue, newValue})
            this.render()
        }
    }
}

//window.customElements.define('klin-avatar', KlinAvatar)
defineElement('klin-avatar', KlinAvatar)
defineElement('klin-avatar', KlinAvatar)

const klin = document.querySelector('klin-avatar')

document.querySelector('#aumentar').addEventListener('click', () => {
    console.log('clickeado')
    klin.setAttribute('size', 'large')
})

document.querySelector('#disminuir').addEventListener('click', () => {
    console.log('clickeado')
    klin.setAttribute('size', 'small')
})
/*
Custom element más complejo ---------------------------------------------------
 */
import _QRCode from 'https://cdn.skypack.dev/qrjs'

export default class QRCode extends HTMLElement {
    static get defaultAttributes() {
        return {
            data: null,
            format: 'png',
            size: 5,
            margin: 4
        }
    }

    static get observedAttributes() {
        
    }

    getOptions() {
        const { size, margin } = this

        return {
            modulesize: size ?? Number(size),
            margin: margin ?? Number(margin),
        }
    }

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        Object.keys(QRCode.defaultAttributes).forEach(attribute => {
            this[attribute] = this.getAttribute(attribute) ?? QRCode.defaultAttributes[attribute]
        })
    }


    connectedCallback() {
        this.render()
    }

    render() {
        if (this.format === 'png') {
            const src = _QRCode.generatePNG(this.data, this.getOptions())
            // innerHTML => más lento
            this.shadowRoot.innerHTML = `
            <img src="${src}"/>
            `
        }
        if (this.format === 'svg') {
            const src = _QRCode.generateSVG(this.data, this.getOptions())
            // appendChild => más rápido
            this.shadowRoot.appendChild(src)
        }
    }
}

defineElement('qr-code', QRCode)