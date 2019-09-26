/* eslint no-unused-expressions: 0 */
const HookException = require(path.join(__root, './src/hooks/HookException'))

describe('HookException', () => {
  it('Tests if the exception is an Error', () => {
    const error = new HookException('test')

    expect(error instanceof Error).to.be.true
    expect(() => {
      throw error
    }).to.throw('An error occured : The option \'test\' is missing or invalid in the hook definition')
  })
})
