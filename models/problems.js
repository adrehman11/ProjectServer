const mongoose = require('mongoose');
var schema = mongoose.Schema

var ProblemsSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  problemDiscription: {
    type: String,
    required: true
  },
  problemimage: {
    type: String
  },
  status: {
    type: String
  }
});
module.exports = mongoose.model('problem', ProblemsSchema);
