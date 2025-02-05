const express = require('express');
const { getCities, getProvinces } = require('./globalController');

const globalRouter = express.Router();

globalRouter.route('/cities').get(getCities);
globalRouter.route('/provinces').get(getProvinces);

module.exports = globalRouter;
