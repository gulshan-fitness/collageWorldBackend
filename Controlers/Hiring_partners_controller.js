
const path = require("path");
const hiring_partners_model= require("../models/Hiring_partners_model")

const fs = require("fs");

class hiring_partenrs_controller {

    add(data,logo) {


       


        return new Promise(
            async (resolve, reject) => {

                try {

           const exist_hiring_partner= await hiring_partners_model.findOne({  college_id:data.college_id, companyName: data.company_name,})         

if(exist_hiring_partner){
    reject(

        { msg: "already exist", status: 0 }
    )
}

else{

    const logo_name= new Date().getTime() + Math.floor(Math.random() * 1000) + logo.name;

    const destination = "./public/image/hiring_partners_logo/" + logo_name;
    await logo.mv(
         destination,
       )
  

const hirirng_partner = hiring_partners_model({

college_id:data.college_id,

companyName: data.company_name,

website: data.website,

logo:logo_name,
            

        })


        await hirirng_partner.save()
        .then(
                async(succes) => {
               
        
                    resolve(

                        { msg: " hirirng_partner add succesfully ", status: 1 }
                    )
                
            
                    

               

             
            })

            .catch((error) => {
                

                reject(

                    { msg: "  hirirng_partner add unsuccesfully", status: 0 }
                )
               

            })

}

  
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

                        
                        const hiring_partners= await hiring_partners_model.find({college_id:id}).populate("college_id")
                        
                        const current_hiring_partners= await hiring_partners_model.findOne({_id:id}).populate("college_id")
resolve(
    { msg: " hiring_partners finded ", status: 1 , hiring_partners,current_hiring_partners}
)


                    }

                    else if(collage_id!=="null"){

                         const hiring_partners= await hiring_partners_model.find({college_id:collage_id}).populate("college_id")

resolve(

    { msg: " hiring_partners finded ", status: 1 , hiring_partners}
)
                        
                    }


                    else{

                     const hiring_partners= await hiring_partners_model.find().populate("college_id")

resolve(

    { msg: " hiring_partners finded ", status: 1 , hiring_partners}
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
             
                    await hiring_partners_model.updateOne(
                        { _id: id },
    
                        {
                            
                            college_id:data.college_id,
             
                            companyName: data.company_name,
                           
                            website: data.website,
                            
                           
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
                const destination = "./public/image/hiring_partners_logo/" + logo_name;
                await logo.mv(destination);

                await hiring_partners_model.updateOne({ _id: id }, { logo: logo_name });

                fs.unlinkSync(path.join("./public/image/hiring_partners_logo/", data.old_logo));

                resolve({ msg: "logo update successfully", status: 1 });
            } catch (error) {
                reject({ msg: "internal error", status: 0 });
            }
        });
    }


    delete(id, logo) {
        return new Promise(async (resolve, reject) => {
            try {
               

               

                fs.unlinkSync(path.join("./public/image/hiring_partners_logo/", logo));
                

                await hiring_partners_model.deleteOne({ _id: id });

                resolve({ msg: "hiring_partner deleted successfully", status: 1 });
            } catch (error) {
                reject({ msg: "internal error", status: 0 });
            }
        });
    }

}



module.exports = hiring_partenrs_controller