const mongoose = require("mongoose");

const commentPostSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
  },
  postId: {
    type: String,
  },
  comment: {
    type: String,
    default: "",
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
});
module.exports = mongoose.model("commentPost", commentPostSchema);
