const axios = require("axios");
const CADDIE_API_KEY = process.env.CADDIE_API_KEY;
const User = require("../models/user");
const Course = require('../models/course');

module.exports = {
  courseQuery,
  saveCourse,
  courseDetails,
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

function saveCourse(req, res) {
  const parsedData = JSON.parse(req.body.courseToSave);
  const user = parsedData.user;
  const courseId = parsedData.courseId;

  const newCourse = new Course({
    id: courseId
  })
  const updatedUser = new User({
    ...user,
    courses: [...user.courses, newCourse]
  });

  User.update({
    _id: user._id
  }, updatedUser, function (err, raw) {
    if (!err) {
      res.redirect('/courses');
    }
  })
}

function courseDetails(req, res) {
  const query = req.query;
  axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${query.id}&key=${CADDIE_API_KEY}`)
    .then(apiResponse => {
      const courseDetails = apiResponse.data.results.map((place) => {
        return {
          name: place.name,
          address: place.formatted_address,
          id: place.id
        }
      });
      res.render('courselist', {
        courses: courseDetails
      })
    })
    .catch(error => {
      console.log(error);
    })
}