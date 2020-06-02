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
  suggestionDate: {
    type: Date,
    required: true
  }
});
module.exports = mongoose.model('suggestion', SuggestionSchema);
