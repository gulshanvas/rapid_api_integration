const apiConstants = require('../constant/apiConstant');

/**
 * API configuration.
 */
class API {

  /**
   * It provides the api parameters for an api name.
   * @param {string} apiName Name of the api.
   */
  static getConfig(apiName) {

    let config;
    switch (apiName) {
      case apiConstants.fetchNews:
        config = {
          url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-news",
          method: 'GET',
          queryParams: { 'region': '', 'category': '' }
        };
        break;

      case apiConstants.fetchNewsAnalysis:
        config = {
          url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-analysis",
          method: 'GET',
          queryParams: { 'symbol': '' }
        };
        break;
    }

    return config;

  }
}

module.exports = API;