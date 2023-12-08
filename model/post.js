const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  timeStamp: { type: Date },
  isPublic: { type: Boolean },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }
});

module.exports = mongoose.model("post", PostSchema);


