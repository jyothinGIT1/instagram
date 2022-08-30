const model = require("../../models");
const { verifyJWT } = require("../../utils/token");

const createPost = async (token, data) => {
  decodedToken = verifyJWT(token);
  const postdata = { ...decodedToken, ...data };
  const postResponse = await model.postSchema.create(postdata);
  return postResponse;
};

const getPost = (req, res) => {
  res.send("success user");
};
module.exports = { createPost, getPost };
