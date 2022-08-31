const userSchema = require("./userModel");
const postSchema = require("./postModel");
const commentPostSchema = require("./commentPost");
const likePostSchema = require("./likePost");
const userFollowerSchema = require("./userFollowerModel");

module.exports = {
  userSchema,
  postSchema,
  commentPostSchema,
  likePostSchema,
  userFollowerSchema,
};
