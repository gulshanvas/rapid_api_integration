const Utils = require('./Util');

/**
 * Utility class which helps to deal with cookies of request/response.
 */
class CookieHelper {

  /**
   * Parses IP address of the request.
   * 
   * @param {object} req request object
   * @param {object} res response object
   * @param {function} next 
   */
  parseIP(req, res, next) {
    const ipAddress = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    const sanitizedIp = ipAddress.split(':').slice(-1)[0];  
    req.decodedParams = { ip: sanitizedIp };

    console.log('req.decodedParams : ',req.decodedParams);
    next();
  }

}

module.exports = new CookieHelper();