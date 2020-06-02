const axios = require("axios");
const CADDIE_API_KEY = process.env.CADDIE_API_KEY;
const User = require("../models/user");
const Course = require('../models/course');

module.exports = {
  courseQuery,
  saveCourse,
  //courseDetails,
  search,
  index,

};

function index(req, res) {
  User.find({
    user: req.user.id
  }, function (err, courses) {
    res.render('courselist', {
      courses: req.user.courses
    })
  })
}

function search(req, res) {
  res.render("courses", {
    courses: null
  });
}

// function show(req, res) {
//   User.find({
//     user: req.user.courses
//   }, function (err, courses) {
//     res.render('courselist', {
//       courses: user
//     })
//   })
// }

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



// function courseDetails(req, res) {
//   const courseId = parsedData.courseId;
//   axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${courseId}&key=${CADDIE_API_KEY}`)
//     .then((apiResponse => {
//         const courseDetails = apiResponse.results.data.map((place) => {
//           return {
//             name: place.name,
//             address: place.formatted_address
//           }
//         })
//         res.render('/courselist', {
//           courses: courseDetails,
//         })
//       })
//       .catch(error => {
//         console.log(error);
//       }))
// }