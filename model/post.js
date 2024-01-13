
const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  timeStamp: { type: Date, default: Date.now },
  isPublic: { type: Boolean },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }
  
}, 
{
  toJSON: { virtuals: true } // Set the toJSON option for virtuals
});

PostSchema.virtual("latest").get(function() {
  const currentDateTime = DateTime.now();
  const postDateTime = DateTime.fromJSDate(this.timeStamp);

  const diff = currentDateTime.diff(postDateTime);

  // get the diff of seconds, minutes, hours, and days.
  const seconds = Math.floor(diff.as("seconds"));
  const minutes = Math.floor(diff.as("minutes"));
  const hours = Math.floor(diff.as("hours"));
  const days = Math.floor(diff.as("days"));

  if (seconds < 60) {
    return `${seconds} seconds`;
  } else if (minutes < 60) {
    return `${minutes} minutes`;
  } else if (hours < 24) {
    return `${hours} hours`;
  } else {
    return `${days} days`;
  }
});

module.exports = mongoose.model("post", PostSchema);


