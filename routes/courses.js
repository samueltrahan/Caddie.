const express = require("express");
const router = express.Router();
const courseCtrl = require("../controllers/courses");

router.get("/", function (req, res) {
  res.render("courses", {
    courses: null,
  });
});

router.get("/api", courseCtrl.courseQuery)
router.post('/save', courseCtrl.saveCourse);
router.get('/courselist', courseCtrl.courseDetails);

// router.post('/courseapi/query', Ctrl.courseQuery);

module.exports = router;