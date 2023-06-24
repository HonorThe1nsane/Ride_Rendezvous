const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

router.get('/home', (req, res) => {
    res.send('This is our 341 team project.');
});
// router.use('/user', require('./events'));
// router.use('/person', require('./person'));
// router.use('/cars', require('./cars'));
// router.use('/', require('./swagger'));

module.exports = router;