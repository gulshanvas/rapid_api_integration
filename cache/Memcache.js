const Memcached = require('memcached-promisify');
const cacheConfig = require('./config.json');
const cacheConstants = require('../constant/cacheConstant');

/**
 * Wrapper class over memcahe which exposes methods to interact with memcache.
 */
class Memcache {

  /**
   * Constructor
   */
  constructor() {
    this.memcacheObj = new Memcached(`${cacheConfig.serverIp}:${cacheConfig.port}`, { maxValue: cacheConfig.maxValue });
  }

  /**
   * 
   * @param {*} key 
   * @param {*} value 
   */
  async setAsync(key, value) {
    try {
      const data = await this.memcacheObj.set(key, value, cacheConstants.largeExpiryTimeInterval);
      return data;
    } catch (err) {
      console.error('err in setAsync memcache : ', err, key, value);
    }
  }

  /**
   * 
   * @param {*} key 
   */
  async getAsync(key) {
    try {
      const data = await this.memcacheObj.get(key);
      return data;
    } catch (err) {
      console.error('err in getAsync memcache:', err);
    }
  }
}

module.exports = new Memcache();