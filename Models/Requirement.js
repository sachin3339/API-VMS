const mongoose = require("mongoose");
const Candidate = require('./Candidate');
var Schema = mongoose.Schema;
const Requirement = new mongoose.Schema(
  {
    Details: {
      type: String,
      unique: false
    },
    Skills: {
      type: String,
      unique: false
    },
    Client: {
      type: String,
      unique: false
    },
    Location: {
      type: String,
      unique: false
    },
    EOY: {
      type: String,
      unique: false
    },
    NOP: {
      type: String,
      unique: false

    },
    Expiry_date: {
      type: Date,
      unique: false
    },
    Created_by: {
      type: String,
      unique: false
    },
    Candidate: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate'
    }]

  },
  { timestamps: true }
);

module.exports = mongoose.model("Requirement", Requirement);