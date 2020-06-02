const mongoose = require('mongoose');
var schema = mongoose.Schema

var Measurement = new mongoose.Schema({
  userID :{
    type: String,
   
  },
  Shirt_length: {
    type: String,
    
  },
  Shirt_neck: {
    type: String,
   
  },
  Shirt_chest: {
    type: String,
    
  },
  Shirt_waist: {
    type: String,
    
  },
  Shirt_backwidth: {
    type: String,
   
  },
  Shirt_Hips:{
    type: String,
    
  },
  Shirt_sleeevelenght:{
    type: String,
    
  },
  Shirt_Shoulder:{
    type: String,
    
  },
  Shirt_QuaterSleeveLength:{
    type: String,
    
  },
  Shirt_wrist:{
    type: String,
    
  } , trouser_length:{
    type: String,
    
  },
  trouser_calf:{
    type: String,
    
  },
  trouser_ankle:{
    type: String,
    
  }

});
module.exports = mongoose.model('measurements', Measurement);
