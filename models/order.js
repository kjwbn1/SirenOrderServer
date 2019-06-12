'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const orderSchema = new Schema({
    product: [{price: String , product : String , quantity: Number}],
    name : {type:String},
    totalPrice: {type:Number},
    uploadDate: { type: Date, default: Date.now }
});




mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/node-login');

module.exports = mongoose.model('order', orderSchema);

