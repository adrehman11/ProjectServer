var express =require('express');
var router = express.Router();
var bodyParser =require('body-Parser');
const user = require('../models/user');
const tailor = require('../models/tailor');






router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));


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
