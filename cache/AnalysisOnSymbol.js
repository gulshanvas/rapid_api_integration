const memcache = require('./Memcache');

/**
 * Cache for news analysis based on Symbol and api name.
 */
class AnalysisOnSymbol {

  /**
   * Constructor
   * @param {object} params 
   * @param {string} params.apiName 
   * @param {string} params.symbolName 
   */
  constructor(params) {
    this.apiName = params.apiName;
    this.symbolName = params.symbolName;
    this.cacheKey = params.apiName + params.symbolName;
  }

  /**
   * Fetches from cache based on cacheKey.
   */
  async fetch() {
    const response = await memcache.getAsync(this.cacheKey);
    return response;
  }

  /**
   * Sets the value for cacheKey.
   * @param {object} value 
   */
  async setToCache(value) {
    console.log('value : ', value);
    const response = await memcache.setAsync(this.cacheKey, value);

    return response;
  }

}
module.exports = AnalysisOnSymbol;