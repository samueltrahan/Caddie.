var express = require('express');
var router = express.Router();
const scoreCtrl = require('../controllers/score');



router.post('/courses/:id/scores', isLoggedIn, scoreCtrl.addScore);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/auth/google')
    }
  }

  module.exports = router;