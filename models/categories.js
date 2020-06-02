const mongoose = require('mongoose');

const Categories = new mongoose.Schema({
  categoryname: {
    type: String,
    required: true
  },
  categorydiscription: {
    type: String,
    required: true
  },
  categorythumbnail: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('categories', Categories);
