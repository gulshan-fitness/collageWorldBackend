


const otp_controllers = require("../Controlers/Otp_controller")



express = require("express")

const otp_router = express.Router()

otp_router.post(

    "/send/:mode?",
   
(req,res)=>{
    
        const result = new otp_controllers().send_otp(req.body, req.params.mode??null)

        result.then(
            (succes)=>{
                res.send( succes)
            }
        )
        
        .catch(
            (error)=>{
                res.send( error) 
            }
        )

    }
)

otp_router.post(

    "/verify",
  

(req,res)=>{

   
    
        const result = new otp_controllers().verify_otp(req.body)
        result.then(
            (succes)=>{
                res.send( succes)
            }
        )
        
        .catch(
            (error)=>{
                res.send( error) 
            }
        )

    }
)






module.exports= otp_router 