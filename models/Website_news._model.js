const mongoose = require('mongoose');

const website_news_Schema = new mongoose.Schema({
  logo: {
    type: String,
    required: true,
  },

  url: {
    type: String,
    required: true,
  },


  heading: {
    type: String,
    required: true,
  },

  news_media_logo: {
    type: String,
    required: true,
  },
  
},
{ timestamps:true});


const website_news = mongoose.model('website_news', website_news_Schema);


module.exports = website_news;
