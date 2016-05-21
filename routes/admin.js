var express      = require('express');
var router       = express.Router();
var mongoose     = require('mongoose');
var cookieParser = require('cookie-parser');
var mongoose     = require('mongoose');
var bodyParser   = require('body-parser');
var jsdom        = require("jsdom");
var Q            = require('q');

/* renders login template */
router.use(cookieParser());

var parseUrl = bodyParser.urlencoded({extended: false});
var db = mongoose.connection;

/* creates scheme */
var Schema = mongoose.Schema;
var portfolioObj;

//portfolio schema
var portfolio = new Schema({
  _id: String,
  name: String,
  category: String,
  path: String,
  size: String,
  price: String
});

var portfolioModel = mongoose.model("Model1", portfolio, "portfolio");

  router.route('/')
    .get(function (request, response) {
      var key = JSON.stringify(request.cookies.token);
      if(key == null){
        response.redirect('/login');
     }else{
        portfolioModel.find({}, function (err, data) {
          if (err) throw err;
            response.render('admin', { portfolio: data.reverse() });
        });
     }
  });


router.route('/')
.post(parseUrl, function(request, response){
  if(request.body.logout !== undefined){
    response.clearCookie('token');
    response.redirect('/admin');
    return;
  }
  if(request.body.id === undefined){
    createNewPortfolio(request, response);
  }else{
    deleteCurrentPortfolio(request, response, request.body.id);
  }

});

function createNewPortfolio(request, response){
  var post = request.body;
  var ObjectId = mongoose.Types.ObjectId();

  portfolioObj = {
    _id: ObjectId,
    name: post.name,
    category: post.category,
    path: post.path,
    size: post.size,
    price: post.price
  };

  var portfolioSave = new portfolioModel(portfolioObj);

  portfolioSave.save(function(error) {
    if(error) {
      console.log(error);
      return;
    }else{
      response.redirect(request.get('referer'));
    }
  });
}

function deleteCurrentPortfolio(request, response, id){
portfolioModel.remove({ _id: id}, function(err) {
    var promise = new mongoose.Promise();
    if (err) {
      console.log('error!');
      return;
    }
    //response.end(response.redirect(request.get('referer')));
    response.render('admin', { portfolio: portfolio.reverse() });
  });

}
module.exports = router;
