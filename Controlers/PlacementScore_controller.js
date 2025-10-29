
const { default: mongoose } = require("mongoose")
const  placementScore_model= require("../models/PlacementScore_model")




class placementScore_controller {

    add(data) {

console.log(data);

       


        return new Promise(
            async (resolve, reject) => {

                try {

                    const ExistYearScore= await  placementScore_model.findOne({ college_id:data.college_id, year:data.year})

                    if(ExistYearScore){
                         reject(

                                    { msg: " This Year score Already Registered ", status: 0 }
                                )
                            
                    }


    else{
         const score=placementScore_model({

        college_id:data.college_id,

        placementScore:data.placementScore,

      year:data.year
                    
                    })


                    await score.save()

                    .then(
                            async(succes) => {
                           
                    
                                resolve(

                                    { msg: " placementscore add succesfully ", status: 1 }
                                )
                            
                        
                                

                           

                         
                        })


                        .catch((error) => {
                            
                            console.log(error);
                            

                            reject(

                                { msg: "placementscore add unsuccesfully", status: 0 }
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

    
    read(id,college_id) {




        return new Promise(
            async (resolve, reject) => {

                try {


                    if(id !=="null"){
                        
                        const placementscore= await placementScore_model.findOne({_id:id}).populate(["college_id"])
                       
resolve(
    { msg: " placementscore finded ", status: 1 , placementscore})


                    }


else if(college_id !== "null"){

 const placementscore= await placementScore_model.find({college_id:college_id}).populate(["college_id"])


                       
resolve(
    { msg:" placementscore finded ", status: 1 ,placementscore}
)


                   }

                    else{

                     const placementscore= await placementScore_model.find().populate("college_id")
                     

resolve(

    { msg: " placementscore finded ", status: 1 , placementscore}
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


    delete(id) {
        return new Promise(async (resolve, reject) => {
            try {
             
                

                await placementScore_model.deleteOne({ _id: id });

                resolve({ msg: "placementscore deleted successfully", status: 1 });

            } catch (error) {
                
                reject({ msg: "internal error", status: 0 });
            }
        });
    }

}



module.exports = placementScore_controller