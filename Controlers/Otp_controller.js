


const otp_model=  require("../models/Otp_model");

const nodemailer = require("nodemailer");

class otp_controllers{

 

    
    send_otp(data) {
      
      return new Promise(async (resolve, reject) => {
        try {

          const otpValue = (length = 6) => {
        return Math.floor(100000 + Math.random() * 900000); // Returns a number
      }

      const  generateOTP= otpValue();

          const exist_email= await otp_model.findOne({email:data.email})
          if(exist_email){
          
await otp_model.updateOne({email:data.email},{
  otp:generateOTP
})

resolve({ msg: `please check OTP on (${data.email})`, status: 1 });

          }

         else{
          const otp = new otp_model({
            email: data.email,
            otp: generateOTP,
          });
    
          await otp.save();
    
     
          resolve({ msg: `please check OTP on (${data.email})`, status: 1 });
         

         }

        console.log(data);
         

         // Create a test account
        //  nodemailer.createTestAccount((err, account) => {
        //      if (err) {
        //          return console.error('Failed to create a testing account:', err);
        //      }
         
             // Create a transporter using Ethereal SMTP
            //  let transporter = nodemailer.createTransport({
            //      host: 'smtp.ethereal.email',
            //      port: 587,
            //      secure: false, // true for 465, false for 587
            //      auth: {
            //          user: "nelson.buckridge42@ethereal.email", // Generated ethereal user
            //          pass: '1dHmsVRnr7DQJuyQPP'// Generated ethereal password
            //      }
            //  });
         
        //      let mailOptions = {
        //          from: '"Your Name" <your-email@domain.com>',
        //          to: 'recipient-email@example.com',
        //          subject: 'Hello from Ethereal',
        //          text: 'This is a plain text email sent using Nodemailer with Ethereal.',
        //          html: '<b>This is an HTML email sent using Nodemailer with Ethereal.</b>'
        //      };
         
        //      transporter.sendMail(mailOptions, (error, info) => {
        //          if (error) {
        //              return console.log('Error occurred: ' + error.message);
        //          }
        //          console.log('Message sent: %s', info.messageId);
        //          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        //      });
        //  });
         





        } 
        
        
        catch (error) {
          console.log(error);
    
          
          reject({ msg: "Internal error", status: 0 });
        }
      });
    }
    


 verify_otp(data){
   
   console.log(data);
   
    return new Promise(
        async(resolve, reject) => {

        try {

    const verified_otp = await otp_model.findOne({email:data.email,otp:data.otp})

    if(verified_otp){
        resolve(

            {msg:" otp verify succesfully" , status: 1, }
     
         )
    }
    
   
else{
    
    reject(
          
        { msg: " otp dose not verify", status: 0 }
       )  
}


   
    }

 
     
        
        catch (error) {
           
            reject(
                
                { msg: "internal error", status: 0 }
               )
        }
    
        
    })

    }

 
        

        get_users(user_id){

            return new Promise(

                async(resolve, reject) => {
                    
                try {

                    if(user_id){

                        const users = await user_model.find({_id:user_id})
                    
                        resolve(
                                    { msg: "users finded", status: 1,all_users:users  }
                                )
                    
                        
                        
                      
                    }
                    
                    else{
                        
                    
                        const users = await user_model.find()
                    
                     
                    
                            resolve(
                                    { msg: "users finded", status: 1,all_users:users  }
                                )
                    
                    
                        
                       
                    }
                    
                    
                } catch (error) {
                    reject(
                        { msg: "internal err", status: 0 }
                    )
                }
            })
            
            
        }


}


module.exports = otp_controllers