const mongoose = require("mongoose");

const commentPostSchema = new mongoose.Schema({
  commentedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
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
commentPostSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.commentId = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
module.exports = mongoose.model("commentPost", commentPostSchema);
