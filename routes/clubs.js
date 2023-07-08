const express = require('express');
const router = express.Router();
const clubsController = require('../controllers/clubs');
const { check, validationResult } = require('express-validator');


router.get('/', clubsController.getAllClubs);

router.get('/:id', clubsController.getSingleClub);

router.post('/', [
    check('name').not().trim().isEmpty().escape(),
    check('location').not().trim().isEmpty().escape(),
    check('clubMembers').not().trim().isEmpty().escape(),
    check('president').not().trim().isEmpty().escape(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    clubsController.createClub
});

router.put('/:id', [
    check('name').not().trim().isEmpty().escape(),
    check('location').not().trim().isEmpty().escape(),
    check('clubMembers').not().trim().isEmpty().escape(),
    check('president').not().trim().isEmpty().escape(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    clubsController.updateClub
});

router.delete('/:id', clubsController.deleteClub);




module.exports = router;