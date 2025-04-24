const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({



college_id:{
    type:mongoose.Schema.ObjectId,
    ref:"College",
    required: true,
},


stream_id:{
  type:mongoose.Schema.ObjectId,
  ref:"stream",
  required: true,
},


courseName: {
    type: String,
    required: true,
},

 
duration: {
     
        type: Number,
        required: true

      },

      approved: {
     
        type: String,
        required: true

      },
      

specialisation:[{

    type: String,
   
required: true

    
  }],




  time:{

    type: String,
   
required: true

    
  },

  scholarship:{
    type: String,
   
    required: true
  },
  
  fees:{

    type: Number,
   
required: true

    
  },

  mode:{

    type: String,
   
required: true
    
  },
  


approved:[
  {
    type:String,
    
    
  } 
],

  course_image:{
    type:String,
    required: true
    
  }  

}, 

{
  timestamps: true
}

)

;

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
