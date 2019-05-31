require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var userRoute = require('./routes/userRoute');
var videoRoute = require('./routes/videoRoute');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var app = express();
var port = process.env.PORT || 8000;
var prefix_api = "/api";

// connect database mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB_HOST, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true)

// parse data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// production error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({'errors': {
            message: err.message,
            error: {}
        }});
});

// get user from access token
app.use(function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET_KEY, function (err, user) {
            if (err)
                req.user = null;
            req.user = user;
            next();
        });
    } else {
        req.user = null;
        next();
    }
});

// use routes    
app.use(prefix_api, userRoute);
app.use(prefix_api, videoRoute);


// run
app.listen(port, () => console.log('Api running on port', port));