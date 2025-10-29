
const path = require("path");
const  websitestory_model= require("../models/Website_stories_model")
const fs = require("fs");


class websitestory_controller {

    add(data,thumbnail) {


       


        return new Promise(
            async (resolve, reject) => {

                try {


    const thumbnail_name= new Date().getTime() + Math.floor(Math.random() * 1000) + thumbnail.name;

                    const destination = "./public/image/story_thumbnail/" + thumbnail_name;
                    await thumbnail.mv(
                         destination,
                       )

         const websitestory = websitestory_model({

            views:data.views,
            thumbnail:thumbnail_name,
          video_url:data.video_url
                            

                        })


                        await websitestory.save()
                        .then(
                                async(succes) => {
                               
                        
                                    resolve(

                                        { msg: " story add succesfully ", status: 1 }
                                    )
                                 
                            })

                            .catch((error) => {
                                

                                reject(

                                    { msg:"story add unsuccesfully", status: 0 }
                                )
                               

                            })
                    }


                 
                   


                

                catch (error) {
                    console.log(error);
                    

                    reject(

                        { msg: "internal error", status: 0 }
                    )
                }


            })


    }

    
    read() {




        return new Promise(
            async (resolve, reject) => {

                try {




                

                     const websitestory= await websitestory_model.find()

resolve(

    { msg: " story finded ", status: 1 , websitestory}
)
                    
                       
                }


                
                catch (error) {
                    

                    reject(

                        { msg: "internal error", status: 0 }
                    )
                }

            })


    }


    delete(id,thumbnail) {

       
        
        return new Promise(async (resolve, reject) => {
            
            try {
             
                fs.unlinkSync(path.join("./public/image/story_thumbnail/",thumbnail));

                await websitestory_model.deleteOne({ _id: id });

                resolve({ msg: "story deleted successfully", status: 1 });
            } catch (error) {
                reject({ msg: "internal error", status: 0 });
            }
        });
    }

}



module.exports = websitestory_controller