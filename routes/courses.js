const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/controller');

router.get('/', Ctrl.courseQuery);

module.exports = router;