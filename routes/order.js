var express = require('express');
const cm = require('../models/customerRequirement');
const users = require('../models/user');
const tailors = require('../models/tailor');
const price = require('../models/price');
const orders = require('../models/Order');
const m = require('../models/measurements');
const { Code } = require('mongodb');
const axios = require('axios').default;
var router = express.Router();

router.post('/requirement', (req, res) => {
  var Shirt_length = "";
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
    var user_ID = req.body.id;
     m.findOne({ userID: user_ID },async function(err,data){
       if(err)
       {
         console.log(err)
       }
       else {

         if(data.Shirt_length==""|| data.Shirt_neck==""|| data.Shirt_chest==""|| data.Shirt_waist==""||
       data.Shirt_backwidth==""|| data.Shirt_Hips==""|| data.Shirt_sleeevelenght==""|| data.Shirt_Shoulder==""||
       data.Shirt_QuaterSleeveLength==""|| data.Shirt_wrist==""|| data.trouser_length==""|| data.trouser_calf==""||
       data.trouser_ankle=="")
         {
            res.json({ message: "Null Value"})
            console.log("nullvalue")
         }
         else {
           Shirt_length = data.Shirt_length,
           Shirt_neck = data.Shirt_neck,
           Shirt_chest = data.Shirt_chest,
           Shirt_waist = data.Shirt_waist,
           Shirt_backwidth = data.Shirt_backwidth,
           Shirt_Hips = data.Shirt_Hips,
           Shirt_sleeevelenght = data.Shirt_sleeevelenght,
           Shirt_Shoulder = data.Shirt_Shoulder,
           Shirt_QuaterSleeveLength = data.Shirt_QuaterSleeveLength,
           Shirt_wrist = data.Shirt_wrist,
           trouser_length = data.trouser_length,
           trouser_calf = data.trouser_calf,
           trouser_ankle = data.trouser_ankle
           var shirtDetails = req.body.shirtdetails;
           var trouserDetails = req.body.trouserdetails;
           var tailorID = req.body.tailorid;
           var dresstype = req.body.dresstype;
           var stichtype = req.body.stichtype;
           var lace = req.body.lace;
           var pipe = req.body.pipe;
           var button = req.body.button;
           var odertype = req.body.odertype;
           var image = req.body.image;
           var OderDeadline = req.body.orderdate;
           var coments = req.body.comments;
           var Dressprice = req.body.dressprice;
           var status = "pending";

           var random_no = Math.floor(Math.random() * (1000 - 9999 + 1)) + 9999;
           var orderID = random_no

           let ts = Date.now();
           let date_ob = new Date(ts);
           let c = date_ob.getDate() + "-" + date_ob.getMonth() + "-" + date_ob.getFullYear();
           var orderDate = c.toString();


           var orders = new cm({
               userID: user_ID, tailorID: tailorID, coments: coments, orderID: orderID,
               trouserDetails: trouserDetails,
               shirtDetails: shirtDetails,
               orderDate: orderDate, status: status, Dressprice: Dressprice,
               dresstype: dresstype, stichtype: stichtype, lace: lace, pipe: pipe,
                button: button, odertype: odertype, image: image, OderDeadline: OderDeadline
                ,Shirt_length:Shirt_length,
                 Shirt_neck:Shirt_neck,
                Shirt_chest:Shirt_chest,
                  Shirt_waist:Shirt_waist,
                  Shirt_backwidth:Shirt_backwidth,
                   Shirt_Hips:Shirt_Hips,
                   Shirt_sleeevelenght:Shirt_sleeevelenght,
                   Shirt_Shoulder:Shirt_Shoulder,
                   Shirt_QuaterSleeveLength:Shirt_QuaterSleeveLength,
                   Shirt_wrist:Shirt_wrist,
                   trouser_length:trouser_length,trouser_calf:trouser_calf,trouser_ankle:trouser_ankle
           })
           try {
               var data1 = await orders.save()
              res.json({ message: "order placed", orderid: data1._id, tailorid: data1.tailorID });

           } catch (err) {
               console.log(err)
           }

         }
       }
     })

})
router.post('/myorder/requests/details', (req, res) => {
    //var id  = req.body.id;
    var utype = req.body.utype;
    var oid = req.body.oid;

    var userID = "";
    var tailorname = "";
    var phoneno = "";
    var orderID = "";
    var dresstype = "";
    var stichtype = "";
    var lace = "";
    var pipe = "";
    var button = "";
    var odertype = "";
    var image = "";
    var orderDate = "";
    var OderDeadline = "";
    var coments = "";
    var shirtDetails = "";
    var trouserDetails = "";
    var Dressprice = "";

    var Shirt_length = "";
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


    cm.findOne({ _id: oid }, async function (err, data) {
        if (err) {
            console.log(err);
            res.json({ message: "abc" });
        }
        else {
            userID = data.userID;
            orderID = data.orderID;
            dresstype = data.dresstype;
            stichtype = data.stichtype;
            lace = data.lace;
            pipe = data.pipe;
            button = data.button;
            odertype = data.odertype;
            image = data.image;
            orderDate = data.orderDate;
            OderDeadline = data.OderDeadline;
            coments = data.coments;
            shirtDetails = data.shirtDetails;
            trouserDetails = data.trouserDetails;
            Dressprice = data.Dressprice;
            Shirt_length = data.Shirt_length,
            Shirt_neck = data.Shirt_neck,
            Shirt_chest = data.Shirt_chest,
            Shirt_waist = data.Shirt_waist,
            Shirt_backwidth = data.Shirt_backwidth,
            Shirt_Hips = data.Shirt_Hips,
            Shirt_sleeevelenght = data.Shirt_sleeevelenght,
            Shirt_Shoulder = data.Shirt_Shoulder,
            Shirt_QuaterSleeveLength = data.Shirt_QuaterSleeveLength,
            Shirt_wrist = data.Shirt_wrist,
            trouser_length = data.trouser_length,
            trouser_calf = data.trouser_calf,
            trouser_ankle = data.trouser_ankle


            try {
                var data1 =    await tailors.findOne({ _id: data.tailorID })
                tailorname = data1.firstname + " " + data1.lastname;
                phoneno = data1.contact;
            } catch (err) {
                console.log(err)
            }

            res.json({
                message: "details",
                tailorname: tailorname, phoneno: phoneno, ordersID: orderID, dresstype: dresstype, stichtype: stichtype,
                lace: lace, pipe: pipe, button: button, image: image, odertype: odertype, orderDate: orderDate, OderDeadline: OderDeadline,
                coments: coments, shirtDetails: shirtDetails, trouserDetails: trouserDetails, Shirt_length: Shirt_length,
                Shirt_neck: Shirt_neck, Shirt_chest: Shirt_chest, Shirt_waist: Shirt_waist, Shirt_backwidth: Shirt_backwidth
                , Shirt_Hips: Shirt_Hips, Shirt_sleeevelenght: Shirt_sleeevelenght, Shirt_Shoulder: Shirt_Shoulder, Shirt_QuaterSleeveLength
                    : Shirt_QuaterSleeveLength, Shirt_wrist: Shirt_wrist, trouser_length: trouser_length, trouser_calf: trouser_calf
                , trouser_ankle: trouser_ankle, Dressprice: Dressprice
            })
        }

    })

})


router.post('/accept', (req, res) => {
    var oid = req.body.oid;
    var id = req.body.id;

    var Shirt_length = "";
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

    var tailorID = "";
    var userID = "";
    var ordersID = "";
    var dresstype = "";
    var stichtype = "";
    var lace = "";
    var pipe = "";
    var button = "";
    var odertype = "";
    var image = "";
    var orderDates = "";
    var OderDeadline = "";
    var coments = "";
    var shirtDetails = "";
    var trouserDetails = "";
    var Dressprice = "";

    var userID = "";
    var measurementsID = "";
    var orderstartedDate = "";
    var orderStatus = "";


    var o;

    cm.findOne({ _id: oid }, async function (err, data) {
        if (err) {
            console.log(err)
        }
        else {

            tailorID = data.tailorID;
            ordersID = data.orderID;
            dresstype = data.dresstype;
            stichtype = data.stichtype;
            lace = data.lace;
            pipe = data.pipe;
            button = data.button;
            odertype = data.odertype;
            image = data.image;
            orderDates = data.orderDate;
            OderDeadline = data.OderDeadline;
            coments = data.coments;
            shirtDetails = data.shirtDetails;
            trouserDetails = data.trouserDetails;
            Dressprice = data.Dressprice;
            userID = data.userID;
            orderStatus = "InProgress";
            Shirt_length = data.Shirt_length,
            Shirt_neck = data.Shirt_neck,
            Shirt_chest = data.Shirt_chest,
            Shirt_waist = data.Shirt_waist,
            Shirt_backwidth = data.Shirt_backwidth,
            Shirt_Hips = data.Shirt_Hips,
            Shirt_sleeevelenght = data.Shirt_sleeevelenght,
            Shirt_Shoulder = data.Shirt_Shoulder,
            Shirt_QuaterSleeveLength = data.Shirt_QuaterSleeveLength,
            Shirt_wrist = data.Shirt_wrist,
            trouser_length = data.trouser_length,
            trouser_calf = data.trouser_calf,
            trouser_ankle = data.trouser_ankle

            let ts = Date.now();
            let date_ob = new Date(ts);
            let c = date_ob.getDate() + "-" + date_ob.getMonth() + "-" + date_ob.getFullYear();
            orderstartedDate = c.toString();
            try {
                var data1 =   await m.findOne({ userID: userID })
                o = new orders({
                    userID: userID,
                    tailorID: tailorID,
                    orderID: ordersID,
                    dresstype: dresstype,
                    stichtype: stichtype,
                    lace: lace,
                    pipe: pipe,
                    button: button,
                    odertype: odertype,
                    image: image,
                    orderDate: orderDates,
                    OderDeadline: OderDeadline,
                    coments: coments,
                    orderStatus: orderStatus,
                    shirtDetails: shirtDetails,
                    trouserDetails: trouserDetails,
                    orderstartedDate: orderstartedDate,
                    Dressprice: Dressprice,
                    rating: "0",
                    ratingStatus: "NotDone"
                    ,Shirt_length:Shirt_length,
                     Shirt_neck:Shirt_neck,
                    Shirt_chest:Shirt_chest,
                      Shirt_waist:Shirt_waist,
                      Shirt_backwidth:Shirt_backwidth,
                       Shirt_Hips:Shirt_Hips,
                       Shirt_sleeevelenght:Shirt_sleeevelenght,
                       Shirt_Shoulder:Shirt_Shoulder,
                       Shirt_QuaterSleeveLength:Shirt_QuaterSleeveLength,
                       Shirt_wrist:Shirt_wrist,
                       trouser_length:trouser_length,trouser_calf:trouser_calf,trouser_ankle:trouser_ankle
                })


            } catch (err) {
                console.log(err)
            }

            await o.save(async function (err) {
                if (err) {
                    console.log(err)

                }
                else {
                    var status = "accepted"

                    await cm.findOneAndUpdate({ _id: oid }, { $set: { status: status } }, function (err) {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            res.json({ message: "orderaccepted" })
                        }
                    })
                }
            })
        }
    })
})
router.post('/orderreject', (req, res) => {
    var oid = req.body.oid;
    var id = req.body.id;
    var status = "Rejected"
    cm.findOneAndUpdate({ _id: oid }, { $set: { status: status } }, function (err) {
        if (err) {
            console.log(err)
        }
        else {
            res.json({ message: "orderrejected" })
        }
    })
})
router.post('/myorder/HistoryCurrent/details', (req, res) => {
    //var id  = req.body.id;
    var utype = req.body.utype;
    var oid = req.body.oid;
    var userID = "";
    var ordersID = "";
    var dresstype = "";
    var stichtype = "";
    var lace = "";
    var pipe = "";
    var button = "";
    var odertype = "";
    var image = "";
    var orderDates = "";
    var contactno = "";
    var OderDeadline = "";
    var coments = "";
    var shirtDetails = "";
    var trouserDetails = "";
    var Dressprice = "";
    var tailorname = "";
    var Shirt_length = "";
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

    var measurementsID = "";
    var orderstartedDate = "";
    var orderStatus = ""


    orders.findOne({ _id: oid }, async function (err, data) {
        if (err) {
            console.log(err);
        }
        else {

            userID = data.userID;
            ordersID = data.orderID;
            dresstype = data.dresstype;
            stichtype = data.stichtype;
            lace = data.lace;
            pipe = data.pipe;
            button = data.button;
            odertype = data.odertype;
            image = data.image;
            orderDate = data.orderDate;
            OderDeadline = data.OderDeadline;
            coments = data.coments;
            shirtDetails = data.shirtDetails;
            trouserDetails = data.trouserDetails;
            Dressprice = data.Dressprice;
            measurementsID = data.meaurementID
            orderstartedDate = data.orderDate;
            orderStatus = data.orderStatus;

            if (utype == "Tailor") {

                try {
                    var data1 = await users.findOne({ _id: data.userID })
                    tailorname = data1.firstname + " " + data1.lastname;
                    contactno = "0" + data1.contact;

                } catch (err) {
                    console.log(err)
                }
            }
            else {
                try {
                    var data1 =  await tailors.findOne({ _id: data.tailorID })
                    tailorname = data1.firstname + " " + data1.lastname;
                    contactno = "0" + data1.contact;

                } catch (err) {
                    console.log(err)
                }

            }

            try {
                var data2 =   await m.findOne({ _id: measurementsID })
                Shirt_length = data2.Shirt_length
                    Shirt_neck = data2.Shirt_neck
                    Shirt_chest = data2.Shirt_chest
                    Shirt_waist = data2.Shirt_waist
                    Shirt_backwidth = data2.Shirt_backwidth
                    Shirt_Hips = data2.Shirt_Hips
                    Shirt_sleeevelenght = data2.Shirt_sleeevelenght
                    Shirt_Shoulder = data2.Shirt_Shoulder
                    Shirt_QuaterSleeveLength = data2.Shirt_QuaterSleeveLength
                    Shirt_wrist = data2.Shirt_wrist
                    trouser_length = data2.trouser_length
                    trouser_calf = data2.trouser_calf
                    trouser_ankle = data2.trouser_ankle

            } catch (err) {
                console.log(err)
            }

            res.json({
                message: "details",
                tailorname: tailorname, phoneno: contactno, ordersID: ordersID, dresstype: dresstype, stichtype: stichtype,
                orderStatus: orderStatus, orderstartedDate: orderstartedDate,
                lace: lace, pipe: pipe, button: button, image: image, odertype: odertype, orderDate: orderDate, OderDeadline: OderDeadline,
                coments: coments, shirtDetails: shirtDetails, trouserDetails: trouserDetails, Shirt_length: Shirt_length,
                Shirt_neck: Shirt_neck, Shirt_chest: Shirt_chest, Shirt_waist: Shirt_waist, Shirt_backwidth: Shirt_backwidth
                , Shirt_Hips: Shirt_Hips, Shirt_sleeevelenght: Shirt_sleeevelenght, Shirt_Shoulder: Shirt_Shoulder, Shirt_QuaterSleeveLength
                    : Shirt_QuaterSleeveLength, Shirt_wrist: Shirt_wrist, trouser_length: trouser_length, trouser_calf: trouser_calf
                , trouser_ankle: trouser_ankle, Dressprice: Dressprice
            })

        }
    })



})


router.post('/ordercomplete', (req, res) => {
    var oid = req.body.oid;
    var id = req.body.id;
    var orderStatus = "Complete";
    var newvalues = { $set: { orderStatus: orderStatus } }
    orders.findOneAndUpdate({ _id: oid }, newvalues, function (err) {
        if (err) {
            console.log(err)
        }
        else {
            res.json({ message: "ordercomplete" })
        }
    })
})


router.post('/myorder/requests', (req, res) => {
    //var location = "";
    var status = req.body.status;
    var customerID = "";
    var lati = "";
    var lng = "";
    let resData = [];
    var user_ID = req.body.id;
    var utype = req.body.utype;
    //var myquerry = { tailorID: user_ID }
    var orderID = [];
    var ordersID = [];
    var orderDate = [];
    var tailorName = [];
    var tailorLocation = [];
    var image = [];
    var TailorID = [];
    var dresstype = [];

    if (utype == 'Customer') {
        cm.find({ userID: user_ID ,status: status }, async function (error, data12) {
            if (error) {
                console.log(error);
            }
            else {
                for (var i = 0; i < data12.length; i++) {
                    orderID.push(data12[i]._id);
                    customerID = data12[i].userID
                    TailorID.push(data12[i].tailorID)
                    try {
                        var dots =   await tailors.findOne({ _id: data12[i].tailorID })
                        lati = parseFloat(dots.lati)
                        lng = parseFloat(dots.lngi)
                        tailorName.push(dots.firstname + " " + dots.lastname)
                        image.push(dots.image);

                    } catch (err) {
                        console.log(err)
                    }

                    await axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lati + "," + lng + "&key=AIzaSyB_UY8Mg65jm8F_BHOarN0wQAf1pFlqqtM")
                        .then((data1) => {
                            tailorLocation.push(data1.data.results[0].address_components[1].long_name);
                        })

                    orderDate.push(data12[i].orderDate);
                    ordersID.push(data12[i].orderID);
                    dresstype.push(data12[i].dresstype);



                }

                for (var q = 0; q < orderID.length; q++) {
                    let datp = {

                        orderID: orderID[q],
                        ordersID: ordersID[q],
                        orderDate: orderDate[q],
                        tailorName: tailorName[q],
                        TailorID: TailorID[q],
                        tailorLocation: tailorLocation[q],
                        image: image[q],
                        dresstype: dresstype[q]

                    }

                    resData.push(datp)
                }
                res.json({ resData: resData });
            }
        })
    }
    if (utype == 'Tailor') {
        cm.find({ tailorID: user_ID, status: status }, async function (error, data12) {
            if (error) {
                console.log(error);
            }
            else {

                for (var i = 0; i < data12.length; i++) {
                    orderID.push(data12[i]._id);
                    customerID = data12[i].userID
                    try {
                        var dots = await users.findOne({ _id: data12[i].userID })
                        tailorName.push(dots.firstname + " " + dots.lastname)
                        image.push(dots.image);

                    } catch (err) {
                        console.log(err)
                    }
                    orderDate.push(data12[i].orderDate);
                    dresstype.push(data12[i].dresstype);


                }

                for (var q = 0; q < orderID.length; q++) {
                    let datp = {

                        orderID: orderID[q],
                        orderDate: orderDate[q],
                        tailorName: tailorName[q],
                        image: image[q],
                        dresstype: dresstype[q]

                    }
                    resData.push(datp)
                }
                console.log(resData)
                res.json({ resData: resData });

            }
        })
    }

})
router.post('/currentOrder', (req, res) => {

    let resData = [];
    var customerID = "";
    var user_ID = req.body.id;
    var utype = req.body.utype;
    var ordersID = [];
    var orderID = [];
    var orderDate = [];
    var tailorName = [];
    var image = [];
    var dresstype = [];

    orders.find(async function (error, dota) {
        if (error) {
            console.log(error);
        }
        else {
            for (var i = 0; i < dota.length; i++) {
                var date = dota[i].OderDeadline

                // get system date
                var current_datetime = new Date();
                let formatted_date = (current_datetime.getMonth() + 1) + "/" + current_datetime.getDate() + "/" + current_datetime.getFullYear()

                var g1 = new Date(date);
                var g2 = new Date(formatted_date);


                if (g1.getTime() < g2.getTime()) {
                    var myquerry = { _id: dota[i]._id };
                    var newvalues = { $set: { orderStatus: "Pending" } }
                    try {
                       await orders.findOneAndUpdate(myquerry, newvalues)
                    } catch (err) {
                        console.log(err)
                    }
                }
            }
        }
    })

    if (utype == "Tailor") {
        var myquerry = { tailorID: user_ID, $or: [{ orderStatus: "InProgress" }, { orderStatus: "Cut" }, { orderStatus: "Stitch" }, { orderStatus: "Press" }] }

        orders.find(myquerry, async function (error, data12) {
            if (error) {
                console.log(error);
            }
            else {
                for (var i = 0; i < data12.length; i++) {
                    orderID.push(data12[i]._id);
                    customerID = data12[i].userID
                    try {
                        var abc =  await users.findOne({ _id: customerID })
                        image.push(abc.image);
                        tailorName.push(abc.firstname + " " + abc.lastname)
                    } catch (err) {
                        console.log(err)
                    }
                    orderDate.push(data12[i].orderDate);
                    ordersID.push(data12[i].orderID);
                    dresstype.push(data12[i].dresstype);



                }

                for (var q = 0; q < orderID.length; q++) {
                    let datp = {

                        orderID: orderID[q],
                        ordersID: ordersID[q],
                        orderDate: orderDate[q],
                        tailorName: tailorName[q],
                        dresstype: dresstype[q],
                        image: image[q]


                    }
                    resData.push(datp)
                }

                res.json({ resData: resData });
            }
        })
    }
    if (utype == "Customer") {
        var myquerry = { userID: user_ID, $or: [{ orderStatus: "InProgress" }, { orderStatus: "Cut" }, { orderStatus: "Stitch" }, { orderStatus: "Press" }] }
        orders.find(myquerry, async function (error, data12) {
            if (error) {
                console.log(error);
            }
            else {

                for (var i = 0; i < data12.length; i++) {
                    orderID.push(data12[i]._id);
                    customerID = data12[i].tailorID
                    orderDate.push(data12[i].orderDate);
                    ordersID.push(data12[i].orderID);
                    dresstype.push(data12[i].dresstype);
                    try {
                        var dots =    await tailors.findOne({ _id: data12[i].tailorID })
                        tailorName.push(dots.firstname + " " + dots.lastname)
                        image.push(dots.image);
                    } catch (err) {
                        console.log(err)
                    }
                }

                for (var q = 0; q < orderID.length; q++) {
                    let datp = {

                        orderID: orderID[q],
                        ordersID: ordersID[q],
                        orderDate: orderDate[q],
                        tailorName: tailorName[q],
                        image: image[q],
                        dresstype: dresstype[q]

                    }
                    resData.push(datp)
                }

                res.json({ resData: resData });
            }
        })
    }

})


module.exports = router;
