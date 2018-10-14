'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statusSchema = mongoose.Schema({

  	email     	: String,
  	address 	: String,
	day 		: String,
	timestart	: String,
	timeend		: String,
	created_at	: String

});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/node-login', {useMongoClient:true});

module.exports = mongoose.model('status', statusSchema);
