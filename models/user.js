'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({

	name: String,
	email: String,
	hashed_password: String,
	created_at: String,
	temp_password: String,
	temp_password_time: String

});




mongoose.Promise = global.Promise;

const uri = "mongodb://localhost:27017,localhost:27018,localhost:27019/node-login?replicaSet=mongo-repl";
// const uri = "mongodb://localhost:27017/node-login?replicaSet=mongo-repl";
mongoose.connect(uri);


const user = mongoose.model('user', userSchema);

// user.watch().on('change', change => console.log(change));


// mongoose.connect('mongodb://localhost:27017/node-login', {useMongoClient:true});
module.exports = user

