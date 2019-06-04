var bcrypt = require('bcrypt');
var googleApi = require('../helpers/api/googleApi');

exports.listByLocation = async function (req, res) {
    try {
        if (!req.query.latitude || !req.query.longitude || !req.query.distance) {
            return res.status(400).send({message: "Invalid parameter"});
        }

        var location = req.query.latitude + "," + req.query.longitude
        var distance = req.query.distance;
		var pageToken = req.query.pageToken || "";

        var data = await googleApi.getVideoByLocation(location, distance, pageToken);
        res.json(data);
    } catch (error) {
        console.log("ERROR");
        res.status(400).json({message: "An occur error, please try again !"});
    }
};
