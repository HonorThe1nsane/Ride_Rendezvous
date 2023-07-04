const db = require("../models/index");
const personSchema = db.person;

const getAll = async (req, res) => {
    try {
        const result = await personSchema.find();
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const getSpecific = async (req, res) => { 
    try {
        const { id } = req.params;  
        const result = await personSchema.findById(id);
        res.json({ message: "user found", result: result });
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

const postPerson = async (req, res) => {
    try {
        const users = personSchema({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            birthday: req.body.birthday,
            city: req.body.city,
            state: req.body.state,
        });
        const data = await users.save();
        res.json({ message: "congratulations you created a new user", date: data });
    } catch {
        res.status(400).json({ message: err });
    }
};

const updatePerson = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    try {
        const data = await personSchema.updateOne({ _id: id }, { $set: body });

        if (data.modifiedCount == 0) {
            res.status(200).json({ message: "user doesn't exist", userData: data });
            return;
        }
        res.status(200).json({ message: "user updated", userData: data });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const deletePerson = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await personSchema.deleteOne({ _id: id });
        res.status(200).json({message: "Congrats a user has been deleted.", data: data});
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

module.exports = {
    getAll,
    getSpecific,
    postPerson,
    updatePerson,
    deletePerson,
};
