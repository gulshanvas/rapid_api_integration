const unirest = require('unirest');
const APIConfig = require('../config/API');

/**
 * Class to fetch from Rapid API.
 */
class APIFetcher {

  /**
   * 
   * @param {object} params 
   */
  constructor(params) {
    this.apiName = params.apiName;
    this.queryParams = params.queryParams;

    this.queryParametersToBeSent = {};
  }

  /**
   * Main performer for the class which facilitates fetching of response from server.
   */
  async fetch() {

    this.config = APIConfig.getConfig(this.apiName);

    this.req = unirest(
      this.config.method,
      this.config.url
    );

    this._setHeaders();
    this._setQueryParams();
    const response = await this._sendToRapidAPIServer();
    console.log('response : ', response);
    return response;

  }

  /**
   * Sets the required headers for api call.
   */
  _setHeaders() {
    this.headers = {
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
      'x-rapidapi-key': 'f25df9cd8amshd33501ca0adab96p1a1b7ejsnfd552b0fd2a9',
      'useQueryString': true
    }

    this.req.headers(this.headers);
  }

  /**
   * Sets query parameters required for api call.
   */
  _setQueryParams() {

    for (let key in this.config.queryParams) {
      this.queryParametersToBeSent[key] = this.queryParams[key] || this.config.queryParams[key];
    }

    this.req.query(this.queryParametersToBeSent);
  }

  /**
   * Sends request to Rapid API server.
   */
  async _sendToRapidAPIServer() {
    console.log('in _sendToRapidAPIServer');
    return this.req.then(this._processResponse);
  }

  /**
   * Processes response from rapid api.
   * @param {object} response 
   */
  _processResponse(response) {
    if (response.error) throw new Error({ err: response.error, message: 'ERROR_FROM_RAPID_API' });
    return response.body;
  }
}

module.exports = APIFetcher;