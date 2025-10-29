const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({

    college_id:{
        type:mongoose.Schema.ObjectId,
        ref:"College",
        required: true,
    },


  name: {
    type: String,
    required: true,
  
  },

 
  phone: {
    type: Number,
    required: true,
    
  },
  
  Profile: {
    type: String,
    required: true,
  
  },

 
 
}, 
{
  timestamps: true
});

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;
