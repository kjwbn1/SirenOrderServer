'use strict'

const product = require('../models/product');
const fs = require('fs');

registerProduct()


function registerProduct() {
	new Promise((resolve, reject) => {
		const imgPath = '/Users/kimjoongwon/Desktop/cafelatte.png'
		const newProduct = new product({
			category: '음료',
			product: '카페라떼',
			brand: '비엔나커피',
			size: 'tall',
			price: '6800',
			description: '우유커피',
			quantity: 100
		});
		newProduct.img.data = fs.readFileSync(imgPath);
		newProduct.img.contentType = 'image/png';
		newProduct.save()
			.then(() => resolve({ status: 201, message: 'Status Registered Sucessfully !' }))
			.catch(err => {

				if (err.code == 11000) {
					reject({ status: 409, message: 'Status Already Registered !' });
				} else {
					reject({ status: 500, message: 'Internal Server Error !' });
				}
			});
	});
}

