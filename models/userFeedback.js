const mongoose = require('mongoose');
var schema = mongoose.Schema

var UserFeedbackSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  feedBackComments: {
    type: String,
    required: true
  },

  starValue: {
    type: Number,
    required: true
  },
  feedbackDate: {
    type: Date,
    required: true
  }
});
module.exports = mongoose.model('userfeedback', UserFeedbackSchema);
