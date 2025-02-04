const express = require('express');
const { sendOtp, verifyOtp } = require('./authController');

const authRouter = express.Router();

authRouter.post('/sendOtp', sendOtp);
authRouter.post('/verifyOtp', verifyOtp);

module.exports = authRouter;
