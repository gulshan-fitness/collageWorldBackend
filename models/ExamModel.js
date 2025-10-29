const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExamSchema = new Schema({



Course_id:{
    type:mongoose.Schema.ObjectId,
    ref:"Course",
    required: true,
},



FullName:{
    type: String,
    required: true,
},



ShortName:{
    type: String,
    required: true,
},


logo:{
    type: String,
    required: true,
},




Mode:{
    type: String,
    required: true,
    enum: ["offline exam", "online exam", ],
},



year:{
    type:Number,
    required:true,
},



ExamPattern:{
    type: String,
    required: true,
},



PreviousPapper:{

    type: String,
    
},

ApplicationProcess:{   
    type: String,
},

PreparationTips:{   
    type: String,
},

Result:{
    type: String,
},




youtubeLink:{
    type: String,
},



 directapplyLink:{
    type: String,
    
},

MockTestLink:{
    type: String,
    
},


topExam:{
    type: Boolean,
   default:false 
},




Application_FormDate:{

    from:{
        type: Date,
        required: true,
    },
    to:{
        type: Date,
        required: true,
    },
},



Result_Announce_Date: {

    from:{
        type: Date,
        required: true,
    },
    to:{
        type: Date,
        required: true,
    },
},

}, 

{
  timestamps: true
}

)

;

const Exams = mongoose.model('Exams', ExamSchema);

module.exports = Exams;
