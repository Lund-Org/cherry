/* eslint no-unused-expressions: 0 */
const DuplicateMiddlewareException = require(path.join(__root, './src/middlewares/DuplicateMiddlewareException'))

describe('DuplicateMiddlewareException', () => {
  it('Tests if the exception is an Error', () => {
    const error = new DuplicateMiddlewareException('test')

    expect(error instanceof Error).to.be.true
    expect(() => {
      throw error
    }).to.throw('The middleware \'test\' has been duplicated. To shutdown this exception, remove the duplicate or turn off by providing in the options the option \'allowDuplicatedMiddlewares\'')
  })
})
