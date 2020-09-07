const nodecache = require('./Nodecache');
const cacheConstants = require('../constant/cacheConstant');

/**
 * Cache based on Symbol for News api.
 */
class NewsOnSymbol {

  /**
   * Constructor
   * @param {object} params 
   */
  constructor(params) {
    this.apiName = params.apiName;
    this.symbol = params.symbol;
    this.cacheKey = params.apiName + params.symbolName;
  }

  /**
   * Fetches from cache based on `cacheKey`.
   */
  fetch() {
    return nodecache.get(this.cacheKey);
  }

  /**
   * Set the `value` for cacheKey.
   * @param {object} value 
   */
  setToCache(value) {
    return nodecache.set(this.cacheKey, value, cacheConstants.mediumExpiryTimeInterval);
  }

  /**
   * It returns true if the key exists in cache otherwise false.
   * @param {string} key 
   */
  has() {
    return nodecache.has(this.cacheKey);
  }

}

module.exports = NewsOnSymbol;