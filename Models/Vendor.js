const mongoose = require("mongoose");
var Schema=mongoose.Schema;
const Requirement = require('./Requirement');

const Vendor = new mongoose.Schema(
  {
    POC: {
      type: String, 
    },
    User: { type: Schema.Types.ObjectId, ref: 'User' },
    
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
      },
      emailToken: {
        type: String
      },
      ESIC_CAL:{
        type: String,
        default: "",
      },
      PF_CAL:{
        type: String,
        default: "",
      },
      PF_CHALLAN:{
        type: String,
        default: "",
      },
      ESIC_CHALLAN:{
        type: String,
        default: "",
      },
      PT_RC:{
        type: String,
        default: "",
      },
      AUDIT_SHEET:{
        type: String,
        default: "",
      },
      FORM_5A:{
        type: String,
        default: "",
      },
      ESTABLISHMENT_CA:{
        type: String,
        default: "",
      },
      DSC:{
        type: String,
        default: "",
      },
      COI:{
        type: String,
        default: "",
      },
      GST_CERT:{
        type: String,
        default: "",
      },
      LWF:{
        type: String,
        default: "",
      },
      IsApproved: {
        type: Boolean,
        default:false
      },
      Requirement:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Requirement'
        }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", Vendor);