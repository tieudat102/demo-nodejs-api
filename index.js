require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var user_route = require('./routes/userRoute');
var mongoose = require('mongoose');
//var User = require('./models/userModel');
        
var app = express();
var port = process.env.PORT || 8000;
var prefix_api = "/api";

// connect database mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB_HOST, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true)

// parse data
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 
    
// use routes    
app.use(prefix_api, user_route);

// production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

// run
app.listen(port, () => console.log('Api running on port', port));