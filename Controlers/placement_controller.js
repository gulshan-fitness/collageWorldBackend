const path = require("path");
const  placement_model= require("../models/Placemenet_model")

const fs = require("fs");
const { log } = require("console");

class placement_controller {

    add(data) {


       console.log(data);
       


        return new Promise(
            async (resolve, reject) => {

                try {
                    const exist_placement= await placement_model.findOne({college_id:data.college_id})  

                    if(exist_placement){
                        reject(
                    
                            { msg: "already exist", status: 0 }
                        )
                    }
   
                    else{

                        const placement = placement_model({

                            college_id:data.college_id,
                         
                            placemenet_paragraph:data.placemenet_paragraph
                                            
                
                                        })
                
                                        await placement.save()
                                        .then(
                                                async(succes) => {
                                               
                                        
                                                    resolve(
                
                                                        { msg: " placement add succesfully ", status: 1 }
                                                    )
                                            
                                             
                                            })
                
                                            .catch((error) => {
                                                console.log(error);
                                                
                
                                                reject(
                
                                                    { msg: "  placement add unsuccesfully", status: 0 }
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


                    if(id !=="null"){

                        const placement= await placement_model.findOne({_id:id}).populate("college_id")
resolve(
    { msg: " placement finded ", status: 1 , placement}
)


                    }

                    else if(collage_id !=="null"){

                        const placement = await placement_model.find(
                            {college_id:collage_id}
                        ).populate("college_id")
resolve(
    { msg: " placement finded ",status: 1 , placement}
)


                    }

                    else{

                     const placement= await placement_model.find().populate("college_id")

resolve(
    { msg: " placement finded ", status: 1 , placement}
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


            
                    await placement_model.updateOne(
                        { _id: id },
    
                        {
                            
                            college_id:data.college_id,
             
                placemenet_paragraph:data.placemenet_paragraph
                            
                           
                        }
                    );
    
                    resolve({ msg: "update successfully", status: 1 });
                
                
            } catch (error) {
                reject({ msg: "internal error", status: 0 });
            }
        });
    }


  


    delete(id) {
        return new Promise(async (resolve, reject) => {
            try {
               

               

                
                

                await placement_model.deleteOne({ _id: id });
                

                resolve({ msg: "palcement deleted successfully", status: 1 });
            } catch (error) {
                reject({ msg: "internal error", status: 0 });
            }
        });
    }

}



module.exports = placement_controller