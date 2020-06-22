const mongoose = require('mongoose');


var User = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  contact: {
    type: Number,
    required: true
  },
  email: {
    type: String,

  },
  gender: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image:{
    type:String
  },
  registermonth:{
    type:String
  }
});
module.exports = mongoose.model('users', User);
