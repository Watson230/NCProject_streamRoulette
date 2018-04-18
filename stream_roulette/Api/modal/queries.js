const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const queriesSchema = new Schema({
  user: {
    type: String,
    required: false
  },
  genre: {
    type: String,
    required: false
  },
  title: {
    type: String,
    requied: false
  },
  keywords: {
    type: String,
    required: false
  },
  rating: {
    type: Number,
    required: false,
    default: 0
  },
  releaseDate: {
    type: String,
    lowercase: false
  },

  director: {
    type: String,
    required: false,
  },
  starring: {
    type: [],
    default: []
  },

  time: {
    type: String,
    default: new Date().getTime()
  }

});

module.exports = mongoose.model('queries', queriesSchema);