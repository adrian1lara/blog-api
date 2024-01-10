const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const postController = require("../controller/postController");
const commentController = require("../controller/commentController");
const replyController = require("../controller/replyController");
const auth = require("../middleware/auth");





// register
router.post("/blog-api/register", userController.create_user_post);

//login
router.post("/blog-api/login", userController.login_user_post);



//create post 
router.post("/blog-api/new-post", auth, postController.create_post);

// create comment
router.post("/blog-api/posts/:id/new-comment", auth, commentController.create_comment);

// get all users
router.get("/blog-api/users/allUsers", userController.get_users);

// get one user
router.get("/blog-api/users/:id", userController.get_one_user);



// get all posts
router.get("/blog-api/posts/allPosts", postController.get_all_post);

//get one post
router.get("/blog-api/post/:id", postController.get_one_post);

//get all comments
router.get("/blog-api/comments/allComments", commentController.get_all_comments);

// get all replies 
router.get("/blog-api/replies/allReplies", replyController.get_all_replies);

//create a comment reply 
router.post("/blog-api/comments/:id/new-reply", auth, replyController.new_reply);

// delete one post
router.post("/blog-api/delete/post/:id", auth, postController.delete_one_post);

// delete one comment 
router.post("/blog-api/delete/post/:postId/comment/:commentId", auth, commentController.delete_one_comment);

// auth
router.post("/welcome", auth, (req, res) => {
  res.status(200).send("welcome 🙌")
})

module.exports = router;
