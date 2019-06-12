'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-schema-jsonschema')(mongoose);

const storeSchema = new Schema({

    idStore: {
        type: mongoose.Schema.Types.ObjectId,
        index: true
    },
    brand: { type: String },
    brandDescription: { type: String },
    storeName: { type: String },
    storeImg: { data: Buffer, contentType: String },
    businessNumber : {type:Number},
    address : {type:String},
    coordinate: {
        longitute: { type: String },
        latitude: { type: String }
    },
    img: { data: Buffer, contentType: String },
    uploadDate: { type: Date, default: Date.now }
});

let jsonSchema = storeSchema.jsonSchema();

console.dir(jsonSchema, { depth: null })


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/node-login');

module.exports = mongoose.model('store', storeSchema);