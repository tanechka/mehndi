var express      = require('express');
var router       = express.Router();
var cookieParser = require('cookie-parser');
var mongoose     = require('mongoose');
var bodyParser   = require('body-parser');

/* renders login template */
router.use(cookieParser());

var parseUrl = bodyParser.urlencoded({extended: false});
var db = mongoose.connection;

/* creates scheme */
var Schema = mongoose.Schema;

//portfolio schema
var portfolio = new Schema({
  _id: String,
  name: String,
  category: String,
  path: String,
  size: String,
  price: String
});

var portfolioVer;
var getPortfolioModel = mongoose.model("Model2", portfolio, "portfolio");

router.route('/')
  .get(function (request, response) {
      getPortfolioModel.find({}, function (err, data) {
        if (err) throw err;
        portfolioVer = data.reverse();
      });
      console.log(portfolioVer)
      response.render('index', { portfolioList: portfolioVer.reverse() });
});

module.exports = router;
