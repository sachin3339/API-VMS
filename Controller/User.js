const User = require('../Models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer')



function signup(req, res) {
    User.findOne({ email: req.body.email })
        .then(result => {
            if (result) {
                res.status(409).json({
                    message: "Account Already exist with this email",
                });
            }
            else {
                bcryptjs.genSalt(10, function (err, salt) {
                    bcryptjs.hash(req.body.password, salt, function (err, hash) {
                        // create reusable transporter object using the default SMTP transport
                        let transporter = nodemailer.createTransport({
                            host: 'smtp.office365.com',
                            port: 587,
                            secure: false, // true for 465, false for other ports
                            auth: {
                                user: 'sachin.diwakar@alchemyinfotech.com', // generated ethereal user
                                pass: 'P@ssword@123', // generated ethereal password
                            },
                            tls: {
                                ciphers: 'SSLv3'
                            }
                        });

                        const newuser = new User({
                            username: req.body.username,
                            email: req.body.email,
                            role: req.body.role,
                            emailToken: crypto.randomBytes(64).toString('hex'),
                            Isverified: false,
                            password: hash
                        });
                        // send mail with defined transport object
                        let info = transporter.sendMail({
                            from: '"Verify your email👻" <sachin.diwakar@alchemyinfotech.com>', // sender address
                            to: "sachindiwakar3339@gmail.com", // list of receivers
                            subject: "Alchemy Solutions: Verify your email ✔", // Subject line
                            html: `<h2> Hi, ${req.body.username}! You have been onboarded as ${req.body.role}
                            <h4>Please verify your email to continue...</h4>
                            <a href="http://${req.headers.host}/user/verify-email?token=${newuser.emailToken}">Verify your Email</a>
                            `, // html body
                        });

                        newuser.save().then(result => {
                            transporter.sendMail(info, function (error, info) {
                                if (error)
                                    console.log(error)

                            })
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
                            role: user.role
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


module.exports = {
    signup: signup,
    login: login
}