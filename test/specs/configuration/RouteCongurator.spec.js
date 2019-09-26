/* eslint no-unused-expressions: 0 */
const RouteConfigurator = require(path.join(__root, './src/configuration/RouteConfigurator'))
const stream = require('stream')

let routeConfigurator = null
let badRouteConfigurator = null
const routes = [
  {
    type: 'ROUTE',
    method: ['GET'],
    path: '/unit-test',
    callback: (req, res) => {
      expect(typeof req).to.be.equal('object')
      expect(typeof res).to.be.equal('object')
      return true
    }
  }
]
const publicRoutes = [
  {
    type: 'PUBLIC_ROUTE_PUBLIC_FOLDER',
    path: path.join(__root, '/test/configurations/fake_public')
  }
]

describe('HookConfigurator', () => {
  before(() => {
    routeConfigurator = new RouteConfigurator()
    badRouteConfigurator = new RouteConfigurator()
  })

  it('Tests the method configure (working)', () => {
    expect(() => {
      routeConfigurator.configure({
        routes: {
          router: routes,
          publicRouter: publicRoutes
        }
      })
    }).to.not.throw()

    expect(Object.keys(routeConfigurator.manager.routeManager.routes).length)
      .to.be.equal(routes.length)
    expect(Object.keys(routeConfigurator.manager.publicRouteManager.routes).length)
      .to.be.equal(publicRoutes.length)
  })

  it('Tests the method configure (failing)', () => {
    expect(() => {
      badRouteConfigurator.configure({
        routes: {
          router: [],
          publicRouter: []
        }
      })
    }).to.throw()
    expect(() => {
      badRouteConfigurator.configure({
        test: 'no route key'
      })
    }).to.throw()
    expect(() => {
      badRouteConfigurator.configure({
        routes: 'A string but an array expected'
      })
    }).to.throw()
  })

  it('Tests the method searchMatchingRoute', () => {
    const publicRouteFound = routeConfigurator.searchMatchingRoute(
      '/test.json',
      {},
      new stream.Writable({ write: () => {} })
    )
    const configuredRouteFound = routeConfigurator.searchMatchingRoute(
      '/unit-test',
      {
        method: 'GET'
      },
      new stream.Writable({ write: () => {} })
    )
    const routeNotFound = routeConfigurator.searchMatchingRoute('/unit-test', {
      method: 'POST'
    }, {})
    const routeNotFound2 = routeConfigurator.searchMatchingRoute('/unit-test-fail', {
      method: 'GET'
    }, {})
    const routeNotFound3 = routeConfigurator.searchMatchingRoute(
      'unit-test',
      {
        method: 'GET'
      },
      new stream.Writable({ write: () => {} })
    )

    // check found Routes
    expect(publicRouteFound).to.not.be.equal(null)
    expect(configuredRouteFound).to.not.be.equal(null)

    expect(typeof publicRouteFound.matchingRoute).to.be.equal('object')
    expect(typeof configuredRouteFound.matchingRoute).to.be.equal('object')

    expect(publicRouteFound.stop).to.be.true
    expect(configuredRouteFound.stop).to.be.false

    // check not found Routes
    expect(routeNotFound).to.be.equal(null)
    expect(routeNotFound2).to.be.equal(null)
    expect(routeNotFound3).to.be.equal(null)
  })
})
