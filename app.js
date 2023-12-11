require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");

const userController = require("./controller/userController");
const postController = require("./controller/postController");
const commentController = require("./controller/commentController");
const replyController = require("./controller/replyController");
const auth = require("./middleware/auth");


const app = express();

//app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: true }))


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());


// register
app.post("/register", userController.create_user_post);

//login
app.post("/login", userController.login_user_post);

//create post 
app.post("/new-post", auth, postController.create_post);

// create comment
app.post("/posts/:id/new-comment", auth, commentController.create_comment);

//create a comment reply 
app.post("/comments/:id/new-reply", auth, replyController.new_reply);

// auth
app.post("/welcome", auth, (req, res) => {
  res.status(200).send("welcome 🙌")
})


module.exports = app;
