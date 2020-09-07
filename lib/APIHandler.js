const memcache = require('../cache/Memcache');
const APIFetcher = require('./APIFetcher');

/**
 * Rapid api handler class.
 */
class APIHandler {

  /**
   * Main handler for the api requests.
   * @param {object} params 
   */
  static async handle(params) {

    console.log('params in API handler : ', params);

    let response = {};

    response = await new APIFetcher({
      apiName: params.apiName,
      symbolName: params.symbolName,
      queryParams: params.queryParams
    }).fetch();

    return response;
  }

}

module.exports = APIHandler;
