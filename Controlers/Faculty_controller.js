



const faculty_model = require("../models/Faculty_model")

 

class faculty_controller {

    
    add(data) {


        return new Promise(
            async (resolve, reject) => {

                try {

         const faculty = faculty_model({
            college_id: data.college_id,
           name:data.name,
           department:data.department,
          designation: data.designation,
          qualification: data.qualification,
            
                           

                        })
            


                        await faculty.save()
                        .then(
                    
                            (succes) => {
                
                                    resolve(

                                        { msg: " faculty add succescfully ", status: 1 }
                                    )
                                
                            
                                    
    
                               

                             
                            })

                            .catch((error) => {
                               console.log(error)

                                reject(

                                    { msg: " faculty add unsuccesfully", status: 0 }
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


                    if(id!=="null"){

                        const faculty= await faculty_model.findOne({_id:id}).populate("college_id")
resolve(
    { msg: " faculty finded ", status: 1 , faculty}
)


                    }

                   else  if(college_id!=="null"){

                        const faculty= await faculty_model.find({college_id:college_id}).populate("college_id")
resolve(
    { msg: " faculty finded ", status: 1 , faculty}
)


                    }


                    else{

                     const faculty= await faculty_model.find().populate("college_id")

resolve(

    { msg: " faculty finded ", status: 1 , faculty}
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
 
           await faculty_model.deleteOne({_id:id})
             
 
 
                       
                 
                                     resolve(
 
                                         { msg: " faculty deleted succescfully ", status: 1 }
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



module.exports = faculty_controller