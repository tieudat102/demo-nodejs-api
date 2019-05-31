var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');
var videoController = require('../controllers/videoController');

// List Video Youtube by Location
router.get('/video/location', userController.auth, videoController.listByLocation);

module.exports = router;