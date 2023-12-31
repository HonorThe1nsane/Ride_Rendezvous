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
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

app.get('/logout', (req, res) => {
  req.logout(); // This will trigger the logout process
  res.redirect('/home'); // Redirect the user back to the homepage or another desired page
});

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

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    mongoose();
    console.log(`Connected to DB and listening on http://localhost:${port}`);
  }
});
