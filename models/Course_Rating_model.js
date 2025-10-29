const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const course_ratingSchema = new Schema({
    
    collage_course_id:{
        type:mongoose.Schema.ObjectId,
        ref:"CollageCourse",
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

const course_Rating = mongoose.model('course_Rating', course_ratingSchema);

module.exports = course_Rating;
