const path = require("path");

const post_model= require("../models/Post_model")

const fs = require("fs");

class post_controller {

    add(data,logo) {

       console.log(data,logo);
       


        return new Promise(
            async (resolve, reject) => {

                try {

                   

    const logo_name= new Date().getTime() + Math.floor(Math.random() * 1000) + logo.name;

                    const destination = "./public/image/Post_image/" + logo_name;
                    await logo.mv(
                         destination,
                       )
                  

         const post = post_model({

            college_id:data.college_id,
        post:data.post,
    
     author:data.author,
        heading :data.heading,
        logo:logo_name,
                            
                        })


                        await post.save()
                        .then(
                                async(succes) => {
                               
                        
                                    resolve(

                                        { msg: " post add succesfully ", status: 1 }
                                    )
                                
                            
                                    
    
                               

                             
                            })

                            .catch((error) => {
                                

                                reject(

                                    { msg: "  post add unsuccesfully", status: 0 }
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

    
    read(id,collage_id) {


        


        return new Promise(
            async (resolve, reject) => {

                try {


                    if(id!=="null"){

         const current_post= await post_model.findOne({_id:id}).populate("college_id")
        

resolve(
    { msg: " post finded ", status: 1 ,current_post}
)


                    }


        if(collage_id!=="null"){

         const post= await post_model.find({college_id:collage_id}).populate("college_id")
         
resolve(

    { msg: " post finded ",status: 1,post}

)
                    }


                    else{

                     const post= await post_model.find().populate("college_id")

resolve(

    { msg: " post finded ", status: 1 , post}
)
                    }     
                       
                }


                
                catch (error) {
                      console.log(error)

                    reject(

                      
                        
                        { msg: "internal error", status: 0 }
                    )
                }


            })


    }

   

    edit(id, data) {
        console.log(id, data);
        
        
        return new Promise(async (resolve, reject) => {
            try {
                await post_model.updateOne(
                    { _id: id },

                    {
                        
                        college_id:data.college_id,
        post:data.post,
    
     author:data.author,
        heading :data.heading,
                       
                    }
                );

                resolve({ msg: "update successfully", status: 1 });
            } catch (error) {
                reject({ msg: "internal error", status: 0 });
            }
        });
    }


    logo_update(id, data, logo) {

       

        

        return new Promise(async (resolve, reject) => {
            try {
                const logo_name = new Date().getTime() + Math.floor(Math.random() * 1000) + logo.name;
                const destination = "./public/image/Post_image/" + logo_name;
                await logo.mv(destination);

                await post_model.updateOne({ _id: id }, { logo: logo_name });

                fs.unlinkSync(path.join("./public/image/Post_image/", data.old_logo));

                resolve({ msg: "logo update successfully", status: 1 });
            } catch (error) {
                reject({ msg: "internal error", status: 0 });
            }
        });
    }


    delete(id, logo) {
        return new Promise(async (resolve, reject) => {
            try {
               

               

                fs.unlinkSync(path.join("./public/image/Post_image/", logo));
                

                await post_model.deleteOne({ _id: id });

                resolve({ msg: "post deleted successfully", status: 1 });
            } catch (error) {
                reject({ msg: "internal error", status: 0 });
            }
        });
    }

}



module.exports = post_controller