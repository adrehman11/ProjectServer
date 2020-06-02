const mongoose = require('mongoose');

const chat = new mongoose.Schema({
      msgTo:String, // id of user whom msg is being sent to
      msgFrom:String, // id of user who is sending the message
      msgDetails:[]

});

module.exports = mongoose.model('chat', chat);