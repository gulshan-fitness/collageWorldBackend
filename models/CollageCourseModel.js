const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CollageCourseSchema = new Schema({



college_id:{
    type:mongoose.Schema.ObjectId,
    ref:"College",
    required: true,
},



Course_id:{
  type:mongoose.Schema.ObjectId,
  ref:"Course",
  required: true,
},






 
duration: {
     
        type: Number,
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



  

}, 

{
  timestamps: true
}

)

;

const CollageCourse = mongoose.model('CollageCourse', CollageCourseSchema);

module.exports = CollageCourse;
