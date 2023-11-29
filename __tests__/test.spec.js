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

describe('blog, html', () => {
    beforeEach(async () => {
        dom = await renderDOM('./blog.html')
        document = await dom.window.document
    })

    it('has a navigation bar', () => {
        const navigationBar = document.querySelector('nav')
        expect(navigationBar).toBeTruthy()
    })

    it('displays form popup', () => {
        const popup = document.querySelector('.login')
        const popupBtn = document.querySelector('#post-form')

        popupBtn.click()
        expect(popup.style.display).toBe('block')
    })
})

describe('library, html', () => {
    beforeEach(async () => {
        dom = await renderDOM('./library.html')
        document = await dom.window.document
    })

    it('has a navigation bar', () => {
        const navigationBar = document.querySelector('nav')
        expect(navigationBar).toBeTruthy()
    })

    it('displays a footer', () => {
        const foot = document.querySelector('footer')
        expect(foot).toBeTruthy()

    })

    it('has a navigation bar', () => {
        const navigationBar = document.querySelector('nav')
        expect(navigationBar).toBeTruthy()
    })

    it('displays a footer', () => {
        const foot = document.querySelector('footer')
        expect(foot).toBeTruthy()

    })
})