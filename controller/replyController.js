const Reply = require("../model/reply");

// handle get all replies 
exports.get_all_replies = async (req, res, next) => {
  try {
    const allReplies = await Reply.find();

    if (allReplies.length <= 0) {
      res.status(400).json({ error: "No replies found" })
    }

    res.status(201).send(allReplies);
  } catch (error) {

    console.error(error);
    res.status(500).json({ message: error.message })
  }
}


// handle replies post 
exports.new_reply = async (req, res, next) => {
  try {
    const userId = req.user.user_id;

    const commentId = req.params.id;

    if (!userId || !commentId) {
      return res.status(400).json({ error: 'User ID and post ID is required' });

    }

    const { reply, likes } = req.body

    const newReply = await Reply.create({
      user: userId,
      comment: commentId,
      reply: reply,
      likes: likes,
    })

    res.status(201).json({ message: "Reply created succesfully", reply: newReply });


  } catch (error) {

    console.error(error);
    res.status(500).json({ error: "Internal server error", message: error.message })
  }
}
