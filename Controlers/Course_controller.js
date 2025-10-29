const path = require("path");
const fs = require("fs");
const mongoose = require('mongoose');
const course_model = require("../models/Course_model");

class course_controller {


   async add(data, logo,ProgramOverview_image,keyhighlight_image,syllabusImage,eligibility_DurationImage,programFeesImage,admissionProcessImage,educationLoanImage){
  try {
    const exist_course = await course_model.findOne({
      courseName: data.courseName,
    });

    if (exist_course) {
      return{
        msg: " this course already exist in this university",
        status: 0,
      }
    } else {

      const logo_name =
        new Date().getTime() + Math.floor(Math.random() * 1000) + logo.name;

      const destination = "./public/image/course_image/" + logo_name;
      await logo.mv(destination);

  // Initialize all image names
  let ProgramOverview_image_name,
    keyhighlight_image_name,
    syllabus_image_name,
    eligibility_duration_image_name,
    program_fees_image_name,
    admission_process_image_name,
    education_loan_image_name;

 

  // Program Overview Image
  if (ProgramOverview_image) {
    ProgramOverview_image_name =
      Date.now() + Math.floor(Math.random() * 1000) + ProgramOverview_image.name;
    await ProgramOverview_image.mv(
      "./public/image/ProgramOverview_image/" + ProgramOverview_image_name
    );
  }

  // Key Highlight Image
  if (keyhighlight_image) {
    keyhighlight_image_name =
      Date.now() + Math.floor(Math.random() * 1000) + keyhighlight_image.name;
    await keyhighlight_image.mv(
      "./public/image/keyhighlight_image/" + keyhighlight_image_name
    );
  }

  // Syllabus Image
  if (syllabusImage) {
    syllabus_image_name =
      Date.now() + Math.floor(Math.random() * 1000) + syllabusImage.name;
    await syllabusImage.mv(
      "./public/image/syllabusImage/" + syllabus_image_name
    );
  }

  // Eligibility & Duration Image
  if (eligibility_DurationImage) {
    eligibility_duration_image_name =
      Date.now() + Math.floor(Math.random() * 1000) + eligibility_DurationImage.name;
    await eligibility_DurationImage.mv(
      "./public/image/eligibility_DurationImage/" + eligibility_duration_image_name
    );
  }

  // Program Fees Image
  if (programFeesImage) {
    program_fees_image_name =
      Date.now() + Math.floor(Math.random() * 1000) + programFeesImage.name;
    await programFeesImage.mv(
      "./public/image/programFeesImage/" + program_fees_image_name
    );
  }

  // Admission Process Image
  if (admissionProcessImage) {
    admission_process_image_name =
      Date.now() + Math.floor(Math.random() * 1000) + admissionProcessImage.name;
    await admissionProcessImage.mv(
      "./public/image/admissionProcessImage/" + admission_process_image_name
    );
  }

  // Education Loan Image
  if (educationLoanImage) {
    education_loan_image_name =
      Date.now() + Math.floor(Math.random() * 1000) + educationLoanImage.name;
    await educationLoanImage.mv(
      "./public/image/educationLoanImage/" + education_loan_image_name
    );
  }

    const course_data = new course_model({
...data,
course_image: logo_name,
ProgramOverview_image: ProgramOverview_image_name,
keyhighlight_image: keyhighlight_image_name,
syllabusImage: syllabus_image_name,
eligibility_DurationImage: eligibility_duration_image_name,
programFeesImage: program_fees_image_name,
admissionProcessImage: admission_process_image_name,
educationLoanImage: education_loan_image_name,
});
      await course_data.save()

       
          return{ msg: " course add succescfully ", status: 1 }
      
    }
    
  } catch (error) {
    console.log(error);
    
    return { msg:error.message, status: 0 }

  }
  }

 
  read(id,query) {
    return new Promise(async (resolve, reject) => {
      
      console.log(query);
      
      try {

        if(id) {
          

          const perticuler_course= await course_model.findOne({_id:id}).populate(["stream_id"])

          // const objectId =new mongoose.Types.ObjectId(id);
          
           
          // const course = await course_model.aggregate([


          //   {
          //     $match: {
          //       college_id:objectId 
          //     }
          //   },

          //   {
          //     $lookup: {
          //       from: 'course_ratings', // This should be the pluralized form of the model name in lowercase
          //       localField: '_id',
          //       foreignField: 'course_id',
          //       as: 'ratings'
          //     }
          //   },

          //   {
          //     $unwind: {
          //       path: '$ratings',
          //       preserveNullAndEmptyArrays: true // Set to true if you want courses with no ratings to still show up
          //     }
          //   },
          //   {
          //     $group: {
          //       _id: '$_id',
          //       college_id: { $first: '$college_id' },
          //       stream_id: { $first: '$stream_id' },
          //       courseName: { $first: '$courseName' },
          //       duration: { $first: '$duration' },
          //       approved: { $first: '$approved' },
          //       specialisation: { $first: '$specialisation' },
          //       time: { $first: '$time' },
          //       scholarship: { $first: '$scholarship' },
          //       fees: { $first: '$fees' },
          //       mode: { $first: '$mode' },
          //       course_image: { $first: '$course_image' },
          //       createdAt: { $first: '$createdAt' }, // Add createdAt
          //       updatedAt: { $first: '$updatedAt' }, // Add updatedAt
          //       ratings: { $push: '$ratings' }, // Collect ratings into an array
          //       averageRating: { $avg: '$ratings.rating' } // Optional: Calculate average rating
          //     }
          //   },
          //   {
          //     $project: {
          //       college_id: 1,
          //       stream_id: 1,
          //       courseName: 1,
          //       duration: 1,
          //       approved: 1,
          //       specialisation: 1,
          //       time: 1,
          //       scholarship: 1,
          //       fees: 1,
          //       mode: 1,
          //       course_image: 1,
          //       createdAt: 1, // Include createdAt in the projection
          //       updatedAt: 1, // Include updatedAt in the projection
          //       ratings: 1,
          //       averageRating: 1
          //     }
          //   }
          // ]);



          
          resolve({ msg: " course finded ", status: 1,perticuler_course });
        } 


        else {

          const filter={}

          if(query?.courseType){
            filter.courseType=query?.courseType
          }

           if(query?.stream){
            filter.stream_id=query?.stream
          }
        


          const course= await course_model.find(filter).populate(["stream_id"])



          // const course = await course_model.aggregate([
          //  { 
            
          //   $match:{

          //     courseType:query?.courseType

          //   }},
          
        
          //   // Lookup to join with the College collection
          //   {
          //     $lookup: {
          //       from: 'colleges', // The name of the college collection
          //       localField: 'college_id',
          //       foreignField: '_id',
          //       as: 'collegeDetails',
          //     },
          //   },
        
          //   // Unwind the joined college array
          //   {
          //     $unwind: '$collegeDetails',
          //   },

           
        
          //   // Lookup to join with the course_Rating collection
          //   {
          //     $lookup: {
          //       from: 'course_ratings', // The name of the course rating collection
          //       localField: '_id',
          //       foreignField: 'course_id',
          //       as: 'courseRatings',
          //     },
          //   },
        
          //   // Add a field to calculate the average course rating
          //   {
          //     $addFields: {
          //       averageCourseRating: {
          //         $avg: '$courseRatings.rating',
          //       },
          //     },
          //   },
        
          //   // Lookup to join with the Rating collection for college ratings
          //   {
          //     $lookup: {
          //       from: 'ratings', // The name of the college rating collection
          //       localField: 'college_id',
          //       foreignField: 'college_id',
          //       as: 'collegeRatings',
          //     },
          //   },
        
          //   // Add a field to calculate the average college rating
          //   {
          //     $addFields: {
          //       averageCollegeRating: {
          //         $avg: '$collegeRatings.rating',
          //       },
          //     },
          //   },

          //   {
          //     $lookup: {
          //       from: 'streams', // The name of the stream collection
          //       localField: 'stream_id',
          //       foreignField: '_id',
          //       as: 'streamDetails',
          //     },
          //   },
        
          //   // Unwind the joined stream array
          //   {
          //     $unwind: '$streamDetails',
          //   },
        


          //   // Project the fields you want in the final output
          //   {
          //     $project: {
          //       courseName: 1,
          //       duration: 1,
          //       approved: 1,
          //       specialisation: 1,
          //       time: 1,
          //       scholarship: 1,
          //       fees: 1,
          //       mode: 1,
          //       course_image: 1,
          //       'collegeDetails._id': 1,
          //       'collegeDetails.college_name': 1,
          //       'collegeDetails.logo': 1,
          //       'collegeDetails.state': 1,
          //       'collegeDetails.city': 1,
          //       'collegeDetails.type': 1,
          //       averageCourseRating: 1,
          //       averageCollegeRating: 1,
          //       'streamDetails.stream_name': 1, // Include the stream name (adjust based on your stream schema)
          //       'streamDetails.image': 1,
          //     },
          //   },
          // ]);

          


          resolve({ msg: " course finded ", status: 1, course });
        }
      } catch (error) {
        console.log(error);
        
        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  read_top_10_course() {
    return new Promise(async (resolve, reject) => {
      try {

        const topCourses = await course_model.aggregate([
          // Lookup course ratings
          {
            $lookup: {
              from: 'course_ratings',
              localField: '_id',
              foreignField: 'course_id',
              as: 'ratings',
            },
          },
          // Unwind the ratings array
          {
            $unwind: {
              path: '$ratings',
              preserveNullAndEmptyArrays: true,
            },
          },
          // Lookup college details
          {
            $lookup: {
              from: 'colleges',
              localField: 'college_id',
              foreignField: '_id',
              as: 'college',
            },
          },
          // Unwind the college array
          {
            $unwind: {
              path: '$college',
              preserveNullAndEmptyArrays: true,
            },
          },
          // Group by course and calculate the average rating
          {
            $group: {
              _id: '$_id',
              courseName: { $first: '$courseName' },
              college_id: { $first: '$college_id' },
              collegeName: { $first: '$college.college_name' }, // Added collegeName
              stream_id: { $first: '$stream_id' },
              averageRating: { $avg: '$ratings.rating' },
              duration: { $first: '$duration' },
              specialisation: { $first: '$specialisation' },
              time: { $first: '$time' },
              scholarship: { $first: '$scholarship' },
              fees: { $first: '$fees' },
              mode: { $first: '$mode' },
              course_image: { $first: '$course_image' },
            },
          },
          // Sort by average rating in descending order
          {
            $sort: { averageRating: -1 },
          },
          // Limit to top 10 courses
          {
            $limit: 10,
          },
        ]);
        

          


          resolve({ msg: " read_top_10_course finded ", status: 1, topCourses });
        
      } catch (error) {
        console.log(error);
        
        reject({ msg: "internal error", status: 0 });
      }
    });
  }


  top10course_by_city(cityName) {

    return new Promise(async (resolve, reject) => {
      try {

        const topCourses = await course_model.
        aggregate([
          {
            $lookup: {
              from: "colleges",  // The collection name in lowercase
              localField: "college_id",
              foreignField: "_id",
              as: "collegeDetails"
            }
          },
          {
            $unwind: "$collegeDetails"  // Unwind the college details array
          },
          {
            $match: {
              "collegeDetails.city": { 
                $regex: cityName, 
                $options: 'i'  // Case-insensitive matching
              }
            }
          },
          {
            $lookup: {
              from: "course_ratings",  // The collection for course ratings
              localField: "_id",
              foreignField: "course_id",
              as: "ratings"
            }
          },
          {
            $unwind: {
              path: "$ratings",
              preserveNullAndEmptyArrays: true // Keep courses even if they have no ratings
            }
          },
          {
            $group: {
              _id: "$_id",
              courseName: { $first: "$courseName" },
              duration: { $first: "$duration" },
              fees: { $first: "$fees" },
              mode: { $first: "$mode" },
              scholarship: { $first: "$scholarship" },
              course_image: { $first: "$course_image" },
              collegeDetails: { $first: "$collegeDetails" },
              avgRating: { $avg: "$ratings.rating" } // Calculate the average rating
            }
          },
          {
            $sort: {
              avgRating: -1  // Sort by average rating in descending order
            }
          },
          {
            $limit: 10  // Limit to top 10 courses
          },
          {
            $project: { // Select the fields to return
              _id: 1,
              courseName: 1,
              duration: 1,
              fees: 1,
              mode: 1,
              scholarship: 1,
              course_image: 1,
              avgRating: { $ifNull: ["$avgRating", 0] }, // Return 0 if no ratings
              collegeDetails: {
                college_name: "$collegeDetails.college_name",
                address: "$collegeDetails.address",
                city: "$collegeDetails.city"
              }
            }
          }
        ]);
        

          


          resolve({ msg: " read_top_10_course finded ", status: 1, topCourses });
        
      } catch (error) {
        console.log(error);
        
        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  top10course_by_state(stateName) {

    return new Promise(async (resolve, reject) => {
      try {

        const topCourses = await course_model.
        aggregate([
          {
            $lookup: {
              from: "colleges",  // The collection name in lowercase
              localField: "college_id",
              foreignField: "_id",
              as: "collegeDetails"
            }
          },
          {
            $unwind: "$collegeDetails"  // Unwind the college details array
          },
          {
            $match: {
              "collegeDetails.state": { 
                $regex: stateName, 
                $options: 'i'  // Case-insensitive matching
              }
            }
          },
          {
            $lookup: {
              from: "course_ratings",  // The collection for course ratings
              localField: "_id",
              foreignField: "course_id",
              as: "ratings"
            }
          },
          {
            $unwind: {
              path: "$ratings",
              preserveNullAndEmptyArrays: true // Keep courses even if they have no ratings
            }
          },
          {
            $group: {
              _id: "$_id",
              courseName: { $first: "$courseName" },
              duration: { $first: "$duration" },
              fees: { $first: "$fees" },
              mode: { $first: "$mode" },
              scholarship: { $first: "$scholarship" },
              course_image: { $first: "$course_image" },
              collegeDetails: { $first: "$collegeDetails" },
              avgRating: { $avg: "$ratings.rating" } // Calculate the average rating
            }
          },
          {
            $sort: {
              avgRating: -1  // Sort by average rating in descending order
            }
          },
          {
            $limit: 10  // Limit to top 10 courses
          },
          {
            $project: { // Select the fields to return
              _id: 1,
              courseName: 1,
              duration: 1,
              fees: 1,
              mode: 1,
              scholarship: 1,
              course_image: 1,
              avgRating: { $ifNull: ["$avgRating", 0] }, // Return 0 if no ratings
              collegeDetails: {
                college_name: "$collegeDetails.college_name",
                address: "$collegeDetails.address",
                city: "$collegeDetails.city"
              }
            }
          }
        ]);
        

          


          resolve({ msg: " read_top_10_course finded ", status: 1, topCourses });
        
      } catch (error) {
        console.log(error);
        
        reject({ msg: "internal error", status: 0 });
      }
    });
  }


  edit(id, data) {

    console.log(data);
    
    return new Promise(async (resolve, reject) => {
      try {
        await course_model.updateOne(
          { _id: id },
       data
        );

        resolve({ msg: " course update succescfully ", status: 1 });
      } catch (error) {
        console.log(error);

        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  // logo_update(id, mode,data, logo) {
  //   console.log(id,mode, data, logo);

  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const logo_name =
  //         new Date().getTime() + Math.floor(Math.random() * 1000) + logo.name;
  //       const destination = "./public/image/course_image/" + logo_name;
  //       await logo.mv(destination);

  //       if(mode === "new"){

  //         await new course_model({ course_image: logo_name }).save()

  //         resolve({ msg: "added successfully", status: 1 });
  //       }
  //       else{

  //         await course_model.updateOne({ _id: id }, { course_image: logo_name });

  //         fs.unlinkSync(path.join("./public/image/course_image/", data.old_image));
  
  //         resolve({ msg: "logo update successfully", status: 1 });
          
  //       }

      
  //     } catch (error) {
  //       console.log(error);

  //       reject({ msg:error , status: 0 });
  //     }
  //   });
  // }




  imageEdit(id,mode, data, image,paths) {

    console.log(id, data, image,paths);



    

    return new Promise(async (resolve, reject) => {
      

     

      try {
        
        const image_name =
          new Date().getTime() + Math.floor(Math.random() * 1000) + image.name;
        const destination = `./public/image/${paths}/${image_name}`;

        
        await image.mv(destination);

        await course_model.updateOne({ _id: id }, {[paths]: image_name });



        if(mode !== "newAdd"){

          fs.unlinkSync(path.join( `./public/image/${paths}/${data.old_image}`));

          resolve({ msg: "added successfully", status: 1 });


        }

    resolve({ msg: "added successfully", status: 1 });

      } catch (error) {
        console.log(error);

        reject({ msg: "internal error", status: 0 });
      }
    });
  }



  Perticuler_ImageDelete(id,old_image,paths) {
    return new Promise(async (resolve, reject) => {
      try {

        console.log(id,old_image,path);
        
        await course_model.updateOne({ _id: id }, { $unset: { [paths]: "" } });

        fs.unlinkSync(path.join(`./public/image/${paths}/${old_image}`));

        resolve({ msg: " Image deleted successfully", status: 1 });

      } catch (error) {
        console.log(error);
        reject({ msg: "internal error", status: 0 });
      }
    });
  }


  // keyhighlight_edit(id, data, image) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const image_name =
  //         new Date().getTime() + Math.floor(Math.random() * 1000) + image.name;
  //       const destination = "./public/image/keyhighlight_image/" + image_name;
  
  //       await image.mv(destination);
  
  //       await course_model.updateOne({ _id: id }, { keyhighlight_image: image_name });
  
      
  //         fs.unlinkSync(path.join("./public/image/keyhighlight_image/", data.old_image));
        
  
  //       resolve({ msg: "keyhighlight_image updated successfully", status: 1 });
  //     } catch (error) {
  //       console.log(error);
  //       reject({ msg: "internal error", status: 0 });
  //     }
  //   });
  // }

  
  // syllabusImage_edit(id, data, image) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const image_name =
  //         new Date().getTime() + Math.floor(Math.random() * 1000) + image.name;
  //       const destination = "./public/image/syllabusImage/" + image_name;
  
  //       await image.mv(destination);
  
  //       await course_model.updateOne({ _id: id }, { syllabusImage: image_name });
  
        
  //         fs.unlinkSync(path.join("./public/image/syllabusImage/", data.old_image));
        
  
  //       resolve({ msg: "syllabusImage updated successfully", status: 1 });
  //     } catch (error) {
  //       console.log(error);
  //       reject({ msg: "internal error", status: 0 });
  //     }
  //   });
  // }

  


  // eligibility_DurationImage_edit(id, data, image) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const image_name =
  //         new Date().getTime() + Math.floor(Math.random() * 1000) + image.name;
  //       const destination = "./public/image/eligibility_DurationImage/" + image_name;
  
  //       await image.mv(destination);
  
  //       await course_model.updateOne({ _id: id }, { eligibility_DurationImage: image_name });
  
        
  //         fs.unlinkSync(path.join("./public/image/eligibility_DurationImage/", data.old_image));
        
  
  //       resolve({ msg: "eligibility_DurationImage updated successfully", status: 1 });
  //     } catch (error) {
  //       console.log(error);
  //       reject({ msg: "internal error", status: 0 });
  //     }
  //   });
  // }

  



  // programFeesImage_edit(id, data, image) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const image_name =
  //         new Date().getTime() + Math.floor(Math.random() * 1000) + image.name;
  //       const destination = "./public/image/programFeesImage/" + image_name;
  
  //       await image.mv(destination);
  
  //       await course_model.updateOne({ _id: id }, { programFeesImage: image_name });
  
        
  //         fs.unlinkSync(path.join("./public/image/programFeesImage/", data.old_image));
        
  
  //       resolve({ msg: "programFeesImage updated successfully", status: 1 });
  //     } catch (error) {
  //       console.log(error);
  //       reject({ msg: "internal error", status: 0 });
  //     }
  //   });
  // }

  


  // admissionProcessImage_edit(id, data, image) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const image_name =
  //         new Date().getTime() + Math.floor(Math.random() * 1000) + image.name;
  //       const destination = "./public/image/admissionProcessImage/" + image_name;
  
  //       await image.mv(destination);
  
  //       await course_model.updateOne({ _id: id }, { admissionProcessImage: image_name });
  
        
  //         fs.unlinkSync(path.join("./public/image/admissionProcessImage/", data.old_image));
        
  
  //       resolve({ msg: "admissionProcessImage updated successfully", status: 1 });
  //     } catch (error) {
  //       console.log(error);
  //       reject({ msg: "internal error", status: 0 });
  //     }
  //   });
  // }

  



  // educationLoanImage_edit(id, data, image) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const image_name =
  //         new Date().getTime() + Math.floor(Math.random() * 1000) + image.name;
  //       const destination = "./public/image/educationLoanImage/" + image_name;
  
  //       await image.mv(destination);
  
  //       await course_model.updateOne({ _id: id }, { educationLoanImage: image_name });
  
        
  //         fs.unlinkSync(path.join("./public/image/educationLoanImage/", data.old_image));
        
  
  //       resolve({ msg: "educationLoanImage updated successfully", status: 1 });
  //     } catch (error) {
  //       console.log(error);
  //       reject({ msg: "internal error", status: 0 });
  //     }
  //   });
  // }

  









  delete(id, course_image,programOverview_image,keyhighlight_image,syllabusImage,eligibility_DurationImage,programFeesImage,admissionProcessImage,educationLoanImage) {
    return new Promise(async (resolve, reject) => {
      try {
        await course_model.deleteOne({ _id: id });

        fs.unlinkSync(path.join("./public/image/course_image/", course_image));
        fs.unlinkSync(path.join("./public/image/ProgramOverview_image/", programOverview_image));
        fs.unlinkSync(path.join("./public/image/keyhighlight_image/", keyhighlight_image));
        fs.unlinkSync(path.join("./public/image/syllabusImage/", syllabusImage));
        fs.unlinkSync(path.join("./public/image/eligibility_DurationImage/", eligibility_DurationImage));
        fs.unlinkSync(path.join("./public/image/programFeesImage/", programFeesImage));
        fs.unlinkSync(path.join("./public/image/admissionProcessImage/", admissionProcessImage));
        fs.unlinkSync(path.join("./public/image/educationLoanImage/", educationLoanImage));

        resolve({ msg: " course deleted succescfully ", status: 1 });
      } catch (error) {
        reject({ msg: "internal error", status: 0 });
      }
    });
  }
}

module.exports = course_controller;
