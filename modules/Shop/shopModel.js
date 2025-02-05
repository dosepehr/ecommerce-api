const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema(
    {
        name: {
            type: String,
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

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
