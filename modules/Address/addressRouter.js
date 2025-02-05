const express = require('express');
const { addAddress,getAddress } = require('./addressController');
const { protect } = require('../../utils/middlewares/auth');

const addressRouter = express.Router();

addressRouter.route('/').post(protect, addAddress);
addressRouter.route('/:id').get(protect, getAddress);

module.exports = addressRouter;
