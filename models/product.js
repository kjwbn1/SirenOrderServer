'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-schema-jsonschema')(mongoose);

const productSchema = new Schema({
    
    idProduct: {
        type: mongoose.Schema.Types.ObjectId,
        index: true
    },
    category: {type: String},
    product: {type: String},
    brand: {type: String},
    size: {type: String},
    price: {type: String},
    description: {type: String},
    quantity: {type: Number},
    img: { data: Buffer, contentType: String },
    uploadDate: {type: Date, default: Date.now}
});

let jsonSchema = productSchema.jsonSchema();

console.dir(jsonSchema, {depth:null})



mongoose.Promise = global.Promise;

const uri = "mongodb://localhost:27017,localhost:27018,localhost:27019/node-login?replicaSet=mongo-repl";
// const uri = "mongodb://localhost:27017/node-login?replicaSet=mongo-repl";
mongoose.connect(uri);

module.exports = mongoose.model('product', productSchema);