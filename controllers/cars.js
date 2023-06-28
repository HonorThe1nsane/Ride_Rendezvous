// const ObjectId = require('mongodb').ObjectId;
// const apiKey = process.env.API_KEY;

const mongodb = require('../db/connect');

const db = require('../models');
const Car = db.cars;

const getAllCars = async (req, res) => {
    const result = await mongodb.getDb().db('Ride_Rendezvous').collection('cars').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);

    });

};

module.exports = { getAllCars };