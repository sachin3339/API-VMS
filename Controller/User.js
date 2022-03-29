const User = require('../Models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

function signup(req, res) {
    User.findOne({ email: req.body.email })
        .then(result => {
          
            if (result) {
               
                res.status(409).json({
                    message: "Account Already exist with this email",
                });
            }
            else {
                const orgpass=req.body.password
                bcryptjs.genSalt(10, function (err, salt) {
                    bcryptjs.hash(req.body.password, salt, function (err, hash) {
                       

                        const newuser = new User({
                            username: req.body.username,
                            email: req.body.email,
                            role: req.body.role,
                            mobile:req.body.mobile,
                            emailToken: crypto.randomBytes(64).toString('hex'),
                            Isverified: false,
                            password: hash
                        });
                       

                        newuser.save().then(result => {
                           
                            res.status(201).json({
                                message: "User Signed Up Successfully Please verify your email",
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


function login(req, res) {
    User.findOne({ email: req.body.email })
        .then(user => {
            console.log(user._id)
          
            if (user === null) {
                res.status(401).json({
                    message: "Invalid Credentials",
                });
            }

            else {
                bcryptjs.compare(req.body.password, user.password, function (error, result) {
                    if (result) {
                       
                        const token = jwt.sign({
                            email: user.email,
                            username: user.username,
                            role: user.role,
                            _id:user._id
                        }, process.env.JWT_KEY, function (err, token) {
                            res.status(200).json({
                                message: "Authentication Successfull",
                                token: token
                            });

                        })
                    }
                    else {
                        res.status(401).json({
                            message: "Invalid Credentials",
                        });
                    }

                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
            });
        })

}

function verifyemail(req,res)
{
    
        const emailToken=req.query.token;
        User.findOne({ emailToken: emailToken })
        .then(user => {
            if (user === null) {
                res.status(401).json({
                    message: "Invalid Token or Token expired",
                });
            }

            else {
              user.emailToken=null
              user.Isverified=true
              user.save()
              res.status(200).json({
                message: "Email Successfully Verified",
            });
            }
    })

    
}

module.exports = {
    signup: signup,
    login: login,
    verifyemail:verifyemail
}