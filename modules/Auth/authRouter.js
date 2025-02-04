const express = require('express');
const { sendOtp } = require('./authController');

const authRouter = express.Router();

authRouter.post('/sendOtp', sendOtp);

module.exports = authRouter;
