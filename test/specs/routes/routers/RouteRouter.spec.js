/* eslint no-unused-expressions: 0 */
const RouteRouter = require(path.join(__root, './src/routes/routers/RouteRouter'))
const { ROUTE } = require(path.join(__root, './src/routes/constants'))

let routeRouter = null
let badRouteRouter = null

describe('RouteRouter', () => {
  it('Tests the configuration of the object in the constructor', () => {
    expect(() => {
      routeRouter = new RouteRouter({
        type: ROUTE,
        method: null,
        path: '/test/:id/',
        callback: (req, res) => {
          return 1
        },
        rules: {
          id: /\d+/
        }
      })
    }).to.not.throw()

    expect(() => {
      badRouteRouter = new RouteRouter({})
    }).to.throw()

    expect(() => {
      badRouteRouter = new RouteRouter({
        type: ROUTE
      })
    }).to.throw()

    expect(() => {
      badRouteRouter = new RouteRouter({
        type: ROUTE,
        path: '/test'
      })
    }).to.throw()

    expect(() => {
      badRouteRouter = new RouteRouter({
        type: ROUTE,
        path: '/test'
      })
    }).to.throw()

    expect(routeRouter).to.not.be.equal(null)
    expect(badRouteRouter).to.be.equal(null)
  })

  it('Tests the method getType', () => {
    expect(RouteRouter.getType()).to.be.equal(ROUTE)
  })

  it('Tests the method build', () => {
    const buildedRoute = routeRouter.build()

    expect(buildedRoute.length).to.be.equal(1)
    expect(buildedRoute[0]).to.be.equal(routeRouter)
  })

  it('Tests the method matchRoute', () => {
    let routeMatchResponse = null

    // test working match
    routeMatchResponse = routeRouter.matchRoute('/test/5/', {
      method: 'GET'
    })

    expect(routeMatchResponse.getMatchingRoute()).to.not.be.equal(null)
    expect(routeMatchResponse.getAttributes().id).to.be.equal('5')

    // test working match
    routeMatchResponse = routeRouter.matchRoute('/test/string-but-integer-expected/', {
      method: 'GET'
    })

    expect(routeMatchResponse.getMatchingRoute()).to.be.equal(null)
  })

  it('Tests the method addContext', () => {
    routeRouter.addContext({
      name: 'test-',
      method: ['GET'],
      path: '/context/',
      middlewares: [],
      rules: {}
    })

    expect(routeRouter.path).to.be.equal('/context/test/:id/')
    expect(Array.isArray(routeRouter.method)).to.be.true
    expect(routeRouter.method.includes('GET')).to.be.true
  })
})
