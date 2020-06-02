const mongoose = require('mongoose');

var price = new mongoose.Schema({
    tailorID:{
        type: String
    },

    DressName:[{type:String}],
    DressPrice:[{type:String}]

 

});
module.exports = mongoose.model('price', price);