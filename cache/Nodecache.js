const Nodecache = require('node-cache');

/**
 * Wrapper over node-cache npm package.
 */
class NodeCache {

  /**
   * Constructor
   */
  constructor() {
    this.nodeCache = new Nodecache();
  }

  /**
   * Gets the value based on key.
   * @param {string} key 
   */
  get(key) {
    return this.nodeCache.get(key);
  }

  /**
   * Set the value for a key.
   */
  set(key, value) {
    return this.nodeCache.set(key, value);
  }

  /**
   * It returns true if key exists otherwise false.
   * @param {string} key 
   */
  has(key) {
    return this.nodeCache.has(key);
  }
}

module.exports = new NodeCache();