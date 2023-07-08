const express = require('express');
const router = express.Router();



router.get('/home', (req, res) => {
    res.send('This is our 341 team project.');
});

router.use('/person', require('./person'));

router.use('/cars', require('./cars'));

router.use('/events', require('./events'));

router.use('/clubs', require('./clubs'));


module.exports = router;