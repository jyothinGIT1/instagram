const express = require("express");
const { register, edit, login, getUserPost } = require("./userController");
const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.patch("/:id", edit);
route.get("/:id", getUserPost);

module.exports = route;
