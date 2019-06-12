'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http  = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const logger = require('morgan');
const router = express.Router();
const port = process.env.PORT || 8080;
let doc;
const order = require('./models/order');



app.use(bodyParser.json());
app.use(logger('dev'));

require('./routes')(router);
console.log(new Date(), 'router start');
app.use('/api/v1', router);


// order.watch().on('change', function(change) {
//     console.log(change);

// });

io.on('connection', (socket) => {

    console.log('user connected')

    socket.on('join', function (userNickname) {

        console.log(userNickname + " : has joined the chat ");
        

        socket.broadcast.emit('userjoinedthechat', userNickname + " : has joined the chat ");

        
       
    });

    order.watch().on('change', function(change) {
        console.log(change);

        
        let fullDocument = {"product" : change.fullDocument.product  , "employee": change.fullDocument.name, "uploadDate" : change.fullDocument.uploadDate ,"totalPrice": change.fullDocument.totalPrice}
        io.emit('message', fullDocument);    
    });


    socket.on('messagedetection', (senderNickname, messageContent) => {

        //log the message in console 

         

        console.log(senderNickname + " :" + messageContent)
        //create a message object 
        let message = { "message": messageContent, "senderNickname": senderNickname }
        // send the message to the client side  
        io.emit('message', message);

    });


    socket.on('completeorder', (message)=>{
        console.log(message);
        io.emit('wouldyoutakeaorder',message);

    })


    socket.on('disconnect', function () {
        console.log(' user has left ')
        // socket.off()
        
        socket.broadcast.emit("userdisconnect", " user has left ")

    });
});



server.listen(port);
console.log(new Date(), 'app start');
console.log(`App Runs on ${port}`);
console.log(new Date(), 'run start');
console.log(doc);
