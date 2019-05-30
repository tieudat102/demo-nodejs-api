var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

// Register
router.post('/register', user_controller.register);

// Login
router.post('/login', user_controller.login);

module.exports = router;