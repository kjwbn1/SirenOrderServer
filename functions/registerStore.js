'use strict'

const store = require('../models/store');
const fs = require('fs');

// registerStore()


function registerStore() {
	new Promise((resolve, reject) => {
		const imgPath = '/Users/joongwonkim/Desktop/img_coffee_full.jpg'
		const newStore = new store({
			
			brand: "비엔나 커피 하우스, Wien1683",
			brandDescription: "유네스코 무형문화유산에 등록된,300년 전통의 역사와 문화를 간직한 비엔나커피하우스로 초대합니다",
			storeName: "스포렉스점",
			businessNumber : "06",
			address : "서울특별시 관악구 신림동 1467-12",
			coordinate: {
				latitude: "37.487258",
				longitute: "126.926935"
			},
			
		});
		newStore.img.data = fs.readFileSync(imgPath);
		newStore.img.contentType = 'image/jpg';
		newStore.save()
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

// brand: "비엔나 커피 하우스, Wien1683",
// brandDescription: "유네스코 무형문화유산에 등록된,300년 전통의 역사와 문화를 간직한 비엔나커피하우스로 초대합니다",
// storeName: "르네상스점",
// businessNumber : "03",
// address : "서울특별시 관악구 신림동 1467-5",
// coordinate: {
// 	latitude: "37.484454",
// 	longitute: "126.930166"


// brand: "비엔나 커피 하우스, Wien1683",
// brandDescription: "유네스코 무형문화유산에 등록된,300년 전통의 역사와 문화를 간직한 비엔나커피하우스로 초대합니다",
// storeName: "포도몰점",
// businessNumber : "04",
// address : "서울특별시 관악구 신림로 330 포도몰",
// coordinate: {
// 	latitude: "37.483844",
// 	longitute: "126.930080"
// },


// brand: "비엔나 커피 하우스, Wien1683",
// brandDescription: "유네스코 무형문화유산에 등록된,300년 전통의 역사와 문화를 간직한 비엔나커피하우스로 초대합니다",
// storeName: "스포렉스점",
// businessNumber : "06",
// address : "서울특별시 관악구 신림동 1467-12",
// coordinate: {
// 	latitude: "37.487258",
// 	longitute: "126.926935"
// },