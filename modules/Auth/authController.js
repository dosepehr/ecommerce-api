const expressAsyncHandler = require('express-async-handler');
const User = require('../User/userModel');
const OTP = require('../Otp/otpModel');
exports.sendOtp = expressAsyncHandler(async (req, res, next) => {
    const { phone } = req.body;

    const currentUser = await User.findOne({ phone });
    if (currentUser) {
        if (currentUser.role == 'not-complete') {
            // re generate otp
            const otpCode = Math.floor(10000 + Math.random() * 90000);

            const otp = await OTP.create({
                code: otpCode,
                phone,
                expiresAt: new Date(Date.now() + 2 * 60 * 1000),
            });
            return res.status(200).json({ otp });
        } else {
            return res.status(400).json({
                status: false,
                message: 'User Exists, try to login',
            });
        }
    } else {
        const otpCode = Math.floor(10000 + Math.random() * 90000);
        // generate opt & user together
        const user = await User.create({
            phone,
            email: `user-email-${phone}@gmail.com`,
            name: ' ',
            role: 'not-complete',
            password: ' ',
            username: `user-name-${phone}`,
        });
        const otp = await OTP.create({
            code: otpCode,
            phone,
            expiresAt: new Date(Date.now() + 2 * 60 * 1000),
        });
        return res.status(200).json({ otp, user });
    }
});

exports.verifyOtp = expressAsyncHandler(async (req, res, next) => {
    const { phone, otp } = req.body;

    const validOtp = await OTP.findOne({
        phone,
        code: otp, 
        expiresAt: { $gt: new Date(Date.now() - 2 * 60 * 1000) }, 
    });

    if (!validOtp) {
        return res.status(400).json({ message: 'no user' });
    } else {
        return res.status(200).json({ message: 'welcome' });
    }
});
