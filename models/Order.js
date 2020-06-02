const mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  tailorID: {
    type: String,
    required: true
  }, userID: {
    type: String,
    
  },
  orderID:{
    type: String,
  },
  shirtDetails: {
    type: String,
    
  },
 trouserDetails: {
    type: String,
    
  }
  ,dresstype:{
    type:String
  }
  ,stichtype:{
    type:String
  }
  ,lace:{
    type:String
  }
  ,pipe:{
    type:String
  }
  ,button:{
    type:String
  }
  ,odertype:{
    type:String
  }
  ,image:{
    type:String
  }
  ,orderDate:{
    type:String,
    required: true 
  },
  OderDeadline:{
    type:String
  } ,
  coments:{
    type:String
  },
  orderStatus:{
    type:String
  },
  meaurementID:{
    type:String
  },
  orderstartedDate:{
    type:String
  },
  Dressprice:{
    type:String
  },
  rating:{
    type:String
  },
  ratingStatus:{
    type:String
  },

});
module.exports = mongoose.model('order', OrderSchema);
