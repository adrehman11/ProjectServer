const mongoose = require('mongoose');
var schema = mongoose.Schema

var RatingSchema = new mongoose.Schema({
  orderID: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  },
  valueOfRating: {
    type: String,
    required: true
  },
  tailorID: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('rating', RatingSchema);
