const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userSchema = new Schema({

    

    name: {
        type: String,
        required: true
     },

     referelUser:{
          type:mongoose.Schema.ObjectId,
                ref:"User",   
                 default: null     
     },


    contact: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique:true
    },


 

    course:{
        type:String,
       default:""
    },


   

    
college:{
    type:mongoose.Schema.ObjectId,
    ref:"College",
    default:null
},


    enquiry:{
        type:String,
        default:""
       
    },
    

    state: {
        type: String,
        required: true
    },


    city:{
        type: String,
        required: true
    },

    checked:{
        type: Boolean,
        default:false
    },


user_response: {
        type: String,
        default:""
    },
    

},
{
    timestamps:true
}
);

const User = mongoose.model('User', userSchema);

module.exports = User;