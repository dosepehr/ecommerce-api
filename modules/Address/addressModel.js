const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
    {
        postalCode: { type: String, required: true },
        location: {
            lat: {
                type: Number,
                required: true,
            },
            lng: {
                type: Number,
                required: true,
            },
        },

        address: {
            type: String,
            required: true,
        },

        provinceId: {
            type: Number,
            required: true,
        },

        cityId: {
            type: Number,
            required: true,
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
);

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
