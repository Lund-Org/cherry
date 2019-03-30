/* eslint no-unused-expressions: 0 */
const ORMException = require(path.join(__root, './src/orm/ORMException'))

let error = null

describe('ORMException', () => {
  it('Tests if the exception is an Error', () => {
    error = new ORMException(new Error('test'), 200, 12)

    expect(error instanceof Error).to.be.true
    expect(() => {
      throw error
    }).to.throw()
  })

  it('Tests the method getDataTrace', () => {
    expect(error.getDataTrace()).to.be.equal(12)
  })
})
