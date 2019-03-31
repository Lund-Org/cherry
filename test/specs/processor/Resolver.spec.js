/**
 * IN THIS FILE, WE ONLY TEST THE CASE OF A FAILING PROCESS
 * THE TESTS OF SUCCESSFULL CALLBACK ARE DONE IN THE CHERRY TEST
 * (if we call a route, of course it goes here)
 */
/* eslint no-unused-expressions: 0 */
const Resolver = require(path.join(__root, './src/processor/Resolver'))

let resolver = null
let fakeResponse = {
  writeHead (httpCode) {
    expect(httpCode).to.be.above(400)
  },
  end (response) {
    expect(typeof response).to.be.equal('string')
  }
}

describe('Resolver', () => {
  before(() => {
    resolver = new Resolver()
  })

  it('Tests the method _process in case of error', () => {
    expect(() => {
      resolver._process((request, response, cherryInstance) => {
        expect(request).to.be.equal(null)
        expect(response).to.be.equal(fakeResponse)
        expect(cherryInstance).to.be.equal(null)
        return new Promise((resolve, reject) => {
          reject(new Error('failing test'))
        })
      }, null, fakeResponse, null)
    }).to.not.throw()
  })
})
