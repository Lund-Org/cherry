/* eslint no-unused-expressions: 0 */
const PublicRouteManager = require(path.join(__root, './src/routes/PublicRouteManager'))
const { PUBLIC_ROUTE_PUBLIC_FOLDER } = require(path.join(__root, './src/routes/constants'))

let publicRouteManager = null

describe('PublicRouteManager', () => {
  before(() => {
    publicRouteManager = new PublicRouteManager()
  })

  it('Tests the method build', () => {
    expect(() => {
      publicRouteManager.registerRoute({
        type: PUBLIC_ROUTE_PUBLIC_FOLDER,
        path: path.join(__root, '/test/configurations/fake_public')
      })
    }).to.not.throw()
  })

  it('Tests the method sortByPriorities', () => {
    let lastPriority = 0
    publicRouteManager.routes = [
      { priority: 3 },
      { priority: 4 },
      { priority: 2 },
      { priority: 2 },
      { priority: 1 }
    ]

    publicRouteManager.sortByPriorities()
    publicRouteManager.routes.forEach((fakeRoute) => {
      expect(fakeRoute.priority).to.be.least(lastPriority)
      lastPriority = fakeRoute.priority
    })
  })
})
