const User = require('../models/User')

module.exports = {
  /**
   * Display every users as json
   * @param {Request} req The incoming request
   * @param {Response} res The cherry Response
   */
  async index (req, res) {
    const dbConnection = req.cherry.ormManager.getConnection()
    const users = await dbConnection.manager.find(User)

    res.json(users)
  },
  /**
   * Create a new user
   * @param {Request} req The incoming request
   * @param {Response} res The cherry Response
   */
  async create (req, res) {
    const dbConnection = req.cherry.ormManager.getConnection()
    const user = new User(JSON.parse(req.body))

    try {
      await dbConnection.getRepository(User).save(user)
      res.json(user, { statusCode: 201 })
    } catch (e) {
      res.json(e, {
        statusCode: 400
      })
    }
  },
  /**
   * Display a specific user as json
   * @param {Request} req The incoming request
   * @param {Response} res The cherry Response
   */
  async show (req, res) {
    const dbConnection = req.cherry.ormManager.getConnection()
    const user = await dbConnection
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = :id', { id: req.routeParameters.id })
      .getOne()

    if (user) {
      res.json(user)
    } else {
      res.json({}, { statusCode: 404 })
    }
  }
}
