module.exports = class Model {
  set (data) {
    if (typeof data !== 'undefined') {
      for (const index in data) {
        if (typeof this[index] !== 'undefined') {
          this[index] = data[index]
        }
      }
    }

    return this
  }
}
