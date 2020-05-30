const axios = require("axios");
const CADDIE_API_KEY = process.env.CADDIE_API_KEY;


function courseQuery(query) {
    return axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=golf+courses+${query.courses}&key=${CADDIE_API_KEY}`)
        .then(apiResponse => apiResponse.data)
}

module.exports = {
    courseQuery
}