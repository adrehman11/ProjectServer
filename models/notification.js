const mongoose = require('mongoose');
var schema = mongoose.Schema

var NotificationSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  notificationDiscription: {
    type: String,
    required: true
  },
  notificationDate: {
    type: Date,
    required: true
  }
});
module.exports = mongoose.model('notification', NotificationSchema);
