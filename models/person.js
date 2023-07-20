const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    birthday: String,
    city: String,
    state: String,
});

module.exports = mongoose.model("persons", personSchema);
