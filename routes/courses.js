const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/controller');

router.get('/', function(req, res, next) {
    res.render('courses', {
        results: null
    })
})

router.get('/placesapi/query', Ctrl.courseQuery);

module.exports = router;