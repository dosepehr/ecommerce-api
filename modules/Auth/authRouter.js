const express = require('express');
const { sendOtp, verifyOtp, protect } = require('./authController');

const authRouter = express.Router();

authRouter.post('/sendOtp', sendOtp);
authRouter.post('/verifyOtp', verifyOtp);

module.exports = authRouter;
