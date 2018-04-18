const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  
    username: {
        type: String,
        required: true
      },

      likedFilms:{
          type:Array,
          required:false,
          default:[]
      },

      dislikedFilms:{
        type:Array,
        required:false,
        default:[]
    },

    watchedFilms:{
        type:Array,
        required:false,
        default:[]
    }

});

module.exports = mongoose.model('user', userSchema);