var express = require('express');
var router = express.Router();
const reviewCtrl = require('../controllers/reviews');

router.get('/:id/details')
router.post('/courses/:id/reviews', isLoggedIn, reviewCtrl.create);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/auth/google')
    }
  }

  module.exports = router;