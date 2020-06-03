const axios = require("axios");
const CADDIE_API_KEY = process.env.CADDIE_API_KEY;
const User = require("../models/user");
const Course = require('../models/course');

module.exports = {
  courseQuery,
  create,
  courseDetails,
  search,
  index,
  deleteCourse,
};

function index(req, res) {
  Course.find({
    user: req.user.id
  }, function (err, details) {
    res.render('courselist', {
      details
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
          courseId: place.place_id,
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

function create(req, res) {
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
      res.status(204).send();
    }
  })
}



function courseDetails(req, res) {
  const course = req.params.id
  const parsedData = JSON.parse(req.body.courseDetails);
  const courseId = parsedData.courseId;
  axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${courseId}&key=${CADDIE_API_KEY}`)
    .then(response => {
      const details = {
        name: response.data.result.name,
        address: response.data.result.formatted_address,
        phoneNumber: response.data.result.formatted_phone_number,
        photo: response.data.result.photos_reference
      }

      res.render('details', {
        details: details,
        course: course,
      })
    })
    .catch(error => {
      console.log(error);
    })
}

function deleteCourse(req, res) {
  console.log('who dat')
  Course.findByIdAndDelete(req.params.id, function (err, course) {
    res.redirect('courselist')
  })
}