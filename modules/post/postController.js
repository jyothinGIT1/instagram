const postService = require("./postService");
const { successResponse } = require("../../helper/successResponse");
const createPost = async (req, res, next) => {
  try {
    const token = req.user.userToken;
    const postdata = { ...req.body, ...req.filePath };
    const postResponse = await postService.createPost(token, postdata);
    return successResponse(res, (data = { response: postResponse }));
  } catch (error) {
    next(error);
  }
};
const commentPost = async (req, res) => {
  try {
    id = req.params.id;
  } catch (error) {}
};
const getPost = async (req, res, next) => {
  try {
  } catch (error) {}
};

module.exports = { createPost, getPost, commentPost };
