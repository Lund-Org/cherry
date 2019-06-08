/* eslint no-unused-expressions: 0 */
const Redirection = require(path.join(__root, './src/redirections/Redirection'))

let redirection = null
let badRedirection = null

describe('Redirection', () => {
  it('Tests the configuration of the object in the constructor', () => {
    expect(() => {
      redirection = new Redirection({
        matchUrl: '/test/(.*)',
        targetUrl: '/test-of-redirection?old_path=$1',
        statusCode: '302',
        keepQueryString: false
      })
    }).to.not.throw()

    expect(() => {
      badRedirection = new Redirection({})
    }).to.throw()

    expect(() => {
      badRedirection = new Redirection({
        matchUrl: 12,
        targetUrl: '/error/on/matchUrl',
        statusCode: 301
      })
    }).to.throw()

    expect(() => {
      badRedirection = new Redirection({
        matchUrl: '/pages/',
        targetUrl: 12,
        statusCode: 301
      })
    }).to.throw()

    expect(() => {
      badRedirection = new Redirection({
        matchUrl: '/pages/',
        targetUrl: '/new-pages/',
        statusCode: 500
      })
    }).to.throw()

    expect(redirection).to.not.be.equal(null)
    expect(badRedirection).to.be.equal(null)
  })

  it('Tests the method matchRoute', () => {
    let routeMatchResponse = null

    // test working match
    routeMatchResponse = redirection.matchRoute('/test/toto')

    expect(routeMatchResponse).to.be.true

    // test not working match
    routeMatchResponse = redirection.matchRoute('/hello/')

    expect(routeMatchResponse).to.be.false
  })

  it('Tests the method execute', () => {
    redirection.execute('/test/toto', {
      url: '/test/toto'
    }, {
      redirect: (redirectUrl, statusCode) => {
        expect(redirectUrl).to.be.equal('/test-of-redirection?old_path=toto')
        expect(statusCode).to.be.equal(302)
      }
    })

    // with get parameter and a redirection which has one too
    redirection.keepQueryString = true
    redirection.execute('/test/toto', {
      url: '/test/toto?param=1'
    }, {
      redirect: (redirectUrl, statusCode) => {
        expect(redirectUrl).to.be.equal('/test-of-redirection?old_path=toto&param=1')
        expect(statusCode).to.be.equal(302)
      }
    })
  })
})
