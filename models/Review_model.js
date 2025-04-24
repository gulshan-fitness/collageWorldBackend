const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    
    college_id:{
        type:mongoose.Schema.ObjectId,
        ref:"College",
        required: true,
    },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    
  },


  review: {
    type: String,
    required: true,
   
  },
 
  
},{

    timestamps:true

});



const Review = mongoose.model('review', reviewSchema);

module.exports = Review;
