const Vendor = require('../Models/Vendor');
const User = require('../Models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { transporter } = require('../Helpers/Transporter')
// create reusable transporter object using the default SMTP transport


//API to show Onboard the  Vendors in the system
function onboard_vendor(req, res) {

    console.log(req.files);
    console.log(req.body)
    User.findOne({ email: req.body.User.email })
        .then(result => {

            if (result) {
                res.status(409).json({
                    message: "Vendor Already exist with this email",
                });
            }
            else {
                bcryptjs.genSalt(10, function (err, salt) {
                    bcryptjs.hash(req.body.User.password, salt, function (err, hash) {

                        const newven = new User({
                            username: req.body.User.username,
                            email: req.body.User.email,
                            mobile: req.body.User.mobile,
                            role: req.body.User.role,
                            password: hash,
                            emailToken: crypto.randomBytes(64).toString('hex'),
                            Isverified: false,
                            Created_by: req.userdata.username
                        })
                    // need to check for if file is null

                        const newuser = new Vendor({
                            POC: req.body.POC,
                            User: newven,
                            GST: req.body.GST,
                            PAN: req.body.PAN,
                            CNAME: req.body.CNAME,
                            Aadhar: req.body.Aadhar,
                        });               
                        // send mail with defined transport object
                        let info = transporter.sendMail({
                            from: '"Verify your email👻" <sachin.diwakar@alchemyinfotech.com>', // sender address
                            to: newven.email, // list of receivers
                            subject: "Alchemy Solutions: Verify your email ✔", // Subject line
                            html: `<h2> Hi, ${newven.username}! You have been onboarded as ${newven.role} by ${newven.Created_by}
                        <h4>You can login using below credentials:</h4>
                        <p>Username:${newven.username}</p>
                        <p>Password:${req.body.User.password}</p>
                        
                        <h4>Please verify your email to continue...</h4> 

                        <a href="http://${req.headers.host}/user/verify-email?token=${newven.emailToken}">Verify your Email</a>
                        `, // html body
                        });


                        newven.save().then(result => {
                            newuser.save()

                            transporter.sendMail(info, function (error, info) {
                                if (error) { console.log("Throwed error") }
                            })
                            res.status(201).json({
                                message: "Vendor Onboarded Successfully, Please verify you email.",
                                post: result
                            });
                        })
                            .catch(error => {

                            })

                    });

                })
            }


        })

        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
            });

        })
}

//API to show all the  Vendors in the system
function all(req, res) {
    Vendor.find({}).populate("User").then(result => {
        res.status(201).json({
            message: "All vendors retrieved Successfully",
            post: result
        });
    })
        .catch(error => {

        })
}

function showvendorsdocuments(req, res) {
    
    let arrayDocuments = [];
    let obj = {
        "AUDIT_SHEET": "AUDIT_SHEET", 
        "COI": "COI", 
        "DSC": "DSC", 
        "ESIC_CAL": "ESIC_CAL", 
        "ESIC_CHALLAN": "ESIC_CHALLAN", 
        "ESTABLISHMENT_CA": "ESTABLISHMENT_CA", 
        "FORM_5A": "FORM_5A", 
        "GST_CERT": "GST_CERT", 
        "LWF": "LWF", 
        "PF_CAL": "PF_CAL", 
        "PF_CHALLAN": "PF_CHALLAN", 
        "PT_RC": "PT_RC"
    }
    arrayDocuments.push(obj);
    Vendor.find({}).select("ESIC_CAL ESIC_CHALLAN PF_CAL PF_CHALLAN PT_RC AUDIT_SHEET FORM_5A ESTABLISHMENT_CA DSC COI GST_CERT LWF").then(result => {
        
        
      res.status(201).json({
           result,
           arrayDocuments
      });
  })
      .catch(error => {

      })
}

//API to show the Vendor by ID
function Show(req, res) {
    Vendor.find({_id:req.params.id}).populate("Requirement").then(result=>{
        res.status(201).json({
            message: "Vendor retrieved Successfully",
            post: result
        });
    })
    .catch(error => {
    
    })
    }
    
//API to show the  Vendors created by respective admins
function myvendors(req, res) {
    Vendor.find({ Created_by: req.userdata.email }).populate("User").then(result => {
        res.status(201).json({
            message: "My vendors retrieved Successfully",
            post: result
        });
    })
        .catch(error => {

        })
}
//Api to update the Vendor
function update(req, res) {

    console.log(req.files);
    const newuser = {
        ESIC_CAL: (req.files['ESIC_CAL']?req.files['ESIC_CAL'][0].path:""),
        PF_CAL: (req.files['PF_CAL']?req.files['PF_CAL'][0].path:""),
        PF_CHALLAN: (req.files['PF_CHALLAN']?req.files['PF_CHALLAN'][0].path:""),
        ESIC_CHALLAN: (req.files['ESIC_CHALLAN']?req.files['ESIC_CHALLAN'][0].path:""),
        PT_RC: (req.files['PT_RC']?req.files['PT_RC'][0].path:""),
        AUDIT_SHEET: (req.files['AUDIT_SHEET']?req.files['AUDIT_SHEET'][0].path:""),
        FORM_5A: (req.files['FORM_5A']?req.files['FORM_5A'][0].path:""),
        ESTABLISHMENT_CA: (req.files['ESTABLISHMENT_CA']?req.files['ESTABLISHMENT_CA'][0].path:""),
        DSC: (req.files['DSC']?req.files['DSC'][0].path:""),
        COI: (req.files['COI']?req.files['COI'][0].path:""),
        GST_CERT: (req.files['GST_CERT']?req.files['GST_CERT'][0].path:""),
        LWF: (req.files['LWF']?req.files['LWF'][0].path:"")
    };

    Vendor.findOneAndUpdate({_id:req.params.id},newuser).then(result => {
        res.status(201).json({
            message: "Vendor Updated Successfully",
            post: result
        });
    })
        .catch(error => {

        })
}



function update_body(req, res) {
    Vendor.findByIdAndUpdate(req.params.id,req.body).then(result => {
        res.status(201).json({
            message: "Vendor Updated Successfully",
            post: result
        });
    })
        .catch(error => {

        })
}
//Api to destory the Vendor
function destroy(req, res) {
    Vendor.findByIdAndDelete(req.params.id).then(result => {
        res.status(201).json({
            message: "Vendor deleted Successfully",
            post: result
        });
    })
        .catch(error => {

        })
}

module.exports = {
    onboard_vendor: onboard_vendor,
    all: all,
    update: update,
    destroy: destroy,
    myvendors: myvendors,
    Show:Show,
    update_body:update_body,
    showvendorsdocuments: showvendorsdocuments
}