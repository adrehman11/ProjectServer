const mongoose = require('mongoose');
var schema = mongoose.Schema

var LogSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  tailorID: {
    type: String,
    required: true
  },
  callDate: {
    type: Date,
    required: true
  }
});
module.exports = mongoose.model('log', LogSchema);
