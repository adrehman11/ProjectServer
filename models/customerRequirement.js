const mongoose = require('mongoose');
var schema = mongoose.Schema

var CustomerRequirementSchema = new mongoose.Schema({
  userID: {
    type: String,
    
  },
  tailorID :{
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
    type:String
  }
  ,OderDeadline:{
    type:String
  } ,coments:{
    type:String
  },status:{
    type:String
  }
  ,Dressprice:{
    type:String
  }



});
module.exports = mongoose.model('CustomerRequirement', CustomerRequirementSchema);
