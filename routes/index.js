const express = require('express');
const RouteHelper = require('../lib/RouteHelper');
const Util = require('../lib/Util');

const router = express.Router();

router.get('/get-news-analysis/:symbol', Util.getLocationFromIP, async function (
  req,
  res,
  next
) {

  return RouteHelper.perform(req, res, '/GetNewsAnalysis');

});

router.get('/get-news/:symbol', Util.getLocationFromIP, async function (
  req,
  res,
) {

  return RouteHelper.perform(req, res, '/GetNews');

});

module.exports = router;