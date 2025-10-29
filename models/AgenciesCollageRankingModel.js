const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AgenciesCollageRatingSchema = new Schema({





stream_id:{
  type:mongoose.Schema.ObjectId,
  ref:"stream",
  required: true,
},



college_id:{
  type:mongoose.Schema.ObjectId,
  ref:"College",
  required: true,
},




agencyName:{
    type: String,

    required: true,

      enum: ["AAOPADHE", "indiatoday", "the week", "NIRF","Outlook","IIRF","TOI","NIRF Innovation","the","qs"],
},



Ranking:{
    type:Number,
    required: true 

  },

     year:{
          type: Number,
          default: 2025,
        },


       out_of:{
          type: Number,
          required: true,
        },


}, 

{
  timestamps: true
}

)

;

const AgenciesCollageRating = mongoose.model('AgenciesCollageRating', AgenciesCollageRatingSchema);

module.exports = AgenciesCollageRating;
