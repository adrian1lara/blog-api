const Comment = require("../model/comment");
const Post = require("../model/post");

// handle delete comment
exports.delete_one_comment = async(req, res, next) => {
  try {
    
    const commentId = req.params.commentId;
    const postId = req.params.postId;

    if(!commentId || !postId) {
      res.status(400).json({error :"Comment  ID or postId not provided"})
    }

    const comment = await Comment.findById(commentId)
    const post = await Post.findById(postId)


    if(!comment) {
      res.status(404).json({error: "Comment not found"})
    }

    if(!post) {
      res.status(404).json({error: "Post not found"})
    }

    if(
      req.user.user_id == comment.user ||
      req.user.user_id == post.user
    ) {

      await Comment.findByIdAndDelete(commentId)
      return res.status(200).json({message: "Comment deleted successfully"})
    } else {
      return res.status(403).json({error: "Unauthorized to delete comment"})
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({error: error.message})
  }
}

exports.get_all_comments = async (req, res, next) => {
  try {
    
    const comments = await Comment.find();

    if(!comments) {
      res.status(400).send("Comments not found")
    }

    res.status(200).send(comments)

  } catch (error) {
    console.log(error)
    res.status(500).send({error: message})
  }
}

exports.create_comment = async (req, res, next) => {
  try {

    const userId = req.user.user_id;

    const postId = req.params.id;

    if (!userId || !postId) {
      return res.status(400).json({ error: 'User ID and Post ID is requried' })
    }

    const { comment } = req.body;

    const newComment = await Comment.create({
      user: userId,
      post: postId,
      comment: comment,
    })

    res.status(201).json({ message: 'Comment created succesfully', comment: newComment })

  } catch (error) {

    console.error(error)
    res.status(500).json({ error: "Internal Server Error", message: error.message })
  }
}
