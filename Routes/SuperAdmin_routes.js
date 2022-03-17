const express=require('express');
const OnboardAdmin=require('../Controller/OnboardAdmin');
const OnboardVendor=require('../Controller/OnboardVendor');
const checkAuthMiddleware=require('../Middleware/check-auth')
const router=express.Router();
router.use(express.json());

router.post("/onboardadmin",checkAuthMiddleware.checkAuth,OnboardAdmin.onboard_admin);
router.post("/onboarvendor",checkAuthMiddleware.checkAuth,OnboardVendor.onboard_vendor);

module.exports= router;
