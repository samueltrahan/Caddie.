const express = require("express");
const router = express.Router();
const courseCtrl = require("../controllers/courses");

router.get('/search', isLoggedIn, courseCtrl.search);
router.get("/api", isLoggedIn, courseCtrl.courseQuery)
router.post('/save', isLoggedIn, courseCtrl.saveCourse);
router.get("/", isLoggedIn, courseCtrl.index);
//router.get('/:id/show', isLoggedIn, courseCtrl.courseDetails);
//router.get('/show', isLoggedIn, courseCtrl.show);



function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/auth/google')
  }
}




module.exports = router;