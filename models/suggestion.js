const mongoose = require('mongoose');
var schema = mongoose.Schema

var SuggestionSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  suggestionDiscription: {
    type: String,
    required: true
  },
  suggestionimage: {
    type: String
  },
  status: {
    type: String
  }
  ,
  utype: {
    type: String
  }
});
module.exports = mongoose.model('suggestion', SuggestionSchema);
