/* eslint no-unused-expressions: 0 */
const RouteMatchResponse = require(path.join(__root, './src/routes/RouteMatchResponse'))

let routeMatchResponse = null

describe('RouteMatchResponse', () => {
  before(() => {
    routeMatchResponse = new RouteMatchResponse()
  })

  it('Tests the getter/setter of matchingRoute', () => {
    expect(routeMatchResponse.getMatchingRoute()).to.be.equal(null)
    routeMatchResponse.setMatchingRoute(1)
    expect(routeMatchResponse.getMatchingRoute()).to.be.equal(1)
  })

  it('Tests the getter/setter of attributes', () => {
    expect(typeof routeMatchResponse.getAttributes()).to.be.equal('object')
    expect(Object.keys(routeMatchResponse.getAttributes()).length).to.be.equal(0)
    routeMatchResponse.setAttributes(1)
    expect(routeMatchResponse.getAttributes()).to.be.equal(1)
  })

  it('Tests the getter/setter of stop', () => {
    expect(routeMatchResponse.shouldStop()).to.be.false
    routeMatchResponse.setStop(true)
    expect(routeMatchResponse.shouldStop()).to.be.true
  })
})
