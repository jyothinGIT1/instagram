const express = require("express");
const { autherizationMiddleware } = require("../../middlewares/autherization");
const { multerMiddleware } = require("../../middlewares/multer");
const {
  createPost,
  getPost,
  commentPost,
  likePost,
} = require("./postController");
const route = express.Router();

route.post("/create", autherizationMiddleware, multerMiddleware, createPost);
route.get("/:id", autherizationMiddleware, getPost);
route.post("/:id", autherizationMiddleware, commentPost);
route.post("/like/:id", autherizationMiddleware, likePost); // how to handle this

module.exports = route;
