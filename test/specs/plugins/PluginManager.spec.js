/* eslint no-unused-expressions: 0 */
const PluginManager = require(path.join(__root, './src/plugins/PluginManager'))
const CherryHandlebarPlugin = require('@lund-org/cherry-handlebars-connector')

let pluginManager = null

describe('PluginManager', () => {
  before(() => {
    pluginManager = new PluginManager()
  })

  it('Tests the method registerPlugin', () => {
    pluginManager.registerPlugin(CherryHandlebarPlugin)
    expect(pluginManager.plugins.ViewEngine).to.not.be.equal(null)
    pluginManager.registerPlugin(CherryHandlebarPlugin)
  })

  it('Tests the method getPlugin', () => {
    expect(pluginManager.getPlugin('ViewEngine')).to.be.equal(CherryHandlebarPlugin)
  })

  it('Tests the method getPlugins', () => {
    let plugins = pluginManager.getPlugins()

    expect(plugins.ViewEngine).to.not.be.equal(null)
    expect(plugins.DatabaseEngine).to.be.equal(null)
  })

  it('Tests the method getPluginTypes', () => {
    expect(pluginManager.getPluginTypes().length).to.be.equal(1)
  })
})
