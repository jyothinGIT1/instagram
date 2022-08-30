const mongoose = require("mongoose");

const commentPost = new mongoose.Schema({
  user_id: {
    type: String,
  },
  filePath: {
    type: String,
  },
  description: {
    type: String,
    default: "",
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
});
module.exports = mongoose.model("commentPost", commentPost);
