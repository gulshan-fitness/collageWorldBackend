const mongoose = require('mongoose');

const CollegePremiumAddSchema = new mongoose.Schema({
banner:{
        type:String,
        required: true,
    }
        ,
college_id:{
type:mongoose.Schema.ObjectId,
ref:"College",
 required: true,}
},
{
    timestamps:true
});

const CollegePremiumAdd = mongoose.model('CollegePremiumAdd', CollegePremiumAddSchema);

module.exports = CollegePremiumAdd;
