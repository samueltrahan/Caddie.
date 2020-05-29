const axios = require('axios');
const CADDIE_API_KEY = process.env.CADDIE_API_KEY;

module.exports = {
    courseQuery,
}

function caddieQuery(req, res, next) {
    let zipcode = '';
    axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?query=golf+courses+${zipCode}&${CADDIE_API_KEY}`)
    .then(response => {
        res.render('courses/index', {
            results: response.data
        });
    })
    .catch(error => {
        console.log(error);
    })
}