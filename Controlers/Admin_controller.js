
const Cryptr = require('cryptr');
const jwt = require("jsonwebtoken")

const admin_model=  require("../models/Admin_model");
const passwordcrypter = new Cryptr('wscubetech');




class admin_controllers{

    sign_up(data){
   

return new Promise(
    async(resolve, reject) => {
        
    try {
        if( data.name&& data.contact && data.password && data.email &&data.confirm_password){

            const exits_email = await admin_model.findOne({email:data.email})


            if(exits_email){
                reject( { msg: "This email addres already exist", status: 0 })  
            }

            else{
                if(data.password == data.confirm_password){

                    const encryptedpassword=passwordcrypter.encrypt(data.password);
                    
                    const admin= admin_model(
                        
                        {
                            name:data.name,
                            email:data.email,
                            contact: data.contact,
                            password:encryptedpassword
                    
                        }
                    )
                   

                      await  admin.save()

                      
                      .then(
                        async(succes) => {
                       
                            const token = jwt.sign({ admin: admin }, process.env.TOKEN_KEY, { expiresIn: '10y' });

                            resolve(
                                { msg: "admin sign_up succesfully", status: 1 , 
                                    admin:{...admin.toJSON() , password:null},
                                    token
                                }
                               )
                     
                    })

                    .catch((error) => {
                        

                        reject(
                            { msg: "admin sign_up not succesfully", status: 0 }
                           )
                       

                    })

                       
                  
                    
                        
                    
                }
        
        else{
            reject( { msg: "password and confirm_password is  not matching", status: 0 })
        }
        
            }


        }
        else{
            reject( { msg: "plaese fill all inputs", status: 0 })
        }
        
     
        
    } 
    catch (error) {
       
        reject(
            
            { msg: "internal error", status: 0 }
           )
    }

    
})
}


 login(data){
    
   
    return new Promise(
        async(resolve, reject) => {
        try {


if( data.email && data.password)
   
    {

    const admin= await admin_model.findOne({email:data.email})

    if(admin){
    

    
    const decrypted_password = passwordcrypter.decrypt(admin.password);
   
if(decrypted_password == data.password){

    const token = jwt.sign({ admin: admin }, process.env.TOKEN_KEY, { expiresIn: '10y' });
    resolve(

        

       {msg:" login succesfull" , status: 1, 
        
        admin:{...admin.toJSON(),password:null},
        token
    }

    )

}
else{

reject(
          
        { msg:"password is worng" ,status: 0 }
       ) 
}



    }

  else{
      reject(
          
          { msg: " dont have any accouted with this email", status: 0 }
         )
  }
}

   else{
    
    reject(
                
        { msg: "please fill the email and password", status: 0 }
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

   


       
        

       


}


module.exports = admin_controllers