/* eslint no-unused-expressions: 0 */
const Dispatcher = require(path.join(__root, './src/processor/Dispatcher'))

/* Simulation values */

let shouldBeAnError = false
let shouldBeAnError2 = false
let dispatcher = null
let fakeCherryInstance = {
  routeConfigurator: {
    searchMatchingRoute () {
      if (shouldBeAnError) {
        return null
      } else {
        return {
          shouldStop () {
            return false
          },
          getAttributes () {
            if (shouldBeAnError2) {
              shouldBeAnError = true
            }
            return 1
          },
          getMatchingRoute () {
            return 'test'
          }
        }
      }
    }
  }
}
let fakeRequest = {
  url: 'http://localhost:3000/test',
  on (event, requestEventCallback) {
    if (event === 'data') {
      requestEventCallback(Buffer.from('{ "foo": "bar" }', 'utf8'))
    } else if (event === 'end' && !shouldBeAnError) {
      requestEventCallback()
    } else if (event === 'error' && shouldBeAnError) {
      requestEventCallback(1)
    }
  }
}
let fakeResponse = {
  writeHead (httpCode) {
    expect(httpCode).to.be.above(400)
  },
  end (response) {
    expect(typeof response).to.be.equal('string')
  }
}

/* BEGINING OF THE TESTS */

describe('Dispatcher', () => {
  before(() => {
    dispatcher = new Dispatcher(fakeCherryInstance)
  })

  it('Tests the method boundDataToRequest', async () => {
    try {
      let dataValue = await dispatcher.boundDataToRequest(fakeRequest, { querystring: {} })
      expect(typeof dataValue.params).to.be.equal('object')
      expect(dataValue.params.foo).to.be.equal('bar')
    } catch (e) {
      expect.fail()
    }

    shouldBeAnError = true

    try {
      await dispatcher.boundDataToRequest(fakeRequest, { querystring: {} })
      expect.fail()
    } catch (e) {
      expect(e).to.be.equal(1)
    }
  })

  it('Tests the method dispatch', () => {
    dispatcher.resolver = {
      resolve: (request, response) => {
        expect(request._route).to.be.equal('test')
      }
    }

    shouldBeAnError = false
    expect(() => {
      dispatcher.dispatch(fakeRequest, fakeResponse)
    }).to.not.throw()

    shouldBeAnError2 = true
    expect(() => {
      dispatcher.dispatch(fakeRequest, fakeResponse)
    }).to.not.throw()

    shouldBeAnError = true
    expect(() => {
      dispatcher.dispatch(fakeRequest, fakeResponse)
    }).to.not.throw()
  })
})
