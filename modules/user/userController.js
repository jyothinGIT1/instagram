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
const followUser = async (req, res, next) => {
  try {
    const token = req.user.userToken;
    followerID = req.params.id;
    const postData = { followerID };
    const commentResponse = await userService.followUser(token, postData);
    return successResponse(res, (data = { response: commentResponse }));
  } catch (error) {
    next(error);
  }
};
const edit = async (req, res, next) => {
  try {
    const token = req.user.userToken;
    const photo = req.filePath.filePath;
    const postData = { ...req.body, photo };
    const editResponse = await userService.edit(token, postData);
    return successResponse(res, (data = { response: editResponse }));
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const token = req.user.userToken;
    const userGetResponse = await userService.getUser(token);
    return successResponse(res, (data = { response: userGetResponse }));
  } catch (error) {
    next(error);
  }
};

module.exports = { register, edit, login, getUser, followUser };
