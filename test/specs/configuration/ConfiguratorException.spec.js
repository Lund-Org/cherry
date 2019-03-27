const ConfiguratorException = require(path.join(__root, './src/configuration/ConfiguratorException'))

describe('ConfiguratorException', () => {
  it('Tests if the class is an Error', () => {
    expect(() => {
      throw new ConfiguratorException('test', 'string', 'number')
    }).to.throw(`An error occured : The option 'test' is of type 'string', expected number`)
  })
})
