/* eslint no-unused-expressions: 0 */
const MiddlewareNotFoundException = require(path.join(__root, './src/middlewares/MiddlewareNotFoundException'))

describe('MiddlewareNotFoundException', () => {
  it('Tests if the exception is an Error', () => {
    let error = new MiddlewareNotFoundException('test')

    expect(error instanceof Error).to.be.true
    expect(() => {
      throw error
    }).to.throw(`An error occured : The middleware 'test' doesn't exist`)
  })
})
