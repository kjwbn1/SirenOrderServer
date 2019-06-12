'use strict';

const owner = require('../models/owner');
const bcrypt = require('bcryptjs');

exports.registerOwner = (store_name, email, password, businessCode) =>

	new Promise((resolve,reject) => {

	    const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);
		

		const newOwner = new owner({

			store_name: store_name,
			email: email,
			hashed_password: hash,
			business_code: businessCode,
			created_at: new Date()
		});

		
		newOwner.save()
		.then(() => resolve({ status: 201, message: '해당 지점 등록에 성공하셨습니다.' }))
		.catch(err => {

			if (err.code == 11000) {

				reject({ status: 409, message: '해당 지점은 이미 등록되었습니다.' } );

			} else {

				reject({ status: 500, message: '내부서버 에러!' });
			}
		});
	
		

	});
