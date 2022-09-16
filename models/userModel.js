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
  mobileNumber: {
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
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.userId = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
module.exports = mongoose.model("user", userSchema);
