var express      = require('express');
var http         = require('http');
var app          = express();
var path         = require('path');
var index        = require('./routes/index');
var admin        = require('./routes/admin');
var login        = require('./routes/login');
var mongoose     = require('mongoose');
var env          = process.env;


var url = 'mongodb://127.0.0.1:27017/' + (process.env.OPENSHIFT_APP_NAME || 'mehndi');

// if OPENSHIFT env variables are present, use the available connection info:
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    url = process.env.OPENSHIFT_MONGODB_DB_URL +
        process.env.OPENSHIFT_APP_NAME;
}

console.log(url)
mongoose.connect(url);

//mongoose.connect('mongodb://localhost:27017/mehndi');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/', index);
app.use('/admin', admin);
app.use('/login', login);

app.set('port', env.NODE_PORT || 3000);
//app.set('ip')

var server = http.createServer(app);
server.listen(env.NODE_PORT || 3000, env.NODE_IP || void 0, function () {
    console.log(`Application worker ${process.pid} started...`);
});