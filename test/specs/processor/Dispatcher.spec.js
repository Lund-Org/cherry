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
  },
  boundDataToRequest: async () => {}
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

    shouldBeAnError = false
    shouldBeAnError2 = false
    expect(() => {
      fakeRequest.boundDataToRequest = async () => {
        return new Promise((resolve, reject) => { reject(new Error('Test the catch')) })
      }
      dispatcher.dispatch(fakeRequest, fakeResponse)
    }).to.not.throw()
  })
})
