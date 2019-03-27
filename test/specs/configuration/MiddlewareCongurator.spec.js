/* eslint no-unused-expressions: 0 */
const merge = require('deepmerge')
const MiddlewareConfigurator = require(path.join(__root, './src/configuration/MiddlewareConfigurator'))
const middlewares = require(path.join(__root, './test/configurations/resources/middlewares'))

let middlewareConfigurator = null
let badMiddlewareConfigurator = null
let copyMiddlewares = null

describe('HookConfigurator', () => {
  before(() => {
    middlewareConfigurator = new MiddlewareConfigurator()
    badMiddlewareConfigurator = new MiddlewareConfigurator()
    copyMiddlewares = middlewares.map(middleware => merge({}, middleware))
    copyMiddlewares.push(merge({}, copyMiddlewares[0]))
  })

  it('Tests the method configure (working)', () => {
    expect(() => {
      middlewareConfigurator.configure({
        allowDuplicatedMiddlewares: true,
        middlewares: copyMiddlewares
      })
    }).to.not.throw()

    expect(Object.keys(middlewareConfigurator.manager.middlewares).length)
      .to.be.equal(copyMiddlewares.length - 1) // because there is an ignored duplicate
    expect(middlewareConfigurator.manager.allowDuplicatedMiddlewares).to.be.equal(true)
  })

  it('Tests the method configure (failing)', () => {
    expect(() => {
      badMiddlewareConfigurator.configure({
        middlewares: [ merge({}, copyMiddlewares[0]), merge({}, copyMiddlewares[0]) ]
      })
    }).to.throw()
  })

  it('Tests the method buildMiddlewareChain', () => {
    const builtChain = middlewareConfigurator.buildMiddlewareChain(['first-middleware-test'], {
      resolve: () => {
        expect(true).to.be.true
      }
    })

    expect(() => {
      builtChain.resolve({}, {})
    }).to.not.throw()
  })
})
