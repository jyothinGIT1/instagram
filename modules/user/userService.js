const model = require("../../models");
const { hashPassword, comparePassword } = require("../../utils/bcrypt");
const { createJWT, verifyJWT } = require("../../utils/token");

const register = async (data) => {
  data.password = await hashPassword(data.password);
  const userRegResponse = await model.userSchema
    .create(data)
    .select("name photo email contactNumber DOB");
  return userRegResponse;
};

const login = async (data) => {
  const userDataResponse = await model.userSchema
    .findOne({ email: data.email })
    .select("email password name _id");
  if (!userDataResponse) {
    throw new Error("Email doesn't exist in DB");
  }
  const isValid = await comparePassword(
    data.password,
    userDataResponse.password
  );
  if (isValid) {
    const payload = {
      userId: userDataResponse._id,
      name: userDataResponse.name,
    };
    const jwt = createJWT(payload);
    return jwt;
  }
};

const followUser = async (token, data) => {
  decodedToken = verifyJWT(token);
  const postData = { ...decodedToken, ...data };
  const postCommentResponse = await model.userFollowerSchema.create(postData);
  return postCommentResponse;
};

const edit = async (token, postData) => {
  decodedToken = verifyJWT(token);
  const filter = { _id: decodedToken.userId };
  const update = postData;
  const editResponse = await model.userSchema
    .findOneAndUpdate(filter, update, { new: true })
    .select("name photo email contactNumber DOB");
  return editResponse;
};

const getUser = async (token) => {
  decodedToken = verifyJWT(token);
  const userResponse = await model.userSchema
    .find({
      _id: decodedToken.userId,
    })
    .select("name email contactNumber DOB photo");

  userResponse[0]._doc["followers"] = await model.userFollowerSchema
    .find({ followerID: decodedToken.userId })
    .select("name -_id");

  let followerId = await model.userFollowerSchema
    .find({ userId: decodedToken.userId })
    .select("followerID -_id");

  userResponse[0]._doc["following"] = await model.userSchema
    .find({ _id: followerId[0].followerID })
    .select("name -_id");
  return userResponse;
};
module.exports = { register, edit, login, getUser, followUser };
