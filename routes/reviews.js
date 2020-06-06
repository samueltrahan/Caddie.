var express = require('express');
var router = express.Router();
const reviewCtrl = require('../controllers/reviews');


router.post('/courses/:id/reviews', isLoggedIn, reviewCtrl.create);
router.post('/courses/:id/scores', isLoggedIn, reviewCtrl.addScore);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/auth/google')
    }
  }

  module.exports = router;