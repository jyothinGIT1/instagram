const userService = require("./userService");
const { successResponse } = require("../../helper/successResponse");

const register = async (req, res, next) => {
  try {
    const userRegResponse = await userService.register(req.body);
    return successResponse(res, (data = userRegResponse));
  } catch (error) {
    console.error(error);
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const loginResponse = await userService.login({ email, password });
    return successResponse(res, (data = { token: loginResponse }));
  } catch (err) {
    next(err);
  }
};

const edit = (req, res) => {
  res.send("success edit");
};

const getUserPost = (req, res) => {
  res.send("success getUserPost");
};

module.exports = { register, edit, login, getUserPost };
