
const { default: mongoose } = require("mongoose")
const  review_model= require("../models/Review_model")



class review_controller {

    add(data) {


       


        return new Promise(
            async (resolve, reject) => {

                try {


                  if(data.user){
                    const exist_review= await review_model.findOne({college_id:data.college_id, user:data.user,})  

                    if(exist_review){
                        reject(
                    
                            { msg: " you have already given review on this college", status: 0 }
                        )
                    }

   
                    else{

                        const review = review_model({

                            college_id:data.college_id,
                            user:data.user,
                          review:data.review
                                            
                                        })
                                        await review.save()
                                        .then(
                                                async(succes) => {
                                               
                                        
                                                    resolve(
                
                                                        { msg: " review add succesfully ", status: 1 }
                                                    )
                                                
                                            
                                                    
                    
                                               
                
                                             
                                            })
                
                                            .catch((error) => {
                                                
                
                                                reject(
                
                                                    { msg: "  review add unsuccesfully", status: 0 }
                                                )
                                               
                
                                            })

                    }
                  }
else{

  const review = review_model({

    college_id:data.college_id,
  
  review:data.review
                    
                })
                await review.save()
                .then(
                        async(succes) => {
                       
                
                            resolve(

                                { msg: " review add succesfully ", status: 1 }
                            )
                        
                    
                            

                       

                     
                    })

                    .catch((error) => {
                        

                        reject(

                            { msg: "  review add unsuccesfully", status: 0 }
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



                        const review= await review_model.findOne({_id:id}).populate(["college_id","user"])

                       

                        
                        const perticulerCollegesreview = await review_model.aggregate([
                          {
                            // Match reviews for a specific college
                            $match: { college_id: new mongoose.Types.ObjectId(id) }
                          },
                          {
                            // Lookup to get the college details
                            $lookup: {
                              from: 'colleges', // Collection name should be in lowercase plural (default Mongoose collection name)
                              localField: 'college_id',
                              foreignField: '_id',
                              as: 'collegeDetails'
                            }
                          },
                          {
                            // Unwind the collegeDetails array
                            $unwind: '$collegeDetails'
                          },
                          {
                            // Lookup to get the user details for the review
                            $lookup: {
                              from: 'users',
                              localField: 'user',
                              foreignField: '_id',
                              as: 'reviewUserDetails'
                            }
                          },
                          {
                            // Unwind the reviewUserDetails array, preserve null if not found
                            $unwind: {
                              path: '$reviewUserDetails',
                              preserveNullAndEmptyArrays: true
                            }
                          },
                          {
                            // Lookup to get the comments related to the review
                            $lookup: {
                              from: 'comments',
                              localField: '_id',
                              foreignField: 'review_id',
                              as: 'comments'
                            }
                          },
                          {
                            // Unwind the comments array to get individual comment details
                            $unwind: {
                              path: '$comments',
                              preserveNullAndEmptyArrays: true // Keep reviews even if there are no comments
                            }
                          },
                          {
                            // Lookup to get the user details for each comment
                            $lookup: {
                              from: 'users',
                              localField: 'comments.user',
                              foreignField: '_id',
                              as: 'comments.userDetails'
                            }
                          },
                          {
                            // Unwind the userDetails array within comments, preserve null if not found
                            $unwind: {
                              path: '$comments.userDetails',
                              preserveNullAndEmptyArrays: true
                            }
                          },
                          {
                            // Group back the comments with the review, including user details
                            $group: {
                              _id: '$_id',
                              college_id: { $first: '$college_id' },
                              collegeDetails: { $first: '$collegeDetails' }, // Include college details
                              review: { $first: '$review' },
                              createdAt: { $first: '$createdAt' },
                              reviewUserDetails: { $first: { $ifNull: ['$reviewUserDetails', {}] } }, // Use an empty object if user details are not found
                              comments: {
                                $push: {
                                  _id: '$comments._id',
                                  comment: '$comments.comment',
                                  createdAt: '$comments.createdAt',
                                  userDetails: { $ifNull: ['$comments.userDetails', {}] } // Use an empty object if user details are not found
                                }
                              }
                            }
                          },
                          {
                            // Project to organize the data structure
                            $project: {
                              _id: 1,
                              college_id: 1,
                              collegeDetails: 1,
                              review: 1,
                              createdAt: 1,
                              reviewUserDetails: 1,
                              comments: 1
                            },

                            
                          },
                          {
                            $sort: { updatedAt: 1 }
                          }
                        ]);
                        
                        
               

resolve(
    { msg: " review finded ", status: 1 , review,perticulerCollegesreview}
)



                    }


                    else{

                     const review= await review_model.find().populate(["college_id","user"])
                     const total_count= await review_model.countDocuments()

resolve(

    { msg: " review finded ", status: 1 , review:{review,total_count}}
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
             
                await review_model.deleteOne({ _id: id });

                resolve({ msg: "review deleted successfully", status: 1 });

            } 
            catch (error) {

                reject({ msg: "internal error", status: 0 });
                
            }
        });
    }

}



module.exports = review_controller