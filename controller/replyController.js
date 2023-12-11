const Reply = require("../model/reply");

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
