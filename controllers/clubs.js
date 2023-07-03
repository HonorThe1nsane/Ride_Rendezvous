const mongodb = require('../db/connect');

const db = require('../models');
const Club = db.club;

const getAllClubs = async (req, res) => {
    const result = await mongodb.getDb().db('Ride_Rendezvous').collection('club').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);

    });

};

module.exports = { getAllClubs };