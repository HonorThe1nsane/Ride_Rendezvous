
const ObjectId = require('mongodb').ObjectId;

const mongodb = require('../db/connect');

const db = require('../models');
const Event = db.events;

const apiKey = process.env.API_KEY;


//Restful
const getAllEvents = async (req, res) => {
    const result = await mongodb.getDb().db('Ride_Rendezvous').collection('events').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);

    });

};
//Swagger
exports.findAll = (req, res) => {

    console.log(req.header('apiKey'));
    if (req.header('apiKey') === apiKey) {
        Event.find(
            {},
            {
                eventName: 1,
                date: 1,
                time: 1,
                location: 1,
                organizer: 1,
                _id: 0,
            }
        )
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || 'Some error occurred while retrieving events.',
                });
            });
    } else {
        res.send('Invalid apiKey, please read the documentation.');
    }
};
//Restful
const getSingleEvent = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('Ride_Rendezvous').collection('events').find({ _id: userId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);

    });

};
// Swagger
exports.getSingleEvent = (req, res) => {

    const id = new ObjectId(req.params.id);
    console.log(id);
    if (req.header('apiKey') === apiKey) {
        Event.find({ _id: id })
            .then((data) => {
                if (!data)
                    res
                        .status(404)
                        .send({ message: 'No event found with id ' + id });
                else res.send(data[0]);
            })
            .catch((err) => {
                res.status(500).send({
                    message: 'Error retrieving event with id=' + id,
                });
            });
    } else {
        res.send('Invalid apiKey, please read the documentation.');
    }
};
// Rest client function
const createNewEvent = async (req, res) => {
    const event = {
        eventName: req.body.eventName,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        organizer: req.body.organizer
    };

    const response = await mongodb.getDb().db('Ride_Rendezvous').collection('events').insertOne(event);
    if (response.acknowledged) {
        res.status(201).json(response);
        console.log("Event added successfully");
    } else {
        res.status(500).json(response.error)
        console.log("Event not added, error: " + response.error);
    }
    console.log(response);
};

//Swagger
exports.createNewEvent = async (req, res) => {
    const event = {
        eventName: req.body.eventName,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        organizer: req.body.organizer
    };

    const response = await mongodb.getDb().db('Ride_Rendezvous').collection('events').insertOne(event);
    if (response.acknowledged) {
        res.status(201).json(response, 'Event created successfully');
    } else {
        res.status(500).json(response.error, 'Some error occurred while creating the event.');
    }
};
//Rest client function
const updateEvent = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Data to update cannot be empty!',
        });
    }
    const userId = new ObjectId(req.params.id);
    const event = {
        eventName: req.body.eventName,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        organizer: req.body.organizer
    };
    const response = await mongodb.getDb().db('Ride_Rendezvous').collection('events').replaceOne({ _id: userId }, event);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send('Event updated successfully');
    } else {
        res.status(500).json({ error: 'Some error occurred while updating the event in Ride_Rendezvous.' });
    }
};

//Swagger
exports.updateSingleEvent = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Data to update can not be empty!',
        });
    }

    const id = new ObjectId(req.params.id);

    Event.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Event with id=${id}. Maybe the event was not found!`,
                });
            } else res.send({ message: `Event id name=${eventName}} was updated successfully.` });
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating event with id=' + id,
            });
        });
};



//Rest Client
const deleteEvent = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('Ride_Rendezvous').collection('events').remove({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while deleting the event.');
    }
};

// Swagger

// Delete an Event with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Event.findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Event with id=${id}. The event was not found!`,
                });
            } else {
                res.send({
                    message: 'Event was deleted successfully!',
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete Event with id=' + id,
            });
        });
};


module.exports = { getAllEvents, getSingleEvent, createNewEvent, createNewEvent, updateEvent, deleteEvent};
