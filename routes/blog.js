const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const postController = require("../controller/postController");
const commentController = require("../controller/commentController");
const replyController = require("../controller/replyController");
const auth = require("../middleware/auth");


// get all users
router.get("/blog-api/users/allUsers", userController.get_users);

// register
router.post("/blog-api/register", userController.create_user_post);

//login
router.post("/blog-api/login", userController.login_user_post);

//create post 
router.post("/blog-api/new-post", auth, postController.create_post);

// create comment
router.post("/blog-api/posts/:id/new-comment", auth, commentController.create_comment);


// get all replies 
router.get("/blog-api/replies/allReplies", replyController.get_all_replies);

//create a comment reply 
router.post("/blog-api/comments/:id/new-reply", auth, replyController.new_reply);

// auth
router.post("/welcome", auth, (req, res) => {
  res.status(200).send("welcome 🙌")
})

module.exports = router;
