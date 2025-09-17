const express = require('express');
const { createAdminUser, adminChecker, checkAdminUser, createOtp, verifyOtp, passwordReset, loginAdminUser, checkUser, generateOtp, createUser } = require('../controllers/user.controller');

const router = express.Router();


router.get('/find-user', checkUser)
router.post('/generate-otp', generateOtp)
router.post('/admin-login', loginAdminUser)
router.get('/find-admin-user', adminChecker);
router.post('/create-admin-user', createAdminUser)
router.post('/check-admin-user', checkAdminUser);
router.post('/create-otp', createOtp)
router.post('/verify-otp', verifyOtp);
router.post('/password-reset', passwordReset)
router.post('/create-user', createUser)








module.exports = router;