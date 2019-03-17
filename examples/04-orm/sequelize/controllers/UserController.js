module.exports = {
  /**
   * Display every users as json
   * @param {Request} req The incoming request
   * @param {Response} res The cherry Response
   */
  async index (req, res) {
    const dbConnection = req.cherry.ormManager.getConnection()
    const users = await dbConnection.User.findAll()

    res.json(users)
  },
  /**
   * Create a new user
   * @param {Request} req The incoming request
   * @param {Response} res The cherry Response
   */
  async create (req, res) {
    const dbConnection = req.cherry.ormManager.getConnection()

    try {
      const user = await dbConnection.User.create(JSON.parse(req.body))

      res.json(user)
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
    const user = await dbConnection.User.findByPk(req.routeParameters.id)

    if (user) {
      res.json(user)
    } else {
      res.json({}, { statusCode: 404 })
    }
  }
}
