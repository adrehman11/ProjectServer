var express = require('express');
const cm = require('../models/customerRequirement');
const users = require('../models/user');
const tailors = require('../models/tailor');
const price = require('../models/price');
const orders = require('../models/Order');
const m = require('../models/measurements');
const axios = require('axios').default;
var router = express.Router();

router.post('/orderstatus', (req, res) => {
    var id = req.body.id;
    var orderid = req.body.oid;
    var orderstatus = req.body.orderstatus;
    var myquerry = { _id: orderid }
    var newvalues = {
        $set: {
            orderStatus: orderstatus
        }
    }
    orders.findOneAndUpdate(myquerry, newvalues, function (error) {
        if (error) {
            console.log(error)
        }
        else {
            res.json({ message: "done" })

        }

    })

})

router.post('/submitrating', (req, res) => {

    var ordersid= req.body.ordersid;
    var ratingvalue = req.body.ratingvalue;
    var ratingStatus = "RatingDone"
    var myquerry = { orderID: ordersid }
    var newvalues = {
        $set: {
            ratingStatus: ratingStatus,
            rating:ratingvalue
        }
    }
    orders.findOneAndUpdate(myquerry, newvalues, function (error) {
        if (error) {
            console.log(error)
        }
        else {
            res.json({ message: "DoneRating" })
        }

    })

})


router.post('/myorder/HRP', (req, res) => {
    var status = req.body.status;
    var customerID = "";
    var lati = "";
    var lng = "";
    let resData = [];
    var user_ID = req.body.id;
    var utype = req.body.utype;
    console.log(status)
    //var myquerry = { tailorID: user_ID }
    var orderID = [];
    var ordersID = [];
    var orderDate = [];
    var tailorName = [];
    var tailorLocation = [];
    var image = [];
    var dresstype = [];
    var TailorID = [];
    if (utype == 'Customer') {

        cm.find({ userID: user_ID , status: status }, async function (error, data12) {
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
                        tailorLocation: tailorLocation[q],
                        image: image[q],
                        dresstype: dresstype[q],
                        TailorID: TailorID[q],

                    }
                    resData.push(datp)
                }
                console.log(resData);
                res.json({ resData: resData });
            }
        })
    }
    if (utype == 'Tailor') {
        cm.find({ tailorID: user_ID , status: status }, async function (error, data12) {
            if (error) {
                console.log(error);
            }
            else {
                for (var i = 0; i < data12.length; i++) {
                    orderID.push(data12[i]._id);
                    customerID = data12[i].userID
                    ordersID.push(data12[i].orderID);
                    try {
                        var dots =  await users.findOne({ _id: data12[i].userID })
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
                        ordersID: ordersID[q],
                        orderDate: orderDate[q],
                        tailorName: tailorName[q],
                        image: image[q],
                        dresstype: dresstype[q]

                    }
                    resData.push(datp)
                }
                console.log(resData);
                res.json({ resData: resData });
            }
        }) 
    }

})


router.post('/myorder/pending', (req, res) => {
    var status = req.body.status;
    var customerID = "";
    var lati = "";
    var lng = "";
    let resData = [];
    var user_ID = req.body.id;
    var utype = req.body.utype;
    console.log(status)
    //var myquerry = { tailorID: user_ID }
    var orderID = [];
    var ordersID = [];
    var orderDate = [];
    var tailorName = [];
    var tailorLocation = [];
    var image = [];
    var dresstype = [];
    var ordersID2=[];
    var dresstype2=[];
    var tailorName2=[];
    var resdata2=[];

    if (utype == 'Customer') {

        orders.find({ $and: [ { userID:user_ID }, { ratingStatus:"NotDone" },{orderStatus:"Finish"} ] },async function(err,loi){
            if(err)
            {
                console.log(err)
            }
            else{
                for (var i = 0; i < loi.length; i++) {
                    ordersID2.push(loi[i].orderID)
                    dresstype2.push(loi[i].dresstype)
                    try {
                        var dots =  await tailors.findOne({ _id: loi[i].tailorID })
                        tailorName2.push(dots.firstname + " " + dots.lastname)


                    } catch (err) {
                        console.log(err)
                    }

                }
                for (var q = 0; q < ordersID2.length; q++) {
                    let datp = {

                        ordersID2: ordersID2[q],
                        tailorName2: tailorName2[q],
                        dresstype2: dresstype2[q]
                    }
                    resdata2.push(datp)
                }

               await orders.find({ userID: user_ID,orderStatus: status }, async function (error, data12) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        for (var i = 0; i < data12.length; i++) {
                            orderID.push(data12[i]._id);
                            customerID = data12[i].userID
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
                                tailorLocation: tailorLocation[q],
                                image: image[q],
                                dresstype: dresstype[q]

                            }
                            resData.push(datp)
                        }

                        res.json({ resData: resData,resdata2:resdata2});
                    }
                })
            }
        })

    }
    if (utype == 'Tailor') {
        orders.find({ tailorID: user_ID } && { orderStatus: status }, async function (error, data12) {
            if (error) {
                console.log(error);
            }
            else {
                for (var i = 0; i < data12.length; i++) {
                    orderID.push(data12[i]._id);
                    customerID = data12[i].userID
                    ordersID.push(data12[i].orderID);
                    try {
                        var dots =   await users.findOne({ _id: data12[i].userID })
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
                        ordersID: ordersID[q],
                        orderDate: orderDate[q],
                        tailorName: tailorName[q],
                        image: image[q],
                        dresstype: dresstype[q]

                    }
                    resData.push(datp)
                }
                console.log(resData);
                res.json({ resData: resData });
            }
        })
    }

})

router.post('/myorder/Rejected/details', (req, res) => {
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

    var orderstartedDate = "";
    var orderStatus = ""


    cm.findOne({ _id: oid }, async function (err, data) {
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

            orderstartedDate = data.orderDate;
            orderStatus = data.orderStatus;

            if (utype == "Tailor") {
                try {
                    var data1 =  await users.findOne({ _id: data.userID })
                    tailorname = data1.firstname + " " + data1.lastname;
                        contactno = "0" + data1.contact;


                } catch (err) {
                    console.log(err)
                }

            }
            else {
                try {
                    var data1 = await tailors.findOne({ _id: data.tailorID })
                    tailorname = data1.firstname + " " + data1.lastname;
                    contactno = "0" + data1.contact;

                } catch (err) {
                    console.log(err)
                }

            }


            res.json({
                message: "details",
                tailorname: tailorname, phoneno: contactno, ordersID: ordersID, dresstype: dresstype, stichtype: stichtype,
                orderStatus: orderStatus, orderstartedDate: orderstartedDate,
                lace: lace, pipe: pipe, button: button, image: image, odertype: odertype, orderDate: orderDate, OderDeadline: OderDeadline,
                coments: coments, shirtDetails: shirtDetails, trouserDetails: trouserDetails, Dressprice: Dressprice
            })

        }
    })



})

router.post('/myorder/peending/details', (req, res) => {
    //var id  = req.body.id;
    var utype = req.body.utype;
    var oid = req.body.oid;
    console.log(oid, utype)
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

            orderstartedDate = data.orderDate;
            orderStatus = data.orderStatus;

            if (utype == "Tailor") {
                try {
                    var data1 =   await users.findOne({ _id: data.userID })
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


            res.json({
                message: "details",
                tailorname: tailorname, phoneno: contactno, ordersID: ordersID, dresstype: dresstype, stichtype: stichtype,
                orderStatus: orderStatus, orderstartedDate: orderstartedDate,
                lace: lace, pipe: pipe, button: button, image: image, odertype: odertype, orderDate: orderDate, OderDeadline: OderDeadline,
                coments: coments, shirtDetails: shirtDetails, trouserDetails: trouserDetails, Dressprice: Dressprice
            })

        }
    })



})
router.post('/reordertailor', (req, res) => {
    var userID = req.body.id;
    var tailororderID = req.body.oid;
    var utype = req.body.utype;
    var orderdate = req.body.orderdate;
    var myquerry = { _id: tailororderID };
    var newvalues = { $set: { orderStatus: "InProgress", OderDeadline: orderdate } };

    if (utype == "Tailor") {
        orders.findOneAndUpdate(myquerry, newvalues, function (err, data) {
            if (err) {
                console.log(err)
            }
            else {
                res.json({ message: "order reassigned" });
            }
        })
    }
    if (utype == "Customer") {
        var tailorID = req.body.tailorid;
        console.log(tailororderID)
        orders.findOneAndRemove({ _id: tailororderID }, async function (err, data) {
            if (err) {
                console.log(err)
            }
            else {
                let ts = Date.now();
                let date_ob = new Date(ts);
                let c = date_ob.getDate() + "-" + date_ob.getMonth() + "-" + date_ob.getFullYear();
                var OD = c.toString();
                var orderID=data.orderID
                var coments=data.coments
                var trouserDetails=data.trouserDetails
                var shirtDetails=data.shirtDetails
                var Dressprice=data.Dressprice
                var dresstype=data.dresstype
                var stichtype=data.stichtype
                var lace=data.lace
                var pipe=data.pipe
                var button=data.button
                var odertype=data.odertype
                var image=data.image

                var orders = new cm({
                    userID: userID, tailorID: tailorID, orderID: orderID, coments: coments,
                    trouserDetails: trouserDetails,
                    shirtDetails: shirtDetails,
                    orderDate: OD, status: "pending", Dressprice: Dressprice,
                    dresstype:dresstype, stichtype: stichtype, lace: lace,
                    pipe: pipe, button: button, odertype: odertype, image: image,
                    OderDeadline: orderdate
                })

                await orders.save(function (err) {
                    if (err) throw err;
                    else {
                        res.json({ message: "order reassigned" });
                    }
                })
            }
        })
    }
})

module.exports = router;
