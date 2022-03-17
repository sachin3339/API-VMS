const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
        type: String,
        required: true,
      },
      mobile: {
        type: String,
      },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);