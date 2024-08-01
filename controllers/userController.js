const asyncHandler = require("express-async-handler");
const ErrorHelper = require("../error/errorHelper.js");
const User = require("../models/user.model.js");
const userTransformer = require("../transformers/userTransformer.js");
const { generateToken } = require("../config/token.js");
const bcrypt = require("bcryptjs");
const { formidable } = require("formidable");
const { uploadToCloudinary, cloudinary } = require("../utils/cloudinary.js");

const isUsernameTaken = async (username) => {
  const result = await User.findOne({ username });
  return result;
};

const isEmailTaken = async (email) => {
  const result = await User.findOne({ email });
  return result;
};

const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password, profileImage } = req.body;

  if (!username || !email || !password) {
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
    username,
    email,
    password: hashedPassword,
    profileImage,
    ACCOUNT_STATUS: "PENDING",
  });

  if (user) {
    const result = userTransformer(user);
    result.token = generateToken(user._id);
    res.status(200).json(result);
  } else {
    throw new ErrorHelper("Failed when created user");
  }
});

const registerUser2 = asyncHandler(async (req, res) => {
  const form = formidable();
  console.log("Masuk ke register user");
  console.log(req);

  const response = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });
  console.log(response);
  const { fields, files } = response;
  const newName = fields.name[0];
  console.log("fileds: ", fields);
  console.log("files: ", files.media_file_0);

  // res.status(200).json({ message: "test" });
  try {
    const cloudinaryResult = await uploadToCloudinary(
      files.media_file_0[0].filepath
    );
    console.log(cloudinaryResult);
    // res
    //   .status(200)
    //   .json({ cloudinaryResult, url: cloudinaryResult.secure_url });
  } catch (error) {
    console.log("Error bro");
    console.log(error);
    res.status(500).send(error);
  }

  const result = await User.findOneAndUpdate(
    { username },
    {
      $set: { name: newName, ACCOUNT_STATUS: "VERIFIED" },
    }
  );

  if (!result) {
    throw new ErrorHelper("Operation failed");
  }
  res.status(200).json({ message: "Register Verification Success", result });
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
  registerUser2,
};
