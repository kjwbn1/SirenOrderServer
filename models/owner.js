'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ownerSchema = new Schema({

	store_name: String,
	email: String,
	hashed_password: String,
	created_at: String,
	business_code: String,
	temp_password: String,
	temp_password_time: String

});




mongoose.Promise = global.Promise;

const uri = "mongodb://localhost:27017,localhost:27018,localhost:27019/node-login?replicaSet=mongo-repl";
// const uri = "mongodb://localhost:27017/node-login?replicaSet=mongo-repl";
mongoose.connect(uri);


const owner = mongoose.model('owner', ownerSchema);

// user.watch().on('change', change => console.log(change));


// mongoose.connect('mongodb://localhost:27017/node-login', {useMongoClient:true});
module.exports = owner

