



const agent_model = require("../models/Agent_model")

 

class agent_controller {

    
    add(data) {


        return new Promise(
            async (resolve, reject) => {

                try {

         const agent = agent_model({
            college_id: data.college_id,
           name:data.name,
          phone:data.phone
            
                           

                        })
            


                        await agent.save()
                        .then(
                    
                            (succes) => {
                
                                    resolve(

                                        { msg: " agent add succescfully ", status: 1 }
                                    )
                                
                            
                                    
    
                               

                             
                            })

                            .catch((error) => {
                               console.log(error)

                                reject(

                                    { msg: " agent add unsuccesfully", status: 0 }
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

    
 read(id) {




        return new Promise(
            async (resolve, reject) => {

                try {


                    if(id){

                        const agent= await agent_model.findOne({_id:id}).populate("college_id")
resolve(
    { msg: " agent finded ", status: 1 , agent}
)


                    }


                    else{

                     const agent= await agent_model.find().populate("college_id")

resolve(

    { msg: " agent finded ", status: 1 , agent}
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


        
        
 
 
         return new Promise(
             async (resolve, reject) => {
 
                 try {
 
           await agent_model.deleteOne({_id:id})
             
 
 
                       
                 
                                     resolve(
 
                                         { msg: " agent deleted succescfully ", status: 1 }
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



module.exports = agent_controller