const { renderDOM } = require('./helpers')

let dom
let document

describe('index, html', () => {
    beforeEach(async () => {
        dom = await renderDOM('./index.html')
        document = await dom.window.document
    })

    it('loads up the favicon', () => {
        const head = document.querySelector('head')
        const favicon = head.querySelector('link[rel="shortcut icon"]')
        expect(favicon).toBeTruthy()
    })
    it('displays the correct favicon', () => {
        const head = document.querySelector('head')
        const favicon = head.querySelector('link[rel="shortcut icon"]')
        const favHref = favicon.getAttribute('href')

        expect(favHref).toEqual('./assets/images/fav.png')
    })

    it('has a navigation bar', () => {
        const navbar = document.querySelector('nav')
        expect(navbar).toBeTruthy()
    })

    it('has a footer', () => {
        const footer = document.querySelector('footer')
        expect(footer).toBeTruthy()

        const footer2 = footer.querySelector('app-footer')
        expect(footer2).toBeTruthy()
    })

    it('displays login popup when MyAccount is clicked on', () => {
        const button = document.querySelector('#myAccount')
        expect(button).toBeTruthy()
        const login = document.querySelector('#login')

        expect(login.style.display).toBe('')
        button.click()
        expect(login.style.display).toBe('flex')
    })

    it('displays register popup when register buttton is clicked on', () => {
        const button = document.querySelector('#openRegister')
        expect(button).toBeTruthy()
        const register = document.querySelector('#register')

        expect(register.style.display).toBe('')
        button.click()
        expect(register.style.display).toBe('flex')
    })
})