const axios = require('axios');
const CADDIE_API_KEY = process.env.CADDIE_API_KEY;

module.exports = {
    courseQuery,
}

function courseQuery(req, res) {
    let zipCode = '';
    axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=golf+courses&key=AIzaSyC9AzVdKCvnShvQSWjBHyuxqTHYa2fFuDk}`, ).then(response => {
        console.log(response);
        res.render('courses/index', {
            results: response.data
        })
    })
}