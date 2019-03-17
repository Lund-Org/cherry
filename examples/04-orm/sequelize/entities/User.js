const Sequelize = require('sequelize')

function userRegister (sequelizeConnection) {
  sequelizeConnection.User = sequelizeConnection.define('users_sequelize', {
    name: {
      type: Sequelize.STRING,
      unique: 'uniqueName'
    },
    email: {
      type: Sequelize.STRING,
      unique: 'uniqueEmail'
    }
  })
}

module.exports = {
  userRegister
}
