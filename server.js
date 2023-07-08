const express = require("express");
const mongodb = require("./db/connect");
const mongoose = require("./db/mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const { auth } = require('express-openid-connect');

const port = process.env.PORT || 8080;



const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:8080',
  clientID: '2vTI5TybiL6NNHGUW7UBnZH54g6kUCce',
  issuerBaseURL: 'https://dev-n7fxs16dbdbppjpg.us.auth0.com'
};

app
  // auth router attaches /login, /logout, and /callback routes to the baseURL
  .use(auth(config))
  // req.isAuthenticated is provided from the auth router
  .get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')})
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
