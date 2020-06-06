var express = require('express');
var router = express.Router();
const scoreCtrl = require('../controllers/score');


router.get('/courses/:id/edit', isLoggedIn, scoreCtrl.edit);
router.post('/courses/:id/scores', isLoggedIn, scoreCtrl.addScore);
router.post('/courses/update/:id', isLoggedIn, scoreCtrl.update);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/auth/google')
    }
}

module.exports = router;