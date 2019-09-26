/* eslint no-unused-expressions: 0 */
const ContextRouter = require(path.join(__root, './src/routes/routers/ContextRouter'))
const complexConfig = require(path.join(__root, 'test/configurations/resources/complexCherryConfig'))
const { ROUTE_CONTEXT } = require(path.join(__root, './src/routes/constants'))

let contextRouter = null
let badContextRouter = null

describe('ContextRouter', () => {
  it('Tests the configuration of the object in the constructor', () => {
    expect(() => {
      contextRouter = new ContextRouter(complexConfig.routes.router[0])
    }).to.not.throw()

    expect(() => {
      badContextRouter = new ContextRouter({})
    }).to.throw()

    expect(() => {
      badContextRouter = new ContextRouter({
        type: ROUTE_CONTEXT
      })
    }).to.throw()

    expect(() => {
      badContextRouter = new ContextRouter({
        type: ROUTE_CONTEXT,
        collection: []
      })
    }).to.throw()
    expect(contextRouter).to.not.be.equal(null)
    expect(badContextRouter).to.be.equal(null)
  })

  it('Tests the method getType', () => {
    expect(ContextRouter.getType()).to.be.equal(ROUTE_CONTEXT)
  })

  it('Tests the method build', () => {
    const buildedRoute = contextRouter.build()

    expect(buildedRoute.length).to.be.equal(1)
    expect(buildedRoute[0].path).to.be.equal('/test/simple-test/:id/')
  })

  it('Tests the method matchRoute', () => {
    expect(() => {
      contextRouter.matchRoute()
    }).to.throw()
  })
})
