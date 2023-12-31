const Comment = require("../model/comment");


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
