const axios = require('axios');
const querystring = require('querystring');


module.exports.getVideoByLocation = async (location, locationRadius, pageToken = '') => {
    var params = {
        part: "snippet",
        type: "video",
        location: location,
        locationRadius: locationRadius + "km",
        maxResults: 5,
        key: process.env.GOOGLE_API_KEY
    };
    if (pageToken != '') {
        params.pageToken = pageToken;
    }
    var url = "https://www.googleapis.com/youtube/v3/search?" + querystring.stringify(params);
    const response = await axios.get(url).catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
        }
    });
    return response.data;
}
;


