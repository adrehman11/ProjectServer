var express = require('express');
const user = require('../models/user');
const tailor = require('../models/tailor');
const orders = require('../models/Order');

var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
//customerlogin

router.post('/', (req, res) => {
  var post_data = req.body;
  var average=0.0;
  var ratingaverage=[]
  var utype = post_data.utype;
  var email = post_data.email;
  var userpassword = post_data.password;
  if (email.includes("@")) {
    if (utype == 'Customer') {
      user.findOne({ email: email }).count(function (err, number) {
        if (err) {
          console.log(err);
          res.json({ 'message': 'something went wrong' })
        }
        else {
          if (number == 0) {
            res.json({ "message": "Email does not exsist" });
            console.log('Email not exists')
          } else {
            user.findOne({ email: email }, function (err, users) {
              if (userpassword == users.password) {
                res.json({ "id": users._id, "utype": utype,rating:"0.0", "name": users.firstname + " " + users.lastname, "message": "login confirm" });
                console.log('login success')
              }
              else {
                res.json({ "message": "wrong password" });
                console.log(err)
              }
            })
          }
        }
      })
    }
    else {
      
      tailor.findOne({ email: email }).count(function (err, number) {
        if (err) {
          console.log(err);
          res.json({ 'message': 'something went wrong' })
        }
        else {
          if (number == 0) {
            res.json({ "message": "Email does not exsist" });
            console.log('Email not exists')
          } else {
            tailor.findOne({ email: email },async function (err, data) {
              if (userpassword == data.password) {
                //ordersrating
                console.log(data._id)
                await orders.find({ tailorID: data._id } , { ratingStatus: "RatingDone" }, function (err, data) {
                  if (err) {
                    console.log(err)
                  }
                  else {
                      for (var i = 0; i < data.length; i++) {
                        ratingaverage.push(parseFloat(data[i].rating ))
                      
                    }
                   
                    for (var q =0;q<ratingaverage.length;q++)
                    {
                      average=average+ratingaverage[q]
                    }
                   
                    average=average/ratingaverage.length
                    
                    average=average.toString()
                  }
               
                })
               await tailor.findOneAndUpdate({_id:data._id},{$set:{rating:average}},function(err){
                 if(err)
                 {console.log(err)}
                 else{
                  res.json({ "id": data._id, "utype": utype, "name": data.firstname + " " + data.lastname,rating:average, "message": "login confirm" });
                  console.log('login success')
                 }
               })
                //ratings
               
              }
              else {
                res.json({ "message": "wrong password" });
                console.log("wrong password")
              }
            })
          }
        }
      })
    }
  }
  else {
    if (utype == 'Customer') {
      user.findOne({ contact: email }).count(function (err, number) {
        if (err) {
          console.log(err);
          res.json({ 'message': 'something went wrong' })
        }
        else {
          if (number == 0) {
            res.json({ "message": "Email does not exsist" });
            console.log('Email not exists')
          } else {
            user.findOne({ contact: email }, function (err, users) {
              if (userpassword == users.password) {
                res.json({ "id": users._id, "utype": utype,rating:"0.0", "name": users.firstname + " " + users.lastname, "message": "login confirm" });
                console.log('login success')
              }
              else {
                res.json({ "message": "wrong password" });
                console.log(err)
              }
            })
          }
        }
      })
    }
    else {
      tailor.findOne({ contact: email }).count(function (err, number) {
        if (err) {
          console.log(err);
          res.json({ 'message': 'something went wrong' })
        }
        else {
          if (number == 0) {
            res.json({ "message": "Email does not exsist" });
            console.log('Email not exists')
          } else {
            tailor.findOne({ contact: email }, async function (err, data) {
              if (userpassword == data.password) {
                await orders.find({ tailorID: data._id } && { ratingStatus: "RatingDone" }, function (err, data) {
                  if (err) {
                    console.log(err)
                  }
                  else {
                      for (var i = 0; i < data.length; i++) {
                        ratingaverage.push(parseFloat(data[i].rating ))
                      
                    }
                    for (var q =0;q<ratingaverage.length;q++)
                    {
                      average=average+ratingaverage[q]
                    }
                    average=average/ratingaverage
                    average=average.toString()
          
                  }
                })
                res.json({ "id": data._id, "utype": utype,rating:average,"name": data.firstname + " " + data.lastname, "message": "login confirm" });
                console.log('login success')
              }
              else {
                res.json({ "message": "wrong password" });
                console.log("wrong password")
              }
            })
          }
        }
      })
    }
  }

});


module.exports = router;
