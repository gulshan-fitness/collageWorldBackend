const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
 

    college_id:{
        type:mongoose.Schema.ObjectId,
        ref:"College",
        required: true,
    },
   
    video_url: {
        type: String,
     required:true
    },


    title: {
        type: String
    },
    
},{
    timestamps:true
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
