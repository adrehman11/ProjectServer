var express = require('express');
var router = express.Router();
const category = require('../models/categories');
const user = require('../models/user');
const model = require('../models/models');
var bodyParser = require('body-parser');
const multer = require('multer');




const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/modelpics');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
const upload = multer({storage:storage});  

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));


//addcategory
router.post('/addcategory',upload.single('categorythumbnail'),(req,res)=>{
    var post_data=req.body;
    var categoryname=post_data.categoryname;
    var categorydiscription=post_data.categorydiscription;
    var categorythumbnail=req.file.path;


    var c = new category({categoryname:categoryname, categorydiscription:categorydiscription, categorythumbnail:categorythumbnail})
      c.save(function(err){
          if(err){
              console.error(err)
              res.json({"message":"category not added"})
          }else{
              res.json({"message":"Category Added"})
          }
      })
  })

  //Delete Category


router.post('/deletecategory',(req,res)=>{
    var post_data = req.body;
    var id =  post_data .id;
    var myquerry ={_id:id};
    category.deleteOne(myquerry,function(error){
           if(error)
           {
             console.log('record is not deleted');
             res.json({"message":"category not deleted"});
           }
           else {
             console.log('User deleted');
             res.json({"message":"category deleted"});
           }
         })
  })

  //Add model
  router.post('/addmodel',upload.single('modelthumbnail'),(req,res)=>{
    var post_data=req.body;
    var categoryid=post_data.categoryid;
    var modelname=post_data.modelname;
    var modeldiscription=post_data.modeldiscription;
    var modelthumbnail=req.file.path;


    var m = new model({categoryid:categoryid,modelname:modelname, modeldiscription:modeldiscription, modelthumbnail:modelthumbnail})
      m.save(function(err){
          if(err){
              console.error(err)
              res.json({"message":"something went wrong"})
          }else{
              res.json({"message":"model added"})
          }
      })
  })

  //delete user

  router.post('/deleteuser',(req,res)=>{
    var post_data=req.body;
    var id =post_data.id;
    var myquerry ={_id:id};
    user.deleteOne(myquerry,function(error){
           if(error)
           {
             console.log('record is not deleted');
             res.json({"message":"user does not deleted"});
           }
           else {
             console.log('User deleted');
             res.json({"message":"user deleted"});
           }
         })
  });
  module.exports = router;
