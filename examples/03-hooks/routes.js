const HookExampleController = require('./HookExampleController')

module.exports = {
  router: [
    {
      type: 'ROUTE',
      method: ['GET'],
      path: '/demo',
      callback: HookExampleController.demo
    }
  ]
}
