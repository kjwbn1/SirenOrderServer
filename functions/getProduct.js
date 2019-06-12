'use strict';

const product = require('../models/product');


exports.getProduct =() =>

    new Promise((resolve, reject) => {

        product.find({}, {category: 1,product: 1,brand: 1,size: 1,price: 1,description: 1,_id: 0, img: 1})
        .then(products => resolve(products))
        .catch(err => reject({ status: 500, message: 'Internal Server Error' }))
    });



