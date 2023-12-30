const Post = require("../model/post");

// get all posts
exports.get_all_post = async (req, res, next) => {
  try {
    // get the post
    const posts = await Post.find()
    
    if(!posts) {
      res.status(400).send("Posts not found")
    }

    res.status(200).send(posts)

  } catch (error) {
    console.log(error)
    res.status(500).send({error: message})
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
