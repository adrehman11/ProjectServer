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
module.exports = mongoose.model('CustomerRequirement', CustomerRequirementSchema);
