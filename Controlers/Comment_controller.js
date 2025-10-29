
const  comment_model= require("../models/Comment_model")



class comment_controller {

    add(data) {


    

        return new Promise(
            async (resolve, reject) => {

                try {


                        const comment = comment_model({

                            review_id:data.review_id,
                            user:data.user,
                          comment:data.comment
                                            
                                        })
                                        await comment.save()
                                        .then(
                                                async(succes) => {
                                               
                                        
                                                    resolve(
                
                                                        { msg: " comment add succesfully ", status: 1 }
                                                    )
                                                
                                            
                                                    
                    
                                               
                
                                             
                                            })
                
                                            .catch((error) => {
                                                
                
                                                reject(
                
                                                    { msg: "  comment add unsuccesfully", status: 0 }
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

                        const comment= await comment_model.findOne({_id:id}).populate("review_id")
resolve(
    { msg: " comment finded ", status: 1 , comment}
)


                    }


                    else{

                     const comment= await comment_model.find().populate("review_id")
                     const total_count= await comment_model.countDocuments()

resolve(

    { msg: " comment finded ", status: 1 , comment,total_count}
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
             
                

                await comment_model.deleteOne({ _id: id });

                resolve({ msg: "comment deleted successfully", status: 1 });
            } catch (error) {
                reject({ msg: "internal error", status: 0 });
            }
        });
    }

}



module.exports = comment_controller



