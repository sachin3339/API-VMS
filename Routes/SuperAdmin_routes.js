const express=require('express');
const OnboardAdmin=require('../Controller/OnboardAdmin');
const OnboardVendor=require('../Controller/OnboardVendor');
const checkAuthMiddleware=require('../Middleware/check-auth')
const router=express.Router();
router.use(express.json());

//Route for Admins
router.post("/onboardadmin",checkAuthMiddleware.checkAuth,OnboardAdmin.onboard_admin);
router.get("/showadmins",checkAuthMiddleware.checkAuth,OnboardAdmin.all);
router.patch("/updateadmin/:id",checkAuthMiddleware.checkAuth,OnboardAdmin.update);
router.delete("/deleteadmin/:id",checkAuthMiddleware.checkAuth,OnboardAdmin.destroy);

//Route for Vendors
router.post("/onboarvendor",checkAuthMiddleware.checkAuth,OnboardVendor.onboard_vendor);
router.get("/showvendors",checkAuthMiddleware.checkAuth,OnboardVendor.all);
router.get("/myvendors",checkAuthMiddleware.checkAuth,OnboardVendor.myvendors);
router.patch("/updatevendor/:id",checkAuthMiddleware.checkAuth,OnboardVendor.update);
router.delete("/deletevendor/:id",checkAuthMiddleware.checkAuth,OnboardVendor.destroy);

module.exports= router;
