var express      = require('express');
var app          = express();
var path         = require('path');
var index        = require('./routes/index');
var admin        = require('./routes/admin');
var login        = require('./routes/login');
var mongoose     = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mehndi');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/', index);
app.use('/admin', admin);
app.use('/login', login);

app.listen(3000);
