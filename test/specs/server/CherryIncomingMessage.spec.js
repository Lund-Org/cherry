/* eslint no-unused-expressions: 0 */
const CherryIncomingMessage = require(path.join(__root, './src/server/CherryIncomingMessage'))
const { IncomingMessage } = require('http')

let request = null

describe('CherryIncomingMessage', () => {
  before(() => {
    request = new CherryIncomingMessage()
  })

  it('Tests the getter/setter of cherry', () => {
    expect(request.getCherry()).to.be.equal(null)
    request.setCherry(1)
    expect(request.getCherry()).to.be.equal(1)
  })

  it('Tests if the request herits from the IncomingMessage class of the http module', () => {
    expect(request instanceof IncomingMessage).to.be.true
  })
})
