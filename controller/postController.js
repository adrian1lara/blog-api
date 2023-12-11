const Post = require("../model/post");


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
