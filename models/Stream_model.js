const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stream_Schema = new Schema({


stream_name: {
    type: String,
    required: true,
},


  image:{
    type:String,
  }  

}, 

{
  timestamps: true
}

)

;

const stream = mongoose.model('stream', stream_Schema);

module.exports = stream;
