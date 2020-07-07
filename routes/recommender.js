var express = require('express');
var router = express.Router();
const geolib = require('geolib');
const tailor = require('../models/tailor');

router.post('/',(req,res)=>{
  var post_data = req.body;


  var fromlat = parseFloat(post_data.lati);
  var fromlng = parseFloat(post_data.lngi);
  var tailor_ID = [];
  var tailor_lati = [];
  var tailor_lngi = [];
  var tailor_rating= [];
  var tailor_name= [];
  var distanceinmeter = [];
  var tailor_image = [];
  var aggerigate =[];
  var tailor_ID1 = [];
  var tailor_rating1= [];
  var tailor_name1= [];
  var distanceinmeter1 = [];
  var tailor_image1 = [];

  tailor.find(function (err, data) {
    if (err) {
      console.log(err)
    }
    else {
      for (i = 0; i < data.length; i++) {
        tailor_ID.push(data[i]._id)
        tailor_lati.push(data[i].lati)
        tailor_lngi.push(data[i].lngi)
        tailor_image.push(data[i].image)
        if(data[i].rating==undefined || data[i].rating==null || data[i].rating=="NaN" || data[i].rating=="")
        {
          tailor_rating.push("0")
        }
        else
        {
          tailor_rating.push(data[i].rating)
        }

        tailor_name.push(data[i].firstname+data[i].lastname)
      }
      for (j = 0; j < tailor_lngi.length; j++) {
        var tolati = parseFloat(tailor_lati[j]);
        var tolngi = parseFloat(tailor_lngi[j]);
      var distance=geolib.getDistance({ latitude: fromlat, longitude: fromlng }, { latitude: tolati, longitude: tolngi })
        var dis = distance/1000
        if(dis<=100)
        {
          distanceinmeter.push(dis)
          tailor_ID1.push(tailor_ID[j])
          tailor_image1.push(tailor_image[j])
          tailor_rating1.push(tailor_rating[j])
          tailor_name1.push(tailor_name[j])

        }


      }
      console.log(distanceinmeter)

      for(var l = 0; l<distanceinmeter.length; l++){
         var counts= distanceinmeter[l]+parseFloat(tailor_rating[l])
         var agge=counts/2
         aggerigate.push(agge)
      }

      var mintemp1;
      for (var k = 0; k < aggerigate.length; k++) {
        mintemp1 = k;
        for (var j = k + 1; j < aggerigate.length; j++) {
          if (aggerigate[j] < aggerigate[mintemp1]) {
            mintemp1 = j;
          }
        }
        if (k != mintemp1) {
          var b = aggerigate[mintemp1];
          aggerigate[mintemp1] = aggerigate[k];
          aggerigate[k] = b;

          var c = tailor_ID1[mintemp1];
          tailor_ID1[mintemp1] = tailor_ID1[k];
          tailor_ID1[k] = c;


          var g = tailor_rating1[mintemp1];
          tailor_rating1[mintemp1] = tailor_rating1[k];
          tailor_rating1[k] = g;

          var g = tailor_name1[mintemp1];
          tailor_name1[mintemp1] = tailor_name1[k];
          tailor_name1[k] = g;

          var g = tailor_image1[mintemp1];
          tailor_image1[mintemp1] = tailor_image[k];
          tailor_image1[k] = g;
        }


      }//end for
      let resData = [];
      //  for (var q = aggerigate.length-1; q>aggerigate.length-4; q--)
      tailor_ID1=tailor_ID1.reverse();
      tailor_name1=tailor_name1.reverse();
      tailor_rating1=tailor_rating1.reverse();
      tailor_image1=tailor_image1.reverse();
      for(var q=  0; q<3; q++) {
        var data
        {
           data = {
            tailor_ID: tailor_ID1[q],
            tailor_name :tailor_name1[q],
            tailor_rating :tailor_rating1[q],
            tailor_image :tailor_image1[q],
          }
        }

        resData.push(data)

      }
    console.log(resData);
      res.json({ resData: resData });
    }//end else

  })


})

module.exports = router;
