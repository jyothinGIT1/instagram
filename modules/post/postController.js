const postService = require("./postService");
const { successResponse } = require("../../helper/successResponse");
const createPost = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const postData = { ...req.body, ...req.filePath };
    const postResponse = await postService.createPost(userId, postData);
    return successResponse(res, (data = { response: postResponse }));
  } catch (error) {
    next(error);
  }
};
const commentPost = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const postId = req.params.id;
    const postData = { ...req.body, postId };
    const commentResponse = await postService.commentPost(userId, postData);
    return successResponse(res);
  } catch (error) {
    next(error);
  }
};
const getPost = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const query = req.query;

    const getPostResponse = await postService.getPost(query, userId);
    return successResponse(res, (data = { response: getPostResponse }));
  } catch (error) {
    next(error);
  }
};
const likePost = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    postId = req.params.id;
    const postData = { postId };
    const likeResponse = await postService.likePost(userId, postData);
    return successResponse(res);
  } catch (error) {
    next(error);
  }
};
const getComment = async (req, res, next) => {
  try {
    const query = req.query;
    const postId = req.params.postId;
    const getPostResponse = await postService.getComment(query, postId);
    return successResponse(res, (data = { response: getPostResponse }));
  } catch (error) {
    next(error);
  }
};
module.exports = { createPost, getPost, commentPost, likePost, getComment };
