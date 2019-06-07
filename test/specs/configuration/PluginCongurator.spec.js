/* eslint no-unused-expressions: 0 */
const PluginConfigurator = require(path.join(__root, './src/configuration/PluginConfigurator'))
const plugins = require(path.join(__root, './test/configurations/resources/plugins'))

let pluginConfigurator = null
let badPluginConfigurator = null

describe('HookConfigurator', () => {
  before(() => {
    pluginConfigurator = new PluginConfigurator()
    badPluginConfigurator = new PluginConfigurator()
  })

  it('Tests the method configure (working)', () => {
    expect(() => {
      pluginConfigurator.configure({
        plugins
      })
    }).to.not.throw()

    // expect(Object.keys(pluginConfigurator.manager.plugins).length)
    //   .to.be.equal(plugins.length)
  })

  it('Tests the method configure (failing)', () => {
    expect(() => {
      badPluginConfigurator.configure({
        badKey: plugins
      })
    }).to.not.throw()
    expect(() => {
      badPluginConfigurator.configure({
        plugins: { test: 'Object' }
      })
    }).to.throw()
  })

  it('Tests the method getPlugin', () => {
    expect(typeof pluginConfigurator.getPlugin('ViewEngine')).to.not.be.equal('undefined')
    expect(typeof pluginConfigurator.getPlugin('testPlugin')).to.be.equal('undefined')
  })

  it('Tests the method getPluginInstance', () => {
    expect(pluginConfigurator.getPluginInstance('ViewEngine')).to.not.be.equal(null)
    expect(pluginConfigurator.getPluginInstance('testPlugin')).to.be.equal(null)
  })

  it('Tests the method getPlugins', () => {
    let configuredPlugins = pluginConfigurator.getPlugins()
    let badConfiguredPlugins = badPluginConfigurator.getPlugins()

    plugins.forEach((plugin) => {
      expect(configuredPlugins[plugin.getIdentifier()]).to.not.be.equal(null)
    })
    Object.keys(badConfiguredPlugins).forEach((key) => {
      expect(badConfiguredPlugins[key]).to.be.equal(null)
    })
    expect(Object.keys(configuredPlugins).length).to.be.equal(3)
  })

  it('Tests the method getPluginTypes', () => {
    expect(pluginConfigurator.getPluginTypes().includes('ViewEngine')).to.be.true
    expect(pluginConfigurator.getPluginTypes().includes('DatabaseEngine')).to.be.true
    expect(pluginConfigurator.getPluginTypes().includes('test-plugin')).to.be.false
  })
})
