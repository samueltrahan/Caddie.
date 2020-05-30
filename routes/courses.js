const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/controller");

router.get("/", function (req, res) {
  res.render("courses", {
    courses: null,
  });
});

router.get("/api", (req, res) => {
  const query = req.query
  const googleAPIresponse = Ctrl.courseQuery(query).then(response => {
    console.log(response)
    return response
  });
  res.render("courses", {
    courses: null,
  })
});

// router.post('/courseapi/query', Ctrl.courseQuery);

module.exports = router;