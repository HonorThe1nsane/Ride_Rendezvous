// const ObjectId = require('mongodb').ObjectId;
// const apiKey = process.env.API_KEY;

const mongodb = require('../db/connect');

const db = require('../models');
const carSchema = db.cars;

const getAllCars = async (req, res) => {
    const result = await mongodb.getDb().db('Ride_Rendezvous').collection('cars').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);

    });

};

const postCar = async (req, res) => {
    try {
        const cars = carSchema({
            carMake: req.body.carMake,
            carModel: req.body.carModel,
            engineSize: req.body.engineSize,
            color: req.body.color,
            year: req.body.year,
            price: req.body.price,
        });
        const data = await cars.save();
        res.json(data);
    } catch {
        res.status(400).json({ message: err });
    }
};

const updateCar = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    try {
        const data = await carSchema.updateOne({ _id: id }, { $set: body });

        if (data.modifiedCount == 0) {
            res.status(200).json({ message: "car doesn't exist", carData: data });
            return;
        }
        res.status(200).json({ message: "car updated", carData: data });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const deleteCar = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await carSchema.deleteOne({ _id: id });
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};
module.exports = { getAllCars, postCar, updateCar, deleteCar};