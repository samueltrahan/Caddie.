const axios = require("axios");
const CADDIE_API_KEY = process.env.CADDIE_API_KEY;
const User = require("../models/user");

module.exports = {
  courseQuery,
  save,
};

function courseQuery(req, res) {
  const query = req.query;
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=golf+courses+${query.courses}&key=${CADDIE_API_KEY}`
    )
    .then((apiResponse) => {
      const placeNames = apiResponse.data.results.map((place) => {
        return {
          name: place.name,
          address: place.formatted_address,
          id: place.id,
        };
      });
      res.render("courses", {
        courses: placeNames,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function save(req, res) {
  const course = new Course({ id: req.body.courseId });
  course.save(function (err) {
    return res.render("courses", {
      courses: [],
    });
  });
}
