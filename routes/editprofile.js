var express =require('express');
var router = express.Router();
var bodyParser =require('body-Parser');
const user = require('../models/user');
const tailor = require('../models/tailor');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({storage: storage});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/upload', upload.single('imagelink'),(req,res)=>{
  //console.log(req.file);
  var post_data = req.body;
  var email = post_data.email;
  var imageLink = req.file.path;
  var utype = post_data.utype;
  var myquerry= {email:email};
  var newvalues= {$set:{imagelink:imageLink}};
  if(utype=='customer')
  {
    user.findOneAndUpdate(myquerry,newvalues,function(error){
      if(error){
        console.log('Insertion fail',error);
        res.json({message:'DB error'});
      }
      else {
        console.log('No error found');
        res.json({message:"profile uploaded"});
      }
    
  });
  }
  else{
    tailor.findOneAndUpdate(myquerry,newvalues,function(error){
      if(error){
        console.log('Insertion fail',error);
        res.json({message:'DB error'});
      }
      else {
        console.log('No error found');
        res.json({message:"profile uploaded"});
      }
    
  });
  }
 
});


    router.post('/',(req,res)=>{
      var post_data=req.body;
      var id = post_data.id;
      var utype= post_data.utype;
      var firstname=post_data.firstname;
      var lastname=post_data.lastname;
      var contact=post_data.contact;
      var gender = post_data.gender;
      var email=post_data.email;
      var password=post_data.password;
      var myquerry= {_id:id};
      var newvalues= {$set:{password:password,firstname:firstname,lastname:lastname,contact:contact,gender:gender,email:email}};
      if(utype='customer')
      {
        user.findOneAndUpdate(myquerry,newvalues,function(error){
          if(error){
            console.log('Insertion fail',error);
            res.send('Update error');
          }
          else {
            console.log('No error found',error);
            res.send('Update complete');
          }
        })
      }
      else
      {
        tailor.findOneAndUpdate(myquerry,newvalues,function(error){
          if(error){
            console.log('Insertion fail',error);
            res.send('Update error');
          }
          else {
            console.log('No error found',error);
            res.send('Update complete');
          }
        })
      }
      
      })
module.exports = router;
