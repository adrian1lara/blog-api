require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
//const session = require("express-session");
const blogRouter = require('./routes/blog');


const app = express();

//app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: true }))


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());


app.use('/', blogRouter);


module.exports = app;
