const mongoose = require("mongoose");

const likePostSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
  },
  postId: {
    type: String,
  },
});
module.exports = mongoose.model("likePost", likePostSchema);
