const path = require("path");
const fs = require("fs");
const mongoose = require('mongoose');
const Exam_model = require("../models/ExamModel");


class Exam_model_controller {



  add(data,logo,PreviousPapper) {


    return new Promise(async (resolve, reject) => {
      try {


     console.log(data,logo,PreviousPapper);


     const exist_exam = await Exam_model.findOne({
            FullName: data.FullName,
          year: data.year,
        }
        
    );


  

        if (exist_exam) {

          reject({
            msg: " this exam already exist ",
            status: 0,
          });


        } 
        


else {

  const {Result_Announce_Date,Application_FormDate ,...rest} = data

const parsedApplication_FormDate=  JSON.parse(data.Application_FormDate)

const parsedResult_Announce_Date=  JSON.parse(data.Result_Announce_Date)
          
          const logo_name =

            new Date().getTime() + Math.floor(Math.random() * 1000) + logo.name;
    
          const destination = "./public/image/exam_image/"+logo_name;

          await logo.mv(destination);



          const PreviousPapper_name =new Date().getTime() + Math.floor(Math.random()*1000) + PreviousPapper.name ;


  
         const PreviousPapperdestination = "./public/image/exam_PreviousPapper/" + PreviousPapper_name;


        await PreviousPapper.mv(PreviousPapperdestination);

        


          const Exam = new Exam_model({...data,logo:logo_name,PreviousPapper:PreviousPapper_name,Application_FormDate:{from:parsedApplication_FormDate.from,to:parsedApplication_FormDate.to},

           Result_Announce_Date:{
            from:parsedResult_Announce_Date.from,to:parsedResult_Announce_Date.to
           } 

          
          });






          await Exam.save()


          resolve({ msg: " Exam add succescfully ", status: 1});


          
        }
      } catch (error) {

        console.log(error);
        
        reject({ msg: error, status: 0 });
      }
    });
  }

  read(id,query) {

    return new Promise(async (resolve, reject) => {
      
      
      
      try {

        if(id) {

          const perticuler_exam= await Exam_model.findOne({_id:id,})
          .populate("Course_id");     
          resolve({ msg: " exam finded ", status: 1,perticuler_exam });

        } 



        else {

          const filter={}

          if (query?.TopExam) {
            filter.topExam=true
          }
      

          const exams= await Exam_model.find(filter)
          .populate("Course_id");

          resolve({ msg: " exams all finded ", status: 1, exams });

        }
      } catch (error) {
        console.log(error);
        
        reject({ msg: "internal error", status: 0 });
      }
    });
  }

 


  edit(id, data) {

  
    
    return new Promise(async (resolve, reject) => {
      try {


      
data.Application_FormDate= JSON.parse(data.Application_FormDate)

data.Result_Announce_Date= JSON.parse(data.Result_Announce_Date)



console.log(data,"sdsdd");

        await Exam_model.updateOne(
          { _id: id },
         data
        );

        resolve({ msg: " exam update succescfully ", status: 1 });
      } catch (error) {
        console.log(error);

        reject({ msg: error.message, status: 0 });
      }
    });
  }



 async ImageEdits(id,data,image,filepath,objectKey) {



  console.log(id,data,image,filepath,objectKey);

  
    try {

    fs.unlinkSync(path.join( `./public/image/${filepath}/${data.old_image}`));


    const image_name = new Date().getTime() + Math.floor(Math.random()*1000)+image.name;

  const destination=`./public/image/${filepath}/${image_name}`;


  await image.mv(destination);


  await Exam_model.updateOne({ _id: id},{[objectKey]:image_name });



  return{
    msg:"image update successfully",
    status:1
  }

        
    } catch (error) {

        
      console.log(error);

      
        return{
            msg:error,
            status:0
          }

    }

    
     
  }

 

  delete(id,old_image,OldPreviousPapper) {

    return new Promise(async (resolve, reject) => {
      try {

        console.log(id,old_image,OldPreviousPapper);

        

        fs.unlinkSync(path.join( `./public/image/exam_image/${old_image}`));
        fs.unlinkSync(path.join( `./public/image/exam_PreviousPapper/${OldPreviousPapper}`));


        await Exam_model.deleteOne({ _id: id });

        resolve({ msg: " exam deleted succescfully ", status: 1 });

      } catch (error) {
        console.log(error);
        
        reject({ msg: error.message, status: 0 });
      }
    });
  }
}

module.exports = Exam_model_controller;
