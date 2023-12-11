const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "post", required: true },
  timestamp: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  comment: { type: String }
})

module.exports = mongoose.model("comment", CommentSchema);


