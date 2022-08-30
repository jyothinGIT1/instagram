const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "name not provided"],
  },
  email: {
    type: String,
    require: [true, "email not provided"],
  },
  password: {
    type: String,
    require: [true, "password not provided"],
  },
  photo: {
    type: String,
    default: null,
  },
  contactNumber: {
    type: Number,
    require: [true, "number not provided"],
  },
  DOB: {
    type: String,
    require: [true, "DOB required"],
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
});
module.exports = mongoose.model("user", userSchema);
