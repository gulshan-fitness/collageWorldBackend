const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({


stream_id:{
  type:mongoose.Schema.ObjectId,
  ref:"stream",
  required: true,
},




courseName: {
    type: String,
    required: true,
},





courseType: {
  type: String,
  enum: ["ugCourse", "pgCourse", "abroadStudy", "certificateProgram","onlineCourse","distanceCourse",],
  required: true,

},



specialisation:[{

    type: String,
   
required: true

    
  }],

  course_image:{
    type:String,
  
  } ,

  


  ProgramOverview_image:{

    type:String,
    

  } ,

  

  keyhighlight_image:{

    type:String,
    

  } ,
  syllabusImage:{

    type:String,
  },



  eligibility_DurationImage:{

    type:String,
  },


  programFeesImage:{
    type:String,
  }
,
  
admissionProcessImage:{

  type:String,
}
,


educationLoanImage:{

  type:String,
}
,



youtubeUrl:{

  type: String,

},

  ProgramOverview:{

    type: String,
      
  },

  keyhighlight:{

    type: String,
      
  },

  syllabus:{

    type: String,
      
  },


  eligibility_Duration:{

    type: String,
      
  },

  programFees:{

    type: String,
      
  },

    admissionProcess:{
      type: String,   
    },

    educationLoan:{
      type: String,
        
    },


}, 

{
  timestamps: true
}

)

;

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
