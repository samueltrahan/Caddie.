const axios = require("axios");
const CADDIE_API_KEY = process.env.CADDIE_API_KEY;
const User = require("../models/user");
const Course = require('../models/course');

module.exports = {
  courseQuery,
  saveCourse,
  courseDetails,
  search,
  index,

};

function index(req, res) {
  Course.find({
    user: req.user.id
  }, function (err, courses) {
    res.render('courselist', {
      courses
    })
  })
}

function search(req, res) {
  res.render("courses", {
    courses: null
  });
}


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
  const courseName = parsedData.name;

  const newCourse = new Course({
    courseId: courseId,
    user: user,
    name: courseName
  })
  newCourse.save(function (err) {
    if (!err) {
      res.render('courses')
    }
  })
}



function courseDetails(req, res) {
  console.log('who dat')
//   Course.find({
//     user: user
//   }).then(reponse => {

//   })
 }