const axios = require("axios");
const CADDIE_API_KEY = process.env.CADDIE_API_KEY;

module.exports = {
    courseQuery
}

function courseQuery(req, res) {
    axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=golf+courses+name&key=${CADDIE_API_KEY}`,
    ).then(response => console.log(response))
}
