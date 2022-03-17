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

module.exports={
    onboard_admin:onboard_admin
}