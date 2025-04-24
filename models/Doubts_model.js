const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doubtSchema = new Schema({
    college_id:{
        type:mongoose.Schema.ObjectId,
        ref:"College",
        required: true,
    },
    
    doubt: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Doubt', doubtSchema);
