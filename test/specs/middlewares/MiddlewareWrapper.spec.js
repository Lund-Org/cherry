/* eslint no-unused-expressions: 0 */
const MiddlewareWrapper = require(path.join(__root, './src/middlewares/MiddlewareWrapper'))

let middlewareWrapper = null

describe('MiddlewareWrapper', () => {
  before(() => {
    middlewareWrapper = new MiddlewareWrapper({
      resolve: (next, req, res) => {
        next(req, res)
      }
    })
  })

  it('Tests the method setNextAction', () => {
    middlewareWrapper.setNextAction((req, res) => {
      expect(typeof req).to.be.equal('object')
      expect(typeof res).to.be.equal('object')
    })

    expect(middlewareWrapper.next).to.not.be.equal(null)
  })

  it('Tests the method resolve', () => {
    middlewareWrapper.resolve({}, {})
  })
})
