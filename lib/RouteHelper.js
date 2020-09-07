/**
 * Helper class which is the redirection point from route layer.
 * It calls the service, parse the response and returns it.
 */
class RouteHelper {

  /**
   * Main performer of the class.
   * @param {*} req request object
   * @param {*} res response object
   * @param {*} service Service name to be called.
   */
  static async perform(req, res, service) {

    const Service = require('../service' + service);
    const serviceParams = Object.assign(req.decodedParams, req.params);

    const serviceObj = new Service(serviceParams);

    try {
      const response = await serviceObj.perform();

      return res.status(200).json(response);
    } catch (err) {
      console.error('err in route helper : ', err)
      return res.status(400).json(err);
    }
  }

}

module.exports = RouteHelper;