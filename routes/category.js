var express = require('express');
var router = express.Router();
const category = require('../models/categories');
//view category
router.get('/viewcategory',(req,res)=>{
  
    category.find(function(err,data){
      if(err)
      {
        res.json( {"message":"Error occured"});
        console.log('could not found user',err);
      }

      else {

        res.json(data);
      }
  }) ;
})

module.exports = router;