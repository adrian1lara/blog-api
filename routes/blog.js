const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const postController = require("../controller/postController");
const commentController = require("../controller/commentController");
const replyController = require("../controller/replyController");
const auth = require("../middleware/auth");


// register
router.post("/register", userController.create_user_post);

//login
router.post("/login", userController.login_user_post);

//create post 
router.post("/new-post", auth, postController.create_post);

// create comment
router.post("/posts/:id/new-comment", auth, commentController.create_comment);

//create a comment reply 
router.post("/comments/:id/new-reply", auth, replyController.new_reply);

// auth
router.post("/welcome", auth, (req, res) => {
  res.status(200).send("welcome 🙌")
})

module.exports = router;
