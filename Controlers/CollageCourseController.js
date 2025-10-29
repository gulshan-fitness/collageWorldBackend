const path = require("path");
const fs = require("fs");
const mongoose = require('mongoose');
const CollageCoursemodel = require("../models/CollageCourseModel");


class CollageCourse_controller {

  add(data) {
    console.log(data);
    
    return new Promise(async (resolve, reject) => {
      try {


        const exist_course = await CollageCoursemodel.findOne({
          Course_id: data.Course_id,
          college_id: data.college_id,
        });

        if (exist_course) {
          reject({
            msg: " this course already exist in this university",
            status: 0,
          });
        } 
        
        else {
          

          const course_data = CollageCoursemodel(data);

          await course_data
            .save()
            .then((succes) => {
              resolve({ msg: " course add succescfully ", status: 1 });
            })

            .catch((error) => {
              reject({ msg: " course add unsuccesfully", status: 0 });
            });
        }
      } catch (error) {
        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  read(id,collage_id,query) {
    return new Promise(async (resolve, reject) => {
      
      
      
      try {

        if(collage_id!=="null") {
          

          const courses= await CollageCoursemodel.find({college_id:collage_id}).populate(["college_id","Course_id"])

  
       resolve({ msg: " course finded ", status: 1, courses });
        } 

        else if(id!=="null") {
          

          const perticuler_course= await CollageCoursemodel.findById(id).populate(["college_id","Course_id"])

      
          resolve({ msg: " course finded ", status: 1,perticuler_course });
        } 


        else {
        
          const courses= await CollageCoursemodel.find().populate(["college_id","Course_id"])
          resolve({ msg: " course finded ", status: 1, courses });
        }
      } catch (error) {
        console.log(error);
        
        reject({ msg: "internal error", status: 0 });
      }
    });
  }

read_top_10_course(cityName) {
  return new Promise(async (resolve, reject) => {
    try {
      const topCourses = await CollageCoursemodel.aggregate([
        // 1️⃣ Join with College details
        {
          $lookup: {
            from: "colleges",
            localField: "college_id",
            foreignField: "_id",
            as: "collegeDetails",
          },
        },
        {
          $unwind: {
            path: "$collegeDetails",
            preserveNullAndEmptyArrays: true,
          },
        },

        // 2️⃣ Filter by city name (only if cityName is provided)
        ...(cityName
          ? [
              {
                $match: {
                  "collegeDetails.city": {
                    $regex: cityName,
                    $options: "i",
                  },
                },
              },
            ]
          : []),

        // 3️⃣ Join with Course details
        {
          $lookup: {
            from: "courses",
            localField: "Course_id",
            foreignField: "_id",
            as: "courseDetails",
          },
        },
        {
          $unwind: {
            path: "$courseDetails",
            preserveNullAndEmptyArrays: true,
          },
        },

        // 4️⃣ Join with Course Ratings
        {
          $lookup: {
            from: "course_ratings",
            localField: "_id", // ✅ CollageCourse._id matches course_ratings.collage_course_id
            foreignField: "collage_course_id",
            as: "ratings",
          },
        },

        // 5️⃣ Compute Average Rating safely
        {
          $addFields: {
            avgRating: {
              $cond: {
                if: { $gt: [{ $size: "$ratings" }, 0] },
                then: { $avg: "$ratings.rating" },
                else: 0,
              },
            },
          },
        },

        // 6️⃣ Sort by Rating Desc
        { $sort: { avgRating: -1 } },

        // 7️⃣ Limit Top 10
        { $limit: 10 },

        // 8️⃣ Final Projection
        {
          $project: {
            _id: 1,
            duration: 1,
            fees: 1,
            mode: 1,
            scholarship: 1,
            time: 1,
            avgRating: { $round: ["$avgRating", 1] },

            collegeDetails: {
              college_name: "$collegeDetails.college_name",
              address: "$collegeDetails.address",
              city: "$collegeDetails.city",
              state: "$collegeDetails.state",
              type: "$collegeDetails.type",
            },

            courseDetails: {
              courseName: "$courseDetails.courseName",
              courseType: "$courseDetails.courseType",
              course_image: "$courseDetails.course_image",
              specialisation: "$courseDetails.specialisation",
            },
          },
        },
      ]);

      resolve({
        msg: "Top 10 courses fetched successfully",
        status: 1,
        topCourses,
      });
    } catch (error) {
      console.error("Error in read_top_10_course:", error);
      reject({ msg: "Internal server error", status: 0 });
    }
  });
}


top10course_by_city(cityName) {
  return new Promise(async (resolve, reject) => {
    try {
      const topCourses = await CollageCoursemodel.aggregate([
        // Join with college
        {
          $lookup: {
            from: "colleges",
            localField: "college_id",
            foreignField: "_id",
            as: "collegeDetails"
          }
        },
        { $unwind: "$collegeDetails" },

        // Match by city name
        {
          $match: {
            "collegeDetails.city": {
              $regex: cityName,
              $options: "i"
            }
          }
        },

        // Join with course details
        {
          $lookup: {
            from: "courses",
            localField: "Course_id",
            foreignField: "_id",
            as: "courseDetails"
          }
        },
        { $unwind: "$courseDetails" },

        // Join with course ratings
        {
          $lookup: {
            from: "course_ratings",
            localField: "_id",
            foreignField: "course_id",
            as: "ratings"
          }
        },

        // Compute average rating safely
        {
          $addFields: {
            avgRating: {
              $cond: {
                if: { $gt: [{ $size: "$ratings" }, 0] },
                then: { $avg: "$ratings.rating" },
                else: 0
              }
            }
          }
        },

        // Sort by rating
        { $sort: { avgRating: -1 } },

        // Limit to top 10
        { $limit: 10 },

        // Final projection
        {
          $project: {
            _id: 1,
            duration: 1,
            fees: 1,
            mode: 1,
            scholarship: 1,
            time: 1,
            avgRating: 1,
            collegeDetails: {
              college_name: "$collegeDetails.college_name",
              address: "$collegeDetails.address",
              city: "$collegeDetails.city",
            },
            courseDetails: {
              courseName: "$courseDetails.courseName",
              courseType: "$courseDetails.courseType",
              course_image: "$courseDetails.course_image",
              specialisation: "$courseDetails.specialisation"
            }
          }
        }
      ]);

      resolve({ msg: "Top 10 courses fetched", status: 1, topCourses });
    } catch (error) {
      console.log(error);
      reject({ msg: "Internal error", status: 0 });
    }
  });
}


 async  top10course_by_state(stateName) {
  try {
    const topCourses= await CollageCoursemodelc.aggregate([
      // Join with College collection
      {
        $lookup: {
          from: "colleges",
          localField: "college_id",
          foreignField: "_id",
          as: "collegeDetails",
        },
      },
      { $unwind: "$collegeDetails" },

      // Filter by given state
      {
        $match: {
          "collegeDetails.state": stateName,
        },
      },

      // Join with Ratings collection
      {
        $lookup: {
          from: "course_ratings",
          localField: "_id",
          foreignField: "collage_course_id",
          as: "ratings",
        },
      },

      // Calculate average rating
      {
        $addFields: {
          avgRating: { $avg: "$ratings.rating" },
        },
      },

      // Join with Course collection to get course details
      {
        $lookup: {
          from: "courses",
          localField: "Course_id",
          foreignField: "_id",
          as: "courseDetails",
        },
      },
      { $unwind: "$courseDetails" },

      // Sort by average rating (descending)
      { $sort: { avgRating: -1 } },

      // Limit to top 10
      { $limit: 10 },

      // Select the fields you want in the result
      {
        $project: {
          _id: 1,
          avgRating: 1,
          "courseDetails.course_name": 1,
          "collegeDetails.college_name": 1,
          "collegeDetails.state": 1,
          fees: 1,
          duration: 1,
          mode: 1,
          scholarship: 1,
          specialisation: 1,
        },
      },
    ]);

    return { msg: "Top 10 courses found", status: 1, topCourses };
  } catch (error) {
    console.error(error);
    return { msg: "Internal error", status: 0 };
  }
}



  edit(id, data) {
    return new Promise(async (resolve, reject) => {
      try {
        await CollageCoursemodel.updateOne(
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

 

  delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await CollageCoursemodel.deleteOne({ _id: id });

     

        resolve({ msg: " course deleted succescfully ", status: 1 });
      } catch (error) {
        reject({ msg: "internal error", status: 0 });
      }
    });
  }
}

module.exports = CollageCourse_controller;
