const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    college_id:{
        type:mongoose.Schema.ObjectId,
        ref:"College",
        required: true,
    },
  name: {
    type: String,
    required: true,
    trim: true,
  },

  department: {
    type: String,
    required: true,
    trim: true,
  },
  designation: {
    type: String,
    required: true,
    trim: true,
  },
  qualification: {
    type: String,
    required: true,
    trim: true,
  }
}, {
  timestamps: true
});

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;
