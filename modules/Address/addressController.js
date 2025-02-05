const expressAsyncHandler = require('express-async-handler');
const { addOne, getOne } = require('../Factory/factoryController');
const Address = require('./addressModel');

exports.addAddress = addOne(Address);
exports.getAddress = getOne(Address, {}, [
    {
        path: 'user',
    },
]);
