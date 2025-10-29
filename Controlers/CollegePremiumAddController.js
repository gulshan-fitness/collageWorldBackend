const path = require("path");
const fs = require("fs");


const CollegePremiumAddModel= require("../models/CollegePremiumAddModel")



class CollegePremiumAddcontroller {

    add(data,banner) {

        console.log(data,banner);
        
    
        return new Promise(async (resolve, reject) => {

            try {

             const banner_image_name = new Date().getTime() + Math.floor(Math.random() * 1000) + banner.name;

                               const destination = "./public/image/PremiumAds/" + banner_image_name;
                                await banner.mv(destination);
                    const premiumAD = new CollegePremiumAddModel(
                        {
                   college_id:data?.college_id,
                   banner:banner_image_name,
                    }
                );
                    await premiumAD.save()


                        .then(async (success) => {
                            resolve({ msg: "premiumAD saved succesfully", status: 1 });
                        })

                        .catch((error) => {
                            reject({ msg: "internal error", status: 0 });
                        });
                

            } catch (error) {
                console.log(error);
                
                reject({ msg: "internal error", status: 0 });
            }
        });
    }

 

    
    read(id,college_id) {


        return new Promise(
            async (resolve, reject) => {

                try {


                    if(id!=="null"){

                        const premiumAD= await CollegePremiumAddModel.findOne({_id:id})
                        .populate("college_id")
resolve(
    { msg: " premiumAD finded ", status: 1 , premiumAD}
)


                    }

                    else if(college_id!=="null"){
                                              const premiumAD= await CollegePremiumAddModel.findOne({college_id:college_id})
                                              .populate("college_id")
resolve(
    { msg: " premiumAD finded ", status: 1 , premiumAD}
)
  
                    }

                    else{

                     const premiumAD= await CollegePremiumAddModel.find()
                     .populate("college_id")

resolve(

    { msg: " premiumAD finded ", status: 1 , premiumAD}
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

        console.log(id, banner);
        
        return new Promise(async (resolve, reject) => {
            try {

            fs.unlinkSync(path.join("./public/image/PremiumAds/", banner))

              
                

                await CollegePremiumAddModel.deleteOne({ _id: id });

                resolve({ msg: "premiumAD deleted successfully", status: 1 });
            } catch (error) {
                reject({ msg: "internal error", status: 0 });
            }
        });
    }

}



module.exports = CollegePremiumAddcontroller