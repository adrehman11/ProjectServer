var express = require('express');
const geolib = require('geolib');
const tailor = require('../models/tailor');
const axios = require('axios').default;
var router = express.Router();


router.post('/', (req, res) => {
  var post_data = req.body;
  // var tolat1="29.394956"
  // var tolang1="71.710772"

  var fromlat = parseFloat(post_data.lati);
  var fromlng = parseFloat(post_data.lngi);
  var tailor_ID = [];
  var tailor_lati = [];
  var tailor_lngi = [];
  var distanceinmeter = [];
  tailor.find(async function (err, data) {
    if (err) {
      console.log(err)
    }
    else {
      for (i = 0; i < data.length; i++) {
        tailor_ID.push(data[i]._id)
        tailor_lati.push(data[i].lati)
        tailor_lngi.push(data[i].lngi)
      }
      for (j = 0; j < tailor_lngi.length; j++) {
        var tolati = parseFloat(tailor_lati[j]);
        var tolngi = parseFloat(tailor_lngi[j]);
      var distance=geolib.getDistance({ latitude: fromlat, longitude: fromlng }, { latitude: tolati, longitude: tolngi })
       
         console.log("distance"+distance/1000)
         distanceinmeter.push(distance / 1000)
      }

      var mintemp1;
      for (var k = 0; k < distanceinmeter.length; k++) {
        mintemp1 = k;
        for (var j = k + 1; j < distanceinmeter.length; j++) {
          if (distanceinmeter[j] < distanceinmeter[mintemp1]) {
            mintemp1 = j;
          }
        }
        if (k != mintemp1) {
          var b = distanceinmeter[mintemp1];
          distanceinmeter[mintemp1] = distanceinmeter[k];
          distanceinmeter[k] = b;

          var c = tailor_ID[mintemp1];
          tailor_ID[mintemp1] = tailor_ID[k];
          tailor_ID[k] = c;

          var d = tailor_lati[mintemp1];
          tailor_lati[mintemp1] = tailor_lati[k];
          tailor_lati[k] = d;

          var g = tailor_lngi[mintemp1];
          tailor_lngi[mintemp1] = tailor_lngi[k];
          tailor_lngi[k] = g;
        }


      }//end for
      let resData = [];
      for (var q = 0; q < 5; q++) {
        let data = {
          tailor_ID: tailor_ID[q],
          tailor_lati: tailor_lati[q],
          tailor_lngi: tailor_lngi[q],
        }
        resData.push(data)

      }
      console.log(resData);
      res.json({ resData: resData });
    }//end else

  })

})

router.post('/tailorpopup', (req, res) => {
  var lati = "";
  var lng = "";
  let resData = [];
  var user_ID = req.body.id;

  var tailorName
  var tailorLocation
  var image
  var contact
  var gender

  tailor.findOne({ _id: user_ID }, async function (error, data12) {
    if (error) {
      console.log(error);
    }
   
    else {
      tailorName = data12.firstname + " " + data12.lastname
      image = data12.image;
      lati = parseFloat(data12.lati)
      lng = parseFloat(data12.lngi)
      contact = data12.contact
      gender = data12.gender
      await axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lati + "," + lng + "&key=AIzaSyB_UY8Mg65jm8F_BHOarN0wQAf1pFlqqtM")
        .then((data1) => {
          tailorLocation = data1.data.results[0].address_components[1].long_name
        })
     
      res.json({ "messeage":"popup","tailorName":tailorName,
      "image":image,"contact":contact,"gender":gender,"tailorLocation":tailorLocation});
    }
  })
})
 module.exports = router;