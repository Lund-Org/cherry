class RouteException extends Error {
  constructor (name) {
    super(`An error occured : The option '${name}' is missing in the route definition`)
    this.routeName = name
  }
}

module.exports = RouteException
