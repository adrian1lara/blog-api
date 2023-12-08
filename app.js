require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cors = require("cors");
const userController = require("./controller/userController");
const auth = require("./middleware/auth");

const app = express();

app.use(express.json());
app.use(cors());


// register
app.post("/register", userController.create_user_post);

//login
app.post("/login", userController.login_user_post);

// auth
app.post("/welcome", auth, (req, res) => {
  res.status(200).send("welcome 🙌")
})


module.exports = app;
