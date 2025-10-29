const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  logo: {
    type: String,
    required: true,
  },
  college_id:{
    type:mongoose.Schema.ObjectId,
    ref:"College",
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

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
