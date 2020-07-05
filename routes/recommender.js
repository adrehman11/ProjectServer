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
  tailor.find(async function (err, data) {
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

         distanceinmeter.push(distance / 1000)
      }

      for(var l = 0; l<distanceinmeter.length; l++){
         var counts= distanceinmeter[l]+parseFloat(tailor_rating[l])
         aggerigate.push(counts/2)
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

          var c = tailor_ID[mintemp1];
          tailor_ID[mintemp1] = tailor_ID[k];
          tailor_ID[k] = c;

          var d = tailor_lati[mintemp1];
          tailor_lati[mintemp1] = tailor_lati[k];
          tailor_lati[k] = d;

          var g = tailor_lngi[mintemp1];
          tailor_lngi[mintemp1] = tailor_lngi[k];
          tailor_lngi[k] = g;

          var g = tailor_rating[mintemp1];
          tailor_rating[mintemp1] = tailor_rating[k];
          tailor_rating[k] = g;

          var g = tailor_name[mintemp1];
          tailor_name[mintemp1] = tailor_name[k];
          tailor_name[k] = g;

          var g = tailor_image[mintemp1];
          tailor_image[mintemp1] = tailor_image[k];
          tailor_image[k] = g;
        }


      }//end for
      let resData = [];
      for (var q = aggerigate.length-1; q>aggerigate.length-4; q--) {
        var data
        {
           data = {
            tailor_ID: tailor_ID[q],
            tailor_name :tailor_name[q],
            tailor_rating :tailor_rating[q],
            tailor_image :tailor_image[q],
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
