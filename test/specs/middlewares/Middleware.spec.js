/* eslint no-unused-expressions: 0 */
const Middleware = require(path.join(__root, './src/middlewares/Middleware'))

let middleware = null

describe('Middleware', () => {
  it('Tests the configuration of the object in the constructor', () => {
    expect(() => {
      middleware = new Middleware({})
    }).to.throw()
    expect(() => {
      middleware = new Middleware({ name: 'test' })
    }).to.throw()
    expect(() => {
      middleware = new Middleware({ name: 'test', callback: 'not a function' })
    }).to.throw()

    middleware = new Middleware({
      name: 'test',
      callback: (next, req, res) => {
        expect(typeof next).to.be.equal('function')
        expect(typeof req).to.be.equal('object')
        expect(typeof res).to.be.equal('object')
      }
    })
  })

  it('Tests the method getName', () => {
    expect(middleware.getName()).to.be.equal('test')
  })

  it('Tests the method resolve', () => {
    middleware.resolve(() => {}, {}, {})
  })
})
