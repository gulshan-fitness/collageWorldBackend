const { default: mongoose } = require("mongoose");
const rating_model = require("../models/Rating_model");

class rating_controller {
  add(data) {
    return new Promise(async (resolve, reject) => {
      try {
        if (data.user) {
          const exist_college_rating = await rating_model.findOne({
            college_id:data.college_id, user:data.user
          });
          if (exist_college_rating) {
            reject({
              msg: " this user already given rating to this college ",
              status: 0,
            });
          } else {
            const rating = rating_model({
              college_id: data.college_id,

              user: data.user,
              rating: data.rating,
            });

            await rating
              .save()
              .then(async (succes) => {
                resolve({ msg: " rating add succesfully ", status: 1 });
              })

              .catch((error) => {
                reject({ msg: "  rating add unsuccesfully", status: 0 });
              });
          }
        } else {
          const rating = rating_model({
            college_id: data.college_id,

            rating: data.rating,
          });

          await rating
            .save()
            .then(async (succes) => {
              resolve({ msg: " rating add succesfully ", status: 1 });
            })

            .catch((error) => {
              reject({ msg: "  rating add unsuccesfully", status: 0 });
            });
        }
      } catch (error) {
        console.log(error);
        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  read(id) {
    return new Promise(async (resolve, reject) => {
      try {
        if (id) {
          const rating = await rating_model
            .findOne({ _id: id })
            .populate(["college_id", "user"]);

          const perticularCollegerating = await rating_model.aggregate([
            {
              // Match ratings for a specific college
              $match: { college_id: new mongoose.Types.ObjectId(id) },
            },
            {
              // Lookup to get the user details for the rating
              $lookup: {
                from: "users", // The name of the User collection in MongoDB
                localField: "user",
                foreignField: "_id",
                as: "userDetails",
              },
            },
            {
              // Unwind the userDetails array, preserve null if not found
              $unwind: {
                path: "$userDetails",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              // Project the desired fields, using $ifNull to ensure user details are handled correctly
              $project: {
                _id: 1,
                college_id: 1,
                rating: 1,
                createdAt: 1,
                updatedAt: 1,
                user: { $ifNull: ["$userDetails._id", null] },
                userName: { $ifNull: ["$userDetails.name", ""] },
                userEmail: { $ifNull: ["$userDetails.email", ""] },
                userContact: { $ifNull: ["$userDetails.contact", ""] },
                userGender: { $ifNull: ["$userDetails.gender", ""] },
                userBirth: { $ifNull: ["$userDetails.birth", ""] },
                userCourse: { $ifNull: ["$userDetails.course", ""] },
                userState: { $ifNull: ["$userDetails.state", ""] },
                userCity: { $ifNull: ["$userDetails.city", ""] },
              },
            },
          ]);

          resolve({
            msg: " rating finded ",
            status: 1,
            rating,
            perticularCollegerating,
          });
        } else {
          const rating = await rating_model
            .find()
            .populate(["college_id", "user"]);
          const total_count = await rating_model.countDocuments();

          resolve({
            msg: " rating finded ",
            status: 1,
            rating: { rating, total_count },
          });
        }
      } catch (error) {
        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await rating_model.deleteOne({ _id: id });

        resolve({ msg: "rating deleted successfully", status: 1 });
      } catch (error) {
        reject({ msg: "internal error", status: 0 });
      }
    });
  }
}

module.exports = rating_controller;
