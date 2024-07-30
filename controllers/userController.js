const asyncHandler = require("express-async-handler");
const ErrorHelper = require("../error/errorHelper.js");
const User = require("../models/user.model.js");
const userTransformer = require("../transformers/userTransformer.js");
const { generateToken } = require("../config/token.js");
const bcrypt = require("bcryptjs");

const isUsernameTaken = async (username) => {
  const result = await User.findOne({ username });
  return result;
};

const isEmailTaken = async (email) => {
  const result = await User.findOne({ email });
  return result;
};

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, username, email, password, profileImage } = req.body;

  if (!name || !username || !email || !password) {
    throw new ErrorHelper("All fields have to be filled", 400);
  }

  if (await isUsernameTaken(username)) {
    throw new ErrorHelper("Username is already taken", 400);
  }

  if (await isEmailTaken(email)) {
    throw new ErrorHelper(
      "Email is already used by someone else, use another email!",
      400
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
    profileImage,
  });

  if (user) {
    const result = userTransformer(user);
    result.token = generateToken(user._id);
    res.status(200).json(result);
  } else {
    throw new Error("Failed when created user");
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    throw new ErrorHelper("Username is not found", 400);
  }

  if (await user.matchPassword(password, user.password)) {
    res.status(200).json({ message: "login success" });
  } else {
    throw new ErrorHelper("Password does not mactch", 401);
  }
});

module.exports = {
  registerUser,
  loginUser,
};
