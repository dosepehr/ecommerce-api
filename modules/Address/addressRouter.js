const express = require('express');
const { addAddress } = require('./addressController');
const { protect } = require('../../utils/middlewares/auth');

const addressRouter = express.Router();

addressRouter.route('/').post(protect, addAddress);

module.exports = addressRouter;
