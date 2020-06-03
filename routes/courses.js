const express = require("express");
const router = express.Router();
const courseCtrl = require("../controllers/courses");

router.get('/search', isLoggedIn, courseCtrl.search);
router.get("/api", isLoggedIn, courseCtrl.courseQuery)
router.post('/save', isLoggedIn, courseCtrl.create);
router.get("/courselist", isLoggedIn, courseCtrl.index);
router.post('/:id/details', isLoggedIn, courseCtrl.courseDetails);
router.delete('/:id', isLoggedIn, courseCtrl.deleteCourse);




function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/auth/google')
  }
}




module.exports = router;