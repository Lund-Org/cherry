/* eslint no-unused-expressions: 0 */
const RouteManagerException = require(path.join(__root, './src/routes/exceptions/RouteManagerException'))

let error = null

describe('RouteManagerException', () => {
  it('Tests if the exception is an Error', () => {
    error = new RouteManagerException({}, 'test')

    expect(error instanceof Error).to.be.true
    expect(() => {
      throw error
    }).to.throw(`An error occured : test. The route config sent was : {}`)
  })
})
