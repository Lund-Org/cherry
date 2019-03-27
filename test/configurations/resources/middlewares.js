module.exports = [
  {
    name: 'first-middleware-test',
    callback: (next, req, res) => {
      describe('Middleware', () => {
        it(`Test the first middleware`, (done) => {
          req.testMiddleware = 1
          expect(req.testMiddleware).to.be.equal(1)
          done()
        })
      })
      return next.resolve(req, res)
    }
  },
  {
    name: 'second-middleware-test',
    callback: (next, req, res) => {
      describe('Middleware', () => {
        it(`Test the second middleware`, (done) => {
          // set previously in the first middleware
          expect(req.testMiddleware).to.be.equal(1)
          done()
        })
      })
      return next.resolve(req, res)
    }
  }
]
