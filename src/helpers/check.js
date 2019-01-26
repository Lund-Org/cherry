module.exports = {
  /**
   * Check if the value itself is defined
   * @param {value} value The reference value
   * @return {boolean}
   */
  isSelfDefined: (value) => {
    return typeof value !== 'undefined'
  },
  /**
   * Check if the value itself is defined and not null
   * @param {value} value The reference value
   * @return {boolean}
   */
  isSelfDefinedAndNotNull: (value) => {
    return (typeof value !== 'undefined' && value !== null)
  },
  /**
   * Check if the value itself is defined and if the value is not null, 0, false...
   * @param {value} value The reference value
   * @return {boolean}
   */
  isSelfDefinedAndValid: (value) => {
    return (typeof value !== 'undefined' && value)
  },
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
