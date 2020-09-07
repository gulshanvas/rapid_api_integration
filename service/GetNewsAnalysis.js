const APIHandler = require('../lib/APIHandler');
const AnalysisOnSymbolCache = require('../cache/AnalysisOnSymbol');
const SymbolCountModel = require('../model/SymbolCount');
const apiConstant = require('../constant/apiConstant');
const globalConstants = require('../constant/globalConstant');

/**
 * Service class to get news analysis.
 */
class GetNewsAnalysis {

  /**
   * Constructor
   * @param {object} params 
   */
  constructor(params) {
    this.params = params;
  }

  /**
   * Main performer of the class.
   */
  async perform() {
    console.log('in perform of GetNewsAnalysis');
    const response = await this._fetch();
    const symbolCountParams = {
      symbol: this.params.symbol,
      api_name: apiConstant.fetchNewsAnalysis,
      country: this.params.ipLocation.country || globalConstants.defaultCountry,
      count: 0
    };

    await this._updateSymbolCount(symbolCountParams);

    return response;
  }

  /**
   * Fetches from Cache. If not found then fetches using Rapid API.
   */
  async _fetch() {
    const analysisOnSymbolCache = new AnalysisOnSymbolCache({
      apiName: apiConstant.fetchNewsAnalysis,
      symbolName: this.params.symbol
    }
    );

    let response = await analysisOnSymbolCache.fetch();

    if (!response) {
      console.log('fetching from api');
      response = await APIHandler.handle({
        apiName: apiConstant.fetchNewsAnalysis,
        symbolName: 'US',
        queryParams: {
          'symbol': this.params.symbol,
        }
      });

      // If the response for the symbol is not available/invalid.
      if (!response) {
        return;
      }

      // set to cache.
      await analysisOnSymbolCache.set(JSON.stringify(response));
      return response;
    }

    return response;
  }

  /**
   * Inserts/Updates SymbolCount model.
   * @param {object} symbolCountParams 
   */
  async _updateSymbolCount(symbolCountParams) {
    await SymbolCountModel.insert(symbolCountParams).catch(async (err) => {
      if (SymbolCountModel.isUniqueConstraintViolation(err, SymbolCountModel.uniqueKeyIndexName())) {
        await SymbolCountModel.update(symbolCountParams);
        return;
      }
      return Promise.reject(err);
    });
  }
}

module.exports = GetNewsAnalysis