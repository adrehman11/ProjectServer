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
  }
});
module.exports = mongoose.model('problem', ProblemsSchema);
