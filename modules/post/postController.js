const postService = require("./postService");
const { successResponse } = require("../../helper/successResponse");
const createPost = async (req, res, next) => {
  try {
    const token = req.user.userToken;
    const postData = { ...req.body, ...req.filePath };
    const postResponse = await postService.createPost(token, postData);
    return successResponse(res, (data = { response: postResponse }));
  } catch (error) {
    next(error);
  }
};
const commentPost = async (req, res, next) => {
  try {
    const token = req.user.userToken;
    postId = req.params.id;
    const postData = { ...req.body, postId };
    const commentResponse = await postService.commentPost(token, postData);
    return successResponse(res, (data = { response: commentResponse }));
  } catch (error) {
    next(error);
  }
};
const getPost = async (req, res, next) => {
  try {
    const token = req.user.userToken;
    const getPostResponse = await postService.getPost(token);
    return successResponse(res, (data = { response: getPostResponse }));
  } catch (error) {
    next(error);
  }
};
const likePost = async (req, res, next) => {
  try {
    const token = req.user.userToken;
    postId = req.params.id;
    const postData = { postId };
    const likeResponse = await postService.likePost(token, postData);
    return successResponse(res, (data = { response: likeResponse }));
  } catch (error) {
    next(error);
  }
};
module.exports = { createPost, getPost, commentPost, likePost };
