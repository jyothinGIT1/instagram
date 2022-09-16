const model = require("../../models");
const { hashPassword, comparePassword } = require("../../utils/bcrypt");
const { createJWT } = require("../../utils/token");

const register = async (data) => {
  data.password = await hashPassword(data.password);
  const { _id, name, email, photo, mobileNumber, DOB, createdOn } =
    await model.userSchema.create(data);
  return {
    userId: _id,
    name,
    email,
    photo,
    mobileNumber,
    DOB,
    createdOn,
  };
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

const followUser = async (userId, data) => {
  const postData = { followerId: userId, followingId: data.followingId };
  const postCommentResponse = await model.userFollowerSchema.create(postData);
  // let { followerId, followingId } = postCommentResponse._doc;
  // console.log({ followerId, followingId });
  return 1;
};

const edit = async (userId, postData) => {
  const filter = { _id: userId };
  const update = postData;
  const editResponse = await model.userSchema
    .findOneAndUpdate(filter, update, { new: true })
    .select("_id name photo email mobileNumber DOB createdOn");
  const { _id, name, email, photo, mobileNumber, DOB, createdOn } =
    editResponse._doc;
  console.log({ _id, name, email, photo, mobileNumber, DOB, createdOn });
  return 1;
};

const getUser = async (userId) => {
  const userResponse = await model.userSchema
    .find({
      _id: userId,
    })
    .select("name email contactNumber DOB createdOn photo _id");

  let count = 0;
  try {
    count = await model.userFollowerSchema.find({ followerId: userId }).count();
  } finally {
  }
  if (count) {
    userResponse[0]._doc["following"] = count;
  } else {
    userResponse[0]._doc["following"] = 0;
  }

  try {
    count = await model.userFollowerSchema
      .find({ followingId: userId })
      .count();
  } finally {
  }
  if (count) {
    userResponse[0]._doc["followers"] = count;
  } else {
    userResponse[0]._doc["followers"] = 0;
  }
  try {
    count = await model.postSchema.find({ postedUserId: userId }).count();
  } finally {
  }
  if (count) {
    userResponse[0]._doc["Posts"] = count;
  } else {
    userResponse[0]._doc["Posts"] = 0;
  }
  return userResponse;
};

const followers = async (userId) => {
  const follower = await model.userFollowerSchema
    .find({ followingId: userId })
    .select("followerId -_id")
    .populate("followerId", "userId name");
  if (follower.length === 0) {
    return 0;
  }
  return follower;
};

const following = async (userId) => {
  const followings = await model.userFollowerSchema
    .find({ followerId: userId })
    .select("followingId -_id")
    .populate("followingId", "userId name");
  if (followings.length === 0) {
    return 0;
  }
  return followings;
};
module.exports = {
  register,
  edit,
  login,
  getUser,
  followUser,
  followers,
  following,
};
