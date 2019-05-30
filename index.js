var express = require('express')
var bodyParser = require('body-parser')
var user_route = require('./routes/userRoute')

var app = express()
var port = process.env.PORT || 8000
var prefix_api = "/api";

// parse data
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 
    
// use routes    
app.use(prefix_api, user_route)

// run
app.listen(port, () => console.log('Api running on port', port))