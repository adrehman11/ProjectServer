var express = require('express');
const user = require('../models/user');
const tailor = require('../models/tailor');
var bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const Nexmo = require('nexmo');
require('dotenv').config()

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req, res) => {
  var email = req.body.email;
  console.log(email)
  var utype = req.body.utype;
  let adminemail= process.env.EMAIL
  let adminpassword=process.env.PASSWORD
  let adminapi=process.env.APIKEYNEXO
  let adminsecrete=process.env.APISECRETENEXO
  if (email.includes("@")) {
    if (utype == 'Customer') {
      user.findOne({ email: email }).count(function (err, number) {
        if (err) {
          console.log(err);
        }
        else {
          if (number == 0) {
            console.log(number);
            res.json({ 'message': 'Email does not exsist' });
            console.log('This user does not have any account');
          }
          else {
            user.findOne({ email: email }, function (err, users) {
              if (err) {
                console.log(err)
              }
              else {

                var max = 1000;
                var min = 9999;
                var random_no = Math.floor(Math.random() * (max - min + 1)) + min;
                let transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: adminemail,
                    pass: adminpassword
                  }
                });
                let mailOptions = {
                  from: adminemail,
                  to: email,
                  subject: 'Verification Code',
                  text: 'your verification code is this ' + random_no
                };
                transporter.sendMail(mailOptions, function (err) {
                  if (err) {
                    console.log("error occure", err)
                  }
                  else {

                    console.log("Email send");
                    res.json({ message: "done", code: random_no, id: users._id, utype: utype });
                  }
                })
                res.json({ "message": "done", "code": random_no, "id": users._id, utype: utype });
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
        }
        else {
          if (number == 0) {
            console.log(number);
            res.json({ 'message': 'Email does not exsist' });
            console.log('This user does not have any account');
          }
          else {
            tailor.findOne({ email: email }, function (err, users) {
              if (err) {
                console.log(err)
              }
              else {

                var max = 1000;
                var min = 9999;
                var random_no = Math.floor(Math.random() * (max - min + 1)) + min;
                let transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: adminemail,
                    pass: adminpassword
                  }
                });
                let mailOptions = {
                  from: adminemail,
                  to: email,
                  subject: 'Verification Code',
                  text: 'your verification code is this ' + random_no
                };
                transporter.sendMail(mailOptions, function (err) {
                  if (err) {
                    console.log("error occure", err)
                  }
                  else {

                    console.log("Email send");
                    res.json({ "message": "done", "code": random_no, "id": users._id, utype: utype });
                  }
                })
                res.json({ "message": "done", "code": random_no, "id": users._id, utype: utype });
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
        }
        else {
          if (number == 0) {
            console.log(number);
            res.json({ 'message': 'Email does not exsist' });
            console.log('This user does not have any account');
          }
          else {
            user.findOne({ contact: email }, function (err, users) {
              if (err) {
                console.log(err)
              }
              else {

                var max = 1000;
                var min = 9999;
                var random_no = Math.floor(Math.random() * (max - min + 1)) + min;

                const nexmo = new Nexmo({
                  apiKey: adminapi,
                  apiSecret:adminsecrete,
                });

                const from = 'Stitch It';
                const to = '92'+email;
                const text = 'Hello from Stitch It  your verification code is '+random_no;

                nexmo.message.sendSms(from, to, text);

                res.json({ "message": "done", "code": random_no, "id": users._id, utype: utype });
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
        }
        else {
          if (number == 0) {
            console.log(number);
            res.json({ 'message': 'Email does not exsist' });
            console.log('This user does not have any account');
          }
          else {
            tailor.findOne({ contact: email }, function (err, users) {
              if (err) {
                console.log(err)
              }
              else {

                var max = 1000;
                var min = 9999;
                var random_no = Math.floor(Math.random() * (max - min + 1)) + min;

                const nexmo = new Nexmo({
                  apiKey: adminapi,
                  apiSecret: adminsecrete,
                });

                const from = 'Stitch It';
                const to = '92'+email;
                const text = 'Hello from Stitch It  your verification code is '+random_no;

                nexmo.message.sendSms(from, to, text);

                res.json({ "message": "done", "code": random_no, "id": users._id, utype: utype });
              }
            })

          }
        }
      })
    }
  }

})
module.exports = router;
