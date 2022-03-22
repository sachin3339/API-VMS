const Admin = require('../Models/Admin');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const crypto = require('crypto');
const {transporter}= require('../Helpers/Transporter')


function onboard_admin(req, res) {
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

                    const newadm=new User({
                        username:req.body.User.username,
                        email: req.body.User.email,
                        mobile:req.body.User.mobile,
                        role: req.body.User.role,
                        password: hash,
                        emailToken: crypto.randomBytes(64).toString('hex'),
                        Isverified: false,
                        Created_by:req.userdata.username
                    })

                    const newuser = new Admin({
                        EMP_ID:req.body.EMP_ID,
                        Reporting_Manager: req.body.Reporting_Manager,
                        User: newadm
                    }); 
                     // send mail with defined transport object
                     let info = transporter.sendMail({
                        from: '"Verify your email👻" <sachin.diwakar@alchemyinfotech.com>', // sender address
                        to: newadm.email, // list of receivers
                        subject: "Alchemy Solutions: Verify your email ✔", // Subject line
                        html: `<h2> Hi, ${newadm.username}! You have been onboarded as ${newadm.role} by ${newadm.Created_by}
                    <h4>You can login using below credentials:</h4>
                    <p>Username:${newadm.username}</p>
                    <p>Password:${req.body.User.password}</p>
                    
                    <h4>Please verify your email to continue...</h4> 

                    <a href="http://${req.headers.host}/user/verify-email?token=${newadm.emailToken}">Verify your Email</a>
                    `, // html body
                    });

                    newadm.save().then(result => {
                        newuser.save()
                        res.status(201).json({
                            message: "Admin Onboarded Successfully, Please verify you email.",
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

//API to show the all subadmins in the system
function all(req, res) {
    Admin.find({}).then(result=>{
        res.status(201).json({
            message: "All Subadmins retrieved Successfully",
            post: result
        });
    })
    .catch(error => {
    
    })
    }
//Api to update the Admin
function update(req, res) {
    Admin.findByIdAndUpdate(req.params.id,req.body).then(result => {
        res.status(201).json({
            message: "Admin Updated Successfully",
            post: result
        });
    })
        .catch(error => {

        })
}
//Api to destory the Requirement
function destroy(req,res)
{
    Admin.findByIdAndDelete(req.params.id).then(result=>{
        res.status(201).json({
            message: "Admin deleted Successfully",
            post: result
        });
    })
    .catch(error => {
    
    })
}

module.exports={
    onboard_admin:onboard_admin,
    all:all,
    update:update,
    destroy:destroy
}