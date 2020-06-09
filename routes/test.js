var express = require('express');
const user = require('../models/user');
const tailor = require('../models/tailor');
const price = require('../models/price');
const order = require('../models/Order');
const cm = require('../models/customerRequirement');
const tailorwork = require('../models/tailorWork');
const axios = require('axios').default;

var router = express.Router();

router.post('/', (req, res) => {
  var image = req.body.image;
  var utype = req.body.utype;
  var id = req.body.id;
  if (utype == 'Customer') {
    var myquerry = { _id: id };
    var newvalues = { $set: { image: image } };
    user.findOneAndUpdate(myquerry, newvalues, function (error) {
      if (error) {
        console.log('upload fail', error);
      }
      else {
        console.log('No error found');
        res.json({ "message": "uploaded" });
      }
    })
  }
  else {
    var myquerry = { _id: id };
    var newvalues = { $set: { image: image } };
    tailor.findOneAndUpdate(myquerry, newvalues, function (error) {
      if (error) {
        console.log('upload fail', error);
      }
      else {
        console.log('No error found');
        console.log(image)
        res.json({ "message": "uploaded" });
      }
    })
  }
})

router.post('/GetDressName', (req, res) => {
 
  var id = req.body.tailorid;
  
 
  price.findOne({tailorID:id},function(err,data){
    if(err)
    {
      console.log(err)
      res.json({message:"error"})
    }
    else{
      res.json({DressName:data.DressName,DressPrice:data.DressPrice})
      }
    })
  })
  router.post('/ordersid', (req, res) => {
 
    var id = req.body.id;
    var utype = req.body.utype;
    var orders=[]
    var resData=[]
    if(utype=="Tailor")
    {
      cm.find({tailorID:id},function(err,da){
        if(err)
        {
            console.log(err)
        }
        else{
          for (var i = 0; i < da.length; i++){
            orders.push(da[i]._id);
          }
          for (var q = 0; q < orders.length; q++) {
            let datp = {

                orderID: orders[q],
  
            }
           
            resData.push(datp)
        }
        res.json({ resData: resData });
        }
          
      })
    }
    else if(utype=="Customer")
    {
      cm.find({userID:id},async function(err,da){
        if(err)
        {
            console.log(err)
        }
        else{
          for (var i = 0; i < da.length; i++){
            orders.push(da[i]._id);
          }
          await order.find({userID:id},function (err,dota2kha){
            if(err)
            {
              console.log(err)
            }
            else
            {
                for (var i = 0; i < dota2kha.length; i++){
            orders.push(dota2kha[i]._id);
          }
            }
          })
          
          for (var q = 0; q < orders.length; q++) {
            let datp = {

                orderID: orders[q],
  
            }
           
            resData.push(datp)
        }
        res.json({ resData: resData });
        }
          
      })
    }
    })
  




router.post('/tailorwork', (req, res) => {
  var utype = req.body.utype;
  var id = req.body.id;
  var image = req.body.image;
  var description = req.body.description;

  var u = new tailorwork({ tailorID: id, image: image ,description:description})
  u.save(function (err, data) {
    if (err) {
      console.error(err)
      res.json({ "message": "something went wrong" });
    } else {
      res.json({ "message": "work uploaded" });
    }
  })
})

router.post('/picture', (req, res) => {
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
        res.json({ message: "ok1", name: data.firstname + " " + data.lastname, contact:  data.contact, email: data.email, gender: data.gender, "image": data.image, address: "" });
        console.log('data send');
      }
    })
  }
  else {
    tailor.findOne(myquerry,  function (err, data) {
      if (err) {
        res.json({ message: "DB error" });
        console.log('could not found user', err);
      }
      else {

        var lati = parseFloat(data.lati);
        var lng = parseFloat(data.lngi);
        price.findOne({ tailorID: id }, async function (error, data12) {
          if (error) {
            console.log('Insertion fail', error);
          }
          else {
           await tailorwork.find({ tailorID: id },function(err,resData){
              if(err)
              {
                console.log(err)

              }
              else
              {
               
                if (resData === undefined || resData.length == 0) {
                  axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lati + "," + lng + "&key=AIzaSyB_UY8Mg65jm8F_BHOarN0wQAf1pFlqqtM")
                  .then((data1) => {
        
                    res.json({
                      message: "ok", address: data1.data.results[0].formatted_address,
                      name: data.firstname + " " + data.lastname,
                      contact: data.contact, 
                      DressName:data12.DressName,
                      DressPrice:data12.DressPrice,
                      "image": data.image,
                      
                    });
        
                  })
                      
                }
                else
                {
                  axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lati + "," + lng + "&key=AIzaSyB_UY8Mg65jm8F_BHOarN0wQAf1pFlqqtM")
                  .then((data1) => {
        
                    res.json({
                      message: "ok1", address: data1.data.results[0].formatted_address,
                      name: data.firstname + " " + data.lastname,
                      contact: data.contact, 
                      resData:resData,  DressName:data12.DressName,
                      DressPrice:data12.DressPrice,
                      "image": data.image
                      
                    });
        
                  })
                }
                
              }
            })
           
       
           
          }
        })

      }
    })
  }
})
module.exports = router;