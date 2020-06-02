const mongoose = require('mongoose');

const DressModelSchema = new mongoose.Schema({
  dressModelName: {
    type: String,
    required: true
  },
  dressModelDiscription: {
    type: String,
    required: true
  },
  dressModelThumbnail: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('DressModelSchema', DressModelSchema);
