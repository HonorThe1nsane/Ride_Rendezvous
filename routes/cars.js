const express = require('express');
const router = express.Router();
const carsController = require('../controllers/cars');
const { check, validationResult } = require('express-validator');

//Get all cars
router.get('/', [
    check('carMake', 'Car make is required').not().trim().isEmpty().escape(),
    check('carModel', 'Car model is required').not().trim().isEmpty().escape(),
    check('engineSize', 'Engine size is required').not().trim().isEmpty().escape(),
    check('color', 'Color is required').not().trim().isEmpty().escape(),
    check('year', 'Year is required').not().trim().isEmpty().escape(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({ errors: errors.array() });
    } carsController.getAllCars(req, res)
});

//Get single car
router.get('/:id', [
    check('carMake', 'Car make is required').not().trim().isEmpty().escape(),
    check('carModel', 'Car model is required').not().trim().isEmpty().escape(),
    check('engineSize', 'Engine size is required').not().trim().isEmpty().escape(),
    check('color', 'Color is required').not().trim().isEmpty().escape(),
    check('year', 'Year is required').not().trim().isEmpty().escape(),
    check('price', 'Price is required').not().trim().isEmpty().escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    carsController.getSingleCar(req, res)
});

//Create new car
router.post('/', [
    check('carMake', 'Car make is required').not().trim().isEmpty().escape(),
    check('carModel', 'Car model is required').not().trim().isEmpty().escape(),
    check('engineSize', 'Engine size is required').not().trim().isEmpty().escape(),
    check('color', 'Color is required').not().trim().isEmpty().escape(),
    check('year', 'Year is required').not().trim().isEmpty().escape(),
    check('price', 'Price is required').not().trim().isEmpty().escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    carsController.createNewCar(req, res)
});

//Update car

router.put('/:id', [
    check('carMake', 'Car make is required').not().trim().isEmpty().escape(),
    check('carModel', 'Car model is required').not().trim().isEmpty().escape(),
    check('engineSize', 'Engine size is required').not().trim().isEmpty().escape(),
    check('color', 'Color is required').not().trim().isEmpty().escape(),
    check('year', 'Year is required').not().trim().isEmpty().escape(),
    check('price', 'Price is required').not().trim().isEmpty().escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    carsController.updateCar(req, res)
});

//Delete car
router.delete('/:id', carsController.deleteCar);



module.exports = router;
