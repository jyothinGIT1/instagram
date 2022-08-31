const model = require("../../models");
const { verifyJWT } = require("../../utils/token");

const createPost = async (token, data) => {
  decodedToken = verifyJWT(token);
  const postData = { ...decodedToken, ...data };
  const postResponse = await model.postSchema.create(postData);
  return postResponse;
};
const commentPost = async (token, data) => {
  decodedToken = verifyJWT(token);
  const postData = { ...decodedToken, ...data };
  const postCommentResponse = await model.commentPostSchema.create(postData);
  return postCommentResponse;
};
const likePost = async (token, data) => {
  decodedToken = verifyJWT(token);
  const postData = { ...decodedToken, ...data };
  const postCommentResponse = await model.likePostSchema.create(postData);
  return postCommentResponse;
};

const getPost = async (token) => {
  decodedToken = verifyJWT(token);
  const postCommentResponse = await model.postSchema
    .find({
      userId: decodedToken.userId,
    })
    .select("userId filePath description createdOn");
  for (object of postCommentResponse) {
    let postId = object._doc._id;
    const count = await model.likePostSchema
      .find({
        postId,
      })
      .count();

    object._doc["likes"] = count;
  }

  for (object of postCommentResponse) {
    let postId = object._doc._id;
    const commentResponse = await model.commentPostSchema.find({
      postId,
    });

    object._doc["comments"] = commentResponse;
  }
  return postCommentResponse;
};
module.exports = { createPost, getPost, commentPost, likePost };
