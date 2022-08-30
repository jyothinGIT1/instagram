const express = require("express");
const { autherizationMiddleware } = require("../../middlewares/autherization");
const { multerMiddleware } = require("../../middlewares/multer");
const { createPost, getPost, commentPost } = require("./postController");
const route = express.Router();

route.post("/create", autherizationMiddleware, multerMiddleware, createPost);
route.get("/:id", getPost);
route.post("/:id", commentPost);
module.exports = route;
