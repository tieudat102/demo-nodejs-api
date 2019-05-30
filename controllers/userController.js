var bcrypt = require('bcrypt');
var User = require('../models/userModel');

exports.register = function (req, res) {
    var newUser = new User(req.body);

    if (req.body.password) {
        newUser.password = bcrypt.hashSync(req.body.password, 10);
    }

    newUser.save((err, user) => {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            user.password = undefined;
            return res.json(user);
        }
    });
};

exports.login = function (req, res) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({message: "please input username and password"});
    }

    User.findOne({username: req.body.username}, (err, user) => {
        if (err) {
            return res.status(400).send({message: err});
        }

        if (!user || !user.comparePassword(req.body.password)) {
            return res.status(401).json({message: 'Authentication failed.'});
        }

        res.status(200).json({user: user.toJsonData(), access_token: user.getAccessToken()});
    });
};
