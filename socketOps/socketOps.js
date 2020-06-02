var chat = require("../models/chat");

const allSocketOps = (io) => {
    io.sockets.on("connection", (socket) => {
        console.log('socket connection done successfully...', socket.id)
        socket.on("sendMessage", (msg) => {
          
            var msgModel = msg;
            console.log(msgModel);
            let msgTo = msgModel.msgTo;
            let msgFrom = msgModel.msgFrom;
            let msgDescription = msgModel.msgDescription;
            console.log(msgFrom)
            chat.find({ msgFrom: msgFrom }, (err, data) => {
                console.log(data);
                if (data === undefined || data.length === 0) {
                    var myChat = new chat({
                        msgTo: msgTo,
                        msgFrom: msgFrom,
                        msgDetails: [msgDescription]
                    });
                    myChat.save((err, newdata) => {
                        io.emit("recieveMsg",newdata);
                    })

                }
                else {
                    console.log("here fron")
                    let userMsg = data[0];
                    console.log(userMsg)
                    userMsg.msgDetails.push(msgDescription);
                    chat.update({ msgFrom: msgFrom }, { msgDetails: userMsg.msgDetails }, { new: true }, (erU, result) => {
                        io.emit("recieveMsg",result);
                    })


                }
            });


        });


        socket.on('disconnect', function () {
            socket.emit('user disconnected');
        });
    })
}


module.exports = {
    allSocketOps
}