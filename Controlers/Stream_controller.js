
const path = require("path");
const fs = require("fs");


const stream_model = require("../models/Stream_model");
const { default: mongoose } = require("mongoose");




class stream_controller {
    

 add(data,logo) {


        return new Promise(
            async (resolve, reject) => {

                try {

                    const exits_stream = await stream_model.findOne({ stream_name:data.stream_name,});

                    if (exits_stream) {
                        reject({ msg: " already exist", status: 0 });
                    } 

                    
                    else{
                        const logo_name= new Date().getTime() + Math.floor(Math.random() * 1000) + logo.name;

                    const destination = "./public/image/stream_image/" + logo_name;
                    await logo.mv(
                         destination,
                       )

         const stream = stream_model({

            stream_name:data.stream_name,
            image:logo_name
                           

                        })
            


                        await stream.save()
                        .then(
                    
                            (succes) => {
                
                                    resolve(

                                        { msg: " stream add succescfully ", status: 1 }
                                    )
                                
                            
                                    
    
                               

                             
                            })

                            .catch((error) => {
                               

                                reject(

                                    { msg: " stream add unsuccesfully", status: 0 }
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
                        const objectId =new mongoose.Types.ObjectId(id);
                        
                     
                        const current_stream = await stream_model.aggregate([

                            {
                                $match: {
                                  _id:objectId 
                                }
                              },
                              {
                                $lookup: {
                                  from: 'courses', // Name of the courses collection
                                  localField: '_id', // Stream _id from Stream collection
                                  foreignField: 'stream_id', // stream_id in the Course collection
                                  as: 'courses' // Output array of courses that match
                                }
                              },
                              // Unwind the courses array to work with individual courses
                              { 
                                $unwind: { 
                                  path: '$courses',
                                  preserveNullAndEmptyArrays: true // Preserves streams with no courses
                                } 
                              },
                              // Lookup for College documents based on the `college_id` in each course
                              {
                                $lookup: {
                                  from: 'colleges', // Name of the colleges collection
                                  localField: 'courses.college_id', // college_id from Course
                                  foreignField: '_id', // _id in the College collection
                                  as: 'courses.college' // Output college data inside courses array
                                }
                              },
                              // Unwind the college array to embed the single college object in the course
                              { 
                                $unwind: { 
                                  path: '$courses.college',
                                  preserveNullAndEmptyArrays: true // Preserves courses with no college
                                } 
                              },
                              // Group back the courses into an array after lookup
                              {
                                $group: {
                                  _id: '$_id',
                                  stream_name: { $first: '$stream_name' },
                                  image: { $first: '$image' },
                                  courses: { $push: '$courses' } // Re-group courses into an array
                                }
                              },
                              // Optionally, project the fields you want to include
                              {
                                $project: {
                                  _id: 1,
                                  stream_name: 1,
                                  image: 1,
                                  courses: 1, // Include the populated courses array
                                }
                              }
                          ]);


resolve(
    { msg: " stream finded ", status: 1 , current_stream}
)


                    }


                    else{

                  
                   
                          const stream = await stream_model.aggregate([
                            {
                                $lookup: {
                                  from: 'courses', // Name of the courses collection
                                  localField: '_id', // Stream _id from Stream collection
                                  foreignField: 'stream_id', // stream_id in the Course collection
                                  as: 'courses' // Output array of courses that match
                                }
                              },
                              // Optionally, project the fields you want to include
                              {
                                $project: {
                                  _id: 1,
                                  stream_name: 1,
                                  image: 1,
                                  courses: 1, // Include the courses array
                                }
                              }
                          ]);


                         
                          
resolve(

    { msg: " stream finded ", status: 1 , stream}
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


    state_wise_stream() {


      return new Promise(
          async (resolve, reject) => {

              try {
                const stream_colleges = await stream_model.aggregate([
                  {
                    $lookup: {
                      from: 'courses', // Collection name for courses
                      localField: '_id', // The stream's _id in the Stream collection
                      foreignField: 'stream_id', // Matches stream_id in the Course collection
                      as: 'courses' // Result array from matching courses
                    }
                  },
                  {
                    $unwind: {
                      path: '$courses',
                      preserveNullAndEmptyArrays: true
                    }
                  },
                  {
                    $lookup: {
                      from: 'colleges', // Collection name for colleges
                      localField: 'courses.college_id', // Matches college_id in the Course collection
                      foreignField: '_id', // College's _id in the College collection
                      as: 'colleges' // Result array from matching colleges
                    }
                  },
                  {
                    $group: {
                      _id: '$_id', // Group by stream id
                      stream_name: { $first: '$stream_name' }, // Stream name
                      image: { $first: '$image' }, // Stream image
                      colleges: { $addToSet: { $arrayElemAt: ['$colleges', 0] } } // Adding matching colleges to the result
                    }
                  }
                ]);

                
        resolve(

          { msg:"stream finded", status:1, stream_colleges}

                           )

                  
                  }

              catch (error) {
                 

        reject(
 { msg: "internal error", status: 0 }
                  )
              }


          })


  }

  

    delete(id,old_logo) {


        
        
 
 
         return new Promise(
             async (resolve, reject) => {
 
                 try {
 
           await stream_model.deleteOne({_id:id})
             
 
           fs.unlinkSync(path.join("./public/image/stream_image/", old_logo));
                       
                 
                                     resolve(
 
                                         { msg: " stream deleted succescfully ", status: 1 }
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



module.exports = stream_controller