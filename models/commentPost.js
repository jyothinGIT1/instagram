const mongoose = require("mongoose");

const commentPostSchema = new mongoose.Schema({
  commentedUserId: {
    type: String,
  },
  postId: {
    type: String,
  },
  comment: {
    type: String,
    default: "",
  },
  commentedOn: {
    type: Date,
    default: new Date(),
  },
});
module.exports = mongoose.model("commentPost", commentPostSchema);
