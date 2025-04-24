const path = require("path");
const college_model = require("../models/College_model");
const fs = require("fs");
const { default: mongoose } = require("mongoose");

class college_controller {
  submission(data, logo, campus, pdf, office_photo) {
    console.log(data, logo, campus, pdf, office_photo);

    return new Promise(async (resolve, reject) => {
      try {
        const campus_images = [];

        const main_images = [];

        const exits_college = await college_model.findOne({
          college_name: data.college_name,
        });

        if (exits_college) {

          
          reject({ msg: "This college already Registered", status: 0 });
        } else {
          if (logo) {
            const logoArray = Array.isArray(logo) ? logo : [logo];
            await Promise.all(
              logoArray.map(async (data) => {
                const logo_name =
                  new Date().getTime() +
                  Math.floor(Math.random() * 1000) +
                  data.name;
                const destination = "./public/image/college_logo/" + logo_name;
                await data.mv(destination);
                main_images.push(logo_name);
              })
            );
          }

          const pdf_name =
            new Date().getTime() + Math.floor(Math.random() * 1000) + pdf.name;
          const pdf_destination = "./public/college_pdf/" + pdf_name;
          await pdf.mv(pdf_destination);

          const office_photo_name =
            new Date().getTime() +
            Math.floor(Math.random() * 1000) +
            office_photo.name;

          const office_photo_destination =
            "./public/image/office_photo/" + office_photo_name;
          await office_photo.mv(office_photo_destination);

          if (campus) {
            const campusArray = Array.isArray(campus) ? campus : [campus];
            await Promise.all(
              campusArray.map(async (data) => {
                const campus_image_name =
                  new Date().getTime() +
                  Math.floor(Math.random() * 1000) +
                  data.name;
                const destination =
                  "./public/image/campus_images/" + campus_image_name;
                await data.mv(destination);
                campus_images.push(campus_image_name);
              })
            );
          }

          const college_data = new college_model({
            college_name: data.college_name,
            estdYear: data.estdYear,
            affiliatedTo: JSON.parse(data.affiliatedTo),
            type: data.type,
            programmesOffered: JSON.parse(data.programmesOffered),
            director: data.director,
            contactNumber: data.contactNumber,
            officialWebsite: data.officialWebsite,
            address: data.address,
            about: data.about,
            facts: JSON.parse(data.facts),
            professor: data.professor,
            university_banner: main_images,
            office_photo: office_photo_name,
            state: data.state,
            city: data.city,
            campus_images: campus_images,
            pdf: pdf_name,
            loan_contact: data.loan_contact,
            education_loan: data.education_loan,
            registered_instructors: data.registered_instructors,
            rating: data.rating,
          });

          await college_data
            .save()
            .then(async (success) => {
              resolve({ msg: "submission", status: 1 });
            })
            .catch((error) => {
              
              console.log(error);
              
              reject({ msg: "submission unsuccessful", status: 0 });
            });
        }
      } catch (error) {
        console.log(error);

        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  read(id, query) {
    return new Promise(async (resolve, reject) => {
      try {
        if (id) {
          console.log(id);

         const mongoose = require('mongoose');

const college = await college_model.aggregate([
  // Match the specific college by id
  {
    $match: {
      _id: new mongoose.Types.ObjectId(id),
    },
  },
  // Lookup courses related to the college
  {
    $lookup: {
      from: "courses",
      localField: "_id",
      foreignField: "college_id",
      as: "courses",
    },
  },
  // Lookup streams related to the courses
  {
    $lookup: {
      from: "streams",
      localField: "courses.stream_id",
      foreignField: "_id",
      as: "streams",
    },
  },
  // Lookup ratings related to the college
  {
    $lookup: {
      from: "ratings",
      localField: "_id",
      foreignField: "college_id",
      as: "collegeRatings",
    },
  },
  // Add a new field for the average college rating
  {
    $addFields: {
      avgCollegeRating: { $avg: "$collegeRatings.rating" },
    },
  },
  // Unwind courses array to work with each course separately
  { $unwind: { path: "$courses", preserveNullAndEmptyArrays: true } },
  // Lookup ratings for each course
  {
    $lookup: {
      from: "course_ratings",
      localField: "courses._id",
      foreignField: "course_id",
      as: "courseRatings",
    },
  },
  // Add a new field for the average course rating
  {
    $addFields: {
      "courses.avgCourseRating": { $avg: "$courseRatings.rating" },
    },
  },
  // Lookup events related to the college
  {
    $lookup: {
      from: "events",
      localField: "_id",
      foreignField: "college_id",
      as: "events",
    },
  },
  // Lookup placed students related to the college
  {
    $lookup: {
      from: "placed_students",
      localField: "_id",
      foreignField: "college_id",
      as: "placed_students",
    },
  },
  // Lookup scholarships related to the college
  {
    $lookup: {
      from: "scholarships",
      localField: "_id",
      foreignField: "college_id",
      as: "scholarships",
    },
  },
  // Lookup faculty details related to the college
  {
    $lookup: {
      from: "faculties",
      localField: "_id",
      foreignField: "college_id",
      as: "faculties",
    },
  },
  // Lookup stories related to the college
  {
    $lookup: {
      from: "stories",
      localField: "_id",
      foreignField: "college_id",
      as: "stories",
    },
  },
  // Lookup doubts related to the college
  {
    $lookup: {
      from: "doubts",
      localField: "_id",
      foreignField: "college_id",
      as: "doubts",
    },
  },
  // Lookup posts related to the college
  {
    $lookup: {
      from: "posts",
      localField: "_id",
      foreignField: "college_id",
      as: "posts",
    },
  },
  // Lookup reviews related to the college
  {
    $lookup: {
      from: "reviews",
      localField: "_id",
      foreignField: "college_id",
      as: "collegeReviews",
    },
  },
  // Lookup placements related to the college
  {
    $lookup: {
      from: "placements", // Collection name
      localField: "_id",
      foreignField: "college_id",
      as: "placementDetails",
    },
  },
  // Regroup the courses into an array after calculating the avgCourseRating
  {
    $group: {
      _id: "$_id",
      college_name: { $first: "$college_name" },
      office_photo: { $first: "$office_photo" },
      estdYear: { $first: "$estdYear" },
      affiliatedTo: { $first: "$affiliatedTo" },
      about: { $first: "$about" },
      facts: { $first: "$facts" },
      professor: { $first: "$professor" },
      type: { $first: "$type" },
      programmesOffered: { $first: "$programmesOffered" },
      director: { $first: "$director" },
      contactNumber: { $first: "$contactNumber" },
      officialWebsite: { $first: "$officialWebsite" },
      address: { $first: "$address" },
      university_banner: { $first: "$university_banner" },
      state: { $first: "$state" },
      city: { $first: "$city" },
      campus_images: { $first: "$campus_images" },
      pdf: { $first: "$pdf" },
      education_loan: { $first: "$education_loan" },
      loan_contact: { $first: "$loan_contact" },
      registered_instructors: { $first: "$registered_instructors" },
      avgCollegeRating: { $first: "$avgCollegeRating" },
      courses: { $push: "$courses" },
      streams: { $first: "$streams" },
      events: { $first: "$events" },
      placed_students: { $first: "$placed_students" },
      scholarships: { $first: "$scholarships" },
      faculties: { $first: "$faculties" },
      stories: { $first: "$stories" },
      doubts: { $first: "$doubts" },
      posts: { $first: "$posts" },
      collegeReviews: { $first: "$collegeReviews" },
      placementDetails: { $first: "$placementDetails" },
    },
  },
  // Project the final shape of the output
  {
    $project: {
      _id: 1,
      college_name: 1,
      office_photo: 1,
      estdYear: 1,
      affiliatedTo: 1,
      about: 1,
      facts: 1,
      professor: 1,
      type: 1,
      programmesOffered: 1,
      director: 1,
      contactNumber: 1,
      officialWebsite: 1,
      address: 1,
      university_banner: 1,
      state: 1,
      city: 1,
      campus_images: 1,
      pdf: 1,
      education_loan: 1,
      loan_contact: 1,
      registered_instructors: 1,
      avgCollegeRating: 1,
      courses: 1,
      streams: 1,
      events: 1,
      placed_students: 1,
      scholarships: 1,
      faculties: 1,
      stories: 1,
      doubts: 1,
      posts: 1,
      collegeReviews: 1,
      placementDetails: 1,
    },
  },
]);



          resolve({ msg: "college found", status: 1, college: college[0] });



        } else {
          // const college = await college_model.find();

          const filter = {};

          if (query.college_type) {
            filter.type ={ $regex: query.college_type, $options: "i" };
          }

          if (query.college_state) {
            filter.state = { $regex: query.college_state, $options: "i" };
          }

          if (query.college_city) {
            filter.city = { $regex: query.college_city, $options: "i" };
          }

          if (query.stream_name) {
            filter["streams.stream_name"] = {
              $regex: query.stream_name,
              $options: "i",
            };
          }

          if (query.course_time) {
            filter["courses.time"] = {
              $regex: query.course_time,
              $options: "i",
            };
          }

          if (query.course_name) {
            filter["courses.courseName"] = {
              $regex: query.course_name,
              $options: "i",
            };
          }

          if (query.specialisation) {
            filter["courses.specialisation"] = {
              $regex: query.specialisation,
              $options: "i",
            };
          }

          if (query.duration) {
            filter["courses.duration"] = parseInt(query.duration);
          }

          if (query.college_name) {
            filter.college_name = { $regex: query.college_name, $options: "i" };
          }

          if (query.max_fees && query.min_fees) {
            filter["courses.fees"] = {
              $gte: parseInt(query.min_fees),
              $lte: parseInt(query.max_fees),
            };
          }

          const college = await college_model.aggregate([
            // Lookup courses related to the college
            {
              $lookup: {
                from: "courses", // Collection name
                localField: "_id",
                foreignField: "college_id",
                as: "courses",
              },
            },
            // Lookup streams related to the courses
            {
              $lookup: {
                from: "streams", // Collection name
                localField: "courses.stream_id",
                foreignField: "_id",
                as: "streams",
              },
            },
            // Lookup ratings related to the college
            {
              $lookup: {
                from: "ratings", // Collection name
                localField: "_id",
                foreignField: "college_id",
                as: "collegeRatings",
              },
            },
            // Add a new field for the average college rating
            {
              $addFields: {
                avgCollegeRating: { $avg: "$collegeRatings.rating" },
              },
            },
            // Lookup reviews related to the college
            {
              $lookup: {
                from: "reviews", // Collection name
                localField: "_id",
                foreignField: "college_id",
                as: "reviews",
              },
            },
            // Add a new field for the average review rating (if reviews include ratings)
            // Assuming "reviews" also include a "rating" field, if applicable
            {
              $addFields: {
                avgReviewRating: { $avg: "$reviews.rating" },
              },
            },
            // Unwind courses array to work with each course separately
            { $unwind: { path: "$courses", preserveNullAndEmptyArrays: true } },
            // Lookup ratings for each course
            {
              $lookup: {
                from: "course_ratings", // Collection name
                localField: "courses._id",
                foreignField: "course_id",
                as: "courseRatings",
              },
            },
            // Add a new field for the average course rating
            {
              $addFields: {
                "courses.avgCourseRating": { $avg: "$courseRatings.rating" },
              },
            },
            {
              $match: filter,
            },
            // Regroup the courses into an array after calculating the avgCourseRating
            {
              $group: {
                _id: "$_id",
                college_name: { $first: "$college_name" },
                estdYear: { $first: "$estdYear" },
                affiliatedTo: { $first: "$affiliatedTo" },
                about: { $first: "$about" },
                facts: { $first: "$facts" },
                professor: { $first: "$professor" },
                type: { $first: "$type" },
                programmesOffered: { $first: "$programmesOffered" },
                director: { $first: "$director" },
                contactNumber: { $first: "$contactNumber" },
                officialWebsite: { $first: "$officialWebsite" },
                address: { $first: "$address" },
                university_banner: { $first: "$university_banner" },
                state: { $first: "$state" },
                city: { $first: "$city" },
                campus_images: { $first: "$campus_images" },
                pdf: { $first: "$pdf" },
                education_loan: { $first: "$education_loan" },
                loan_contact: { $first: "$loan_contact" },
                registered_instructors: { $first: "$registered_instructors" },
                office_photo: { $first: "$office_photo" },
                avgCollegeRating: { $first: "$avgCollegeRating" },
                avgReviewRating: { $first: "$avgReviewRating" }, // Include avg review rating
                courses: { $push: "$courses" }, // Regroup courses
                streams: { $first: "$streams" },
                reviews: { $first: "$reviews" }, // Include reviews
              },
            },
            // Project the final shape of the output
            {
              $project: {
                _id: 1,
                college_name: 1,
                estdYear: 1,
                affiliatedTo: 1,
                about: 1,
                facts: 1,
                professor: 1,
                type: 1,
                programmesOffered: 1,
                director: 1,
                contactNumber: 1,
                officialWebsite: 1,
                address: 1,
                university_banner: 1,
                state: 1,
                city: 1,
                campus_images: 1,
                pdf: 1,
                education_loan: 1,
                loan_contact: 1,
                registered_instructors: 1,
                office_photo: 1,
                avgCollegeRating: 1,
                avgReviewRating: 1, // Output avg review rating
                courses: 1,
                streams: 1,
                reviews: 1, // Output reviews
              },
            },
          ]);
          

          const total_count = await college_model.countDocuments();

          resolve({ msg: "colleges found", status: 1,college:{college,total_count},});

        }
      } catch (error) {
        console.log(error);

        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  read_name(name) {
    return new Promise(async (resolve, reject) => {
      try {
        if (name) {
          const college = await college_model.findOne({
            college_name: { $regex: name, $options: "i" },
          });
          resolve({ msg: "college found", status: 1, college });
        }
      } catch (error) {
        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  read_by_rating() {
    return new Promise(async (resolve, reject) => {
      try {
        const topColleges = await college_model.aggregate([
          {
            $lookup: {
              from: "ratings", // Collection name in MongoDB
              localField: "_id",
              foreignField: "college_id",
              as: "ratings",
            },
          },
          {
            $unwind: {
              path: "$ratings",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $group: {
              _id: "$_id",
              college_name: { $first: "$college_name" },
              estdYear: { $first: "$estdYear" },
              affiliatedTo: { $first: "$affiliatedTo" },
              about: { $first: "$about" },
              facts: { $first: "$facts" },
              professor: { $first: "$professor" },
              type: { $first: "$type" },
              programmesOffered: { $first: "$programmesOffered" },
              director: { $first: "$director" },
              contactNumber: { $first: "$contactNumber" },
              officialWebsite: { $first: "$officialWebsite" },
              address: { $first: "$address" },
              university_banner: { $first: "$university_banner" },
              state: { $first: "$state" },
              city: { $first: "$city" },
              campus_images: { $first: "$campus_images" },
              pdf: { $first: "$pdf" },
              education_loan: { $first: "$education_loan" },
              loan_contact: { $first: "$loan_contact" },
              registered_instructors: { $first: "$registered_instructors" },
              averageRating: { $avg: "$ratings.rating" }, // Calculate average rating
            },
          },

          {
            $sort: { averageRating: -1 }, // Sort by average rating in descending order
          },

          {
            $limit: 10, // Limit to top 10 colleges
          },
        ]);

        resolve({ msg: "topColleges found", status: 1, topColleges });
      } catch (error) {
        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  compare_colleges(courseName) {
    return new Promise(async (resolve, reject) => {
      try {
        const compare_colleges = await college_model.
        
        aggregate([
          {
            // Join the Course collection with College based on college_id
            $lookup: {
              from: "courses", // The name of the Course collection
              localField: "_id", // Field from the College collection
              foreignField: "college_id", // Field from the Course collection
              as: "courses", // The output array containing matched courses
            },
          },
          {
            // Unwind the courses array to treat each course as a separate document
            $unwind: "$courses",
          },
          {
            // Match the documents where the courseName matches the provided regex pattern
            $match: {
              "courses.courseName": {
                $regex: courseName, // The regex pattern for courseName
                $options: "i", // Case-insensitive matching
              },
            },
          },
          {
            // Group by college and collect matching courses
            $group: {
              _id: "$_id",
              college_name: { $first: "$college_name" },
              estdYear: { $first: "$estdYear" },
              affiliatedTo: { $first: "$affiliatedTo" },
              about: { $first: "$about" },
              facts: { $first: "$facts" },
              professor: { $first: "$professor" },
              type: { $first: "$type" },
              director: { $first: "$director" },
              contactNumber: { $first: "$contactNumber" },
              officialWebsite: { $first: "$officialWebsite" },
              address: { $first: "$address" },
              university_banner: { $first: "$university_banner" },
              office_photo: { $first: "$office_photo" },
              state: { $first: "$state" },
              city: { $first: "$city" },
              campus_images: { $first: "$campus_images" },
              pdf: { $first: "$pdf" },
              education_loan: { $first: "$education_loan" },
              loan_contact: { $first: "$loan_contact" },
              registered_instructors: { $first: "$registered_instructors" },
              courses: { $push: "$courses" }, // Collect the filtered courses
            },
          },
          {
            // Now lookup the reviews for each college
            $lookup: {
              from: "reviews", // The name of the Review collection
              localField: "_id", // Field from the College collection
              foreignField: "college_id", // Field from the Review collection
              as: "reviews", // The output array containing matched reviews
            },
          },
          {
            // Lookup ratings for each college
            $lookup: {
              from: "ratings", // The name of the Rating collection
              localField: "_id", // Field from the College collection
              foreignField: "college_id", // Field from the Rating collection
              as: "ratings", // The output array containing matched ratings
            },
          },
          {
            // Unwind ratings to calculate the average
            $unwind: {
              path: "$ratings",
              preserveNullAndEmptyArrays: true, // Handle cases where no ratings exist
            },
          },
          {
            // Group again to calculate the average rating
            $group: {
              _id: "$_id",
              college_name: { $first: "$college_name" },
              estdYear: { $first: "$estdYear" },
              affiliatedTo: { $first: "$affiliatedTo" },
              about: { $first: "$about" },
              facts: { $first: "$facts" },
              professor: { $first: "$professor" },
              type: { $first: "$type" },
              director: { $first: "$director" },
              contactNumber: { $first: "$contactNumber" },
              officialWebsite: { $first: "$officialWebsite" },
              address: { $first: "$address" },
              university_banner: { $first: "$university_banner" },
              office_photo: { $first: "$office_photo" },
              state: { $first: "$state" },
              city: { $first: "$city" },
              campus_images: { $first: "$campus_images" },
              pdf: { $first: "$pdf" },
              education_loan: { $first: "$education_loan" },
              loan_contact: { $first: "$loan_contact" },
              registered_instructors: { $first: "$registered_instructors" },
              courses: { $first: "$courses" },
              reviews: { $first: "$reviews" },
              avgRating: { $avg: "$ratings.rating" }, // Calculate the average rating
            },
          },
        ]);
    

        resolve({ msg: "compare_colleges found", status: 1, compare_colleges });
      } catch (error) {
        console.log(error);
        
        reject({ msg: "internal error", status: 0 });
      }
    });
  }



  top10_colleges_by_city(cityName) {

    return new Promise(async (resolve, reject) => {
      try {
        const topColleges = await college_model.
        aggregate([
          {
            $match: {
              city: { 
                $regex: cityName, 
                $options: 'i'  // 'i' for case-insensitive matching
              }
            }
          },
          {
            // Step 2: Lookup the ratings for each college
            $lookup: {
              from: 'ratings', // Name of the ratings collection
              localField: '_id', // College ID from the College collection
              foreignField: 'college_id', // College ID from the Ratings collection
              as: 'ratings'
            }
          },
          {
            // Step 3: Unwind the ratings array to calculate the average rating
            $unwind: {
              path: '$ratings',
              preserveNullAndEmptyArrays: true // Include colleges with no ratings
            }
          },
          {
            // Step 4: Group by college and calculate the average rating
            $group: {
              _id: '$_id',
              college_name: { $first: '$college_name' },
              city: { $first: '$city' },
              avgRating: { $avg: '$ratings.rating' },
              estdYear: { $first: '$estdYear' },
              affiliatedTo: { $first: '$affiliatedTo' },
              about: { $first: '$about' },
              // Include any other fields you want to return
            }
          },
          {
            // Step 5: Sort by average rating in descending order
            $sort: {
              avgRating: -1
            }
          },
          {
            // Step 6: Limit the results to the top 10
            $limit: 10
          }
        ]);
    

        resolve({ msg: "topColleges found", status: 1, topColleges });
      } catch (error) {
        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  top10_colleges_by_state(stateName) {
    console.log(stateName);
    

    return new Promise(async (resolve, reject) => {
      try {
        const topColleges = await college_model.
        aggregate([
          {
            $match: {
              state: { 
                $regex: stateName, 
                $options: 'i'  // 'i' for case-insensitive matching
              }
            }
          },
          {
            // Step 2: Lookup the ratings for each college
            $lookup: {
              from: 'ratings', // Name of the ratings collection
              localField: '_id', // College ID from the College collection
              foreignField: 'college_id', // College ID from the Ratings collection
              as: 'ratings'
            }
          },
          {
            // Step 3: Unwind the ratings array to calculate the average rating
            $unwind: {
              path: '$ratings',
              preserveNullAndEmptyArrays: true // Include colleges with no ratings
            }
          },
          {
            // Step 4: Group by college and calculate the average rating
            $group: {
              _id: '$_id',
              college_name: { $first: '$college_name' },
              city: { $first: '$city' },
              avgRating: { $avg: '$ratings.rating' },
              estdYear: { $first: '$estdYear' },
              affiliatedTo: { $first: '$affiliatedTo' },
              about: { $first: '$about' },
              // Include any other fields you want to return
            }
          },
          {
            // Step 5: Sort by average rating in descending order
            $sort: {
              avgRating: -1
            }
          },
          {
            // Step 6: Limit the results to the top 10
            $limit: 10
          }
        ]);
    

        resolve({ msg: "topColleges found", status: 1, topColleges });
      } catch (error) {
        reject({ msg: "internal error", status: 0 });
      }
    });
  }


  state_wise_colleges() {
    return new Promise(async (resolve, reject) => {
      try {
        const state_wise_colleges = await college_model.aggregate([
          {
            $group: {
              _id: "$state", // Group by state
              colleges: {
                $push: {
                  _id:"$_id",
                  college_name: "$college_name",
                  estdYear: "$estdYear",
                  city: "$city"
                }
              }
            }
          },
          {
            $project: {
              _id: 0,          // Exclude the _id field
              state: "$_id",   // Rename _id to state
              colleges: 1      // Include the colleges array
            }
          },
          {
            $sort: { state: 1 } // Sort by state (optional)
          }
        ]);
        
        
    

        resolve({ msg: "state_wise_colleges found", status: 1, state_wise_colleges });
      } catch (error) {
        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  edit(id, data) {
    console.log(data);

    return new Promise(async (resolve, reject) => {
      try {
        await college_model.updateOne(
          { _id: id },
          {
            college_name: data.college_name,
            estdYear: data.estdYear,
            affiliatedTo: data.affiliatedTo,
            type: data.type,
            programmesOffered: data.programmesOffered,
            director: data.director,
            contactNumber: data.contactNumber,
            officialWebsite: data.officialWebsite,
            address: data.address,
            about: data.about,
            facts: data.facts,
            professor: data.professor,
            state: data.state,
            city: data.city,
            loan_contact: data.loan_contact,
            education_loan: data.education_loan,
            registered_instructors: data.registered_instructors,
            rating: data.rating,
          }
        );

        resolve({ msg: "update successfully", status: 1 });
      } catch (error) {
        console.log(error);
        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  logo_update(id, data, logo) {
    return new Promise(async (resolve, reject) => {
      try {
        const main_images = [];

        if (logo) {
          const logoArray = Array.isArray(logo) ? logo : [logo];
          await Promise.all(
            logoArray.map(async (data) => {
              const main_image_name =
                new Date().getTime() +
                Math.floor(Math.random() * 1000) +
                data.name;
              const destination =
                "./public/image/college_logo/" + main_image_name;

              await data.mv(destination);

              main_images.push(main_image_name);
            })
          );
        }

        await college_model.updateOne(
          { _id: id },
          { university_banner: main_images }
        );

        await Promise.all(
          JSON.parse(data?.old_logo).map((data) =>
            fs.unlinkSync(path.join("./public/image/college_logo/", data))
          )
        );

        resolve({ msg: "logo update successfully", status: 1 });
      } catch (error) {
        console.log(error);

        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  pdf_update(id, data, pdf) {
    return new Promise(async (resolve, reject) => {
      try {
        const pdf_name =
          new Date().getTime() + Math.floor(Math.random() * 1000) + pdf.name;
        const destination = "./public/college_pdf/" + pdf_name;
        await pdf.mv(destination);

        await college_model.updateOne({ _id: id }, { pdf: pdf_name });

        fs.unlinkSync(path.join("./public/college_pdf/", data.old_pdf));

        resolve({ msg: "pdf update successfully", status: 1 });
      } catch (error) {
        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  office_photo_update(id, data, office_photo) {
    console.log(id, data, office_photo);

    return new Promise(async (resolve, reject) => {
      try {
        const office_photo_name =
          new Date().getTime() +
          Math.floor(Math.random() * 1000) +
          office_photo.name;
        const destination = "./public/image/office_photo/" + office_photo_name;
        await office_photo.mv(destination);

        await college_model.updateOne(
          { _id: id },
          { office_photo: office_photo_name }
        );

        fs.unlinkSync(
          path.join("./public/image/office_photo/", data.old_office_photo)
        );

        resolve({ msg: "office photo update successfully", status: 1 });
      } catch (error) {
        console.log(error);

        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  campus_images_update(id, data, campus) {
    return new Promise(async (resolve, reject) => {
      try {
        const campus_images = [];

        if (campus) {
          const campusArray = Array.isArray(campus) ? campus : [campus];
          await Promise.all(
            campusArray.map(async (data) => {
              const campus_image_name =
                new Date().getTime() +
                Math.floor(Math.random() * 1000) +
                data.name;
              const destination =
                "./public/image/campus_images/" + campus_image_name;
              await data.mv(destination);
              campus_images.push(campus_image_name);
            })
          );
        }

        await college_model.updateOne(
          { _id: id },
          { campus_images: campus_images }
        );

        await Promise.all(
          JSON.parse(data?.old_campus_images).map((data) =>
            fs.unlinkSync(path.join("./public/image/campus_images/", data))
          )
        );

        resolve({ msg: "campus update successfully", status: 1 });
      } catch (error) {
        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  delete(id, logo, campus_images, pdf, office_photo) {
    return new Promise(async (resolve, reject) => {
      try {
        const parsed_campus = JSON.parse(campus_images);

        await Promise.all(
          parsed_campus.map((data) =>
            fs.unlinkSync(path.join("./public/image/campus_images/", data))
          )
        );

        await Promise.all(
          JSON.parse(logo).map((data) =>
            fs.unlinkSync(path.join("./public/image/college_logo/", data))
          )
        );
        fs.unlinkSync(path.join("./public/college_pdf/", pdf));

        fs.unlinkSync(path.join("./public/image/office_photo/", office_photo));

        await college_model.deleteOne({ _id: id });

        resolve({ msg: "college deleted successfully", status: 1 });
      } catch (error) {
        console.log(error);

        reject({ msg: "internal error", status: 0 });
      }
    });
  }
}

module.exports = college_controller;
