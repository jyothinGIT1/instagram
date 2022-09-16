const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postedUserId: {
    type: String,
  },
  filePath: {
    type: String,
  },
  description: {
    type: String,
    default: "",
  },
  postedOn: {
    type: Date,
    default: new Date(),
  },
});
module.exports = mongoose.model("post", postSchema);
