const mongoose = require('mongoose');

const website_storySchema = new mongoose.Schema({
 

  thumbnail:{
    type: String,
    required:true
  },
  
   
    video_url: {
        type: String,
     required:true
    },


    views: {
        type: String
    },
    
},{
    timestamps:true
});

const websiteStory = mongoose.model('websiteStory', website_storySchema);

module.exports = websiteStory;
