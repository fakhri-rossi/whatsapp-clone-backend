const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name harus diisi"],
  },
  username: {
    type: String,
    required: [true, "Username harus diisi"],
    unique: [true, "Username sudah digunakan"],
  },
  email: {
    type: String,
    required: [true, "Email harus diisi"],
    unique: [true, "Email sudah digunakan"],
  },
  password: {
    type: String,
    required: [true, "Password harus diisi"],
  },
  profileImage: {
    type: String,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
