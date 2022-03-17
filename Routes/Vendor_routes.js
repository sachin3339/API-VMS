const express=require('express');
const OnboardCandidate=require('../Controller/Candidate_cont');
const checkAuthMiddleware=require('../Middleware/check-auth')
const router=express.Router();
router.use(express.json());

router.post("/submit/:id",checkAuthMiddleware.checkAuth,OnboardCandidate.Submit);
router.get("/show/:id",checkAuthMiddleware.checkAuth,OnboardCandidate.Show);
router.get("/all",checkAuthMiddleware.checkAuth,OnboardCandidate.all);
router.patch("/update/:id",checkAuthMiddleware.checkAuth,OnboardCandidate.update);
router.delete("/delete/:id",checkAuthMiddleware.checkAuth,OnboardCandidate.destroy);

module.exports= router;
