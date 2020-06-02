var express = require('express');
var router = express.Router();
const user = require('../models/user');
const tailor = require('../models/tailor');
var bodyParser =require('body-Parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

      router.post('/',(req,res)=>{
      var post_data = req.body;
      var id = post_data.id;
      var password = post_data.password;
      var utype= post_data.utype;
      var myquerry= {_id:id};
      var newvalues= {$set:{password:password}};
      console.log(id,password,utype)
if(utype=='Customer')
{
  user.findOneAndUpdate(myquerry,newvalues,function(error){
    if(error){
      console.log('Insertion fail',error);
    }
    else {
      console.log('No error found');
      res.json({"message":"password updated"});
    }
  });
}
else
{
  tailor.findOneAndUpdate(myquerry,newvalues,function(error){
    if(error){
      console.log('Insertion fail',error);
    }
    else {
      console.log('No error found');
      res.json({"message":"password updated"});
    }
  });
}
     
    });
module.exports=router;
