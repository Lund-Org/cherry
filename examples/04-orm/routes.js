const UserController = require('./typeorm/controllers/UserController')
// const UserController = require('./sequelize/controllers/UserController')

module.exports = {
  router: [
    {
      type: 'ROUTE_CONTEXT',
      name: 'users-context-',
      path: '/users',
      collection: [
        {
          type: 'ROUTE',
          method: ['GET'],
          path: '/',
          callback: UserController.index
        },
        {
          type: 'ROUTE',
          method: ['POST'],
          path: '/',
          callback: UserController.create
        },
        {
          type: 'ROUTE',
          method: ['GET'],
          path: '/:id',
          callback: UserController.show
        }
      ]
    }
  ]
}
