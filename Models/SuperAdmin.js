const mongoose = require("mongoose");

const SuperAdminSchema = new mongoose.Schema(
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
        type: Integer,
        required: true,
      },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SuperAdmin", SuperAdminSchema);