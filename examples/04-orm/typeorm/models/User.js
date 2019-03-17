const Model = require('./Model')

class User extends Model {
  constructor (data) {
    super()
    // default
    this.name = ''
    this.email = ''
    this.created_at = new Date()
    this.updated_at = new Date()

    this.set(data)
  }
}

module.exports = User
