var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const user = require('../models/user');
const tailor = require('../models/tailor');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

    router.post('/editprofile',(req,res)=>{
      var post_data = req.body;
      var id = post_data.id;
      var utype = post_data.utype;
      var fname= post_data.firstname;
      var lname= post_data.lastname;
      var contacts= post_data.contact;
  
      var passwords= post_data.password;
      var myquerry= {_id:id};
      if (utype=='Customer')
      { 
        var newvalues={firstname:fname,lastname:lname,contact:contacts,password:passwords}
        user.findOneAndUpdate(myquerry,newvalues,function(error){
          if(error)
          {
            console.log(error)
          }
          else{
            res.json({"message":"profile updated"})
          }
    });
      }
      else{
            var newvalues={firstname:fname,lastname:lname,contact:contacts,password:passwords}
            tailor.findOneAndUpdate(myquerry,newvalues,function(error){
              if(error)
              {
                console.log(error)
              }
              else{
                res.json({"message":"profile updated"})
              }
            })
          }
      })
    

    router.post('/upload',(req,res)=>{
      //console.log(req.file);
      var post_data = req.body;
      var id = post_data.id;
      var utype = post_data.utype;
      var myquerry= {_id:id};
      var newvalues= {$set:{imagelink:imageLink}};
      if (utype=='customer')
      { 
      user.findOneAndUpdate(myquerry,newvalues,function(error){
        if(error){
          console.log('Insertion fail',error);
          res.json({message:'DB Error'});
        }
        else {
          console.log('No error found');
          res.json({message:'file upload'});
        }
    });
      }
      else{
        tailor.findOneAndUpdate(myquerry,newvalues,function(error){
          if(error){
            console.log('Insertion fail',error);
            res.json({message:'DB Error'});
          }
          else {
            console.log('No error found');
            res.json({message:'file upload'});
          }
      });
      }
  });

  
router.post('/getprofile', (req, res) => {
  var utype = req.body.utype;
  var id = req.body.id;
  var myquerry = { _id: id };
  if (utype == 'Customer') {
    user.findOne(myquerry, function (err, data) {
      if (err) {
        res.json({ message: "DB error" });
        console.log('could not found user', err);
      }
      else {
        res.json({ message: "ok1", firstname: data.firstname ,lastname: data.lastname, contact: data.contact});
        console.log('data send');
      }
    })
  }
  else
  {
    tailor.findOne(myquerry, function (err, data) {
      if (err) {
        res.json({ message: "DB error" });
        console.log('could not found user', err);
      }
      else {
        res.json({ message: "ok1", firstname: data.firstname ,lastname: data.lastname, contact: data.contact});
        console.log('data send');
      }
    })
  }
})
//     router.get('/',(req,res)=>{
//       var post_data = req.body;
//       var id = post_data.id;
//       var utype = post_data.utype;
//       var myquerry ={_id:id};
//       if (utype=='customer')
//       {
//         user.findOne(myquerry,function(err,data){
//           if(err)
//           {
//             res.json({message:"DB error"});
//             console.log('could not found user',err);
//           }
//           else {
//             res.json(data);
//             console.log('data send');
//           }
//       })
//       }
//       else
//       {
//         tailor.findOne(myquerry,function(err,data){
//           if(err)
//           {
//             res.json({message:"DB error"});
//             console.log('could not found user',err);
//           }
//           else {
//             res.json(data);
//             console.log('data send');
//           }
//       })
//       }
       
// })
module.exports = router;
