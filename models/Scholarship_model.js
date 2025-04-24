const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({

    college_id:{
        type:mongoose.Schema.ObjectId,
        ref:"College",
        required: true,
    },

  scholarship_type: {
    type: String,
    required: true
  },
  organisation: {
    type: String,
    required: true
  },
  application_deadline: {
    type: Date,
    required: true
  },
  no_of_scholarships: {
    type: Number,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },
  
  international_students: {
    type: Boolean,
    required: true
    
  },
  scholarship_link: {
    type: String,
    required: true
  }
},
{
  timestamps: true
}
);

const Scholarship = mongoose.model('Scholarship', scholarshipSchema);

module.exports = Scholarship;
