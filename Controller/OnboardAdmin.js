const Admin = require('../Models/Admin');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');


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
                        password: hash
                    })

                    const newuser = new Admin({
                        EMP_ID:req.body.EMP_ID,
                        Reporting_Manager: req.body.Reporting_Manager,
                        User: newadm
                    }); 

                    newadm.save().then(result => {
                        newuser.save()
                        res.status(201).json({
                            message: "Admin Onboarded Successfully",
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