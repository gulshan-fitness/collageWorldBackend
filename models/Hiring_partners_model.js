const mongoose = require('mongoose');

const hiringPartnerSchema = new mongoose.Schema({
    
    college_id:{
        type:mongoose.Schema.ObjectId,
        ref:"College",
        required: true,
    },
 
    companyName: {
        type: String,
        required: true
    },
   
    website: {
        type: String
    },
    
    logo: {
        type: String ,
        
    },

   
   
},{

    timestamps:true

});

const HiringPartner = mongoose.model('HiringPartner', hiringPartnerSchema);

module.exports = HiringPartner;
