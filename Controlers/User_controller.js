

const jwt = require("jsonwebtoken")

const user_model=  require("../models/user_model");
const nodemailer = require("nodemailer");




class User_controllers{




sign_up(data){
   

return new Promise(
    async(resolve, reject) => {
        
    try {

       

            const exits_email = await user_model.findOne({email:data.email})


            if(exits_email){
                reject( { msg: "This email addres already exist", status: 0 })  
            }


            else{

                const exits_contact = await user_model.findOne({contact:data.contact}) 
                
                if(exits_contact)
                    {
                        reject( { msg: "This number already exist", status: 0 })  
                }

                else{



    const user= user_model(
                        
        {
            name:data.name,
            email:data.email,
            contact: data.contact,
           state:data.state,
           city:data.city,
           course:data.course,
           gender:data.gender,
           birth:data.birth,
           college:data.college_id,
           enquiry:data.enquiry,
           checked:data.checked,
           user_response:data.user_response,


           
    
        }
    )
    

      await  user.save()
      .then(

        (succes)=>{

            const token = jwt.sign({ user: user}, process.env.TOKEN_KEY, { expiresIn: '10y' });
            resolve(
                { msg: "user sign_up succesfully", status: 1 , user:{...user.toJSON(),password:null},token}
               )
        }
      )
      
      .catch(
        (err)=>{

            console.log(err);
            
            reject(
                { msg: "user sign_up  unsuccesfully", status: 0 }
               )
        }
      )

    
                }
                    
                  
                
        
            }


        
     
        
     
        
    } 
    catch (error) {
        console.log(error);
       
        reject(
            
            { msg: "internal error", status: 0 }
           )
    }

    
})
}


login(data){
    console.log(data)
   
    return new Promise(
        async(resolve, reject) => {
        try {




    const user= await user_model.findOne({email:data.email})


    if(user){
        const token = jwt.sign({ user: user}, process.env.TOKEN_KEY, { expiresIn: '10y' });
        resolve(
    
            {msg:" login succesfull" , status: 1, user:{...user.toJSON(),password:null},token}
     
         )
    }

    else{
        reject(
            
            { msg: " dont have any accouted with this email", status: 0 }
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

 
        
get_users(user_id,query,){

            return new Promise(

            async(resolve, reject) => {
                    
                try {

                    if(user_id){

                        const users = await user_model.findOne({_id:user_id}).populate("college")

                        if(users){
                            resolve(
                                {msg:"users finded",status: 1,all_users:users}
                                   
                               ) 

                        }

else{
    resolve(
        {msg:"users not finded finded",status: 0}
           
       ) 

}
                       


                    }


                 
                    
                    else{

                        const now = new Date(); // Initialize now as a Date object

                       console.log(query);
                        
                        const filter = {}

                       if (query.enquiry_time != "anyTime") {

                            const now = new Date()
                            
                            if (query.enquiry_time == "past24Hours") {
                                filter.updatedAt = { $gte: new Date(now.getTime() - 24 * 60 * 60*1000) };
                            }

                            

                            if (query.enquiry_time == "pastWeek") {
                                filter.updatedAt = { $gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) };
                            }

                            if (query.enquiry_time == "pastMonth") {
                                filter.updatedAt = { $gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) };
                            }
                        }


                        if( query?.college_name){
                            filter['collegeDetails.college_name']={ $regex: query?.college_name, $options: 'i' }
                        }
                        

                        if( query?.course){
                            filter.course={ $regex: query?.course, $options: 'i' }
                        }
                        

                        if(query?.date){
                            const startOfDay = new Date(`${query?.date}T00:00:00.000Z`)
                            const endOfDay = new Date(`${query?.date}T23:59:59.999Z`)


                            filter.updatedAt= {
                                $gte: startOfDay,
                                $lte: endOfDay
                              }
                        }
                       
                        if(query?.state){
                           


                            filter.state= { $regex: query?.state, $options: 'i' }
                        }

                        if(query?.city){
                           


                            filter.city= { $regex: query?.city, $options: 'i' }
                        }
                    


                        
                        const users = await user_model.aggregate([
                            // Lookup stage to join with the College collection
                            {
                              $lookup: {
                                from: 'colleges', // The collection name in the database
                                localField: 'college',
                                foreignField: '_id',
                                as: 'collegeDetails'
                              }
                            },
                            // Unwind the collegeDetails array
                            {
                              $unwind: {
                                path: '$collegeDetails',
                                preserveNullAndEmptyArrays: true
                              }
                            },
                            // Match stage to filter by course and updatedAt (if needed)
                            {
                              $match: {
                                $or: [
                                  { college: { $ne: null } }, // Condition 1: college is not null
                                  { enquiry: { $ne: "" } }    // Condition 2: enquiry is not an empty string
                                ],
                                ...filter
                              }
                            },
                            // Project stage to include only relevant fields
                            {
                              $project: {
                                name: 1,
                                contact: 1,
                                email: 1,
                                gender: 1,
                                birth: 1,
                                course: 1,
                                state: 1,
                                city: 1,
                                enquiry: 1,
                                updatedAt: 1,
                                'collegeDetails.college_name': 1,
                                checked: 1, // Include checked field
                                user_response: 1 // Include user_response field
                              }
                            },
                            // Sort stage to order by updatedAt field in descending order
                            {
                              $sort: { updatedAt: -1 }
                            }
                          ]);
                          
                          
                          
                      

                        const total_count= await user_model.countDocuments()
                    
                     
                            resolve(
                                    { msg: "users finded", status: 1,all_users:{users,total_count} , }
                                )
                    
                    
                        
                       
                    }
                    
                    
                } catch (error) {
                    console.log(error);
                    
                    reject(
                        { msg: "internal err", status: 0 }
                    )
                }
            })
            
            
        }

        exist_user(email){

            return new Promise(

            async(resolve, reject) => {
                    
                try {

                 

                        const users = await user_model.findOne({email:email}).populate("college")

                        if(users){
                            resolve(
                                {msg:"users finded",status: 0}
                                   
                               ) 

                        }

else{
    resolve(
        
        {msg:"users not finded finded",status:1}
           
       ) 

}
                       


                    
                    
                    
                } catch (error) {
                    console.log(error);
                    
                    reject(
                        { msg: "internal err", status: 0 }
                    )
                }
            })
            
            
        }


get_users_recent_enquiry_city_wise(cityName){

            return new Promise(

                async(resolve, reject) => {
                    
                try {

                    const usersWithColleges = await user_model.aggregate([
                        {
                          $lookup: {
                            from: "colleges", // The collection name in lowercase
                            localField: "college",
                            foreignField: "_id",
                            as: "collegeDetails"
                          }
                        },
                        {
                          $unwind: {
                            path: "$collegeDetails",
                            preserveNullAndEmptyArrays: true // Keep users even if they have no college
                          }
                        },
                        {
                          $match: {
                            "collegeDetails.city": {
                              $regex: cityName, // Using regex to filter by city name
                              $options: 'i' // Case-insensitive
                            }
                          }
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
                              officialWebsite: "$collegeDetails.officialWebsite"
                            }
                          }
                        },
                        {
                            $sort: {
                              createdAt: -1 // Sort by createdAt in descending order for recent users
                            }}
                      ]);
                    
                     
                            resolve(
                                    { msg: "collegs finded", status: 1,colleges:{usersWithColleges} , }
                                )
                    
                    
                        
                       
                    
                    
                    
                } catch (error) {
                    console.log(error);
                    
                    reject(
                        { msg: "internal err", status: 0 }
                    )
                }
            })
            
            
        }



edit(id, data) {
         
            
        
            return new Promise(async (resolve, reject) => {
                try {
                   
                    const exits_email = await user_model.findOne({email:data.email})


                    if(exits_email){
                        reject( { msg: "This email addres already exist", status: 0 })  
                    }


                    else{

                        const exits_contact = await user_model.findOne({contact:data.contact}) 
                
                        if(exits_contact)
                            {
                                reject( { msg: "This number already exist", status: 0 })  
                        }
        
                        else{
                            await user_model.updateOne(
                                { _id: id },
        
                                {
                                    name:data.name,
                                    email:data.email,
                                    contact: data.contact,
                                   state:data.state,
                                   city:data.city,
                                   course:data.course,
                                   gender:data.gender,
                                   birth:data.birth,
                                   college:data.college_id,
                                   enquiry:data.enquiry,
                                   checked:data.checked,
                   user_response:data.user_response,
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


        checked_status_edit(id,status){
            console.log(id,status);
            
            return new Promise(async (resolve, reject) => {
                try {
                    await user_model.updateOne(
                        { _id: id },

                        {
                           checked:status,
           
                        }
                    );
    
                    resolve({ msg: "update successfully", status: 1 });
                } catch (error) {
                    console.log(error);
                    
                    reject({ msg: "internal error", status: 0 });
                }
            });

        }

        user_response_edit(id,response){
            console.log(id,response);
            
            return new Promise(async (resolve, reject) => {
                try {
                    await user_model.updateOne(
                        { _id: id },

                        {
                           user_response:response,
           
                        }
                    );
    
                    resolve({ msg: "update successfully", status: 1 });
                } catch (error) {
                    console.log(error);
                    
                    reject({ msg: "internal error", status: 0 });
                }
            });

        }


        course_edit(id,course){
            
            
            return new Promise(async (resolve, reject) => {
                try {


                    const user_details=      await user_model.findById(

                        id
        
                    );
        
        
        
        
        
                    const transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                          user:'bhawanishankarsharma74@gmail.com', // Your admin 
                          pass:'lbrmytqjzwagcdye', // Your Gmail App Password mne backend push kiya lekin update hua nhi dekh le check kr
                        },
                        host:"smtp.gmail.com", // Gmail's SMTP server
                        port: 587, // Use port 587 (TLS)
                       
                        tls: {
                          rejectUnauthorized: false,
                        }
                      });
              
              
              
                  
                      const mailOptions = {
                        from:'Team of Aaopadheindia', // Sender's email (user's email) ye dono mail same he hoge 
                        to:"gulshankumarjangid@gmail.com", // Receiver's email (admin email)
        
                        subject: "new Enquiry",
        
                        text: `course applied by- ${user_details.email}
                        name-${user_details.name}`, // OTP in the email body
        
                      }

                    await user_model.updateOne(
                        { _id: id },

                        {
                            course:course,
           
                        }
                    );

                    await transporter.sendMail(mailOptions);
    
                    resolve({ msg: "update successfully", status: 1 });
                } catch (error) {
                    console.log(error);
                    
                    reject({ msg: "internal error", status: 0 });
                }
            });

        }

        college_edit(id,college_id){
            
            
            return new Promise(async (resolve, reject) => {
                try {
                    const user_details=      await user_model.findById(

                        id
        
                    );
        
        
        
        
        
                    const transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                          user:'bhawanishankarsharma74@gmail.com', // Your admin 
                          pass:'lbrmytqjzwagcdye', // Your Gmail App Password mne backend push kiya lekin update hua nhi dekh le check kr
                        },
                        host:"smtp.gmail.com", // Gmail's SMTP server
                        port: 587, // Use port 587 (TLS)
                       
                        tls: {
                          rejectUnauthorized: false,
                        }
                      });
              
              
              
                  
                      const mailOptions = {
                        from:'Team of Aaopadheindia', // Sender's email (user's email) ye dono mail same he hoge 
                        to:"gulshankumarjangid@gmail.com", // Receiver's email (admin email)
        
                        subject: "new Enquiry",
        
                        text: ` college applied by- ${user_details.email}
                        name-${user_details.name}`, // OTP in the email body
        
                      }



                    
                    await user_model.updateOne(
                        { _id: id },

                        {
                           college:college_id,
           
                        }
                    );
                    await transporter.sendMail(mailOptions);
    
                    resolve({ msg: "update successfully", status: 1 });
                } catch (error) {
                    console.log(error);
                    
                    reject({ msg: "internal error", status: 0 });
                }
            });

        }


delete(id){
    return new Promise(async (resolve, reject) => {
        try {
            await user_model.deleteOne(
                { _id: id }

            );

            resolve({ msg: "Account Deleted successfully", status: 1 });
        } catch (error) {
            console.log(error);
            
            reject({ msg: "internal error", status: 0 });
        }
    });

}


enquiry_edit(id,data){
            
            
    return new Promise(async (resolve, reject) => {
        try {

      const user_details=      await user_model.findById(

                id

            );





            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user:'bhawanishankarsharma74@gmail.com', // Your admin 
                  pass:'lbrmytqjzwagcdye', // Your Gmail App Password mne backend push kiya lekin update hua nhi dekh le check kr
                },
                host:"smtp.gmail.com", // Gmail's SMTP server
                port: 587, // Use port 587 (TLS)
               
                tls: {
                  rejectUnauthorized: false,
                }
              });
      
      
      
          
              const mailOptions = {
                from:'Team of Aaopadheindia', // Sender's email (user's email) ye dono mail same he hoge 
                to:"gulshankumarjangid@gmail.com", // Receiver's email (admin email)

                subject: "New Enquiry",

                text: `Enquiry - ${data.enquiry}
                Name - ${user_details.name}
                
               Email ${user_details.email}`
                

               
               
                // OTP in the email body



              }


            
            await user_model.updateOne(

                { _id: id },

                {
                    enquiry:data.enquiry,
   
                }
            );

            await transporter.sendMail(mailOptions);
                           
                    
            resolve({ msg: "update successfully", status: 1 });
          
        } catch (error) {
            console.log(error);
            
            reject({ msg: "internal error", status: 0 });
        }
    });

}






}


module.exports = User_controllers