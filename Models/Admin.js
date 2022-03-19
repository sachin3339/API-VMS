const mongoose = require("mongoose");
var Schema=mongoose.Schema;
const User = require('./User');

const AdminSchema = new mongoose.Schema(
  {
    EMP_ID: {
      type: String,
      required: true,
      unique: true,
    },
    User: { type: Schema.Types.ObjectId, ref: 'User' },
    Reporting_Manager: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", AdminSchema);