const express=require('express');
const User=require('../Controller/User');

const router=express.Router();
router.use(express.json());

router.post("/signup",User.signup);
router.post("/login",User.login);
router.get("/verify-email",User.verifyemail);

module.exports= router;
