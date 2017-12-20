/* globals customElements HTMLElement getComputedStyle */
import templateHTML from './template.html'
import style from './style.scss'

const template = document.createElement('template')
template.innerHTML = `
  ${templateHTML}
  <style>${style}</style>
`

customElements.define(
  'foo-shell',
  class extends HTMLElement {
    constructor () {
      super()
      this.attachShadow({mode: 'open', delegatesFocus: false})
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.expanded = this.hasAttribute('expanded')
      this.shadowRoot.querySelector('#expander').addEventListener('click', () => {
        this.expanded = !this.expanded
      })
      this.shadowRoot.querySelector('#overlay').addEventListener('click', () => {
        this.expanded = false
      })
      const header = this.shadowRoot.querySelector('header')
      window.addEventListener('scroll', event => {
        if (window.scrollY === 0) {
          header.classList.remove('scrolling')
        } else {
          header.classList.add('scrolling')
        }
      })
    }

    connectedCallback () {
      const header = this.shadowRoot.querySelector('header')
      const zIndex = parseInt(getComputedStyle(header).getPropertyValue('z-index'))
      header.style.zIndex = zIndex
      this.shadowRoot.querySelector('#overlay').style.zIndex = zIndex + 1
      this.shadowRoot.querySelector('nav').style.zIndex = zIndex + 2
    }

    get expanded () {
      return this.hasAttribute('expanded')
    }

    set expanded (val) {
      if (val) {
        this.setAttribute('expanded', '')
      } else {
        this.removeAttribute('expanded')
      }
    }
  }
)
