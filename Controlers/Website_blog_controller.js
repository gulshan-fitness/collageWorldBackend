const path = require("path");

const website_blogs_model= require("../models/Website_Blogs_model")

const fs = require("fs");

class website_blogs_controller {

    add(data,logo) {

       


        return new Promise(
            async (resolve, reject) => {

                try {

                   

    const logo_name= new Date().getTime() + Math.floor(Math.random() * 1000) + logo.name;

                    const destination = "./public/image/website_blog_image/" + logo_name;
                    await logo.mv(
                         destination,
                       )
                  

         const post = website_blogs_model({

            
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

    
    read(id,query) {


        


        return new Promise(
            async (resolve, reject) => {

                try {


                    if(id){

         

         const post= await website_blogs_model.findOne({_id:id})

resolve(
    { msg: " post finded ", status: 1 , post}
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



const post= await website_blogs_model.find(filter)

resolve(

    { msg: " post finded ", status: 1 , post}
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

   

    edit(id, data) {
        
        
        
        return new Promise(async (resolve, reject) => {
            try {
                await website_blogs_model.updateOne(
                    { _id: id },

                    {
                        
                       
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
                const destination = "./public/image/website_blog_image/" + logo_name;
                await logo.mv(destination);

                await website_blogs_model.updateOne({ _id: id }, { logo: logo_name });

                fs.unlinkSync(path.join("./public/image/website_blog_image/", data.old_logo));

                resolve({ msg: "logo update successfully", status: 1 });
            } catch (error) {
                console.log(error);
                
                reject({ msg: "internal error", status: 0 });
            }
        });
    }


    delete(id, logo) {
        return new Promise(async (resolve, reject) => {
            try {
               

               

                fs.unlinkSync(path.join("./public/image/website_blog_image/", logo));
                

                await website_blogs_model.deleteOne({ _id: id });

                resolve({ msg: "post deleted successfully", status: 1 });
            } catch (error) {
                reject({ msg: "internal error", status: 0 });
            }
        });
    }

}



module.exports = website_blogs_controller