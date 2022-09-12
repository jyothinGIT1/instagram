const mongoose = require("mongoose");

const userFollowerSchema = new mongoose.Schema({
  followerId: {
    type: String,
  },
  followingId: {
    type: String,
  },
});
module.exports = mongoose.model("userFollower", userFollowerSchema);
