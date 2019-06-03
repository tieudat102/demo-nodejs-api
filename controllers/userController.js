var bcrypt = require('bcrypt');
var User = require('../models/userModel');

async function checkUsername(value) {
    var result = await User.findOne({username: value}).exec();
    console.log(result);
    return result;
}

exports.register = async function (req, res) {
    if (!req.body.username || !req.body.password || !req.body.full_name) {
        return res.status(400).send({message: "Invalid parameter"});
    }
    
    const count = await User.countDocuments({username: req.body.username});
    if(count > 0){
        return res.status(400).send({message: "Username already exist"});
    }
    
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
            return res.status(401).json({message: 'Username or Password not correct!'});
        }

        data = user.toJsonData();
        data.access_token = user.getAccessToken();

        res.status(200).json({user: data});
    });
};

exports.auth = function (req, res, next) {
    if (req.user == null) {
        return res.status(401).json({"message": "Unauthorization !"});
    }
    next();
};
