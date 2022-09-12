const mongoose = require("mongoose");

const conncetDB = (processURL) => {
  return mongoose.connect(processURL);
};

module.exports = conncetDB;
