const Vendor = require('../Models/Vendor');
const User = require('../Models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

module.exports={
    onboard_vendor:onboard_vendor
}