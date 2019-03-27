const CherryRouteManager = require(path.join(__root, './src/abstract/CherryRouteManager'))
const Routers = require(path.join(__root, './src/routes/routers'))
const basicCherryConfig = require(path.join(__root, './test/configurations/resources/basicCherryConfig'))

let managerOne = null
let managerTwo = null

describe('CherryRouteManager', () => {
  before(() => {
    managerOne = new CherryRouteManager()
    managerTwo = new CherryRouteManager()
  })

  it('Tests the method registerRoute', () => {
    /* Test the cases of throw */
    expect(() => {
      managerOne.registerRoute()
    }).to.throw()
    expect(() => {
      managerOne.registerRoute({})
    }).to.throw()
    expect(() => {
      managerOne.registerRoute({ type: 'fake-type' })
    }).to.throw()
    expect(() => {
      managerOne.registerRoute({ type: 'fake-type' }, Routers)
    }).to.throw()

    managerOne.registerRoute(basicCherryConfig.routes.router[0], Routers)
  })

  it('Tests the method getRoutes', () => {
    expect(managerOne.getRoutes().length).to.be.equal(1)
    expect(managerTwo.getRoutes().length).to.be.equal(0)
  })
})
