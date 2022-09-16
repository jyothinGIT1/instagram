const mongoose = require("mongoose");

const likePostSchema = new mongoose.Schema({
  likedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  postId: {
    type: String,
  },
});
likePostSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.likeId = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
module.exports = mongoose.model("likePost", likePostSchema);
