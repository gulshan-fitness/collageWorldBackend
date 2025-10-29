const jwt = require("jsonwebtoken");

const user_model = require("../models/user_model");
const nodemailer = require("nodemailer");

      const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.SMTP_MAIL || 'bhawanishankarsharma74@gmail.com',
            pass: process.env.SMTP_PASS || 'xjhfwspqdqnvpbvk',
          },
          host: "smtp.gmail.com",
          port: 587,
          tls: {
            rejectUnauthorized: false,
          }
        });

        
              const mailOptions = (subject,text,userEmail,userName)=> {
                
                
              return  {

              from: process.env.SMTP_MAIL || 'bhawanishankarsharma74@gmail.com',
              to:"gulshankumarjangid@gmail.com",
              subject: subject,

          text: `${text}-${userEmail}
                 name-${userName}`, }
              }

class User_controllers {
  
  sign_up(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const exits_email = await user_model.findOne({ email: data.email });

        if (exits_email) {
          reject({ msg: "This email addres already exist", status: 0 });
        } else {
          const exits_contact = await user_model.findOne({
            contact: data.contact,
          });

          if (exits_contact) {
            reject({ msg: "This number already exist", status: 0 });
          } else {
            const user = user_model(data);

            await user
              .save()
              .then((succes) => {
                const token = jwt.sign({ user: user }, process.env.TOKEN_KEY, {
                  expiresIn: "10y",
                });
                resolve({
                  msg: "user sign_up succesfully",
                  status: 1,
                  user: { ...user.toJSON(), password: null },
                  token,
                });
              })

              .catch((err) => {
                console.log(err);

                reject({ msg: "user sign_up  unsuccesfully", status: 0 });
              });
          }
        }
      } catch (error) {
        console.log(error);

        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  login(data) {
    console.log(data);

    return new Promise(async (resolve, reject) => {
      try {
        const user = await user_model.findOne({ email: data.email });

        if (user) {
          const token = jwt.sign({ user: user }, process.env.TOKEN_KEY, {
            expiresIn: "10y",
          });
          resolve({
            msg: " login succesfull",
            status: 1,
            user: { ...user.toJSON(), password: null },
            token,
          });
        } else {
          reject({ msg: " dont have any accouted with this email", status: 0 });
        }
      } catch (error) {
        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  get_users(user_id, query) {
    return new Promise(async (resolve, reject) => {
      try {
        if (user_id) {
          const users = await user_model
            .findOne({ _id: user_id })
            .populate("college");

          resolve({ msg: "users finded", status: 1, all_users: users });
        } else {
          const now = new Date(); // Initialize now as a Date object

          console.log(query);

          const filter = {};

          if (query.enquiry_time != "anyTime") {
            const now = new Date();

            if (query.enquiry_time == "past24Hours") {
              filter.updatedAt = {
                $gte: new Date(now.getTime() - 24 * 60 * 60 * 1000),
              };
            }

            if (query.enquiry_time == "pastWeek") {
              filter.updatedAt = {
                $gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
              };
            }

            if (query.enquiry_time == "pastMonth") {
              filter.updatedAt = {
                $gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
              };
            }
          }

          if (query?.college_name) {
            filter["collegeDetails.college_name"] = {
              $regex: query?.college_name,
              $options: "i",
            };
          }

          if (query?.course) {
            filter.course = { $regex: query?.course, $options: "i" };
          }

          if (query?.date) {
            const startOfDay = new Date(`${query?.date}T00:00:00.000Z`);
            const endOfDay = new Date(`${query?.date}T23:59:59.999Z`);

            filter.updatedAt = {
              $gte: startOfDay,
              $lte: endOfDay,
            };
          }

          if (query?.state) {
            filter.state = { $regex: query?.state, $options: "i" };
          }

          if (query?.city) {
            filter.city = { $regex: query?.city, $options: "i" };
          }

          const users = await user_model.aggregate([
            // Lookup stage to join with the College collection
            {
              $lookup: {
                from: "colleges", // The collection name in the database
                localField: "college",
                foreignField: "_id",
                as: "collegeDetails",
              },
            },
            // Unwind the collegeDetails array
            {
              $unwind: {
                path: "$collegeDetails",
                preserveNullAndEmptyArrays: true,
              },
            },
            // Match stage to filter by course and updatedAt (if needed)
            {
              $match: {
                $or: [
                  { college: { $ne: null } }, // Condition 1: college is not null
                  { enquiry: { $ne: "" } }, // Condition 2: enquiry is not an empty string
                ],
                ...filter,
              },
            },
            // Project stage to include only relevant fields
            {
              $project: {
                name: 1,
                contact: 1,
                email: 1,
                referelUser:1,
                gender: 1,
                birth: 1,
                course: 1,
                state: 1,
                city: 1,
                enquiry: 1,
                updatedAt: 1,
                college_name: "$collegeDetails.college_name",
                checked: 1, // Include checked field
                user_response: 1, // Include user_response field
              },
            },
            // Sort stage to order by updatedAt field in descending order
            {
              $sort: { updatedAt: -1 },
            },
          ]);

          const total_count = await user_model.countDocuments();

          resolve({
            msg: "users finded",
            status: 1,
            all_users: { users, total_count },
          });
        }
      } catch (error) {
        console.log(error);

        reject({ msg: "internal err", status: 0 });
      }
    });
  }

  
get_RefrelUsers(id){

  console.log(id,"jsbdusdyusyudydysdyduy");

  
    return new Promise(async (resolve, reject) => {
      try {
          const RefrelUsers = await user_model
            .find({referelUser:id})
            .populate(["college","referelUser"]);
            resolve({ msg: "users finded", status: 1, RefrelUsers: RefrelUsers });


      } catch (error) {
       

        reject({ msg: "internal err", status: 0 });
      }
    });
  }


  get_users_recent_enquiry_city_wise(cityName) {
    return new Promise(async (resolve, reject) => {
      try {
        const usersWithColleges = await user_model.aggregate([
          {
            $lookup: {
              from: "colleges", // The collection name in lowercase
              localField: "college",
              foreignField: "_id",
              as: "collegeDetails",
            },
          },
          {
            $unwind: {
              path: "$collegeDetails",
              preserveNullAndEmptyArrays: true, // Keep users even if they have no college
            },
          },
          {
            $match: {
              "collegeDetails.city": {
                $regex: cityName, // Using regex to filter by city name
                $options: "i", // Case-insensitive
              },
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              contact: 1,
              email: 1,
              course: 1,
              enquiry: 1,
              state: 1,
              city: 1,
              checked: 1,
              user_response: 1,
              college: {
                college_id: "$collegeDetails._id",
                college_name: "$collegeDetails.college_name",
                address: "$collegeDetails.address",
                estdYear: "$collegeDetails.estdYear",
                director: "$collegeDetails.director",
                contactNumber: "$collegeDetails.contactNumber",
                officialWebsite: "$collegeDetails.officialWebsite",
              },
            },
          },
          {
            $sort: {
              createdAt: -1, // Sort by createdAt in descending order for recent users
            },
          },
        ]);

        resolve({
          msg: "collegs finded",
          status: 1,
          colleges: { usersWithColleges },
        });
      } catch (error) {
        console.log(error);

        reject({ msg: "internal err", status: 0 });
      }
    });
  }


async read_monthly_users() {
  try {
    const currentYear = new Date().getFullYear();

    // Aggregate user counts for the current year
    const monthly_users_raw = await user_model.aggregate([
      {
        // Match only users created in the current year
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`)
          }
        }
      },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          signups: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          monthNumber: "$_id.month",
          signups: 1
        }
      },
      { $sort: { monthNumber: 1 } } // Sort chronologically
    ]);

    // Prepare list of all months
    const allMonths = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    // Ensure all months appear (even with zero signups)
    const monthly_users = allMonths.map((month, index) => {
      const found = monthly_users_raw.find(m => m.monthNumber === index + 1);
      return {
        month: `${month} ${currentYear}`,
        signups: found ? found.signups : 0
      };
    });

    return { msg: "Monthly user signup report generated", status: 1, monthly_users };

  } catch (error) {
    console.error("Error in read_monthly_users:", error);
    return { msg: "Internal server error", status: 0 };
  }
}

  async  get_users_by_colleges_enquiry() {
  try {
    const collegeUserCounts = 
  await user_model.aggregate([
      // 1️⃣ Only users that have a linked college
      {
        $match: { college: { $ne: null } }
      },

      // 2️⃣ Group by college id and count enquiries
      {
        $group: {
          _id: "$college",
          userCount: { $sum: 1 }
        }
      },

      // 3️⃣ Sort by enquiry count (descending)
      {
        $sort: { userCount: -1 }
      },

      // 4️⃣ Limit to top 10
      {
        $limit: 10
      },

      // 5️⃣ Lookup college details
      {
        $lookup: {
          from: "colleges", // collection name in MongoDB (lowercase)
          localField: "_id",
          foreignField: "_id",
          as: "collegeDetails"
        }
      },

      // 6️⃣ Unwind the array
      {
        $unwind: "$collegeDetails"
      },

      // 7️⃣ Final projection (chart-friendly)
      {
        $project: {
          _id: 0,
          collegeId: "$collegeDetails._id",
          collegeName: "$collegeDetails.college_name", // <-- correct field name
          state: "$collegeDetails.state",
          city: "$collegeDetails.city",
          userCount: 1
        }
      }
    ]);

    return { msg: "topcollegesEnquiry", status: 1, collegeUserCounts };
  } catch (error) {
    console.error("Error in monthly_user_signup_report:", error);
    return { msg: "Internal server error", status: 0 };
  }
}


async user_by_course_enquiry() {
  try {
    const courseUserCounts = await user_model.
   aggregate([
      // 1️⃣ Only include users with a non-empty course
      {
        $match: {
          course: { $ne: "" }
        }
      },

      // 2️⃣ Group by course and count users
      {
        $group: {
          _id: "$course",
          userCount: { $sum: 1 }
        }
      },

      // 3️⃣ Sort by highest count
      {
        $sort: { userCount: -1 }
      },

      // 4️⃣ Take top 10
      {
        $limit: 10
      },

      // 5️⃣ Rename _id → course_name for frontend compatibility
      {
        $project: {
          _id: 0,
          course_name: "$_id",
          userCount: 1
        }
      }
    ]);

   return { msg: "topcoursesEnquiry", status: 1, courseUserCounts };

  } catch (error) {

    console.error("Error fetching top courses:", error);

     return { msg: "Internal server error", status: 0 };
  }
}

async user_by_city_enquiry() {
  try {
    const cityUserCounts = await user_model.aggregate([
      // 1️⃣ Only include users where city is not empty
      {
        $match: {
          city: { $ne: "" }
        }
      },

      // 2️⃣ Group by city and count total enquiries (users)
      {
        $group: {
          _id: "$city",
          userCount: { $sum: 1 }
        }
      },

      // 3️⃣ Sort by number of enquiries descending
      {
        $sort: { userCount: -1 }
      },

      // 4️⃣ Limit to top 10 cities
      {
        $limit: 10
      },

      // 5️⃣ Rename fields for frontend compatibility
      {
        $project: {
          _id: 0,
          city: "$_id",
          userCount: 1
        }
      }
    ]);


   return { msg: "cityUserCounts", status: 1, cityUserCounts };

  } catch (error) {

    console.error("Error fetching top courses:", error);

     return { msg: "Internal server error", status: 0 };
  }
}




exist_user = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await user_model.findOne({ email }).populate("college");

      if (user) {
        resolve({
          msg: "User found",
          status: 0
        });
      } else {
        // ✅ OTP Generate करो
        const otp = Math.floor(100000 + Math.random() * 900000);

        // ✅ OTP भेजो (example only — implement email/SMS logic here)
        console.log(`OTP sent to ${email}: ${otp}`);

        // यहां OTP को DB या Redis में भी store कर सकते हो (optional)

        resolve({
          msg: "User not found, OTP sent",
          status: 1,
          otp // सिर्फ dev/debug के लिए
        });
      }
    } catch (error) {
      console.error(error);
      reject({
        msg: "Internal error",
        status: 0
      });
    }
  });
};


  edit(id, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const exits_email = await user_model.findOne({ email: data.email });

        if (exits_email) {
          reject({ msg: "This email addres already exist", status: 0 });
        } else {
          const exits_contact = await user_model.findOne({
            contact: data.contact,
          });

          if (exits_contact) {
            reject({ msg: "This number already exist", status: 0 });
          } else {
            await user_model.updateOne(
              { _id: id },

              {
                name: data.name,
                email: data.email,
                contact: data.contact,
                state: data.state,
                city: data.city,
                course: data.course,
                gender: data.gender,
                birth: data.birth,
                college: data.college_id,
                enquiry: data.enquiry,
                checked: data.checked,
                user_response: data.user_response,
              }
            );

            resolve({ msg: "update successfully", status: 1 });
          }
        }
      } catch (error) {
        console.log(error);

        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  checked_status_edit(id, status) {

    console.log(id, status);

    return new Promise(async (resolve, reject) => {
      try {


        await user_model.updateOne(
          { _id: id },

          {
            checked: status,
          }
        );

        resolve({ msg: "update successfully", status: 1 });

      } catch (error) {

        console.log(error);

        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  user_response_edit(id, response) {
    console.log(id, response);

    return new Promise(async (resolve, reject) => {
      try {
        await user_model.updateOne(
          { _id: id },

          {
            user_response: response,
          }
        );

        resolve({ msg: "update successfully", status: 1 });
      } catch (error) {
        console.log(error);

        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  course_edit(id, course) {
    return new Promise(async (resolve, reject) => {
      try {
        const user_details = await user_model.findById(id);

    

     
        await user_model.updateOne(
          { _id: id },

          {
            course: course,
          }
        );



        await transporter.sendMail(mailOptions("New Course Enquiry",`Course (${course}) Applied by`,user_details.email,user_details.name));

        resolve({ msg: "update successfully", status: 1 });
      } catch (error) {
        console.log(error);

        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  college_edit(id, data) {

    return new Promise(async (resolve, reject) => {
      try {

        const user_details = await user_model.findById(id);


        

      

      

        await user_model.updateOne(
          { _id: id },

         data
        );


        await transporter.sendMail(mailOptions("New College Enquiry","College Applied by",user_details.email,user_details.name));

        resolve({ msg: "update successfully", status: 1 });
      } catch (error) {
        console.log(error);

        reject({ msg:error, status: 0 });
      }
    });
  }

  delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await user_model.deleteOne({ _id: id });

        resolve({ msg: "Account Deleted successfully", status: 1 });
      } catch (error) {
        console.log(error);

        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  enquiry_edit(id, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const user_details = await user_model.findById(id);

     
  

        await user_model.updateOne(
          { _id: id },

        data
        );

        await transporter.sendMail(mailOptions("New Enquiry"," Enquiry by",user_details.email,user_details.name));

        resolve({ msg: "update successfully", status: 1 });
      } catch (error) {
        console.log(error);

        reject({ msg: "internal error", status: 0 });
      }
    });
  }
}

module.exports = User_controllers;
