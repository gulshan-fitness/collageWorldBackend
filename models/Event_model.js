const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({

  logo: {
    type: String,
    required: true,
  },

  college_id:{
    type:mongoose.Schema.ObjectId,
    ref:"College",
    required: true,
},

description: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,

  },

  time: {
    type: String,
    
  },

},
{ timestamps:true});

const event = mongoose.model('event', eventSchema);

module.exports = event;
