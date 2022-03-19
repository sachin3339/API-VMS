const Vendor = require('../Models/Vendor');
const User = require('../Models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

//API to show Onboard the  Vendors in the system
function onboard_vendor(req, res) {
    User.findOne({ email: req.body.User.email})
    .then(result => {
        console.log(req.body.User.email);
        if (result) {
            res.status(409).json({
                message: "Vendor Already exist with this email",
            });
        }
        else { 
            bcryptjs.genSalt(10, function (err, salt) {
                bcryptjs.hash(req.body.User.password, salt, function (err, hash) {

                    const newven=new User({
                        username:req.body.User.username,
                        email: req.body.User.email,
                        mobile:req.body.User.mobile,
                        role: req.body.User.role,
                        password: hash
                    })

                    const newuser = new Vendor({
                        POC: req.body.POC,
                        User: newven,
                        GST:req.body.GST,
                        PAN:req.body.PAN,
                        CNAME:req.body.CNAME,
                        Aadhar:req.body.Aadhar
                    }); 

                    newven.save().then(result => {
                        newuser.save()
                        res.status(201).json({
                            message: "Vendor Onboarded Successfully",
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
    Vendor.find({}).then(result=>{
        res.status(201).json({
            message: "All vendors retrieved Successfully",
            post: result
        });
    })
    .catch(error => {
    
    })
    }
//Api to update the Requirement
function update(req, res) {
    Vendor.findByIdAndUpdate(req.params.id,req.body).then(result => {
        res.status(201).json({
            message: "Vendor Updated Successfully",
            post: result
        });
    })
        .catch(error => {

        })
}
//Api to destory the Requirement
function destroy(req,res)
{
    Vendor.findByIdAndDelete(req.params.id).then(result=>{
        res.status(201).json({
            message: "Vendor deleted Successfully",
            post: result
        });
    })
    .catch(error => {
    
    })
}

module.exports={
    onboard_vendor:onboard_vendor,
    all:all,
    update:update,
    destroy:destroy
}