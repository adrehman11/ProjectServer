var express = require('express');
var router = express.Router();
const measurement = require('../models/measurements');

router.post('/shirt',(req,res)=>{
  var post_data=req.body;
  var userID = post_data.id
  var Shirt_length=post_data.shirt_length;
  var Shirt_neck=post_data.Shirt_neck;
  var Shirt_chest=post_data.Shirt_chest;
  var Shirt_waist=post_data.Shirt_waist;
  var Shirt_backwidth=post_data.Shirt_backwidth;
  var Shirt_Hips=post_data.Shirt_Hips;
  var Shirt_sleeevelenght=post_data.Shirt_sleeevelenght;
  var Shirt_Shoulder=post_data.Shirt_Shoulders;
  var Shirt_QuaterSleeveLength=post_data.Shirt_QuaterSleeveLengths;
  var Shirt_wrist=post_data.Shirt_wrisst;

  var myquerry= {userID:userID};
  var newvalues={ Shirt_length:Shirt_length,
   Shirt_neck:Shirt_neck,
  Shirt_chest:Shirt_chest,
    Shirt_waist:Shirt_waist,
    Shirt_backwidth:Shirt_backwidth,
     Shirt_Hips:Shirt_Hips,
     Shirt_sleeevelenght:Shirt_sleeevelenght,
     Shirt_Shoulder:Shirt_Shoulder,
     Shirt_QuaterSleeveLength:Shirt_QuaterSleeveLength,
     Shirt_wrist:Shirt_wrist}
  measurement.findOneAndUpdate(myquerry,newvalues,function(error){
    if(error)
    {
      console.log(error)
    }
    else{
      res.json({"message":"measurement updated"})
    }
  })

  
})

    router.post('/trouser',(req,res)=>{
      var post_data=req.body;
      var userID = post_data.id
      var trouser_length=post_data.trouser_length;
      var trouser_calf=post_data.trouser_calf;
      var trouser_ankle=post_data.trouser_ankle;
      var myquerry= {userID:userID};
      var newvalues={trouser_length:trouser_length,trouser_calf:trouser_calf,trouser_ankle:trouser_ankle}
      measurement.findOneAndUpdate(myquerry,newvalues,function(error){
        if(error)
        {
          console.log(error)
        }
        else{
          res.json({"message":"measurement updated"})
        }
      })
    
      
})
router.post('/getmeasurements',(req,res)=>{
      var post_data=req.body;
      var userID = post_data.id
      var utype=post_data.utype
     if(utype=="Customer")
     {
      measurement.findOne({userID:userID}, function (err, data) {
        if (err) {
          res.json({ message: "DB error" });
          console.log('could not found user', err);
        }
        else {

          res.json({ message: "ok1", Shirt_length:data.Shirt_length,
           Shirt_neck:data.Shirt_neck,
          Shirt_chest:data.Shirt_chest,
          Shirt_waist:data.Shirt_waist,
           Shirt_backwidth:data.Shirt_backwidth,
           Shirt_Hips:data.Shirt_Hips,
           Shirt_sleeevelenght:data.Shirt_sleeevelenght,
           Shirt_Shoulder:data.Shirt_Shoulder,
          Shirt_QuaterSleeveLength:data.Shirt_QuaterSleeveLength,
           Shirt_wrist:data.Shirt_wrist,
           trouser_length:data.trouser_length,
           trouser_calf:data.trouser_calf,
          trouser_ankle:data.trouser_ankle});
          console.log('data send');
        }
      })
      
     }
    
      
})
module.exports = router;
