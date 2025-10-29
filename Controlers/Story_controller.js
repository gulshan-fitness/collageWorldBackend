
const  story_model= require("../models/Story_model")



class story_controller {

    add(data) {


       


        return new Promise(
            async (resolve, reject) => {

                try {

   

         const story = story_model({

            college_id:data.college_id,
            title:data.title,
          video_url:data.video_url
                            

                        })


                        await story.save()
                        .then(
                                async(succes) => {
                               
                        
                                    resolve(

                                        { msg: " story add succesfully ", status: 1 }
                                    )
                                
                            
                                    
    
                               

                             
                            })

                            .catch((error) => {
                                

                                reject(

                                    { msg: "  story add unsuccesfully", status: 0 }
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

    
    read(id,college_id) {




        return new Promise(
            async (resolve, reject) => {

                try {


                    if(id !=="null"){

                        const story= await story_model.findById(id).populate("college_id")
                        
resolve(
    { msg: " story finded ", status: 1 , story}
)


                    }


                  else if(college_id !=="null"){

                        const story= await story_model.find({college_id:college_id}).populate("college_id")
                        
resolve(
    { msg: " story finded ", status: 1 , story}
)


                    }


                    else{

    const story= await story_model.find().populate("college_id")

resolve(
    { msg: " story finded ", status: 1 , story}
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
             
                

                await story_model.deleteOne({ _id: id });

                resolve({ msg: "story deleted successfully", status: 1 });
            } catch (error) {
                reject({ msg: "internal error", status: 0 });
            }
        });
    }

}



module.exports = story_controller