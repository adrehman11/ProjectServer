const mongoose = require('mongoose');
var schema = mongoose.Schema

var GuidesSchema = new mongoose.Schema({
  guideName: {
    type: String,
    required: true
  },
  guideType: {
    type: String,
    required: true
  },
  guideLink: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('guides', GuidesSchema);
