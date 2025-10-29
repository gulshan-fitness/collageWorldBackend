const path = require("path");

const website_news_model= require("../models/Website_news._model")

const fs = require("fs");

class website_news_controller {

    add(data,logo,news_media_logo) {


 
    
        return new Promise(
            async (resolve, reject) => {

                try {

    const logo_name= new Date().getTime() + Math.floor(Math.random() * 1000) + logo.name;

                    const destination = "./public/image/website_news_photo/" + logo_name;
                    await logo.mv(
                         destination,
                       )


                       const news_media_logo_name= new Date().getTime() + Math.floor(Math.random() * 1000) + news_media_logo.name;
                  

                       const news_media_logo_destination = "./public/image/news_media_image/" + news_media_logo_name;
                       
                       await news_media_logo.mv(
                        news_media_logo_destination,
                          )

         const news = website_news_model({

            
        url:data.url,
        heading :data.heading,
        logo:logo_name,
        news_media_logo:news_media_logo_name
                            
                        })


                        await news.save()
                        .then(
                                async(succes) => {
                               
                        
                                    resolve(

                                        { msg: " news add succesfully ", status: 1 }
                                    )
                                
                            
                                    
    
                               

                             
                            })

                            .catch((error) => {
                                

                                reject(

                                    { msg: "  news add unsuccesfully", status: 0 }
                                )
                               

                            })
                    }


                 
                   


                

                catch (error) {
                    

                    reject(

                        { msg: "internal error", status: 0 }
                    )
                }


            })


    }

    
    read(id,query) {


        


        return new Promise(
            async (resolve, reject) => {

                try {


                    if(id){

         

         const news= await website_news_model.findOne({_id:id})

resolve(
    { msg: " news finded ", status: 1 , news}
)


                    }


                    else{

const filter={ }

if(query.heading){
    filter.heading={ $regex: query.heading, $options:"i"}
}
if (query.posted == "past24Hours") {
    filter.updatedAt = { $gte: new Date(now.getTime() - 24 * 60 * 60*1000) };
}



const news= await website_news_model.find(filter)

resolve(

    { msg: " news finded ", status: 1 , news}
)
                    }     
                       
                }


                
                catch (error) {
                    

                    reject(

                        { msg: "internal error", status: 0 }
                    )
                }


            })


    }

   

 


    delete(id, logo,news_media_logo) {
        console.log(id, logo,news_media_logo);
        
        
        return new Promise(async (resolve, reject) => {
            try {
               

                fs.unlinkSync(path.join("./public/image/news_media_image/",news_media_logo));

                fs.unlinkSync(path.join("./public/image/website_news_photo/", logo));
               
                

                await website_news_model.deleteOne({ _id: id });

                resolve({ msg: "news deleted successfully", status: 1 });
            } catch (error) {
                console.log(error);
                
                reject({ msg: "internal error", status: 0 });
            }
        });
    }

}



module.exports = website_news_controller