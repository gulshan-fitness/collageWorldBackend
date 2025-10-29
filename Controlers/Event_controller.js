const path = require("path");

const event_model= require("../models/Event_model")

const fs = require("fs");

class event_controller {

    add(data,logo) {


       
       


        return new Promise(
            async (resolve, reject) => {

                try {

                   

    const logo_name= new Date().getTime() + Math.floor(Math.random() * 1000) + logo.name;

                    const destination = "./public/image/event_image/" + logo_name;
                    await logo.mv(
                         destination,
                       )
                  

         const event = event_model({

    college_id:data.college_id,
    description:data.description,
     date:data.date,
     time:data.time,
     location:data.location,

        heading :data.heading,

        logo:logo_name,
                            
                        })


                        await event.save()
                        .then(
                                async(succes) => {
                               
                        
                                    resolve(

                                        { msg: " event add succesfully ", status: 1 }
                                    )
                                
                            
                                    
    
                               

                             
                            })

                            .catch((error) => {
                                

                                reject(

                                    { msg: "  event add unsuccesfully", status: 0 }
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

    
    read(id,college_id,query) {


        


        return new Promise(
            async (resolve, reject) => {

                try {

                    if(id !=="null"){

         

         const current_event= await event_model.findOne({_id:id}).populate("college_id")

resolve(
    { msg: " post finded ", status: 1 ,current_event}
)

  }

else if (college_id !== "null") {
    console.log("ram");

    const event = await event_model
        .find({ college_id: college_id })
        .populate("college_id");

    resolve({
        msg: "post found",
        status: 1,
        event
    });
}




                    else{
const now = new Date();
                        const filter={}
                        
                        if(query.college_id ){
                            filter.college_id=query.college_id 
                        }                     

if(query.heading){
    filter.heading={ $regex: query.heading, $options:"i"}
}
if (query.posted == "past24Hours") {
    filter.updatedAt = { $gte: new Date(now.getTime() - 24 * 60 * 60*1000) };
}




 if (query.posted === "thisWeek") {
  // Get start of current week (Sunday)
  const startOfWeek = new Date(now);
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(now.getDate() - now.getDay());
  filter.updatedAt = { $gte: startOfWeek };
}



 if (query.posted === "thisMonth") {
  // Get start of current month
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  filter.updatedAt = { $gte: startOfMonth };
}
                     const event= await event_model.find(filter).populate("college_id")

resolve(

    { msg: " post finded ", status: 1 , event}
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

   

   


   


    delete(id, logo) {
        return new Promise(async (resolve, reject) => {
            try {
               

               

                fs.unlinkSync(path.join("./public/image/event_image/",logo));
                

                await event_model.deleteOne({ _id: id });


                resolve({ msg: "event deleted successfully", status: 1 });
            } catch (error) {
                reject({ msg: "internal error", status: 0 });
            }
        });
    }

}



module.exports = event_controller