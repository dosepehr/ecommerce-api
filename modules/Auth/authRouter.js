const express = require('express');
const { sendOtp, verifyOtp, completeData } = require('./authController');
const { protect } = require('../../utils/middlewares/auth');

const authRouter = express.Router();

authRouter.post('/sendOtp', sendOtp);
authRouter.post('/verifyOtp', verifyOtp);
authRouter.post('/completeData', protect, completeData);

module.exports = authRouter;
