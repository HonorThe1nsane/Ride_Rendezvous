const express = require('express');
const router = express.Router();



router.get('/home', (req, res) => {
    res.send('This is our 341 team project.');
});

router.use('/person', require('./person'));
// router.use('/user', require('./events'));
router.use('/cars', require('./cars'));
// router.use('/', require('./swagger'));

module.exports = router;