const expressAsyncHandler = require('express-async-handler');
const User = require('../User/userModel');
const OTP = require('../Otp/otpModel');
const { signToken, verifyToken } = require('../../utils/funcs/token');
const AppError = require('../../utils/Classes/AppError');

exports.protect = expressAsyncHandler(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.auth) {
        token = req.cookies.auth;
    }

    if (!token) {
        return next(new AppError('You are not logged in', 401));
    }

    // 2) Verification token
    const decoded = await verifyToken(token);
    // 3) check if user exists
    const currentUser = await User.findById(decoded?.id);
    if (!currentUser) {
        return next(new AppError('Invalid token', 401));
    }
    if (currentUser.ban) {
        return next(new AppError('Banned user', 403));
    }
    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError(
                'User recently changed password! Please log in again.',
                401
            )
        );
    }
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    req.body.user = currentUser._id;
    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(
                    "you don't have permission to perform this action",
                    403
                )
            );
        }
        next();
    };
};

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
            const token = signToken({ id: currentUser._id });

            return res.status(200).json({ otp, token });
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
        const token = signToken({ id: user._id });

        const otp = await OTP.create({
            code: otpCode,
            phone,
            expiresAt: new Date(Date.now() + 2 * 60 * 1000),
        });
        return res.status(200).json({ otp, token });
    }
});

exports.verifyOtp = expressAsyncHandler(async (req, res, next) => {
    const { otp } = req.body;
    const { user } = req;
    const validOtp = await OTP.findOne({
        phone: user.phone,
        code: otp,
        expiresAt: { $gt: new Date(Date.now() - 2 * 60 * 1000) },
    });

    if (!validOtp) {
        return res.status(400).json({ message: 'no user' });
    } else {
        return res.status(200).json({ message: 'welcome' });
    }
});
