
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

   


       
            AdminVerify(id){
   

return new Promise(
    async(resolve, reject) => {
        
    try {
       
            const exits_admin = await admin_model.findOne({_id:id})


            if(exits_admin){
                 const token = jwt.sign({ admin: exits_admin ,role: exits_admin?.role},process.env.TOKEN_KEY, { expiresIn: '1y' });

                const{password,...admindata}=exits_admin.toObject()
                
                reject( { msg: "verify Done", status: 1, admin:admindata,token })  
            }

   else  reject(
            
            { msg: "this User is not Exist", status: 0 }
            
           )
        
     
        
    } 
    catch (error) {
       
        reject(
            
            { msg: "internal error", status: 0 }
           )
    }

    
})
}


read(){
   
return new Promise(
    async(resolve, reject) => {
        
    try {
       
const admins = await admin_model.find({approved:false})         

  resolve( { msg: "admins finded", status: 1,admins:admins })
   
    } 

    catch (error) {
       
        reject(
            { msg: "internal error", status: 0 }
           )
    }

    
})
}
approve(id){
   console.log(id);
   

return new Promise(

    async(resolve, reject) => {
        
    try {
       
             await admin_model.updateOne({_id:id},{
                $set:{approved:true}
             })
  resolve(
            
            { msg: "Update Succesfully", status: 1 }
            
           )
        
     
        
    } 
    catch (error) {
        console.log(error);
        
       
        reject(
            
            { msg: error.message, status: 0 }
           )
    }

    
})
}

college_idRemove(id){
   console.log(id);
   

return new Promise(

    async(resolve, reject) => {
        
    try {
       
             await admin_model.updateOne({_id:id},{
                $unset:{collage_id:""}
             })
  resolve(
            
            { msg: "Update Succesfully", status: 1 }
            
           )
        
     
        
    } 
    catch (error) {
        console.log(error);
        
       
        reject(
            
            { msg: error.message, status: 0 }
           )
    }

    
})
}

collage_id_Change (id,collage_id){
   

return new Promise(

    async(resolve, reject) => {
        
    try {
             await admin_model.updateOne({_id:id},{
                $set:{collage_id:collage_id}
             })  

  resolve(     
            { msg: "Update Succesfully", status: 1 }          
           )   
    } 
    catch (error) {
       
        reject(
            
            { msg: error.message, status: 0 }
           )
    }

    
})
}

delete(id){
   

return new Promise(

    async(resolve, reject) => {
        
    try {
       
             await admin_model.deleteOne({_id:id})
  resolve(
            
            { msg: "Delete Succesfully", status: 1 }
            
           )
        
     
        
    } 
    catch (error) {
       
        reject(
            
            { msg: error.message, status: 0 }
           )
    }

    
})
}






}


module.exports = admin_controllers