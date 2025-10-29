const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placed_students_Schema = new Schema({


college_id:{
    type:mongoose.Schema.ObjectId,
    ref:"College",
    required: true,
},


name: {
    type: String,
    required: true,
},

company: {
      type: String,
        required: true
},

review:{

    type: String,
   
required: true

    
  }
,

  student_image:{
    type:String,
    
    
  }  

}, 

{
  timestamps: true
}

)

;

const placed_students = mongoose.model('placed_students', placed_students_Schema);

module.exports = placed_students;
