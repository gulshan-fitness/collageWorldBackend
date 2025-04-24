const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    
    review_id:{
        type:mongoose.Schema.ObjectId,
        ref:"review",
        required: true,
    },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    
  },


  comment: {
    type: String,
    required: true,
   
  },
 
  
},{

    timestamps:true

});



const comment = mongoose.model('comment', commentSchema);

module.exports = comment;
