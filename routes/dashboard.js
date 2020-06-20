var express =require('express');
var router = express.Router();
var bodyParser =require('body-Parser');
const user = require('../models/user');
const tailor = require('../models/tailor');
const orders1 = require('../models/Order');
const faq = require('../models/FAQ_s');
const suggest = require('../models/suggestion');
const problem = require('../models/problems');

router.post('/adminlogin',(req,res)=>{
  var email = req.body.Email;
  var password=req.body.Password;
  if(email=="abc"&& password=="123")
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
       await tailor.find().count(function (err, number) {
         if(err)
         {
           console.log(err)
         }
         else {
        number1= number;
         }

       })
       await user.find().count(function(err,number2s){
         if(err)
         {
           console.log (err)
         }
         else {
           number2= number2s;
         }
       })
       value.push(21+1)
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
      res.json({customer:34,tailor:75,orders:26})
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
      for(var i=0;i<5;i++)
      {
        //id.push(dots[i]._id)
        id.push("5ede2a06fef5dc176003422d")
        name.push("Aliahmad")
        utype.push("Customer")
        // name.push(dots[i].firstname+dots[i].lastname)
        // utype.push("Customer")
      }
      await   tailor.find(function (err,data){
        if(err)
        {
          console.log(err)
        }
        else {
          for(var i=0;i<5;i++)
          {
            id.push("8ede2a87fef5dc176003422d")
            name.push("Abdul Rehman")
            utype.push("Tailor")
            // id.push(data[i]._id)
            // name.push(data[i].firstname+dots[i].lastname)
            // utype.push("Tailor")
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
      for(var i=0;i<5;i++)
      {

        OrderID.push("5ede2a06fef5dc176003422d")
        DressType.push("Lehnga")
        //await user.find({_id:dots.userID},function(err,dpts){})
        await user.find(function(err,dpts){
          if(err)
          {
            console.log(err);
          }
          else {
            CustomerName.push("Ali"+"Ahmad")
          }
        })
        await tailor.find(function(err,dpts){
          if(err)
          {
            console.log(err);
          }
          else {
            TailorName.push("Mushtak Ahmad"+"Ahmad")
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
  var Name=[]
  var Status=[]
  var resdata=[]
var  suggestionutype="Customer"
  suggest.find(async function (err, dots) {
    if(err)
    {
      cosole.log(err)
    }
    else {
      for(var i=0;i<5;i++)
      {

        ID.push("5ede2a06fef5dc176003422d")
        Status.push("unread");
        //await user.find({_id:dots.userID},function(err,dpts){})
        if(suggestionutype="Customer")
        {
          await user.find(function(err,dpts){
            if(err)
            {
              console.log(err);
            }
            else {
              Name.push("Ali"+"Ahmad")
            }
          })
        }
        else {
          await tailor.find(function(err,dpts){
            if(err)
            {
              console.log(err);
            }
            else {
              Name.push("Mushtak Ahmad"+"Ahmad")
            }
          })
        }


      }
      for (var q = 0; q < ID.length; q++) {
          let datp = {
              ID: ID[q],
              Name: Name[q],
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
  var Name=[]
  var Status=[]
  var resdata=[]
var  problemutype="Customer"
  problem.find(async function (err, dots) {
    if(err)
    {
      cosole.log(err)
    }
    else {
      for(var i=0;i<5;i++)
      {

        ID.push("5ede2a06fef5dc176003422d")
        Status.push("replied");
        //await user.find({_id:dots.userID},function(err,dpts){})
        if(problemutype="Customer")
        {
          await user.find(function(err,dpts){
            if(err)
            {
              console.log(err);
            }
            else {
              Name.push("Ali"+"Ahmad")
            }
          })
        }
        else {
          await tailor.find(function(err,dpts){
            if(err)
            {
              console.log(err);
            }
            else {
              Name.push("Mushtak Ahmad"+"Ahmad")
            }
          })
        }


      }
      for (var q = 0; q < ID.length; q++) {
          let datp = {
              ID: ID[q],
              Name: Name[q],
              Status:Status[q]
          }
          resdata.push(datp)
      }


      res.json({resdata:resdata})
    }


  })

})

module.exports = router;