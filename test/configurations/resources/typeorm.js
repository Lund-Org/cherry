const { EntitySchema } = require('typeorm')

class User {
  constructor (data) {
    // default
    this.name = ''
    this.email = ''
    this.created_at = new Date()
    this.updated_at = new Date()

    if (typeof data !== 'undefined') {
      for (const index in data) {
        if (typeof this[index] !== 'undefined') {
          this[index] = data[index]
        }
      }
    }
  }
}

module.exports = {
  postConnectionProcess: (connection, options) => {
    describe('ORM', () => {
      it('Test the postConnectionProcess', (done) => {
        expect(typeof connection).to.not.be.equal(undefined)
        expect(typeof options).to.not.be.equal(undefined)
        done()
      })
    })
  },
  type: 'mysql',
  host: 'localhost',
  port: '3306',
  username: 'root',
  password: '',
  database: 'test_database',
  synchronize: true,
  entities: [
    new EntitySchema({
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
  ]
}
