'use strict';

const user = require('../models/user');
const bcrypt = require('bcryptjs');

exports.loginUser = (email, password) =>

	new Promise((resolve,reject) => {

		user.find({email: email})

		.then(users => {

			if (users.length == 0) {

				reject({ status: 404, message: 'User Not Found !' });

			} else {

				return users[0];

			}
		})

		.then(user => {

			const hashed_password = user.hashed_password;
			const business_code = user.business_code;

			if (bcrypt.compareSync(password, hashed_password)) {

				resolve({ status: 200, message: email ,business_code: business_code});

			} else {

				reject({ status: 401, message: 'Invalid Credentials !' });
			}
		})

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

	});
