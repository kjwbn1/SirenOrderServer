'use strict';

const auth = require('basic-auth');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const register = require('./functions/register');
const statusRegister = require('./functions/statusRegister');
const login = require('./functions/login');
const profile = require('./functions/profile');
const password = require('./functions/password');
const config = require('./config/config.json');
const registerImage = require('./functions/registerProduct');
const product = require('./models/product');
const getProduct = require('./functions/getProduct');
const orderlists = require('./functions/orderMenu');
const registerOrderList = require('./functions/registerOrderList');
const registerOwner = require('./functions/registerOwner')
// const order = require('./models/order');


module.exports = router => {



	


	router.get('/', (req, res) => res.end('Welcome joongwon world !'));


	router.get('/products/all', (req, res) => {

		getProduct.getProduct()
			.then(result => res.json(result))
			.catch(err => res.status(err.status).json({ message: err.message }));



		// console.log("Get cake function");
		// product.find(function (err, product) {
		// 	if (err) return next(err);
		// // var base64 = (product[0].img.data.toString('base64'));
		// res.contentType(product[req.params.id].img.contentType);
		// res.send(product[req.params.id].img.data);
		// //  res.send(base64);        
		// });
		// // product.find({}, function(err,products){
		// // 	res.render('index',{ products: products});

		// // })
	})

	router.post('/orders', (req, res) => {

		const product = req.body.product;
		const totalprice = req.body.totalPrice;
		const name = req.body.name

		// order.watch().on('change', function(change) {
		// 	console.log(change);

        // });

		registerOrderList.registerOrderList(product,name,totalprice)
			.then((result) => {

				res.setHeader('location', 'orders/' + 'satr');
				res.status(result.status).json({ message: result.message })
			})
			.catch(err => res.status(err.status).json({ message: err.message }))
		
	})


	router.post('/owners', (req,res)=>{
		const store_name = req.body.storeName;
		const email = req.body.email;
		const password = req.body.password;
		const business_code = req.body.businessCode;

		if (!store_name || !email || !password || !store_name.trim() || !email.trim() || !password.trim()|| !business_code.trim()) {

			res.status(400).json({ message: 'Invalid Request !' });

		} else {

		registerOwner.registerOwner(store_name, email,password,business_code)
		.then((result) => {

			res.setHeader('location', '/owners/'+store_name);
			res.status(result.status).json({message:result.message})

		})
		.catch(err => res.status(res.status).json({message:err.message}))
	
		
		}
	})



	router.post('/authenticate', (req, res) => {

		const credentials = auth(req);

		if (!credentials) {

			res.status(400).json({ message: 'Invalid Request !' });

		} else {

			login.loginUser(credentials.name, credentials.pass)

				.then(result => {

					const token = jwt.sign(result, config.secret, { expiresIn: 1440 });

					res.status(result.status).json({ message: result.message, token: token, businessCode: result.business_code });

				})

				.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});

	router.post('/users', (req, res) => {

		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;

		if (!name || !email || !password || !name.trim() || !email.trim() || !password.trim()) {

			res.status(400).json({ message: 'Invalid Request !' });

		} else {

			register.registerUser(name, email, password)
				.then((result) => {

					res.setHeader('Location', '/users/' + email);
					res.status(result.status).json({ message: result.message })
				})
				.catch(err => res.status(err.status).json({ message: err.message }));

		}
	});


	router.post('/status', (req, res) => {

		const email = req.body.email;
		const address = req.body.address;
		const day = req.body.day;
		const timestart = req.body.timestart;
		const timeend = req.body.timeend;

		if (!email || !address || !day || !timestart || !timeend || !email.trim() || !address.trim() || !day.trim() || !timestart.trim() || !timeend.trim()) {

			res.status(400).json({ message: '로그인 하세요.' });

		} else {

			statusRegister.registerStatus(email, address, day, timestart, timeend)

				.then(result => {

					res.setHeader('Location', '/users/' + email);
					res.status(result.status).json({ message: result.message })

				})

				.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});

	router.get('/users/:id', (req, res) => {

		if (checkToken(req)) {

			profile.getProfile(req.params.id)

				.then(result => res.json(result))

				.catch(err => res.status(err.status).json({ message: err.message }));

		} else {

			res.status(401).json({ message: 'Invalid Token !' });
		}
	});

	router.put('/users/:id', (req, res) => {

		if (checkToken(req)) {

			const oldPassword = req.body.password;
			const newPassword = req.body.newPassword;

			if (!oldPassword || !newPassword || !oldPassword.trim() || !newPassword.trim()) {

				res.status(400).json({ message: 'Invalid Request !' });

			} else {

				password.changePassword(req.params.id, oldPassword, newPassword)

					.then(result => res.status(result.status).json({ message: result.message }))

					.catch(err => res.status(err.status).json({ message: err.message }));

			}
		} else {

			res.status(401).json({ message: 'Invalid Token !' });
		}
	});

	router.post('/users/:id/password', (req, res) => {

		const email = req.params.id;
		const token = req.body.token;
		const newPassword = req.body.password;

		if (!token || !newPassword || !token.trim() || !newPassword.trim()) {

			password.resetPasswordInit(email)

				.then(result => res.status(result.status).json({ message: result.message }))

				.catch(err => res.status(err.status).json({ message: err.message }));

		} else {

			password.resetPasswordFinish(email, token, newPassword)

				.then(result => res.status(result.status).json({ message: result.message }))

				.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});

	function checkToken(req) {

		const token = req.headers['x-access-token'];

		if (token) {

			try {

				var decoded = jwt.verify(token, config.secret);

				return decoded.message === req.params.id;

			} catch (err) {

				return false;
			}

		} else {

			return false;
		}
	}
}
