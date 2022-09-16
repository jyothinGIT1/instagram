const model = require("../../models");
const { APIFeatures } = require("../../utils/pagination");
const { verifyJWT } = require("../../utils/token");

const createPost = async (userId, data) => {
  const postData = { postedUserId: userId, ...data };
  const postResponse = await model.postSchema.create(postData);
  // const { filePath, description, _id, postedOn } = postResponse._doc;
  // console.log({
  //   postId: _id,
  //   filePath,
  //   description,
  //   postedOn,
  // });
  return 1;
};

const commentPost = async (userId, data) => {
  const postData = { commentedUserId: userId, ...data };
  const postCommentResponse = await model.commentPostSchema.create(postData);
  // const { commentedUserId, comment, _id } = postCommentResponse._doc;
  // console.log({ commentedUserId, comment, _id });
  return 1;
};
const likePost = async (userId, data) => {
  const postData = { userId, ...data };
  const postCommentResponse = await model.likePostSchema.create(postData);
  // const { postId, _id } = postCommentResponse._doc;
  // console.log({ postId, likeId: _id });
  return 1;
};

const getPost = async (query, userId) => {
  const postResponse = new APIFeatures(
    model.postSchema.find({
      postedUserId: userId,
    }),
    query
  ).paginate();
  const post = await postResponse.query

    .select("_id filePath description postedOn")
    .populate("countComment countLike")
    .lean({ virtuals: true });
  if (postResponse.length === 0) {
    return 0;
  }
  return post;
};
const getComment = async (query, postId) => {
  const commentResponse = new APIFeatures(
    model.commentPostSchema.find({
      postId,
    }),
    query
  ).paginate();
  const comment = await commentResponse.query
    .select("commentedUserId postId comment commentedOn -_id")
    .populate("commentedUserId", "name id");
  return comment;
};
module.exports = { createPost, getPost, commentPost, likePost, getComment };
