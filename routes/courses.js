const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/controller");

router.get("/", function (req, res) {
  res.render("courses", {
    courses: null,
  });
});

router.post('/courseapi/query', Ctrl.courseQuery);

module.exports = router;
