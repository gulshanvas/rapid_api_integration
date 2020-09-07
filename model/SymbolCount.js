const { connectionPool } = require('../database/mysql');
const Util = require('../lib/Util');

/**
 * Class represents SymbolCount table and various utilty methods to interact with it.
 */
class SymbolCount {

  /**
   * Inserts into SymbolCount table.
   * @param {object} params 
   */
  static async insert(params) {

    const poolPromise = connectionPool.promise();
    const currentTimestamp = Util.getTimestamp();
    await poolPromise.execute('insert into symbol_count (symbol, country, api_name, count, created_at, updated_at) values(?,?,?,?,?,?)',
      [params.symbol, params.country, params.api_name, params.count, currentTimestamp, currentTimestamp]);

  }

  /**
   * Increments count column for a unique key.
   */
  static async update(params) {
    console.log('params in update : ',params);
    const poolPromise = connectionPool.promise();
    await poolPromise.execute('update symbol_count set count = count + ? where symbol = ? and api_name = ?', [1, params.symbol, params.api_name]);

  }

  /**
   * Unique key index name in SymbolCount model.
   */
  static uniqueKeyIndexName() {
    return 'symbol_count.uk_1';
  }

  /**
   * Returns true if `err`is due to unique key constraint. 
   * @param {object} err Error object
   * @param {string} uniqueIndexName unique key index name
   */
  static isUniqueConstraintViolation(err) {
    return (err.message.indexOf(SymbolCount.uniqueKeyIndexName()) === -1 ? 0 : 1);
  }
}

module.exports = SymbolCount;