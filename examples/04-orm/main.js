// const path = require('path')
const routes = require('./routes')
const Cherry = require('../../src/cherry')
const CherryTypeormConnector = require('@lund-org/cherry-typeorm-connector')
const Schemas = require('./typeorm/entities')
const CherrySequelizeConnector = require('@lund-org/cherry-sequelize-connector')
// const SequelizeEntities = require('./sequelize/entities')

const typeormConfig = {
  type: 'mysql',
  host: 'localhost',
  port: '4006',
  username: 'root',
  password: 'demo04',
  database: 'db_example',
  synchronize: true,
  entities: Schemas
}

// const sequelizeConfig = {
//   dialect: 'mysql',
//   host: 'localhost',
//   port: '4006',
//   username: 'root',
//   password: 'demo04',
//   database: 'db_example',
//   sync: true,
//   postConnectionProcess: async (connection, options) => {
//     SequelizeEntities.register(connection)
//     if (options.sync) {
//       connection.sync()
//     }
//   }
// }

const options = {
  onError: (req, res, e) => {
    console.log(e)
    res.writeHead(404)
    res.end('An error occured')
  },
  servers: [
    {
      port: 4005
    }
  ],
  plugins: [ CherrySequelizeConnector, CherryTypeormConnector ],
  database: typeormConfig
  // database: sequelizeConfig
}

const cherry = new Cherry()
cherry.configure(routes, [], options)
cherry.start(options)
