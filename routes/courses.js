const express = require("express");
const router = express.Router();
const courseCtrl = require("../controllers/courses");

router.get("/", function (req, res) {
  res.render("courses", {
    courses: null,
  });
});

router.get("/api", isLoggedIn, courseCtrl.courseQuery)
router.post('/save', isLoggedIn, courseCtrl.saveCourse);
router.get('/show', isLoggedIn, courseCtrl.courseDetails);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/auth/google')
  }
}

// router.post('/courseapi/query', Ctrl.courseQuery);


module.exports = router;