const mongoose = require('mongoose');

const website_blogs_Schema = new mongoose.Schema({
  logo: {
    type: String,
    required: true,
  },

  post: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },

  
},
{ timestamps:true});

const website_blogs = mongoose.model('website_blogs', website_blogs_Schema);

module.exports = website_blogs;
