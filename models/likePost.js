const mongoose = require("mongoose");

const likePostSchema = new mongoose.Schema({
  likedUserId: {
    type: String,
  },
  postId: {
    type: String,
  },
});
module.exports = mongoose.model("likePost", likePostSchema);
