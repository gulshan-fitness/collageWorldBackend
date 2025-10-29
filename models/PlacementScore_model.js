const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placementScoreSchema = new Schema({
    
    college_id:{
        type:mongoose.Schema.ObjectId,
        ref:"College",
        required: true,
    },

    placementScore: {
    type: Number,
    required: true,
    
  },


  year: {

    type: Number,
    required: true,
   
  },
 
  
},{

    timestamps:true

});

const placementScore = mongoose.model('placementScore', placementScoreSchema);

module.exports = placementScore;
