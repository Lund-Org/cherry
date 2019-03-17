const UserController = require('./typeorm/controllers/UserController')
// const UserController = require('./sequelize/controllers/UserController')

module.exports = [
  {
    method: ['GET'],
    path: '/users',
    callback: UserController.index
  },
  {
    method: ['POST'],
    path: '/users',
    callback: UserController.create
  },
  {
    method: ['GET'],
    path: '/users/:id',
    callback: UserController.show
  }
]
