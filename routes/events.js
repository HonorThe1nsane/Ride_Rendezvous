const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events');
const { check, validationResult } = require('express-validator');


router.get('/', eventsController.getAllEvents);

router.get('/:id', eventsController.getSingleEvent);

router.post('/', [
    check('eventName').not().trim().isEmpty().escape(),
    check('date').not().trim().isEmpty().escape(),
    check('time').not().trim().isEmpty().escape(),
    check('location').not().trim().isEmpty().escape(),
    check('organizer').not().trim().isEmpty().escape(),
], eventsController.createEvent);



module.exports = router;