const mongoose = require('mongoose');

var dress = new mongoose.Schema({
    tailorID:{
        type: String
    },
    description:{
        type:String
    },

    image:{
        type: String
      }
    
});
module.exports = mongoose.model('Dress', dress);