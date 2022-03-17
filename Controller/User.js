const User = require('../Models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

                        const newuser = new User({
                            username: req.body.username,
                            email: req.body.email,
                            role: req.body.role,
                            password: hash
                        }); 

                        newuser.save().then(result => {
                            res.status(201).json({
                                message: "User Signed Up Successfully",
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


function login(req,res)
{
    User.findOne({email:req.body.email})
 .then(user=>{
     if(user===null)
     {
        res.status(401).json({
            message:"Invalid Credentials",
        });
     }

     else{
         bcryptjs.compare(req.body.password, user.password, function(error, result){
             if(result)
             {
                 const token=jwt.sign({
                     email:user.email,
                     username:user.username,
                     role:user.role
                 },process.env.JWT_KEY,function(err,token){
                    res.status(200).json({
                        message:"Authentication Successfull",
                        token:token
                    });

                 })
             }
             else{
                res.status(401).json({
                    message:"Invalid Credentials",
                });
             }

         })
     }
 })
 .catch(error=>{
    res.status(500).json({
        message:"Something went wrong",
    });
 })

}


module.exports={
    signup:signup,
    login:login
}