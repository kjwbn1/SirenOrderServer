'use strict';

const status = require('../models/status');



exports.registerStatus = (email, address, day, timestart, timeend) =>

	new Promise((resolve,reject) => {
		
		const newStatus = new status({

			email : email,
			address : address,
			day : day,
			timestart: timestart,
			timeend : timeend,
			created_at: new Date()
		});

		newStatus.save()

		.then(() => resolve({ status: 201, message: 'Status Registered Sucessfully !' }))

		.catch(err => {

			if (err.code == 11000) {

				reject({ status: 409, message: 'Status Already Registered !' });

			} else {

				reject({ status: 500, message: 'Internal Server Error !' });
		}	
		});
});
