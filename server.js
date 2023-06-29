const express = require("express");
const mongodb = require("./db/connect");
const mongoose = require("./db/mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 8080;

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"));

mongoose();
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on http://localhost:${port}`);
  }
});
