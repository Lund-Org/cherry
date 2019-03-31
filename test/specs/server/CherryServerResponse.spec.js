/* eslint no-unused-expressions: 0 */
const CherryServerResponse = require(path.join(__root, './src/server/CherryServerResponse'))
const { ServerResponse } = require('http')

let response = null

describe('CherryServerResponse', () => {
  before(() => {
    response = new CherryServerResponse({ method: 'GET' })
  })

  it('Tests the getter/setter of cherry', () => {
    expect(response.getCherry()).to.be.equal(null)
    response.setCherry(1)
    expect(response.getCherry()).to.be.equal(1)
  })

  it('Tests if the response herits from the ServerResponse class of the http module', () => {
    expect(response instanceof ServerResponse).to.be.true
  })

  it('Tests the method boundOptions', () => {
    let headerSet = 0

    response.setHeader = (key, value) => {
      // override to check if it is called
      ++headerSet
    }
    response.boundOptions({
      key: 'value',
      test: 'value'
    })

    expect(headerSet).to.be.equal(2)
  })

  it('Tests the method addMissingResponse', () => {
    let endCalled = 0

    response.end = response.json = () => {
      // override to check if it is called
      ++endCalled
    }

    response.addMissingResponse('test-string')
    response.addMissingResponse({
      test: 'object'
    })
    response.addMissingResponse(1)

    expect(endCalled).to.be.equal(3)
  })
})
