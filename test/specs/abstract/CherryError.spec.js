const CherryError = require(path.join(__root, './src/abstract/CherryError'))

describe('CherryError', () => {
  it('Tests if the class is an Error', () => {
    expect(() => {
      throw new CherryError('Test, is it an error ?')
    }).to.throw('Test, is it an error ?')
  })
})
