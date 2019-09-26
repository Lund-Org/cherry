/* eslint no-unused-expressions: 0 */
const MiddlewareBadConfigurationException = require(path.join(__root, './src/middlewares/MiddlewareBadConfigurationException'))

describe('MiddlewareBadConfigurationException', () => {
  it('Tests if the exception is an Error', () => {
    const error = new MiddlewareBadConfigurationException()
    const error2 = new MiddlewareBadConfigurationException('test-name', 'test-key', 'test-type')

    expect(error instanceof Error).to.be.true
    expect(() => {
      throw error
    }).to.throw('An error occured : The middleware doesn\'t have a name')
    expect(() => {
      throw error2
    }).to.throw('An error occured : The middleware \'test-name\' has a missing field \'test-key\' or a wrong type (test-type expected)')
  })
})
