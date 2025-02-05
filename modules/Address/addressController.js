const expressAsyncHandler = require('express-async-handler');
const { addOne } = require('../Factory/factoryController');
const Address = require('./addressModel');

exports.addAddress = addOne(Address);
