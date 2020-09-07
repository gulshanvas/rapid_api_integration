const { connectionPool } = require('../database/mysql');
const APIHandler = require('../lib/APIHandler');
const apiConstant = require('../constant/apiConstant');
const AnalysisOnCache = require('../cache/AnalysisOnSymbol');

/**
 * 
 */
class UpdateNewsAnalysis {

  /**
   * Main performer of the class.
   */
  async perform() {
    console.log('In UpdateNewsAnalysis');
    try {
      this.poolPromise = connectionPool.promise();
      this.noOfPopularSymbolVsCountry = process.env.POPULAR_SYMBOL_VS_COUNTRY_COUNT;

      console.log('this.noOfPopularSymbolVsCountry : ', this.noOfPopularSymbolVsCountry);

      await this._fetchFromSymbolCount();
      console.log('this.rows ;', this.rows);
      if (this.rows.length === 0) {
        return;
      }
      console.log('after updatenews analysus ', this.rows);
      await this._updateSymbolCount();
      await this._update();

    } catch (err) {
      console.error('error in UpdateNewsAnalysis cron : ', err);
    }
  }

  /**
   * It fetches records from Symbol count model based on popularity.
   */
  async _fetchFromSymbolCount() {
    const symbolCountModelResponse = await this.poolPromise.execute('select * from symbol_count where count !=0 order by count desc limit ?',
      [this.noOfPopularSymbolVsCountry]);

    this.rows = symbolCountModelResponse[0];
  }

  /**
   * It fetches from API and update the cache.
   */
  async _update() {
    const promises = [];

    this.rows.forEach(row => this._fetchFromAPI(row.symbol));

  }

  /**
   * Fetches using rapid API and calls to update cache.
   * @param {string} symbol Symbol name
   */
  async _fetchFromAPI(symbol) {
    return APIHandler.handle({
      apiName: apiConstant.fetchNewsAnalysis,
      symbolName: 'US',
      queryParams: {
        'symbol': symbol,
      }
    }).then(async (response) => {
      const cache = new AnalysisOnCache({
        apiName: apiConstant.fetchNewsAnalysis,
        symbolName: symbol
      });

      await cache.setToCache(response);
    }).catch((err) => {
      console.error(`failure while fetching from api for symbol ${symbol} : ${JSON.stringify(err)}`)
    });
  }

  /**
   * It resets all the count in the SymbolCount model.
   */
  async _updateSymbolCount() {
    await this.poolPromise.execute('update symbol_count set count = 0');
  }
}

module.exports = new UpdateNewsAnalysis();
