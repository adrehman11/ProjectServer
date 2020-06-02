const mongoose = require('mongoose');
var schema = mongoose.Schema

var ContactUsSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  contactUsDiscription: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('contactus', ContactUsSchema);
