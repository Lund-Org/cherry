module.exports = {
  /**
   * Check if a key is defined in an object
   * @param {object} obj The reference object
   * @param {string} key The index to check
   * @return {boolean}
   */
  isDefined: (obj, key) => {
    return typeof obj[key] !== 'undefined'
  },
  /**
   * Check if a key is defined in an object and if the value is not null
   * @param {object} obj The reference object
   * @param {string} key The index to check
   * @return {boolean}
   */
  isDefinedAndNotNull: (obj, key) => {
    return (typeof obj[key] !== 'undefined' && obj[key] !== null)
  },
  /**
   * Check if a key is defined in an object and if the value is not null, 0, false...
   * @param {object} obj The reference object
   * @param {string} key The index to check
   * @return {boolean}
   */
  isDefinedAndValid: (obj, key) => {
    return (typeof obj[key] !== 'undefined' && obj[key])
  }
}
