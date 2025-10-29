const path = require("path");
const fs = require("fs");

const placed_students_model = require("../models/Placed_students_model");

class placed_students_controller {
  add(data, logo) {
    return new Promise(async (resolve, reject) => {
      try {
        const logo_name =
          new Date().getTime() + Math.floor(Math.random() * 1000) + logo.name;

        const destination = "./public/image/students_placed_image/" + logo_name;
        await logo.mv(destination);

        const placed_students = placed_students_model({
          college_id: data.college_id,
          name: data.student_name,
          company: data.company,
          review: data.review,

          student_image: logo_name,
        });

        await placed_students
          .save()
          .then((succes) => {
            resolve({ msg: " placed_students add succescfully ", status: 1 });
          })

          .catch((error) => {
            reject({ msg: " placed_students add unsuccesfully", status: 0 });
          });
      } catch (error) {
        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  read(id,collage_id) {
    return new Promise(async (resolve, reject) => {
      try {

        if(id !=="null") {

          const placed_students = await placed_students_model
            .findById(id)
            .populate("college_id");

          resolve({
            msg: " placed_students finded ",
            status: 1,
            placed_students,
          });

        } 
        


        if (collage_id !=="null") {

          const placed_students = await placed_students_model
            .find({ college_id:collage_id })
            .populate("college_id");
            

          resolve({
            msg: " placed_students finded ",
            status: 1,
            placed_students,
          });

        } 
        
        
        else {
          const placed_students = await placed_students_model
            .find()
            .populate("college_id");

          resolve({
            msg: " placed_students finded ",
            status: 1,
            placed_students,
          });
        }
      } catch (error) {
        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  delete(id, old_logo) {
    return new Promise(async (resolve, reject) => {
      try {
        await placed_students_model.deleteOne({ _id: id });

        fs.unlinkSync(
          path.join("./public/image/students_placed_image/", old_logo)
        );

        resolve({ msg: " placed_students deleted succescfully ", status: 1 });
      } catch (error) {
        reject({ msg: "internal error", status: 0 });
      }
    });
  }
}

module.exports = placed_students_controller;
