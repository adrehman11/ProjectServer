var express = require('express');
const user = require('../models/user');
const tailor = require('../models/tailor');
const orders = require('../models/Order');


var router = express.Router();


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
      user.findOne({ email: email }).count(async function (err, number) {
        if (err) {
          console.log(err);
          res.json({ 'message': 'something went wrong' })
        }
        else {
          if (number == 0) {
            res.json({ "message": "Email does not exsist" });
            console.log('Email not exists')
          } else {
            try {
                var users =   await   user.findOne({ email: email })
                if (userpassword == users.password) {
                  res.json({ "id": users._id, "utype": utype,rating:"0.0", "name": users.firstname + " " + users.lastname, "message": "login confirm" });
                  console.log('login success')
                }
                else {
                  res.json({ "message": "wrong password" });
                }

            } catch (err) {
                console.log(err)
            }

          }
        }
      })
    }
    else {

      tailor.findOne({ email: email }).count(async function (err, number) {
        if (err) {
          console.log(err);
          res.json({ 'message': 'something went wrong' })
        }
        else {
          if (number == 0) {
            res.json({ "message": "Email does not exsist" });
            console.log('Email not exists')
          } else {
            try {
                var data =   await tailor.findOne({ email: email })
                if (userpassword == data.password) {
                  var datas = await orders.find({ tailorID: data._id } , { ratingStatus: "RatingDone" })
                    for (var i = 0; i < datas.length; i++) {
                      ratingaverage.push(parseFloat(datas[i].rating ))}
                      for (var q =0;q<ratingaverage.length;q++)
                      {
                        average=average+ratingaverage[q]
                      }
                      average=average/ratingaverage.length
                      average=average.toString()



                 await tailor.findOneAndUpdate({_id:data._id},{$set:{rating:average}})
                    res.json({ "id": data._id, "utype": utype, "name": data.firstname + " " + data.lastname,rating:average, "message": "login confirm" });
                    console.log('login success')

                }
                else {
                  res.json({ "message": "wrong password" });
                  console.log("wrong password")
                }

            } catch (err) {
                console.log(err)
            }
          }
        }
      })
    }
  }
  else {
    if (utype == 'Customer') {
      user.findOne({ contact: email }).count(async function (err, number) {
        if (err) {
          console.log(err);
          res.json({ 'message': 'something went wrong' })
        }
        else {
          if (number == 0) {
            res.json({ "message": "Email does not exsist" });
            console.log('Email not exists')
          } else {
            try {
                var users =   await user.findOne({ contact: email })
                if (userpassword == users.password) {
                  res.json({ "id": users._id, "utype": utype,rating:"0.0", "name": users.firstname + " " + users.lastname, "message": "login confirm" });
                  console.log('login success')
                }
                else {
                  res.json({ "message": "wrong password" });
                  console.log(err)
                }

            } catch (err) {
                console.log(err)
            }
          }
        }
      })
    }
    else {
      tailor.findOne({ contact: email }).count(async function (err, number) {
        if (err) {
          console.log(err);
          res.json({ 'message': 'something went wrong' })
        }
        else {
          if (number == 0) {
            res.json({ "message": "Email does not exsist" });
            console.log('Email not exists')
          } else {
            try {
              var data =await tailor.findOne({ contact: email })
              if (userpassword == data.password) {
                var dats=await orders.find({ tailorID: data._id } && { ratingStatus: "RatingDone" })

                      for (var i = 0; i < dats.length; i++) {
                        ratingaverage.push(parseFloat(dats[i].rating ))

                    }
                    for (var q =0;q<ratingaverage.length;q++)
                    {
                      average=average+ratingaverage[q]
                    }
                    average=average/ratingaverage
                    average=average.toString()



                res.json({ "id": data._id, "utype": utype,rating:average,"name": data.firstname + " " + data.lastname, "message": "login confirm" });
                console.log('login success')
              }
              else {
                res.json({ "message": "wrong password" });
                console.log("wrong password")
              }

            } catch (err) {
                console.log(err)
            }
      
          }
        }
      })
    }
  }

});


module.exports = router;
