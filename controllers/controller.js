const axios = require("axios");
const CADDIE_API_KEY = process.env.CADDIE_API_KEY;


function courseQuery(query) {
    let places;
    axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=golf+courses+${query.courses}&key=${CADDIE_API_KEY}`).then(apiResponse => {
        places = apiResponse.data;
    })
}

module.exports = {
    courseQuery
}