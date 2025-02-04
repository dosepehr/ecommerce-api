const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema(
    {
        code: {
            type: Number,
            required: true,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
);

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;
