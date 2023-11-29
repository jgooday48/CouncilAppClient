const { renderDOM } = require('./helpers')

let document

describe('index, html', () => {
    beforeEach(async () => {
        dom = await renderDOM('./index.html')
        document = await dom.window.document
    })

    it('has a navigation bar', () => {
        const navigationBar = document.querySelector('nav')
        expect(navigationBar).toBeTruthy()
    })

    it('displays login popup', () => {
        const popup = document.querySelector('.login')
        const popupBtn = document.querySelector('#openPopUp')

        popupBtn.click()
        expect(popup.style.display).toBe('flex')
    })
})

describe('library, html', () => {
    beforeEach(async () => {
        dom = await renderDOM('./library.html')
        document = await dom.window.document
    })

    it('loads up book description', () => {
        const description = document.querySelector('.bookDescription')
        expect(description).toBeTruthy()
    })

    it('loads up book image', () => {
        const image = document.querySelector('.bookImage')
        expect(image).toBeTruthy()
    })
})