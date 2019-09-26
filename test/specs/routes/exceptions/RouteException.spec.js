/* eslint no-unused-expressions: 0 */
const RouteException = require(path.join(__root, './src/routes/exceptions/RouteException'))

let error = null

describe('RouteException', () => {
  it('Tests if the exception is an Error', () => {
    error = new RouteException('test')

    expect(error instanceof Error).to.be.true
    expect(() => {
      throw error
    }).to.throw('An error occured : The option \'test\' is missing in the route definition')
  })
})
