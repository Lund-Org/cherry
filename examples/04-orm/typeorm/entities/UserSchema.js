const User = require('../models/User')
const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
  tableName: 'users_typeorm',
  target: User,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    name: {
      type: 'varchar'
    },
    email: {
      type: 'varchar'
    },
    created_at: {
      type: 'date'
    },
    updated_at: {
      type: 'date'
    }
  },
  relations: {},
  indices: [{
    name: 'INDEX',
    unique: true,
    columns: ['name', 'email']
  }],
  uniques: [{
    name: 'UNIQUE',
    columns: ['name', 'email']
  }]
})
