var express = require('express');
var router = express.Router();
const model = require('../models/models');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));



//view model

router.get('/viewmodel',(req,res)=>{
    //Db work to check which user is active
    model.find(function(err,data){
      if(err)
      {
        res.json({"message":"Error"});
        console.log('could not found user',err);
      }
      else {
        res.json(data);
        
      }
  }) ;
})
module.exports = router;