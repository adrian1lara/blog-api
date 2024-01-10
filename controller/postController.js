const Post = require("../model/post");
const Comment = require("../model/comment");
const Reply = require("../model/reply");



// delete one post
exports.delete_one_post = async (req, res, next) => {
  try {
    
    const postId = req.params.id

    if(!postId) {
      res.status(404).json("Post not found")
    }

  

    const [ postDeleteResult, commentDeleteResult, repliesDeleteResult ] = await Promise.all([
      Post.findByIdAndDelete(postId),
      Comment.deleteMany({post: postId}),
      Reply.deleteMany({ comment: await Comment.find({post: postId})})
    ])

    res.status(200).json("Post and associated comments (including replies) deleted successfully")

  } catch (error) {
    console.log(error)
    res.status(500).json({error: message})
  }
}

// get all posts
exports.get_all_post = async (req, res, next) => {
  try {
    // get the post
    const posts = await Post.find().populate('user', 'username')
    
    if(!posts) {
      res.status(404).send("Posts not found")
    }

    res.status(200).send(posts)

  } catch (error) {
    console.log(error)
    res.status(500).send({error: message})
  }
}

// get one post 

exports.get_one_post = async (req, res, next) => {
  try {
    const postId = req.params.id
    const post = await Post.findById(postId)

    if(!post) {
      res.status(404).send("Post not found")
      return
    }

    res.status(200).send(post)

  } catch (error) {
    console.error(error)
    res.status(500).send({error: error.message})
  }
}


exports.create_post = async (req, res, next) => {

  try {
    // get user inputs
    const { title, content, isPublic } = req.body;

    // validate user inputs
    if (!(title && content && isPublic)) {
      res.status(400).send("all input is required")
    }

    const post = await Post.create({
      title: title,
      content: content,
      timeStamp: new Date(),
      isPublic: isPublic,
      user: req.user.user_id
    })


    res.status(201).json(post);

  } catch (error) {
    console.log(error)
    next(error)
  }
}
