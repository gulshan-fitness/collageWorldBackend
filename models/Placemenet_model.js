const mongoose = require('mongoose');

const placementSchema = new mongoose.Schema({
    
    college_id:{
        type:mongoose.Schema.ObjectId,
        ref:"College",
        required: true,
    },

 
    placemenet_paragraph:{
        type:String,
        required: true,
    }
  
   
   
},{
    

    timestamps:true

});

const placement = mongoose.model('placement', placementSchema);

module.exports = placement;
