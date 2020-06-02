const mongoose = require('mongoose');

const Model = new mongoose.Schema({
    categoryid:{
        type:String,
        required:true
    },
  modelname: {
    type: String,
    required: true
  },
  modeldiscription: {
    type: String,
    required: true
  },
  modelthumbnail: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('model', Model);