const express = require('express');
const router = express.Router();
const carsController = require('../controllers/cars');
// const { check, validationResult } = require('express-validator');


router.get('/', carsController.getAllCars);

//router.get('/:id', carsController.getCarById);
module.exports = router;