const expressAsyncHandler = require('express-async-handler');
const cities = require('../../utils/global/cities.json');
const provinces = require('../../utils/global/provinces.json');

exports.getCities = expressAsyncHandler(async (req, res, next) => {
    return res.status(200).json({
        status: true,
        data: cities,
    });
});
exports.getProvinces = expressAsyncHandler(async (req, res, next) => {
    return res.status(200).json({
        status: true,
        data: provinces,
    });
});
