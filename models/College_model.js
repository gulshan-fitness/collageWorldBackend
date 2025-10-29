const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collegeSchema = new Schema({

  college_name: {
    type: String,
    required: true
  },

  estdYear: {
    type: String,
    required: true
  },
  
  affiliatedTo: [{
    type: String,
    required: true
  }],
  
  about: {
    type: String,
    required: true
  },

  facts: [{
    type: String,
    
  }],

  professor: {
    type: String,
    
  },


  type: {
    type: String,  
    required: true,
      enum: ["private","government" ],
  },
  programmesOffered: [{
    type: String,
    
  }],

  director: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  officialWebsite: {
    type: String,
    
  },
  address: {
    type: String,
    required: true
  },

university_banner: [{
    type: String,
    required: true
  }],

  office_photo:{
    type: String,
    required: true
  },

  state: {
    type: String,
    required: true
  },

 city:{
  type: String,
    required: true
 }
 ,
 campus_images:[

 { type: String,
  
}

 ],


 pdf:{
  type: String,
    required: true
 }
 ,
 

 education_loan:{
  type: String,
  required: true
 }
 ,


 loan_contact:{
  type: Number,
  required: true
 }
 ,

 registered_instructors:{
  type: Number,
  
 }

}, 
{
  timestamps: true
});

const College = mongoose.model('College', collegeSchema);

module.exports = College;
