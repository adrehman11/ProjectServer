var express =require('express');
var router = express.Router();
const user = require('../models/user');
const tailor = require('../models/tailor');
const orders1 = require('../models/Order');
const faq = require('../models/FAQ_s');
const suggest = require('../models/suggestion');
const problem = require('../models/problems');
require('dotenv').config()


router.post('/adminlogin',(req,res)=>{
  var email = req.body.Email;
  var password=req.body.Password;
  let adminemail= process.env.ADMIN_EMAIL
  let adminpassword=process.env.ADMIN_PASS
  if(email==adminemail  && password==adminpassword )
  {
      res.json({ "message": "done"});
  }
  else {
    res.json({ "message": "nomatch"})
  }
})
router.get('/adminchart1',(req,res)=>{
  var label=[]
  var value=[]
  var resdata=[]
  var number1;
  var number2;
  b=['January', 'February', 'March', 'April', 'May', 'June','Jully','August','September','October','November','December']
  var x = new Date();
  var loop = x.getMonth();
console.log(loop)
 var month=x.getMonth()-6

  faq.find().count(async function (err, number) {
    if(err)
    {
    console.log(err)
    }
    else {
      for (var q = loop; q >month; q--)
     {
       if(q==-1)
       {
         label.push('December')
       }
    else   if(q==-2)
       {
         label.push('November')
       }
    else   if(q==-3)
       {
         label.push('October')
       }
    else   if(q==-4)
       {
         label.push('September')
       }
      else if(q==-5)
       {
         label.push('August')
       }
       else {
         label.push(b[q])
       }
       await tailor.find({registermonth:q}).count(function (err, number) {
         if(err)
         {
           console.log(err)
         }
         else {
        number1= number;
         }

       })
       await user.find({registermonth:q}).count(function(err,number2s){
         if(err)
         {
           console.log (err)
         }
         else {
           number2= number2s;
         }
       })
       value.push(number1+number2)
     }
     label.reverse();
     value.reverse();

     res.json({resdata1:label,resdata2:value})
    }
  })

})

router.get('/getdatadashboard',(req,res)=>{
  var customer ;
  var tailors ;
  var orders ;
    tailor.find().count(async function (err, number) {
      if(err)
      {
        console.log(err)
      }
      else {
        tailors=number.toString();
        await   user.find().count(function (err, numbe2){
          if(err)
          {
            console.log(err);
          }
          else {
            customer=numbe2.toString();
          }

        })

        await  orders1.find().count(function (err, numbe2){
        if(err)
        {
          console.lof(err)
        }
        else {
          orders =numbe2.toString();
        }
      })
      res.json({customer:customer,tailor:tailors,orders:orders})
    }
    })

})

router.get('/getusers',(req,res)=>{
  var id=[]
  var name=[]
  var utype=[]
  var resdata=[]
  user.find(async function (err, dots) {
    if(err)
    {
      cosole.log(err)
    }
    else {
      for(var i=0;i<dots.length;i++)
      {
        id.push(dots[i]._id)
         name.push(dots[i].firstname+dots[i].lastname)
         utype.push("Customer")
      }
      await   tailor.find(function (err,data){
        if(err)
        {
          console.log(err)
        }
        else {
          for(var i=0;i<data.length;i++)
          {
             id.push(data[i]._id)
             name.push(data[i].firstname+data[i].lastname)
             utype.push("Tailor")
          }


          for (var q = 0; q < id.length; q++) {
              let datp = {
                  position: id[q],
                  name: name[q],
                  profile: utype[q]
              }
              resdata.push(datp)
          }
        }
      })

      res.json({resdata:resdata})
    }


  })

})
router.get('/getorders',(req,res)=>{
  var OrderID=[]
  var userid;
  var tailorID;
  var DressType=[]
  var TailorName=[]
  var CustomerName=[]
  var resdata=[]
  orders1.find(async function (err, dots) {
    if(err)
    {
      cosole.log(err)
    }
    else {

      for(var i=0;i<dots.length;i++)
      {
        userid=dots[i].userID
        tailorID=dots[i].tailorID
        OrderID.push(dots[i]._id)
        DressType.push(dots[i].dresstype)

      await user.findOne({_id:userid},function(err,dpts){

          if(err)
          {
            console.log(err);
          }
          else {
            CustomerName.push(dpts.firstname+dpts.lastname)

          }
        })
        await tailor.findOne({_id:tailorID},function(err,dpts1){
          if(err)
          {
            console.log(err);
          }
          else {
            TailorName.push(dpts1.firstname+dpts1.lastname)
          }
        })
      }
      for (var q = 0; q < OrderID.length; q++) {
          let datp = {
              OrderID: OrderID[q],
              DressType: DressType[q],
              TailorName: TailorName[q],
              CustomerName:CustomerName[q]
          }

          resdata.push(datp)
      }


      res.json({resdata:resdata})
    }


  })

})
router.get('/getsuggestion',(req,res)=>{
  var ID=[]
  var Utype=[]
  var Status=[]
  var resdata=[]

  suggest.find(async function (err, dots) {
    if(err)
    {
      cosole.log(err)
    }
    else {
      for(var i=0;i<dots.length;i++)
      {

        ID.push(dots[i]._id)
        Utype.push(dots[i].utype)
        Status.push(dots[i].status);
      }
      for (var q = 0; q < ID.length; q++) {
          let datp = {
              ID: ID[q],
              Utype: Utype[q],
              Status:Status[q]
          }
          resdata.push(datp)
      }


      res.json({resdata:resdata})
    }


  })

})
router.get('/getproblems',(req,res)=>{
  var ID=[]
  var Utype=[]
  var Status=[]
  var resdata=[]

  problem.find(async function (err, dots) {
    if(err)
    {
      cosole.log(err)
    }
    else {
      for(var i=0;i<dots.length;i++)
      {

        ID.push(dots[i]._id)
        Utype.push(dots[i].utype)
        Status.push(dots[i].status);




      }
      for (var q = 0; q < ID.length; q++) {
          let datp = {
              ID: ID[q],
              Utype: Utype[q],
              Status:Status[q]
          }
          resdata.push(datp)
      }


      res.json({resdata:resdata})
    }


  })

})

module.exports = router;
