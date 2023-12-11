const mongoose = require("mongoose")

const ReplySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  comment: { type: mongoose.Schema.Types.ObjectId, ref: "comment", required: true },
  reply: { type: String },
  likes: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now }
})

module.exports = mongoose.model("reply", ReplySchema);
