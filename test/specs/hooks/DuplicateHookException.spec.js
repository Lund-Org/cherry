/* eslint no-unused-expressions: 0 */
const DuplicateHookException = require(path.join(__root, './src/hooks/DuplicateHookException'))

describe('DuplicateHookException', () => {
  it('Tests if the exception is an Error', () => {
    let error = new DuplicateHookException('test')

    expect(error instanceof Error).to.be.true
    expect(() => {
      throw error
    }).to.throw(`The hook 'test' has been duplicated. To shutdown this exception, remove the duplicate or turn off by providing in the options the option 'allowDuplicatedHooks'`)
  })
})
