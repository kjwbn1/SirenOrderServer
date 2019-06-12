const order = require('../models/order');



exports.registerOrderList = (product, name , totalPrice ) =>

    new Promise((resolve, reject) => {

        var doc = null;

        const newOrder = new order({

            product: product,
            name : name,
            totalPrice: totalPrice
        
            
        });

        


        newOrder.save()
            .then(() => resolve({ status: 200, message: '성공적으로등록 완료' }))
            .catch(err => {

                if (err.code == 11000) {
                    reject({ status: 400, message: '주문정보등록실패' });
                } else {
                    reject({ status: 500, message: '내부서버에러!' });

                }
            })
    }
    )

