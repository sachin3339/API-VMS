const Admin = require('../Models/Admin');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

function onboard_admin(req, res) {
    Admin.findOne({ email: req.body.email })
    .then(result => {
        if (result) {
            res.status(409).json({
                message: "Admin Already exist with this email",
            });
        }
        else {
            bcryptjs.genSalt(10, function (err, salt) {
                bcryptjs.hash(req.body.password, salt, function (err, hash) {

                    const newuser = new Admin({
                        username: req.body.username,
                        email: req.body.email,
                        role: req.body.role,
                        password: hash
                    }); 

                    newuser.save().then(result => {
                        res.status(201).json({
                            message: "Admin Created Successfully",
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