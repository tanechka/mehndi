var express      = require('express');
var router       = express.Router();
var mongoose     = require('mongoose');
var bodyParser   = require('body-parser');
var crypto       = require('crypto');
var cookieParser = require('cookie-parser');
var token        = crypto.randomBytes(64).toString('hex');

router.use(cookieParser());
var parseUrlencoded = bodyParser.urlencoded({extended: false});

/* connects with db */
var db = mongoose.connection;

/* creates scheme */
var Schema = mongoose.Schema;
var getData;

// login schema
var adminLogin = new Schema({
  password: String,
  user: String
});

var adminLoginModel = mongoose.model("Model", adminLogin, "admin");

/* gets admin data */
adminLoginModel.findOne({}, function (err, data) {
  if (err) throw err;
  getData = data;
});

router.route('/')
  .get(function (request, response) {
    response.render('login');
  });

/* post data */
router.route('/')
  .post(parseUrlencoded, function (request, response) {
    var post = request.body;
    if (post.user == getData.user && post.password == getData.password) {
      response.cookie('token' , token);
      response.redirect('/admin');
      return response.end();
    } else {
      response.render('login.ejs', { message: 'incorrectly entered data' });
      return response.end();
    }
  });
module.exports = router;
