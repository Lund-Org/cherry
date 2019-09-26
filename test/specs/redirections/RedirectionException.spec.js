/* eslint no-unused-expressions: 0 */
const RedirectionException = require(path.join(__root, './src/redirections/RedirectionException'))

let error = null

describe('RouteException', () => {
  it('Tests if the exception is an Error', () => {
    error = new RedirectionException('test', {})

    expect(error instanceof Error).to.be.true
    expect(() => {
      throw error
    }).to.throw('An error occured : The option \'test\' is missing or invalid in the redirection definition. Received : {}')
  })
})
