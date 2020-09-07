const geoip = require('geoip-lite');

/**
 * It contains various utility methods.
 */
class Util {

  /**
   * It returns the location based on the IP address of the request.
   * @param {object} req request object.
   * @param {object} res response object.
   * @param {*} next function
   */
  static getLocationFromIP(req, res, next) {
    console.log('req ip : ',req.decodedParams);
    const ipAddress = req.decodedParams.ip;
    
    const lookUpObj = geoip.lookup(ipAddress);
    req.decodedParams['ipLocation'] = lookUpObj;
    next();
  }

  /**
   * It returns current timestamp.
   */
  static getTimestamp() {
    return Math.floor((new Date()).getTime() / 1000);
  }

}

module.exports = Util;