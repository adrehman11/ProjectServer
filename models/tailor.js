const mongoose = require('mongoose');

const tailor = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  contact: {
    type: String,
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
 lati:{
   type:String
 },
 lngi:{
   type:String
 },
 rating:{
  type: String
},
  image:{
    type: String
  }
  
});
 module.exports = mongoose.model('Tailor', tailor);
