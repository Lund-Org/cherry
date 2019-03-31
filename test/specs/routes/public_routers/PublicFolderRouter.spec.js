/* eslint no-unused-expressions: 0 */
const PublicFolderRouter = require(path.join(__root, './src/routes/public_routers/PublicFolderRouter'))
const complexConfig = require(path.join(__root, 'test/configurations/resources/complexCherryConfig'))
const { PUBLIC_ROUTE_PUBLIC_FOLDER } = require(path.join(__root, './src/routes/constants'))
const stream = require('stream')

let publicFolderRouter = null
let badPublicFolderRouter = null

describe('PublicFolderRouter', () => {
  it('Tests the configuration of the object in the constructor', () => {
    expect(() => {
      publicFolderRouter = new PublicFolderRouter(complexConfig.routes.publicRouter[0])
    }).to.not.throw()

    expect(() => {
      badPublicFolderRouter = new PublicFolderRouter({
        type: PUBLIC_ROUTE_PUBLIC_FOLDER
      })
    }).to.throw()

    expect(() => {
      badPublicFolderRouter = new PublicFolderRouter({
        type: PUBLIC_ROUTE_PUBLIC_FOLDER,
        path: path.join(__root, '/path/doesnt/exist')
      })
    }).to.throw()
    expect(publicFolderRouter).to.not.be.equal(null)
    expect(badPublicFolderRouter).to.be.equal(null)
  })

  it('Tests the method getType', () => {
    expect(PublicFolderRouter.getType()).to.be.equal(PUBLIC_ROUTE_PUBLIC_FOLDER)
  })

  it('Tests the method build', () => {
    let buildedRoute = publicFolderRouter.build()
    expect(buildedRoute.length).to.be.equal(1)
    expect(buildedRoute[0]).to.be.equal(publicFolderRouter)
  })

  it('Tests the method matchRoute', () => {
    let routeResponse = publicFolderRouter.matchRoute('/test.json', null, new stream.Writable({ write: () => {} }))
    let routeResponse2 = publicFolderRouter.matchRoute('/test.png', null, new stream.Writable({ write: () => {} }))

    expect(routeResponse.shouldStop()).to.be.true
    expect(routeResponse2.shouldStop()).to.be.false
    expect(routeResponse2.getMatchingRoute()).to.be.equal(null)
  })
})
