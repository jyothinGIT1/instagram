const model = require("../../models");
const { verifyJWT } = require("../../utils/token");

const createPost = async (userId, data) => {
  const postData = { postedUserId: userId, ...data };
  const postResponse = await model.postSchema.create(postData);
  const { filePath, description, _id, postedOn } = postResponse._doc;
  console.log({
    postId: _id,
    filePath,
    description,
    postedOn,
  });
  return 1;
};

const commentPost = async (userId, data) => {
  const postData = { commentedUserId: userId, ...data };
  const postCommentResponse = await model.commentPostSchema.create(postData);
  const { commentedUserId, comment, _id } = postCommentResponse._doc;
  console.log({ commentedUserId, comment, _id });
  return 1;
};
const likePost = async (userId, data) => {
  const postData = { userId, ...data };
  const postCommentResponse = await model.likePostSchema.create(postData);
  const { postId, _id } = postCommentResponse._doc;
  console.log({ postId, likeId: _id });
  return 1;
};

const getPost = async (userId) => {
  let postCommentResponse = await model.postSchema
    .find({
      postedUserId: userId,
    })
    .select("_id filePath description postedOn");

  let CommentResponse = [];
  postCommentResponse.forEach((element) => {
    CommentResponse.push({
      postId: element["_id"],
      filePath: element["filePath"],
      description: element["description"],
      postedOn: element["postedOn"],
    });
  });
  postCommentResponse = CommentResponse;
  for (object of postCommentResponse) {
    let postId = object.postId;
    const count = await model.likePostSchema
      .find({
        postId,
      })
      .count();

    object["likes"] = count;
  }

  for (object of postCommentResponse) {
    let postId = object.postId;
    const commentResponse = await model.commentPostSchema.find({
      postId,
    });
    console.log(commentResponse);
    if (commentResponse.length === 0) {
      object["comments"] = 0;
    } else {
      const x = await model.userSchema
        .findOne({
          _id: commentResponse[0]["commentedUserId"],
        })
        .select("name -_id");

      commentResponse[0]["commmentedBy"] = x["name"];
      const { commentedUserId, commmentedBy, comment, _id, commentedOn } =
        commentResponse[0];

      object["comments"] = {
        commentedUserId,
        commmentedBy,
        commentId: _id,
        comment,
        commentedOn,
      };
    }
  }
  if (postCommentResponse.length === 0) {
    return 0;
  }

  return postCommentResponse;
};
module.exports = { createPost, getPost, commentPost, likePost };
