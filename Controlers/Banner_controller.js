const path = require("path");
const fs = require("fs");

const banner_model= require("../models/Banner_model")



class banner_controller {

    add( banner) {
       
        
        return new Promise(async (resolve, reject) => {

            try {
                const banner_images = [];
             
                   

                    if (banner) {
                        const bannerArray = Array.isArray(banner) ? banner : [banner];
                        await Promise.all(
                            bannerArray.map(async (data) => {
                                const banner_image_name = new Date().getTime() + Math.floor(Math.random() * 1000) + data.name;
                                const destination = "./public/image/college_banners/" + banner_image_name;
                                await data.mv(destination);
                                banner_images.push(banner_image_name);
                            })
                        );
                    }



                    const banner_data = new banner_model({
                   
                        banner:banner_images,
                    });


                    await banner_data.save()


                        .then(async (success) => {
                            resolve({ msg: "banner saved succesfully", status: 1 });
                        })
                        .catch((error) => {
                            reject({ msg: "banner saved unsuccessful", status: 0 });
                        });
                

            } catch (error) {
                reject({ msg: "internal error", status: 0 });
            }
        });
    }

 

    
    read(id) {


        


        return new Promise(
            async (resolve, reject) => {

                try {


                    if(id){

                        const banner= await banner_model.findOne({_id:id})
resolve(
    { msg: " banner finded ", status: 1 , banner}
)


                    }


                    else{

                     const banner= await banner_model.find()

resolve(

    { msg: " banner finded ", status: 1 , banner}
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

   



  

    delete(id, banner) {
        return new Promise(async (resolve, reject) => {
            try {
               
                const parsed_banners = JSON.parse(banner);

                await Promise.all(
                    parsed_banners.map((data) => fs.unlinkSync(path.join("./public/image/college_banners/", data)))
                );
                

                await banner_model.deleteOne({ _id: id });

                resolve({ msg: "banners deleted successfully", status: 1 });
            } catch (error) {
                reject({ msg: "internal error", status: 0 });
            }
        });
    }

}



module.exports = banner_controller