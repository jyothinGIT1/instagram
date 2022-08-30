const model = require("../../models");
const { hashPassword, comparePassword } = require("../../utils/bcrypt");
const { createJWT } = require("../../utils/token");

const register = async (data) => {
  data.password = await hashPassword(data.password);
  const userRegResponse = await model.userSchema.create(data);
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

const edit = () => {
  res.send("success edit");
};

const getUserPost = () => {
  res.send("success user");
};
module.exports = { register, edit, login, getUserPost };
