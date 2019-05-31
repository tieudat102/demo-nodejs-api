var bcrypt = require('bcrypt');
var googleApi = require('../helpers/api/googleApi');

exports.listByLocation = async function (req, res) {
    try {
        if (!req.body.lat || !req.body.lng || !req.body.distance) {
            return res.status(400).send({message: "Invalid parameter"});
        }

        var location = req.body.lat + "," + req.body.lng
        var distance = req.body.distance;

        var data = await googleApi.getVideoByLocation(location, distance);
        res.json(data);
    } catch (error) {
        console.log("ERROR");
        res.status(400).json({error: "Invalid parameter"});
    }
};
