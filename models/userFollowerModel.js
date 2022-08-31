const mongoose = require("mongoose");

const userFollowerSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
  },
  followerID: {
    type: String,
  },
});
module.exports = mongoose.model("userFollower", userFollowerSchema);
