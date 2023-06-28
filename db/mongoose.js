const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.MONGODB_URI;

const connectDb = async () => {
  await mongoose.connect(URI);
  console.log("Database has been connected");
};

module.exports = connectDb;