const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const adminSchema = new Schema({
    
    name: {
        type: String,
        required: true
     },

    email: {
        type: String,
        required: true,
        unique: true
    },

    contact: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

     role:{  type: String,
        default:"subadmin"},

            approved:{  type: Boolean,
        default:false},

            collage_id:{ type: mongoose.Schema.ObjectId,
     },


});

const admin = mongoose.model('admin', adminSchema);

module.exports = admin;