const APIHandler = require('../lib/APIHandler');
const NewsOnSymbol = require('../cache/NewsOnSymbol');
const apiConstant = require('../constant/apiConstant');
const globalConstants = require('../constant/globalConstant');

/**
 * It provides response for get-news api.
 */
class GetNews {

  /**
   * Constructor.
   * @param {object} params 
   */
  constructor(params) {
    this.params = params;
    console.log('this.params : ', this.params);
  }

  /**
   * Main performer for the class.
   */
  async perform() {
    console.log('in perform of GetNews');

    const response = await this._fetchNews();

    return response;
  }

  /**
   * It fetches from cache if found. Otherwise it call api to get response.
   */
  async _fetchNews() {

    const newsOnSymbolCache = new NewsOnSymbol({
      apiName: apiConstant.fetchNews,
      symbol: this.params.symbol
    })

    let response = newsOnSymbolCache.fetch();

    if (!response) {
      console.log('fetching from api');
      response = await APIHandler.handle({
        apiName: apiConstant.fetchNews,
        queryParams: {
          'category': this.params.symbol,
          'region': this.params.ipLocation.country || globalConstants.defaultCountry
        }
      });

      // If the response for the symbol is not available/invalid.
      if (!response) {
        return;
      }

      newsOnSymbolCache.setToCache(JSON.stringify(response));
      return response;
    }

    return JSON.parse(response);
  }
}

module.exports = GetNews;