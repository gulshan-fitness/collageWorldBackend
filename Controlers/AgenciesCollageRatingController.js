

const AgenciesCollageRatingmodel = require("../models/AgenciesCollageRankingModel");


class AgenciesCollageRatingcontroller {
   async add(data){
    console.log(data);
    

  try {
    const exist_AgenciesCollageRating = await AgenciesCollageRatingmodel.findOne({
      collage_id: data.collage_id,
      agencyName:data.agencyName,
      stream_id:data.stream_id
    });

    if (exist_AgenciesCollageRating) {
      return{
        msg: "rating already given",
        status: 0,
      }
    } else {


    const AgenciesCollageRating = new AgenciesCollageRatingmodel(
data
);
      await AgenciesCollageRating.save()

       
          return{ msg: "AgenciesCollageRating add succescfully ", status: 1 }
      
    }
    
  } catch (error) {
    console.log(error);
    
    return { msg:error.message, status: 0 }

  }
  }

 
  read(agencyname) {

    return new Promise(async (resolve, reject) => {
      
     

      
      try {


        const filter= {}

        if(agencyname) filter.agencyName=agencyname
            
          const AgenciesCollageRating= await AgenciesCollageRatingmodel.find(filter).populate(["stream_id","college_id"])
          .sort({Ranking:1})

          resolve({ msg: " AgenciesCollageRating finded ", status: 1, AgenciesCollageRating });
        
      } catch (error) {

        console.log(error);
        
        reject({ msg: error.message, status: 0 });
      }
    });
  }

  read_top_10_course() {
    return new Promise(async (resolve, reject) => {
      try {

        const topCourses = await AgenciesCollageRatingmodel.aggregate([
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

        const topCourses = await AgenciesCollageRatingmodel.
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

        const topCourses = await AgenciesCollageRatingmodel.
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
        await AgenciesCollageRatingmodel.updateOne(
          { _id: id },
       data
        );

        resolve({ msg: " AgenciesCollageRating update succescfully ", status: 1 });
      } catch (error) {
        console.log(error);

        reject({ msg:error.message , status: 0 });
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

  //         await new AgenciesCollageRatingmodel({ course_image: logo_name }).save()

  //         resolve({ msg: "added successfully", status: 1 });
  //       }
  //       else{

  //         await AgenciesCollageRatingmodel.updateOne({ _id: id }, { course_image: logo_name });

  //         fs.unlinkSync(path.join("./public/image/course_image/", data.old_image));
  
  //         resolve({ msg: "logo update successfully", status: 1 });
          
  //       }

      
  //     } catch (error) {
  //       console.log(error);

  //       reject({ msg:error , status: 0 });
  //     }
  //   });
  // }




//   imageEdit(id,mode, data, image,paths) {

//     console.log(id, data, image,paths);



    

//     return new Promise(async (resolve, reject) => {
      

     

//       try {
        
//         const image_name =
//           new Date().getTime() + Math.floor(Math.random() * 1000) + image.name;
//         const destination = `./public/image/${paths}/${image_name}`;

        
//         await image.mv(destination);

//         await AgenciesCollageRatingmodel.updateOne({ _id: id }, {[paths]: image_name });



//         if(mode !== "newAdd"){

//           fs.unlinkSync(path.join( `./public/image/${paths}/${data.old_image}`));

//           resolve({ msg: "added successfully", status: 1 });


//         }

//     resolve({ msg: "added successfully", status: 1 });

//       } catch (error) {
//         console.log(error);

//         reject({ msg: "internal error", status: 0 });
//       }
//     });
//   }



//   Perticuler_ImageDelete(id,old_image,paths) {
//     return new Promise(async (resolve, reject) => {
//       try {

//         console.log(id,old_image,path);
        
//         await AgenciesCollageRatingmodel.updateOne({ _id: id }, { $unset: { [paths]: "" } });

//         fs.unlinkSync(path.join(`./public/image/${paths}/${old_image}`));

//         resolve({ msg: " Image deleted successfully", status: 1 });

//       } catch (error) {
//         console.log(error);
//         reject({ msg: "internal error", status: 0 });
//       }
//     });
//   }


  // keyhighlight_edit(id, data, image) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const image_name =
  //         new Date().getTime() + Math.floor(Math.random() * 1000) + image.name;
  //       const destination = "./public/image/keyhighlight_image/" + image_name;
  
  //       await image.mv(destination);
  
  //       await AgenciesCollageRatingmodel.updateOne({ _id: id }, { keyhighlight_image: image_name });
  
      
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
  
  //       await AgenciesCollageRatingmodel.updateOne({ _id: id }, { syllabusImage: image_name });
  
        
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
  
  //       await AgenciesCollageRatingmodel.updateOne({ _id: id }, { eligibility_DurationImage: image_name });
  
        
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
  
  //       await AgenciesCollageRatingmodel.updateOne({ _id: id }, { programFeesImage: image_name });
  
        
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
  
  //       await AgenciesCollageRatingmodel.updateOne({ _id: id }, { admissionProcessImage: image_name });
  
        
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
  
  //       await AgenciesCollageRatingmodel.updateOne({ _id: id }, { educationLoanImage: image_name });
  
        
  //         fs.unlinkSync(path.join("./public/image/educationLoanImage/", data.old_image));
        
  
  //       resolve({ msg: "educationLoanImage updated successfully", status: 1 });
  //     } catch (error) {
  //       console.log(error);
  //       reject({ msg: "internal error", status: 0 });
  //     }
  //   });
  // }

  









  delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await AgenciesCollageRatingmodel.deleteOne({ _id: id });

     

        resolve({ msg: " AgenciesCollageRating deleted succescfully ", status: 1 });
      } catch (error) {
        reject({ msg: "internal error", status: 0 });
      }
    });
  }
}

module.exports = AgenciesCollageRatingcontroller;
