const { userRegister } = require('./User')

module.exports = {
  register (sequelizeConnection) {
    userRegister(sequelizeConnection)
  }
}
