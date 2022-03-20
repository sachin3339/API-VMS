const mongoose = require("mongoose");
var Schema=mongoose.Schema;
const User = require('./User');

const Vendor = new mongoose.Schema(
  {
    POC: {
      type: String, 
    },
    User: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    
      GST: {
        type: String,
      
      },
      location: {
        type: String,
      },
      PAN: {
        type: String,
       
      },
      CName: {
        type: String,
        
      },
      Address: {
        type: String
      },
      Aadhar: {
        type: String,
        required: true,
      },
      Additional_info: {
        type: String,
      },
      Bank_Name: {
        type: String,
      },
      Benificiary: {
        type: String,
      },
      Account_Number: {
        type: String,
      }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", Vendor);