const express=require('express');
const OnboardAdmin=require('../Controller/OnboardAdmin');
const OnboardVendor=require('../Controller/OnboardVendor');
const checkAuthMiddleware=require('../Middleware/check-auth')
const router=express.Router();
router.use(express.json());
const cvuploader=require('../Helpers/Pdf-Uploader');

//Route for Admins
router.post("/onboardadmin",checkAuthMiddleware.checkAuth,OnboardAdmin.onboard_admin);
router.get("/showadmins",checkAuthMiddleware.checkAuth,OnboardAdmin.all);
router.patch("/updateadmin/:id",checkAuthMiddleware.checkAuth,OnboardAdmin.update);
router.delete("/deleteadmin/:id",checkAuthMiddleware.checkAuth,OnboardAdmin.destroy);

//Route for Vendors
router.post("/onboarvendor",checkAuthMiddleware.checkAuth,cvuploader.upload.fields([{ name: 'ESIC_CAL', maxCount: 1 }, { name: 'PF_CAL', maxCount: 1 },{ name: 'PF_CHALLAN', maxCount: 1 },{ name: 'ESIC_CHALLAN', maxCount: 1 },{ name: 'PT_RC', maxCount: 1 },{ name: 'AUDIT_SHEET', maxCount: 1 },{ name: 'FORM_5A', maxCount: 1 },{ name: 'ESTABLISHMENT_CA', maxCount: 1 },{ name: 'DSC', maxCount: 1 },{ name: 'COI', maxCount: 1 },{ name: 'GST_CERT', maxCount: 1 },{ name: 'LWF', maxCount: 1 }]),OnboardVendor.onboard_vendor);
router.get("/showvendors",checkAuthMiddleware.checkAuth,OnboardVendor.all);
router.get("/myvendors",checkAuthMiddleware.checkAuth,OnboardVendor.myvendors);
router.get("/show/:id",checkAuthMiddleware.checkAuth,OnboardVendor.Show);
router.patch("/updatevendor/:id",checkAuthMiddleware.checkAuth,cvuploader.upload.fields([{ name: 'ESIC_CAL', maxCount: 1 }, { name: 'PF_CAL', maxCount: 1 },{ name: 'PF_CHALLAN', maxCount: 1 },{ name: 'ESIC_CHALLAN', maxCount: 1 },{ name: 'PT_RC', maxCount: 1 },{ name: 'AUDIT_SHEET', maxCount: 1 },{ name: 'FORM_5A', maxCount: 1 },{ name: 'ESTABLISHMENT_CA', maxCount: 1 },{ name: 'DSC', maxCount: 1 },{ name: 'COI', maxCount: 1 },{ name: 'GST_CERT', maxCount: 1 },{ name: 'LWF', maxCount: 1 }]),OnboardVendor.update);
router.delete("/deletevendor/:id",checkAuthMiddleware.checkAuth,OnboardVendor.destroy);

module.exports= router;
