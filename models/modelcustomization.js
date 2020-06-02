const mongoose = require('mongoose');
var schema = mongoose.Schema

var ModelCustomizationSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  dressModelID: {
    type: String,
    required: true
  },
  emblishmentID: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('modelcustomization', ModelCustomizationSchema);
