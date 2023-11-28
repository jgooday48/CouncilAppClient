const { functions } = require('../../assets/js/blog')
const { renderDOM } = require('./helpers')

describe('deletion of posts', () => {

    it('is defined', () => {
        expect(functions.handleDelete()).toBeDefined()
    })
})
