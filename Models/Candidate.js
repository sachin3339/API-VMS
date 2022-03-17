const mongoose = require("mongoose");
var Schema=mongoose.Schema;
const User = require('./Requirement');
const Candidate = new mongoose.Schema(
    {
        Name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        Notice_Period: {
            type: String,
            required: true,
        },
        Current_CTC: {
            type: String,
            required: true
        },
        Expected_CTC: {
            type: String,
            required: true
        },
        req_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Candidate", Candidate);