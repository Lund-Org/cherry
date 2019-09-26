const check = require(path.join(__root, './src/helpers/check'))

describe('check', () => {
  it('Tests the method isSelfDefined', () => {
    /* Success test */
    expect(check.isSelfDefined(0)).to.be.equal(true)
    expect(check.isSelfDefined(1)).to.be.equal(true)
    expect(check.isSelfDefined('')).to.be.equal(true)
    expect(check.isSelfDefined('test')).to.be.equal(true)
    expect(check.isSelfDefined(null)).to.be.equal(true)
    expect(check.isSelfDefined({ test: true })).to.be.equal(true)
    expect(check.isSelfDefined([1, 2, 3])).to.be.equal(true)

    /* Fail test */
    expect(check.isSelfDefined()).to.be.equal(false)
    expect(check.isSelfDefined(undefined)).to.be.equal(false)
  })
  it('Tests the method isSelfDefinedAndNotNull', () => {
    /* Success test */
    expect(check.isSelfDefinedAndNotNull(0)).to.be.equal(true)
    expect(check.isSelfDefinedAndNotNull(1)).to.be.equal(true)
    expect(check.isSelfDefinedAndNotNull('')).to.be.equal(true)
    expect(check.isSelfDefinedAndNotNull('test')).to.be.equal(true)
    expect(check.isSelfDefinedAndNotNull({ test: true })).to.be.equal(true)
    expect(check.isSelfDefinedAndNotNull([1, 2, 3])).to.be.equal(true)

    /* Fail test */
    expect(check.isSelfDefinedAndNotNull(null)).to.be.equal(false)
    expect(check.isSelfDefinedAndNotNull()).to.be.equal(false)
    expect(check.isSelfDefinedAndNotNull(undefined)).to.be.equal(false)
  })
  it('Tests the method isSelfDefinedAndValid', () => {
    /* Success test */
    expect(check.isSelfDefinedAndValid(1)).to.be.equal(true)
    expect(check.isSelfDefinedAndValid('test')).to.be.equal(true)
    expect(check.isSelfDefinedAndValid({ test: true })).to.be.equal(true)
    expect(check.isSelfDefinedAndValid([1, 2, 3])).to.be.equal(true)

    /* Fail test */
    expect(check.isSelfDefinedAndValid(0)).to.be.equal(false)
    expect(check.isSelfDefinedAndValid('')).to.be.equal(false)
    expect(check.isSelfDefinedAndValid(null)).to.be.equal(false)
    expect(check.isSelfDefinedAndValid()).to.be.equal(false)
    expect(check.isSelfDefinedAndValid(undefined)).to.be.equal(false)
  })
  it('Tests the method isDefined', () => {
    /* Success test */
    expect(check.isDefined({ key: 0 }, 'key')).to.be.equal(true)
    expect(check.isDefined({ key: 1 }, 'key')).to.be.equal(true)
    expect(check.isDefined({ key: '' }, 'key')).to.be.equal(true)
    expect(check.isDefined({ key: 'test' }, 'key')).to.be.equal(true)
    expect(check.isDefined({ key: null }, 'key')).to.be.equal(true)
    expect(check.isDefined({ key: { test: true } }, 'key')).to.be.equal(true)
    expect(check.isDefined({ key: [1, 2, 3] }, 'key')).to.be.equal(true)

    /* Fail test */
    expect(check.isDefined()).to.be.equal(false)
    expect(check.isDefined({ key: undefined }, 'key')).to.be.equal(false)
  })
  it('Tests the method isDefinedAndNotNull', () => {
    /* Success test */
    expect(check.isDefinedAndNotNull({ key: 0 }, 'key')).to.be.equal(true)
    expect(check.isDefinedAndNotNull({ key: 1 }, 'key')).to.be.equal(true)
    expect(check.isDefinedAndNotNull({ key: '' }, 'key')).to.be.equal(true)
    expect(check.isDefinedAndNotNull({ key: 'test' }, 'key')).to.be.equal(true)
    expect(check.isDefinedAndNotNull({ key: { test: true } }, 'key')).to.be.equal(true)
    expect(check.isDefinedAndNotNull({ key: [1, 2, 3] }, 'key')).to.be.equal(true)

    /* Fail test */
    expect(check.isDefinedAndNotNull({ key: null }, 'key')).to.be.equal(false)
    expect(check.isDefinedAndNotNull()).to.be.equal(false)
    expect(check.isDefinedAndNotNull({ key: undefined }, 'key')).to.be.equal(false)
  })
  it('Tests the method isDefinedAndValid', () => {
    /* Success test */
    expect(check.isDefinedAndValid({ key: 1 }, 'key')).to.be.equal(true)
    expect(check.isDefinedAndValid({ key: 'test' }, 'key')).to.be.equal(true)
    expect(check.isDefinedAndValid({ key: { test: true } }, 'key')).to.be.equal(true)
    expect(check.isDefinedAndValid({ key: [1, 2, 3] }, 'key')).to.be.equal(true)

    /* Fail test */
    expect(check.isDefinedAndValid({ key: 0 }, 'key')).to.be.equal(false)
    expect(check.isDefinedAndValid({ key: '' }, 'key')).to.be.equal(false)
    expect(check.isDefinedAndValid({ key: null }, 'key')).to.be.equal(false)
    expect(check.isDefinedAndValid()).to.be.equal(false)
    expect(check.isDefinedAndValid({ key: undefined }, 'key')).to.be.equal(false)
  })
})
