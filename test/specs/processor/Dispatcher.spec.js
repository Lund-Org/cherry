/* eslint no-unused-expressions: 0 */
const Dispatcher = require(path.join(__root, './src/processor/Dispatcher'))
const DefaultErrorPageConfigurator = require(path.join(__root, './src/configuration/DefaultErrorPageConfigurator'))
const RedirectionConfigurator = require(path.join(__root, './src/configuration/RedirectionConfigurator'))

/* Simulation values */

let shouldBeAnError = false
let shouldBeAnError2 = false
let dispatcher = null
const fakeCherryInstance = {
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
  },
  defaultErrorPageConfigurator: new DefaultErrorPageConfigurator(),
  redirectionConfigurator: new RedirectionConfigurator()
}
const fakeRequest = {
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
const fakeResponse = {
  html: () => {},
  writeHead: (httpCode) => {
    expect(httpCode).to.be.above(400)
  },
  end: (response) => {
    expect(typeof response).to.be.equal('string')
  },
  redirect: (url, statusCode) => {
    expect(typeof url).to.be.equal('string')
    expect(statusCode).to.be.equal(301)
  }
}

/* BEGINING OF THE TESTS */

describe('Dispatcher', () => {
  before(() => {
    dispatcher = new Dispatcher(fakeCherryInstance)
    fakeCherryInstance.redirectionConfigurator.configure({
      redirections: [
        {
          matchUrl: /\/test\/(.*)/,
          targetUrl: '/test-with-middlewares?old_path=$1',
          statusCode: 301
        }
      ]
    })
  })

  it('Tests the method dispatch', () => {
    dispatcher.resolver = {
      resolve: (request, response) => {
        expect(request._route).to.be.equal('test')
      }
    }

    shouldBeAnError = false
    expect(() => {
      try {
        dispatcher.dispatch(fakeRequest, fakeResponse)
      } catch (e) {
        console.log(e)
        throw new Error('lol')
      }
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

  it('Tests the method checkRedirections', () => {
    expect(dispatcher.checkRedirections('/test/toto', fakeRequest, fakeResponse)).to.be.true
    expect(dispatcher.checkRedirections('/tutu', fakeRequest, fakeResponse)).to.be.false
  })
})
