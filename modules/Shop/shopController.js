const { addOne, getAll } = require('../Factory/factoryController');
const Shop = require('./ShopModel');

exports.addShop = addOne(Shop);
exports.getShops = getAll(Shop, {}, [
    {
        path: 'user',
    },
]);
