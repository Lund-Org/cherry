/* eslint no-unused-expressions: 0 */
const CherryRouter = require(path.join(__root, './src/abstract/CherryRouter'))

let cherryRouter = null
const baseConfig = { test: true }

class TestClass {
  constructor (testConfig) {
    this.testConfig = testConfig
  }
}

describe('CherryRouteManager', () => {
  before(() => {
    cherryRouter = new CherryRouter(baseConfig, TestClass)
  })

  it('Tests the method getType', () => {
    expect(() => {
      CherryRouter.getType()
    }).to.not.throw()
  })

  it('Tests the method matchRoute', () => {
    expect(() => {
      cherryRouter.matchRoute()
    }).to.not.throw()
  })

  it('Tests the method build', () => {
    expect(() => {
      cherryRouter.build()
    }).to.not.throw()
  })

  it('Tests the method clone', () => {
    const cloneRouter = cherryRouter.clone()

    expect(cloneRouter instanceof TestClass).to.be.true
    expect(JSON.stringify(cloneRouter.testConfig)).to.be.equal(JSON.stringify(baseConfig))
  })

  it('Tests the method _setParameters', () => {
    // routeConfig, name, defaultValue
    cherryRouter._setParameters({}, 'test1', 1)
    cherryRouter._setParameters({ test2: 2 }, 'test2', null)

    expect(cherryRouter.test1).to.be.equal(1)
    expect(cherryRouter.test2).to.be.equal(2)
  })
})
