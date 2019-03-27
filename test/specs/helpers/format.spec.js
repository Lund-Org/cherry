const format = require(path.join(__root, './src/helpers/format'))

describe('format', () => {
  it('Tests the method refineUrl', () => {
    /* Success test */
    expect(format.refineUrl('test')).to.be.equal('test/')
    expect(format.refineUrl('test/')).to.be.equal('test/')

    /* Fail test */
    expect(format.refineUrl).to.throw()
    expect(() => {
      format.refineUrl(1)
    }).to.throw()
    expect(() => {
      format.refineUrl(null)
    }).to.throw()
  })
})
