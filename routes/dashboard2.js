var express =require('express');
var router = express.Router();
var bodyParser =require('body-Parser');
const user = require('../models/user');
const tailor = require('../models/tailor');
const  orders1= require('../models/Order');
const faq = require('../models/FAQ_s');
const suggest = require('../models/suggestion');
const problem = require('../models/problems');
const nodemailer = require('nodemailer');
require('dotenv').config()

function sendemail(email){
  let adminemail= process.env.EMAIL
  let adminpassword=process.env.PASSWORD
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: adminemail,
      pass: adminpassword
    }
  });
  let mailOptions = {
    from:adminemail,
    to: email,
    subject: 'warning',
    text: 'warning'
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

router.post('/getuserinformation',(req,res)=>{
  var  userid= req.body.id;
  var  utype= req.body.utype;
  if(utype=="Customer")
  {
    user.findOne({_id:userid},function(err,dta){
      if (err) {
        console.log(err)
      }
      else {
          res.json({Name: dta.firstname+dta.lastname,Contact:"0"+dta.contact,Email:dta.email,Gender:dta.gender,Image:dta.image,Rating:"0.0"})
      }
    })
  }
  else {
    tailor.findOne({_id:userid},function(err,dta){
      if (err) {
        console.log(err)
      }
      else {
          res.json({Name:dta.firstname+dta.lastname,Contact:"0"+dta.contact,Email:dta.email,Gender:dta.gender,Image:dta.image,Rating:dta.rating})
      }
    })
  }
})
router.post('/sendwarning',(req,res)=>{
  var  userid= req.body.id;
  var  utype= req.body.utype;

  if(utype=="Customer")
  {
      user.findOne({_id:userid},function(err,dta){
      if(err)
      {
        console.log(err)
      }
      else {

       sendemail(dta.email)
        res.json({message:"Warning send"})
      }
      })
  }
  else {
    tailor.findOne({_id:userid},function(err,dta){
      if(err)
      {
        console.log(err)
      }
      else {
        sendemail(dta.email)
          res.json({message:"Warning send"})
      }

    })
  }
})
router.post('/deleteuser',(req,res)=>{
  var  userid= req.body.id;

  var type=req.body.type;
  if(type=="order")
  {
    orders1.findOneAndRemove({_id:userid},function(err,data){
      if(err)
      {
        console.log(err)
      }
      else {
          res.json({message:"Order Deleted"})
      }
    })
  }
  else {
    var  utype= req.body.utype;
    if(utype=="Customer")
    {
      user.findOneAndRemove({_id:userid},function(err,dta){
        if(err)
        {
          console.log(err)
        }
        else {
          res.json({message:"User Deleted"})
        }
      })
    }
    else {
      tailor.findOneAndRemove({_id:userid},function(err,dta){
        if(err)
        {
          console.log(err)
        }
        else {
          res.json({message:"User Deleted"})
        }
      })
    }
  }

})
router.post('/orderDetails',(req,res)=>{
  var  orderid= req.body.id;
  var customername
  var tailorname
  orders1.findOne({_id:orderid},async function(err,dta){
      if(err)
      {
        console.log(err)
      }
      else {
        await user.findOne({_id:dta.userID},function(err,data){
          if(err)
          {
            console.log(err)
          }
          else {
            customername= data.firstname+data.lastname
          }
        })
        await tailor.findOne({_id:dta.tailorID},function(err,data){
          if(err)
          {
            console.log(err)
          }
          else {
            tailorname= data.firstname+data.lastname
          }
        })
        console.log(dta.image.toString())
        res.json({customername:customername,tailorname:tailorname,ShirtDetails:dta.shirtDetails
                  ,TrouserDetails:dta.trouserDetails,DressType:dta.dresstype,StichType:dta.stichtype,Lace:dta.lace
              ,Pipe:dta.pipe,Button:dta.button,OderType:dta.odertype ,OrderDate:dta.orderDate ,OderDeadline:dta.OderDeadline,
              coments:dta.coments, OrderStatus:dta.orderStatus,OrderStartedDate:dta.orderstartedDate,
              DressPrice:dta.Dressprice,Rating:dta.rating,ratingStatus:dta.ratingStatus,Image:dta.image })

      }
    })

})
router.post('/viewsuggestionproblem',(req,res)=>{
  var id = req.body.id;
  var type= req.body.type;
    var utype= req.body.utype;
    console.log(utype,type)
    var username;
  if(type=="Suggestion")
  {
    suggest.findOne({_id:id},async function(err,data){
      if(err)
      {
        console.log(err)
      }
      else {
        var Image=data.suggestionimage
        var discription=data.suggestionDiscription
        await user.findOne({_id:data.userID},function(err,dats){
          if(err)
          {
            console.log(err)
          }
          else {
            username=dats.firstname+" "+dats.lastname
          }
        })
        res.json({Image:Image,ID:id,utype:utype,discription:discription,name:username})

      }
    })
  }
  else {
    problem.findOne({_id:id},async function(err,data){
      if(err)
      {
        console.log(err)
      }
      else {
        var Image=data.problemimage
        var discription=data.problemDiscription
        await user.findOne({_id:data.userID},function(err,dats){
          if(err)
          {
            console.log(err)
          }
          else {
            username=dats.firstname+" "+dats.lastname
          }
        })
        res.json({Image:Image,ID:id,utype:utype,discription:discription,name:username})

      }
    })
  }

})
router.post('/sendReponse',(req,res)=>{
  var type=req.body.type;
  var id= req.body.id;
  var utype=req.body.utype;
  var msg = req.body.msg;
  var email;
  var myquerry= {_id:id};
  var newvalues= {$set:{status:"Replied"}};
  let adminemail= process.env.EMAIL
  let adminpassword=process.env.PASSWORD
  if(type=="Suggestion")
  {
    suggest.findOne({_id:id},async function(err,data){
      if(err)
      {
        console.log(err)
      }
      else {
        if(utype=="Customer")
        {
          await user.findOne({_id:data.userID},function(err,dat){
            if(err)
            {
              console.log(err)
            }
            else {
              email=dat.email
            }
          })
        }
        else {
          await tailor.findOne({_id:data.userID},function(err,dat){
            if(err)
            {
              console.log(err)
            }
            else {
              email=dat.email
            }
          })
        }

        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: adminemail,
            pass: adminpassword
          }
        });
        let mailOptions = {
          from: adminemail,
          to:email,
          subject: 'Suggestion',
          text: msg
        };
        transporter.sendMail(mailOptions, function (err, data) {
          if (err) {
            console.log("error occure", err)
          }
          else {
            console.log("Email send");

          }
        })
        await suggest.findOneAndUpdate({ _id: id }, { $set: { status: "Replied" } }, function (err) {
            if (err) {
                console.log(err)
            }
            else {
              res.json({message:"Done"})
            }
        })
      }
    })
  }
  else {
    problem.findOne({_id:id},async function(err,data){
      if(err)
      {
        console.log(err)
      }
      else {
        if(utype=="Customer")
        {
          await user.findOne({_id:data.userID},function(err,dat){
            if(err)
            {
              console.log(err)
            }
            else {
              email=dat.email
            }
          })
        }
        else {
          await tailor.findOne({_id:data.userID},function(err,dat){
            if(err)
            {
              console.log(err)
            }
            else {
              email=dat.email
            }
          })
        }
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: adminemail,
            pass: adminpassword
          }
        });
        let mailOptions = {
          from: adminemail,
          to:email,
          subject: 'Problem',
          text: msg
        };
        transporter.sendMail(mailOptions, function (err, data) {
          if (err) {
            console.log("error occure", err)
          }
          else {
            console.log("Email send");

          }
        })
        await problem.findOneAndUpdate({ _id: id }, { $set: { status: "Replied" } }, function (err) {
            if (err) {
                console.log(err)
            }
            else {
              res.json({message:"Done"})
            }
        })
      }
    })
  }
})




module.exports = router;
