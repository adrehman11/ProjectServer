var express =require('express');
var router = express.Router();
var bodyParser =require('body-Parser');
const user = require('../models/user');
const tailor = require('../models/tailor');
const suggestion = require('../models/suggestion');
const problems = require('../models/problems');

router.post('/reportproblem',(req,res)=>{
  var type = req.body.type;
  var utype=req.body.utype;
  var id = req.body.id;
  var discription = req.body.description;
  var image = req.body.image;
  if (type=="Suggestion")
  {
      var suggest = new suggestion({userID:id,suggestionDiscription:discription,suggestionimage:image,status:"NotReplied",utype:utype})
      suggest.save(function(err,data){
        if(err)
        {
          console.log(err)
        }
        else {
          res.json({message:"Done"})
        }
      })
  }
  else {
    var problem = new problems({userID:id,problemDiscription:discription,problemimage:image,status:"NotReplied",utype:utype})
    problem.save(function(err,data){
      if(err)
      {
        console.log(err)
      }
      else {
        res.json({message:"Done"})
      }
    })
  }


})

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
