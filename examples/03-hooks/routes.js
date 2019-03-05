const HookExampleController = require('./HookExampleController')

module.exports = [
  {
    method: ['GET'],
    path: '/demo',
    callback: HookExampleController.demo
  }
]
