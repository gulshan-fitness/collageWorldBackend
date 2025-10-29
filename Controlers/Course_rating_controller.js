
const  course_rating_model= require("../models/Course_Rating_model")



class course_rating_controller {

    add(data) {

console.log(data);


        return new Promise(
            async (resolve, reject) => {

                try {
if(data.user){
    const exist_rating= await course_rating_model.findOne({course_id:data.course_id, user:data.user,})  

    if(exist_rating){
        reject(
    
            { msg: " you have already given rating ", status: 0 }
        )
    }

    else{
        const rating = course_rating_model(data)


                        await rating.save()
                        .then(
                                async(succes) => {
                               
                        
                                    resolve(

                                        { msg: " rating add succesfully ", status: 1 }
                                    )
                                
                            
                                    
    
                               

                             
                            })

                            .catch((error) => {
                                console.log(error);
                                

                                reject(

                                    { msg: "  rating add unsuccesfully", status: 0 }
                                )
                               

                            })

    }
}

else{


    const rating = course_rating_model(data)


                    await rating.save()
                    .then(
                            async(succes) => {
                           
                    
                                resolve(

                                    { msg: " rating add succesfully ", status: 1 }
                                )
                            
                        
                                

                           

                         
                        })

                        .catch((error) => {
                            console.log(error);
                            

                            reject(

                                { msg: "  rating add unsuccesfully", status: 0 }
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

    
    read(id) {
        return new Promise(
            async (resolve, reject) => {

                try {


                    if(id){
                        const rating= await course_rating_model.find({collage_course_id:id}).populate( {path:"collage_course_id",
                            populate:[
                                {path:"college_id",model:"College"},
                                {path:"Course_id",model:"Course"}

                            ]
                        }, )
                        .populate("user")
resolve(
    { msg: " rating finded ", status: 1 , rating}
)


                    }


                    else{

                     const rating= await course_rating_model.find().populate( {path:"collage_course_id",
                            populate:[
                                {path:"college_id",model:"College"},
                                {path:"Course_id",model:"Course"}

                            ]
                        }, )
                        .populate("user")
                     

resolve(

    { msg: " rating finded ", status: 1 , rating}
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


    delete(id) {
        return new Promise(async (resolve, reject) => {
            try {
             
                await course_rating_model.deleteOne({ _id: id });

                resolve({ msg: "rating deleted successfully", status: 1 });
            } catch (error) {
                reject({ msg: "internal error", status: 0 });
            }
        });
    }

}



module.exports = course_rating_controller