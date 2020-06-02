const mongoose = require('mongoose');
var schema = mongoose.Schema

var FAQSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  faqQuestion: {
    type: String,
    required: true
  },
  faqAnswer: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('FAQ', FAQSchema);
