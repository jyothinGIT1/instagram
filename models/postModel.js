const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
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
module.exports = mongoose.model("post", postSchema);
