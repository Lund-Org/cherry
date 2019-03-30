/* eslint no-unused-expressions: 0 */
const MiddlewareManager = require(path.join(__root, './src/middlewares/MiddlewareManager'))

let middlewareManager = null
let config = {
  name: 'middleware-test',
  callback: (next, req, res) => {
    return next.resolve(req, res)
  }
}

describe('MiddlewareManager', () => {
  before(() => {
    middlewareManager = new MiddlewareManager()
  })

  it('Tests the method setDuplicateMiddlewareOption', () => {
    middlewareManager.setDuplicateMiddlewareOption(true)
    expect(middlewareManager.allowDuplicatedMiddlewares).to.be.true
  })

  it('Tests the method addMiddleware', () => {
    middlewareManager.addMiddleware(config)
    expect(() => {
      middlewareManager.addMiddleware(config)
    }).to.not.throw()

    middlewareManager.setDuplicateMiddlewareOption(false)
    expect(() => {
      middlewareManager.addMiddleware(config)
    }).to.throw()

    expect(Object.keys(middlewareManager.middlewares).length).to.be.equal(1)
  })

  it('Tests the method getMiddlewareByName', () => {
    expect(() => {
      middlewareManager.getMiddlewareByName('test-failed')
    }).to.throw()

    expect(typeof middlewareManager.getMiddlewareByName('middleware-test')).to.be.equal('object')
  })
})
