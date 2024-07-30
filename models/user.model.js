const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async (enteredPassword) => {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async (next) => {
  if (!this.modified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
