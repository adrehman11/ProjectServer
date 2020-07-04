var express = require('express');
var router = express.Router();
const user = require('../models/user');
const tailor = require('../models/tailor');
const price = require('../models/price');
require('dotenv').config()
const measurement = require('../models/measurements')
const nodemailer = require('nodemailer');
var x = new Date();
var month = x.getMonth();
let email1= process.env.EMAIL
let password1=process.env.PASSWORD

router.post('/', (req, res) => {
  var post_data = req.body;
  var firstname = post_data.firstname;
  var lastname = post_data.lastname;
  var contact = post_data.contact;
  var gender = post_data.gender;
  var email = post_data.email;
  var password = post_data.password;
  var image = "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";
  var lati = null;
  var lngi = null;
  var utype = post_data.utype;

  let DressName=[];
  let DressPrice=[];


  var userid = "";
 var Shirt_length="";
  var Shirt_neck = "";
  var Shirt_chest = "";
  var Shirt_waist = "";
  var Shirt_backwidth = "";
  var Shirt_Hips = "";
  var Shirt_sleeevelenght = "";
  var Shirt_Shoulder = "";
  var Shirt_QuaterSleeveLength = "";
  var Shirt_wrist = "";
  var trouser_length = "";
  var trouser_calf = "";
  var trouser_ankle = "";


  if (utype == "Tailor") {
    var t = new tailor({
      firstname: firstname, lastname: lastname, contact: contact, email: email,
      gender: gender, password: password, image: image, lati: lati, lngi: lngi,rating:"0.0",registermonth:month
    })
    t.save(async function (err, data) {

      if (err) {
        console.error(err)
        res.json({ "message": "something went wrong" });
      } else {
        var p = new price({
          tailorID: data._id, DressName: DressName, DressPrice: DressPrice
        })
        await p.save(function (err) {
          if (err) throw err
        })
        res.json({ "message": "next", "id": data._id,rating:"0.0", "utype": utype,"name":data.firstname+" "+data.lastname });
        if (email == "") {
          console.log("email empty")
        }
        else {
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: email1,
              pass: password1
            }
          });
          let mailOptions = {
            from: email1,
            to: email,
            subject: 'SignUp Complete',
            text: 'Congratulation you have created the Account on Stitchit and your password is ' + password
          };
          transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
              console.log("error occure", err)
            }
            else {
              console.log("Email send");
            }
          })
        }
      }
    })
  }
  else {
    var u = new user({ firstname: firstname, lastname: lastname, contact: contact, email: email, gender: gender, password: password, image: image,registermonth:month })
    u.save(function (err, data) {
      userid = data._id;
      if (err) {
        console.error(err)
        res.json({ "message": "something went wrong" });
      } else {
        var m = new measurement(
          {
            userID:userid,
            Shirt_length:Shirt_length,
            Shirt_neck:Shirt_neck,
           Shirt_chest:Shirt_chest,
             Shirt_waist:Shirt_waist,
             Shirt_backwidth:Shirt_backwidth,
              Shirt_Hips:Shirt_Hips,
              Shirt_sleeevelenght:Shirt_sleeevelenght,
              Shirt_Shoulder:Shirt_Shoulder,
              Shirt_QuaterSleeveLength:Shirt_QuaterSleeveLength,
              Shirt_wrist:Shirt_wrist,trouser_length:trouser_length,trouser_calf:trouser_calf,trouser_ankle:trouser_ankle
          })
        m.save(function (err) {
          if (err) {
            console.error(err)
            res.json({ "messge": "informattion not saved please enter again" })
          } else {
            console.log(userid)
            res.json({ message: "login", "id": userid,rating:"0.0", "utype": utype,"name":data.firstname+" "+data.lastname });
          }
        })
        if (email == "") {
          console.log("email empty")
        }
        else {
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: email1,
              pass: password1
            }
          });
          let mailOptions = {
            from: email1,
            to: email,
            subject: 'SignUp Complete',
            text: 'Congratulation you have created the Account on Stitchit and your password is ' + password
          };
          transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
              console.log("error occure", err)
            }
            else {
              console.log("Email send");
            }
          })
        }

      }
    })
  }

})
router.post('/tailorlocation', (req, res) => {
  var id = req.body.id;
  var lati = req.body.lati;
  var lngi = req.body.lngi;
  var myquerry = { _id: id }
  var newvalues = { $set: { lati: lati, lngi: lngi } }
  tailor.findOneAndUpdate(myquerry, newvalues, function (error) {
    if (error) {
      console.log('Insertion fail', error);
    }
    else {
      console.log('No error found');
      res.json({ "message": "location updated" })
    }
  })
})


router.post('/tailorprice', (req, res) => {
  var id = req.body.id;
  var utype = req.body.utype;
  var DressName = req.body.DressName;
  var DressPrice = req.body.DressPrice;
  var resultDress = DressName.substring(1, DressName.length-1);
  var resultPrice = DressPrice.substring(1, DressPrice.length-1);
  var Dress = resultDress.split(",");
  var Price = resultPrice.split(",");
  console.log(Dress)
  console.log(Price)
  var myquerry = { tailorID: id }
    var newvalues = {
      $set: {
        DressName: Dress, DressPrice: Price
      }
    }
   price.findOneAndUpdate(myquerry, newvalues,function (error) {
      if (error) {
        console.log('Insertion fail', error);
      }
      else
      {
        tailor.findOne({_id:id},function(err,data){
          if(err)
          {
            console.log(err)
          }
          else
          {
            res.json({ "message": "price added to your profile",id:id,utype:utype,name:data.firstname+" "+data.lastname });
          }
        })
      }
    })

})
module.exports = router;
