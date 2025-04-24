const mongoose = require('mongoose');

const slider_bannerSchema = new mongoose.Schema({

    
   

 
    banner:[{
        type:String,
        required: true,
    }
  ]
   
   
},{

    timestamps:true

});

const slider_banner = mongoose.model('slider_banner', slider_bannerSchema);

module.exports = slider_banner;
