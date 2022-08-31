const express = require("express");
const multer = require("multer");
const { autherizationMiddleware } = require("../../middlewares/autherization");
const { multerMiddleware } = require("../../middlewares/multer");
const {
  register,
  edit,
  login,
  getUser,
  followUser,
} = require("./userController");
const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.post("/:id", autherizationMiddleware, followUser);
route.patch("/:id", autherizationMiddleware, multerMiddleware, edit);
route.get("/:id", autherizationMiddleware, getUser);

module.exports = route;
