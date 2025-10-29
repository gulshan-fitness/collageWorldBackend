const scholarship_model = require("../models/Scholarship_model");

class scholarship_controller {
  add(data) {
    console.log(data);

    return new Promise(async (resolve, reject) => {
      try {
        const exist_scholership = await scholarship_model.findOne({
          college_id: data.college_id,
        });

        if (exist_scholership) {
          reject({ msg: "already exist", status: 0 });

        } else {
          const scholarship = scholarship_model({
            college_id: data.college_id,
            scholarship_type: data.scholarship_type,
            organisation: data.organisation,
            application_deadline: data.application_deadline,
            no_of_scholarships: data.no_Of_scholarship,
            amount: data.amount,
            international_students: data.international_students,
            scholarship_link: data.scholarship_link,
          });

          await scholarship
            .save()
            .then((succes) => {
              resolve({ msg: " scholarship add succescfully ", status: 1 });
            })

            .catch((error) => {
              console.log(error);

              reject({ msg: " course add unsuccesfully", status: 0 });
            });
        }
      } catch (error) {
        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  read(id,collage_id) {
    return new Promise(async (resolve, reject) => {
      try {


        if (id!=="null") {

          const scholarship = await scholarship_model
            .findOne({ _id: id })
            .populate("college_id");


          resolve({ msg: "scholarship finded", status:1, scholarship });


        }

          if (collage_id!=="null") {
console.log(collage_id,"collage_id");

          const scholarship = await scholarship_model
            .find({ college_id: collage_id })
            .populate("college_id");


          resolve({ msg: " scholarship finded ", status: 1, scholarship });


        }
        
        else {
          const scholarship = await scholarship_model 
            .find()
            .populate("college_id");

          resolve({ msg: " scholarship finded ", status: 1, scholarship });
        }
      } catch (error) {
        console.log(error);
        
        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  edit(id, data) {
    console.log(id, data);

    return new Promise(async (resolve, reject) => {
      try {
        await scholarship_model.updateOne(
          { _id: id },
          {
            college_id: data.college_id,
            scholarship_type: data.scholarship_type,
            organisation: data.organisation,
            application_deadline: data.application_deadline,
            no_of_scholarships: data.no_Of_scholarship,
            amount: data.amount,
            international_students: data.international_students,
            scholarship_link: data.scholarship_link,
          }
        );

        resolve({ msg: " scholarship update succescfully ", status: 1 });
      } catch (error) {
        reject({ msg: "internal error", status: 0 });
      }
    });
  }

  delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await scholarship_model.deleteOne({ _id: id });

        resolve({ msg: " scholarship deleted succescfully ", status: 1 });
      } catch (error) {
        reject({ msg: "internal error", status: 0 });
      }
    });
  }
}

module.exports = scholarship_controller;
