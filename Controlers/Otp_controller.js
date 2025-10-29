const otp_model = require("../models/Otp_model");
const nodemailer = require("nodemailer");
const Usermodel = require("../models/user_model");

class otp_controllers {
  // Send OTP via email


 send_otp(data,mode) {
  return new Promise(async (resolve, reject) => {
    try {

               const generateOTP = () => Math.floor(100000 + Math.random() * 900000);
      const otp = generateOTP(); // Generate new OTP

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

      const mailOptions = {
        from: process.env.SMTP_MAIL || 'bhawanishankarsharma74@gmail.com',
        to: data.email,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}`,
      };

      console.log(data);
      
if(mode&&mode=="refrel"|| mode=="signup"){

      const exist_email = await otp_model.findOne({ email: data.email });

      // Nodemailer setup
   

      if (exist_email) {
        await otp_model.updateOne(
          { email: data.email },
          { otp }
        );
      } else{
        const newOtpEntry = new otp_model({
          email: data.email,
          otp,
        });
        await newOtpEntry.save();

      }

 
        await transporter.sendMail(mailOptions);

      resolve({
        msg: `Please check OTP in your ${data.email}`,
        status: 1,
      });


}



else{
        const existUser = await Usermodel.findOne({
        email: data.email,
       
      });

      if(!existUser){
console.log("not available");

       reject ({
        msg: `you don't have account on this mail(${data.email})`,
        status: 0,
      })
      }

      else{

     

      const exist_email = await otp_model.findOne({ email: data.email });

      // Nodemailer setup
   

      if (exist_email) {
        await otp_model.updateOne(
          { email: data.email },
          { otp }
        );
      } 
      else {
        const newOtpEntry = new otp_model({
          email: data.email,
          otp,
        });
        await newOtpEntry.save();
      }

      await transporter.sendMail(mailOptions);

      resolve({
        msg: `Please check OTP in your ${data.email}`,
        status: 1,
      });

      }

}
   



    } catch (error) {
      console.log("OTP Send Error:", error);
      reject({ msg: error.message, status: 0 });
    }
  });
}








  // Verify OTP
  async verify_otp(data) {
    try {

   


      const verified_otp = await otp_model.findOne({
        email: data.email,
        otp: data.otp,
      });

      if (verified_otp) {
        return { msg: "OTP verified successfully", status: 1 };
      } else {
        return { msg: "OTP does not verify", status: 0 };
      }
    } catch (error) {
      console.error("Error occurred while verifying OTP:", error);
      return { msg: "Internal error", status: 0 };
    }
  }

  // Get users
  async get_users(user_id) {
    try {
      let users;
      if (user_id) {
        users = await user_model.find({ _id: user_id });
      } else {
        users = await user_model.find();
      }

      return { msg: "Users found", status: 1, all_users: users };
    } catch (error) {
      console.error("Error occurred while fetching users:", error);
      return { msg: "Internal error", status: 0 };
    }
  }
}

module.exports = otp_controllers;
