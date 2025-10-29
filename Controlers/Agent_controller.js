



const { log } = require("console");
const agent_model = require("../models/Agent_model")
const fs = require("fs");
const path = require("path");

 

class agent_controller {

    
    add(data,profile) {


console.log(data,profile)
        
        return new Promise(
            async (resolve, reject) => {

                try {
                    const logo_name =
                    new Date().getTime() +
                    Math.floor(Math.random() * 1000) +
                    profile.name;
                  const destination = "./public/image/agent_profile/"+logo_name;
                  await profile.mv(destination);
                  


                    

         const agent = agent_model({
            ...data,
          Profile:logo_name
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

                                    { msg: error, status: 0 }
                                )
                               

                            })
                    }


                catch (error) {
                   
console.log(error);

                    reject(

                        { msg: "internal error", status: 0 }
                    )
                }


            })


    }

    
 read(id,college_id,query){

    console.log(query,"query",id,college_id)
      
        return new Promise(
            async (resolve, reject) => {

                try {


                    if(id!=="null"){

const agent= await agent_model.findOne({_id:id}).populate("college_id")

resolve(
    { msg: " agent finded ", status: 1 , agent}
)

}


else if(college_id!=="null"){

console.log(college_id);

const agent= await  agent_model.find({college_id:college_id}).populate("college_id")
resolve(
    { msg: " agent finded ", status: 1 , agent}
)
}


                   
else{
                        

                    const filter = {}

                    if(query.college_id){
                        filter.college_id = query.college_id
                    }

                    if(query.name){
                        filter.name = {$regex: query.name,$options: "i"}
                    }

                    console.log(filter,"filter")

                     const agent= await agent_model.find(filter).populate("college_id")

resolve(

    { msg: "agent finded", status: 1 , agent}
)
                    }     
                       
                }


                
                catch (error) {
                    
console.log(error);

                    reject(

                        { msg: "internal error", status: 0 }
                    )
                }


            })


    }

   
  

    delete(id,old_profile) {

         return new Promise(
             async (resolve, reject) => {
 
                 try {
                    
                    fs.unlinkSync(path.join("./public/image/agent_profile/",old_profile));
 
           await agent_model.deleteOne({_id:id})
             

                                     resolve(
 
                                         { msg: " agent deleted succescfully ", status: 1 }
                                     )
                          
                     }
 
 
                 
                 
 
                 catch (error) {
                    console.log(error);
 
                     reject(
 
                         { msg: error, status: 0 }
                     )
                 }
 
 
             })
 
 
     }
 


}



module.exports = agent_controller