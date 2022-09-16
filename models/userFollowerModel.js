const mongoose = require("mongoose");

const userFollowerSchema = new mongoose.Schema({
  followerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  followingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});
userFollowerSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.userFolloerId = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
module.exports = mongoose.model("userFollower", userFollowerSchema);
