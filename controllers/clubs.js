
const ObjectId = require('mongodb').ObjectId;

const mongodb = require('../db/connect');

const db = require('../models');
const Club = db.clubs;

const apiKey = process.env.API_KEY;


//Restful
const getAllClubs = async (req, res) => {
    const result = await mongodb.getDb().db('Ride_Rendezvous').collection('clubs').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);

    });

};
//Swagger
exports.findAll = (req, res) => {

    console.log(req.header('apiKey'));
    if (req.header('apiKey') === apiKey) {
        Club.find(
            {},
            {
                name: 1,
                location: 1,
                president: 1,
                clubMembers: 1,
                _id: 0,
            }
        )
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || 'Some error occurred while retrieving clubs.',
                });
            });
    } else {
        res.send('Invalid apiKey, please read the documentation.');
    }
};
//Restful
const getSingleClub = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('Ride_Rendezvous').collection('clubs').find({ _id: userId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);

    });

};
// Swagger
exports.getSingleClub = (req, res) => {

    const id = new ObjectId(req.params.id);
    console.log(id);
    if (req.header('apiKey') === apiKey) {
        Club.find({ _id: id })
            .then((data) => {
                if (!data)
                    res
                        .status(404)
                        .send({ message: 'No club found with id ' + id });
                else res.send(data[0]);
            })
            .catch((err) => {
                res.status(500).send({
                    message: 'Error retrieving club with id=' + id,
                });
            });
    } else {
        res.send('Invalid apiKey, please read the documentation.');
    }
};
// Rest client function
const createNewClub = async (req, res) => {
    const club = {
        name: req.body.name,
        location: req.body.location,
        president: req.body.president,
        clubMembers: req.body.clubMembers
    };

    const response = await mongodb.getDb().db('Ride_Rendezvous').collection('clubs').insertOne(club);
    if (response.acknowledged) {
        res.status(201).json(response);
        console.log("Club added successfully");
    } else {
        res.status(500).json(response.error)
        console.log("Club not added, error: " + response.error);
    }
    console.log(response);
};

//Swagger
exports.createNewClub = async (req, res) => {
    const club = {
        name: req.body.name,
        location: req.body.location,
        president: req.body.president,
        clubMembers: req.body.clubMembers
    };

    const response = await mongodb.getDb().db('Ride_Rendezvous').collection('clubs').insertOne(club);
    if (response.acknowledged) {
        res.status(201).json(response, 'Club created successfully');
    } else {
        res.status(500).json(response.error, 'Some error occurred while creating the club.');
    }
};
//Rest client function
const updateClub = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Data to update cannot be empty!',
        });
    }
    const userId = new ObjectId(req.params.id);
    const club = {
        name: req.body.name,
        location: req.body.location,
        president: req.body.president,
        clubMembers: req.body.clubMembers
    };
    const response = await mongodb.getDb().db('Ride_Rendezvous').collection('clubs').replaceOne({ _id: userId }, club);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send('Club updated successfully');
    } else {
        res.status(500).json({ error: 'Some error occurred while updating the club in Ride_Rendezvous.' });
    }
};

//Swagger
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Data to update can not be empty!',
        });
    }

    const id = new ObjectId(req.params.id);

    Club.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Club with id=${id}. Maybe the Club was not found!`,
                });
            } else res.send({ message: `Club id name=${name}} was updated successfully.` });
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating Club with id=' + id,
            });
        });
};



//Rest Client
const deleteClub = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('Ride_Rendezvous').collection('clubs').deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while deleting the Club.');
    }
};

// Swagger

// Delete a Club with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Club.findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Club with id=${id}. The club was not found!`,
                });
            } else {
                res.send({
                    message: 'Club was deleted successfully!',
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete Club with id=' + id,
            });
        });
};


module.exports = { getAllClubs, getSingleClub, createNewClub, updateClub, deleteClub };
