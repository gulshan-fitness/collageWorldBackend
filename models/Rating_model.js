const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    
    college_id:{
        type:mongoose.Schema.ObjectId,
        ref:"College",
        required: true,
    },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    
  },


  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
 
  
},{

    timestamps:true

});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
