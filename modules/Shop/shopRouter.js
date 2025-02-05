const express = require('express');
const { addShop, getShops } = require('./shopController');
const { protect, restrictTo } = require('../../utils/middlewares/auth');

const shopRouter = express.Router();

shopRouter.route('/').post(protect, restrictTo('seller'), addShop).get(getShops)

module.exports = shopRouter;
