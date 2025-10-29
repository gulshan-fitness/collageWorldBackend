const doubts_model = require("../models/Doubts_model");








class doubts_controller {

    
    add(data) {


      console.log(data);
      


        return new Promise(
            async (resolve, reject) => {

                try {

         const doubts = doubts_model({

            college_id: data.college_id,
            doubt:data.doubt,

                    answer:data.answer       

                        })
            


                        await doubts.save()
                        .then(
                    
                            (succes) => {
                
                                    resolve(

                                        { msg: " doubts add succescfully ", status: 1 }
                                    )
                                
                            
                                    
    
                               

                             
                            })

                            .catch((error) => {
                               
                                console.log(error);
                                reject(

                                    { msg: " doubts add unsuccesfully", status: 0 }
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


                    if(id !=="null"){

                        // const doubts= await doubts_model.find({college_id:id}).populate("college_id")

                        const current_doubts= await doubts_model.findOne({_id:id}).populate("college_id")
resolve(
    { msg: " doubts finded ", status: 1 ,current_doubts}
)


                    }

                   else if (collage_id !=="null") {
                        

                     const doubts= await doubts_model.find({college_id:collage_id}).populate("college_id")

resolve(
    { msg: " doubts finded ", status: 1 , doubts}
)

                    }


                    else{

                     const doubts= await doubts_model.find().populate("college_id")

resolve(

    { msg: " doubts finded ", status: 1 , doubts}
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

   
    edit(id,data) {
    


        return new Promise(
            async (resolve, reject) => {

                try {

          await doubts_model.updateOne({_id:id},{

            college_id: data.college_id,
            doubt:data.doubt,

                    answer:data.answer

                        })
            


                      
                
                                    resolve(

                                        { msg: " doubt update succescfully ", status: 1 }
                                    )
                                
                            
                                    
    
                               
                          
                         
                    }


                
                

                catch (error) {
                   

                    reject(

                        { msg: "internal error", status: 0 }
                    )
                }


            })


    }


    delete(id) {


        
        
 
 
         return new Promise(
             async (resolve, reject) => {
 
                 try {
 
           await doubts_model.deleteOne({_id:id})
             
 
 
                       
                 
                                     resolve(
 
                                         { msg: " doubt deleted succescfully ", status: 1 }
                                     )
                                 
                             
                                     
                                
                           
                          
                     }
 
 
                 
                 
 
                 catch (error) {
                    
 
                     reject(
 
                         { msg: "internal error", status: 0 }
                     )
                 }
 
 
             })
 
 
     }
 


}



module.exports = doubts_controller
